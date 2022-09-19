<?php

namespace App\Http\Controllers\API;

use App\Helper;
use App\Http\Controllers\Controller;
use App\ImportModel;
use App\Sections;
use App\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Facades\Excel as Excel;

class DataImportController extends Controller
{
    public function __construct()
    {
//        ini_set('memory_limit', '-1');
    }

    private $section_topics_headers = [
        'code',
        'content em',
        'content um',
    ];

    public function processSubjectTopicsFile(Request $request)
    {
        $response = [
            'status' => true,
            'headers' => [],
            'message' => 'Please choose file!',
            'data' => []
        ];

        if (!$request->has('class_id') || !$request->has('subject_id') || !$request->has('file')) {
            return response()->json($response);
        }

        $name = '';
        $destination = public_path('temp');
        $class_id = Helper::easyDecode($request->post('class_id'));
        $subject_id = Helper::easyDecode($request->post('subject_id'));

        if ($request->has('file')) {

            $file = $request->file('file');
//            if ($file->getClientOriginalExtension() !== 'csv') {
//                $response['message'] = 'Only CSV files are allowed!';
//                return response()->json($response);
//            }

            $name = "import_{$class_id}_{$subject_id}_" . Str::slug($file->getClientOriginalName()).'.'.$file->getClientOriginalExtension();

            if (!file_exists($destination . '/' . $name)) {

                // if temp directory is not available
                if (!file_exists($destination))
                    mkdir($destination, 0777);

                $file->move($destination, $name);
            }
        }

        $i = 0;
        $t_no = 1;
        $topics = [];
        $file = $destination . '/' . $name;
        $raw_topics = Excel::toArray(new ImportModel, $file);
        if(!empty($raw_topics)) {
            $raw_topics = $raw_topics[0];
        }

        foreach($raw_topics as $i => $row) {

            if ($i === 0) {
                continue;
            } else {
                // skip empty rows
                if (empty($row[0])) continue;
                if (empty($row[1]) AND empty($row[2])) continue;

                $topics = $this->processSectionTopics($topics, $row, $t_no);
                $t_no++;
            }
        }

        $sections = $this->importTopics($topics, $request);
        return response()->json([
            'status' => true,
            'headers' => $this->section_topics_headers,
            'message' => 'Success',
            'data' => $topics,
            'sections' => $sections
        ]);
    }

    /**
     * @param array $heading_row
     * @param array $headings
     * @return array
     */
    protected function validateHeadings($heading_row, $headings)
    {
        $headings_list = implode(', ', $headings);
        $count = count($headings);
        $response = [
            'status' => false,
            'headers' => $heading_row,
            'message' => "Your file should have $count columns in following sequence: " . PHP_EOL . $headings_list
        ];

        if (count($heading_row) !== count($headings)) {
            return $response;
        }

        // validate sequence
        // todo();

        $response['status'] = true;
        $response['message'] = 'Headings are OK!';

        return $response;
    }

    private function processSectionTopics($topics, $row, $t_no)
    {
        $code = $row[0];
        $topics[$code][] = [
            'code' => $code,
            'content_em' => $row[1],
            'content_um' => $row[2],
        ];
        return $topics;
    }

    private function importTopics($topics, $request)
    {
        $sections = [];

        $class_id = Helper::easyDecode($request->post('class_id'));
        $subject_id = Helper::easyDecode($request->post('subject_id'));
        $syllabus_type_id = Helper::easyDecode($request->post('syllabus_type_id'));
        $subject = Subject::find($subject_id);

        $keys = array_keys($topics);
        foreach ($topics as $code => $topic_list) {

            try {
                $i = array_search($code, $keys, TRUE);
                $sections[$i]['updated'] = [];
                $parent_id = 0;

                // parent topics will always be on 0 index
                $parent_topics = $topic_list[0];
                $subject_code = $code;

                if($subject->medium == 'urdu') {
                    $parent_title = ($parent_topics['content_um']);
                    $parent_rtl_name = ($parent_topics['content_em']);
                } else {
                    $parent_title = $this->truncateExtraChars($parent_topics['content_em'], $i);
                    $parent_rtl_name = $this->truncateExtraChars($parent_topics['content_um'], $i);
                }

                $parent_section = Sections::select('id', 'name', 'rtl_name', 'parent_title')
                    ->where('class_id', '=', $class_id)
                    ->where('subject_id', '=', $subject_id)
                    ->where('syllabus_type', '=', $syllabus_type_id)
                    ->where('parent_id', '=', $parent_id)
                    ->where('subject_code', '=', $subject_code)
                    ->where(function ($query) use ($parent_title, $parent_rtl_name) {
                        // if urdu version not available
                        // check only english
                        if (empty($parent_rtl_name)) {
                            return $query->where('name', 'like', $parent_title);
                        }

                        // vice versa
                        if (empty($parent_title)) {
                            return $query->where('rtl_name', 'like', $parent_rtl_name);
                        }

                        // if both are available, check both with where condition
                        return $query->where('name', 'like', $parent_title)
                            ->orWhere('rtl_name', 'like', $parent_rtl_name);
                    })->first();

                if (empty($parent_section)) {
                    $data = [
                        'class_id' => $class_id,
                        'subject_id' => $subject_id,
                        'section_id' => 1,
                        'syllabus_type' => $syllabus_type_id,
                        'name' => $parent_title,
                        'rtl_name' => $parent_rtl_name,
                        'parent_id' => $parent_id,
                        'subject_code' => $subject_code,
                        'is_active' => 1,
                        'parent_title' => 'Unit',
                        'rlt_parent_title' => ''
                    ];
                    $parent_section = Sections::create($data);

                } else {
                    if (!empty($parent_title))
                        $parent_section->name = $parent_title;
                    if (!empty($parent_rtl_name))
                        $parent_section->rtl_name = $parent_rtl_name;

                    $parent_section->save();
//                $sections[$i]['updated'][] = $parent_section->toArray();
                }
                $sections[$i] = $parent_section->toArray();
                $sections[$i]['topics'] = [];

                $parent_id = $parent_section['id'];
                foreach ($topic_list as $j => $topic) {

                    if ($j == 0) continue;

                    if($subject->medium == 'urdu') {
                        $eng_name = ($topic['content_um']);
                        $rtl_name = ($topic['content_em']);
                    } else {
                        $eng_name = $this->truncateExtraChars($topic['content_em'], $i + 1);
                        $rtl_name = $this->truncateExtraChars($topic['content_um'], $i + 1);
                    }

                    $sub_section = Sections::select('id', 'name', 'rtl_name')
                        ->where('class_id', '=', $class_id)
                        ->where('subject_id', '=', $subject_id)
                        ->where('syllabus_type', '=', $syllabus_type_id)
                        ->where('parent_id', '=', $parent_id)
                        ->where('subject_code', '=', $subject_code)
                        ->where(function ($query) use ($eng_name, $rtl_name) {

                            if (empty($rtl_name)) {
                                return $query->where('name', 'like', $eng_name);
                            }

                            if (empty($eng_name)) {
                                return $query->where('rtl_name', 'like', $rtl_name);
                            }

                            return $query->where('name', 'like', $eng_name)
                                ->orWhere('rtl_name', 'like', $rtl_name);
                        })->first();

                    if (empty($sub_section)) {
                        $data = [
                            'class_id' => $class_id,
                            'subject_id' => $subject_id,
                            'section_id' => 1,
                            'syllabus_type' => $syllabus_type_id,
                            'name' => $eng_name,
                            'rtl_name' => $rtl_name,
                            'parent_id' => $parent_id,
                            'subject_code' => $subject_code,
                            'is_active' => 1,
                            'parent_title' => 'Unit',
                            'rlt_parent_title' => ''
                        ];
                        $sub_section = Sections::create($data);

                    } else {
                        if (!empty($eng_name))
                            $sub_section->name = $eng_name;
                        if (!empty($rtl_name))
                            $sub_section->rtl_name = $rtl_name;

                        $sub_section->save();
//                    $sections[$i]['topics']['updated'][] = $sub_section->toArray();
                    }
                    $sections[$i]['topics'][] = $sub_section->toArray();
                }
            } catch (\Exception $e) {
                Log::error(
                    'Import Error: ' . PHP_EOL.
                    json_encode($topic_list, JSON_PRETTY_PRINT)
                    . PHP_EOL.
                    'Line#' . $e->getLine()
                    . PHP_EOL.
                    $e->getMessage()
                );
                return [];
            }
        }

        return $sections;
    }


    protected function truncateExtraChars($content, $t_no)
    {
        return $content;

        if ($pos = strrpos($content, $t_no . '.') !== false) {
            // check if next characters are 2 digit number or 1
            if (is_numeric(trim(substr($content, $pos + 1, $pos + 2)))) {
                $content = substr($content, $pos + 3, strlen($content));
            } else {
                $content = substr($content, $pos + 2, strlen($content));
            }
        }

        $replace_options = ['U -1', 'U -2', 'U -3', 'U -4', 'U -5', 'U -6', 'U -7', 'U -8', 'U -9', 'U -10', 'U -11', 'U -12', 'U -13', 'U -14', 'U -15', 'U -16', 'U -17', 'U -17', 'U -18', 'U -19', 'U -20',
            'CHAP 1:','CHAP 2:', 'CHAP 3:', 'CHAP 4:', 'CHAP 5:', 'CHAP 6:', 'CHAP 7:', 'CHAP 8:', 'CHAP 9:', 'CHAP 10:', 'CHAP 11:','CHAP 12:', 'CHAP 13:', 'CHAP 14:', 'CHAP 15:', 'CHAP `16:', 'CHAP 17:', 'CHAP 18:', 'CHAP 19:', 'CHAP 20:'
        ];
        $content = str_replace($replace_options, '', $content);

        return ucfirst(strtolower(trim($content)));
    }

    protected function checkIsNumber($str)
    {
        for ($i=1; $i<=2000; $i++) {

            $n = "{$i}.</p>";
            if($str === $n)
                return true;

            $n = "<p>{$i}.";
            if($str === $n)
                return true;

            $n = "{$i}.";
            if($str === $n)
                return true;
        }

        return false;
    }

    protected function fixEquation($equation) {
        $equation = preg_replace('/(mathsize=")([0-9])\w+\"/', '', $equation);
        $equation = preg_replace('/^(ext).*$/', '\text', $equation);
        $equation = str_replace('ight', '\right', $equation);
        $equation = preg_replace('/^(oot).*$/', '\root', $equation);
        $equation = str_replace('>frac', '>$\frac', $equation);
        $equation = str_replace('" src="', '', $equation);
        $equation = str_replace('h$', '$', $equation);
        $equation = str_replace('imes', '\times', $equation);
        $equation = str_replace('fn_jvn ', '$', $equation);
        $equation = str_replace('fn_phv ', '$', $equation);
        $equation = str_replace('>left', '>\left', $equation);
        $equation = str_replace('>right', '>\right', $equation);
        $equation = str_replace('$$', '$$', $equation);

        return $equation;
    }

    protected function extractEquation($string, $question, $rtl = false)
    {
        try {
	$equation = '';
	$strpos = strpos($string, '<img', 0);
	if ($strpos === FALSE) {
	    $question .= $string;
	    return $question;
	}

	// 1st part of string (before 1st img tag)
	$question .= substr($string, 0, $strpos);

	$eq_s_pos = strpos($string, 'alt="');
	$o_eq_e_pos = $eq_e_pos = strpos($string, '" />');
	$eq = substr($string, $eq_s_pos, $eq_e_pos);

	// extract base64 encoded code
	if (strpos($eq, 'MathML (base64)') !== FALSE) {
	    $eq_s_pos = 21;
	    $eq_e_pos = strpos($eq, '" src="', 0);
	    $eq_e_pos -= 21;

	    $equation .= base64_decode(substr($eq, $eq_s_pos, $eq_e_pos));
	    $question .= "<span class='eq mathml'>{$equation}</span>";
	} else {
	    // latex code
	    $eq_s_pos = strpos($eq, '$');
	    if($eq_s_pos === false)
	        $eq_s_pos = 5;
	    else
	        $eq_s_pos += 1;

	    $end_subtract = 5;

	    if(preg_match('/^(alt="\\\).*$/', $eq) === 1) {
	        $end_subtract = $eq_s_pos = 5;
	    }

	    $eq_e_pos = strpos($eq, '" src=') - $end_subtract;
	    $equation .= substr($eq, $eq_s_pos, $eq_e_pos);

	    // if equation is not starting with $,
	    // it means it will not rendered correctly on UI (latex)
	    $equation = str_replace('$', '', $equation);

	    $eq = $equation;
	    if(preg_match('/^\$.*$/', $equation) !== 1) {
	        $eq = '$' . $equation;
	    }

	    // match $ at the end of equation
	    if(preg_match('/^.*\$$/', $equation) !== 1) {
	        $eq = $eq . '$';
	    }

	    $question .= "&nbsp;<span class='eq latex'>{$eq}</span>&nbsp;";

	    Log::info('Latex equations:');
	    Log::info($eq);
	}

	$string = substr($string, $o_eq_e_pos + 4, strlen($string));
	return $this->extractEquation($string, $question);
        } catch (\Exception $e) {
	Log::error($e->getMessage());
	return $string;
        }
    }

}
