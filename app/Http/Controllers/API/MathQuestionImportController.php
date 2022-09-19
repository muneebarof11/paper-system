<?php

namespace App\Http\Controllers\API;

use App\Helper;
use App\Question;
use App\QuestionOption;
use App\QuestionTranslation;
use App\QuestionType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class MathQuestionImportController extends DataImportController
{
    public function importQuestions(Request $request)
    {
        $type_id = Helper::easyDecode($request->post('type_id'));
        $question_type = QuestionType::find($type_id);
        $medium = $request->get('medium');
        $questions = [];
        $response = [
            'status' => true,
            'message' => 'Success',
            'data' => $questions,
            'name' => $question_type->name
        ];

        try {
            switch ($question_type->form_type) {
                case 'mcq':
                case 'mcqs':
                    if ($medium === 'dual')
                        $questions = $this->importDualMCQQuestions($request);
                    else if($medium === 'eng')
                    	$questions = $this->importEngMCQQuestions($request);
	        else if($medium === 'urdu')
		$questions = $this->importEngMCQQuestions($request, true);
                    break;
                case 'general':
                case 'fill_in_the_blank':
                case 'true_false':
                    if($medium === 'dual')
                        $questions = $this->importDualShortQuestions($request);
                    else if($medium === 'eng')
                        $questions = $this->importEngShortQuestions($request);
                    else if($medium === 'urdu')
                        $questions = $this->importEngShortQuestions($request, true);
                    break;

            }

            $response['data'] = $questions;

            return response()->json($response, 200, [], JSON_UNESCAPED_UNICODE);

        } catch (\Exception $e) {
            $response['message'] = $e->getMessage() . ' @ ' . $e->getLine();
            return response()->json($response, 500);
        }
    }

    private function importDualMCQQuestions($request)
    {
        $html       = $request->get('mathData');
        $raw_data   = explode('<p>', $html);

        $processed_raw = [];
        $questions  = [];
        $i          = 0;
        $q_no       = 0;

        foreach($raw_data as $row) {
	$row = str_replace(['<p>', '</p>', '&nbsp;', '<br>', '\n', '\t', '\r', '<li>', '</li>', '(A)', '(B)', '(C)', '(D)', '<ul>', '</ul>'], '', $row);

	$row = trim($row);
	if (empty($row) AND $row !== '0') continue;

	Log::info('checkIsNumber: '. $this->checkIsNumber($row));

	if ($this->checkIsNumber($row) === true) {
	    Log::info("{$row} is number");
	    $q_no = (int) $row;
	    continue;
	}


	$processed_raw[$q_no][] = $row;

	Log::info('--------------------');

	$i++;
        }

        foreach($processed_raw as $i => $question) {

	$question_en = '';
	$question_rtl = '';
	$options_en = [];
	$options_rtl = [];

	$question_en .= $this->extractEquation($question[0], $question_en);
	$question_en = $this->fixEquation($question_en);

	$question_rtl .= $this->extractEquation($question[1], $question_rtl);
	$question_rtl = $this->fixEquation($question_rtl);

	if(count($question) > 6) {
	    // different options for both en & rtl

	    // en
	    for($i=3; $i<=9; $i+=2) {
	        $eq = '';
	        $eq = $this->extractEquation($question[$i], $eq);
	        $eq = $this->fixEquation($eq);
	        $options_en[] = $eq;
	    }

	    // options rtl
	    for($i=2; $i<=8; $i+=2) {
	        $eq = '';
	        $eq = $this->extractEquation($question[$i], $eq);
	        $eq = $this->fixEquation($eq);
	        $options_rtl[] = $eq;
	    }
	} else {
	    // same options for both en & rtl statement

	    // en
	    for($i=2; $i<=5; $i++) {
	        $eq = '';
	        $eq = $this->extractEquation($question[$i], $eq);
	        $eq = $this->fixEquation($eq);
	        $options_en[] = $eq;
	    }
	    $options_rtl = ["", "", "", ""];
	}

	$question_statement = [
	    'question_en'   => $question_en,
	    'options_en'    => $options_en,
	    'question_rtl'  => $question_rtl,
	    'options_rtl'    => $options_rtl
	];

	$questions[] = $this->__insertMcq($question_statement, $request);
        }

        return $questions;
    }

    private function importEngMCQQuestions($request, $is_rtl = false) {
        $html       = $request->get('mathData');
        $raw_data   = explode('<p>', $html);

        $processed_raw = [];
        $questions  = [];
        $i          = 0;
        $q_no       = 0;

        foreach($raw_data as $row) {
            $row = str_replace(['<p>', '</p>', '&nbsp;', '<br>', '\n', '\t', '\r', '<li>', '</li>', '(A)', '(B)', '(C)', '(D)', '<ul>', '</ul>'], '', $row);

            $row = trim($row);
            if (empty($row) AND $row !== '0') continue;

            Log::info('checkIsNumber: '. $this->checkIsNumber($row));

            if ($this->checkIsNumber($row) === true) {
                Log::info("{$row} is number");
                $q_no = (int) $row;
                continue;
            }


            $processed_raw[$q_no][] = $row;

            Log::info('--------------------');

            $i++;
        }

        foreach($processed_raw as $i => $question) {

            $question_en = '';
            $options_en = [];

            $question_en .= $this->extractEquation($question[0], $question_en);
            $question_en = $this->fixEquation($question_en);

            // options
            for($i=1; $i<=4; $i++) {
                $eq = '';
                $eq = $this->extractEquation($question[$i], $eq);
                $eq = $this->fixEquation($eq);
                $options_en[] = $eq;
            }

            if($is_rtl === true) {
                $question_statement = [
                    'question_en'   => "",
                    'options_en'    => [],
                    'question_rtl'  => $question_en,
                    'options_rtl'    => $options_en
                ];
            } else {
                $question_statement = [
                    'question_en'   => $question_en,
                    'options_en'    => $options_en,
                    'question_rtl'  => "",
                    'options_rtl'    => []
                ];
            }

            $questions[] = $this->__insertMcq($question_statement, $request);
        }

        return $questions;
    }

    private function __insertMcq($row, $request)
    {
        try {
            $options_en = $row['options_en'];
            $options_rtl = $row['options_rtl'];
            $question_en = Helper::convertSmartQuote($row['question_en']);
            $question_rtl = $row['question_rtl'];

            $correct_option = '';

            $type_id = Helper::easyDecode($request->post('type_id'));
            $section_id = Helper::easyDecode($request->post('section_id'));
            $topic_id = Helper::checkIdZero($request->post('topic_id'));
            $class_id = Helper::easyDecode($request->post('class_id'));
            $subject_id = Helper::easyDecode($request->post('subject_id'));
            $question_level = $request->post('question_level');

            $question_english = QuestionTranslation::where('question_statement', 'like', $question_en)
                ->where('type_id', $type_id)
                ->where('section_id', $section_id)
                ->orderBy('id', 'DESC')->first();

            $question_urdu = QuestionTranslation::where('question_statement', 'like', $question_rtl)
                ->where('type_id', $type_id)
                ->where('section_id', $section_id)
                ->orderBy('id', 'DESC')->first();

            if (!empty($question_english)) {
                QuestionTranslation::where('question_id', $question_english->question_id)->delete();
                Question::where('id', $question_english->question_id)->delete();
                QuestionOption::where('translation_id', $question_english->question_id)->delete();
                $question_english = [];
            }

            if (!empty($question_urdu)) {
                QuestionTranslation::where('question_id', $question_urdu->question_id)->delete();
                Question::where('id', $question_urdu->question_id)->delete();
                QuestionOption::where('translation_id', $question_urdu->question_id)->delete();
                $question_urdu = [];
            }

            $question = Question::create([
                'subject_id' => $subject_id,
                'class_id' => $class_id,
                'type_id' => $type_id,
                'section_id' => $section_id,
                'topic_id' => $topic_id,
            ]);
            $question->$question_level = 1;
            $question->save();

            if (!empty($question_en)) {
                $en = QuestionTranslation::create([
                    'question_id' => $question->id,
                    'type_id' => $type_id,
                    'section_id' => $section_id,
                    'locale' => 'en',
                    'question_statement' => $question_en,
                    'correct_answer' => $correct_option
                ]);
                Log::info(json_encode($en));
                foreach ($options_en as $option) {
                    $option = trim($option);
                    if (empty($option)) continue;
                    QuestionOption::create([
                        'translation_id' => $en->id,
                        'question_id' => $question->id,
                        'question_option' => $option
                    ]);
                }
            }

            if (!empty($question_rtl)) {
                $rtl = QuestionTranslation::create([
                    'question_id' => $question->id,
                    'type_id' => $type_id,
                    'section_id' => $section_id,
                    'locale' => 'ur',
                    'question_statement' => $question_rtl,
                    'correct_answer' => $correct_option
                ]);

                foreach ($options_rtl as $option) {
                    $option = trim($option);
                    if (empty($option)) continue;
                    QuestionOption::create([
                        'translation_id' => $rtl->id,
                        'question_id' => $question->id,
                        'question_option' => $option
                    ]);
                }
            }

        } catch (\Exception $e) {
            Log::error(
                'LINE#' . $e->getLine() . PHP_EOL .
                'FILE:' . $e->getFile() . PHP_EOL .
                'MESSAGE:' . $e->getMessage()
            );
        }

        return Question::where('id', $question->id)
            ->with(['translations' => function ($query) {
                return $query->orderBy('id', "ASC");
            }])
            ->with('translations.options')
            ->first();
    }

    private function importDualShortQuestions($request)
    {
        $html       = $request->get('mathData');
        $raw_data   = explode('</p>', $html);

        $processed_raw = [];
        $questions  = [];
        $i          = 0;
        $q_no       = 0;

        foreach($raw_data as $row) {
            $row = str_replace(['<p>', '&nbsp;', '<br>', '\n', '\t', '\r', '\r\n', '\n', '\r'], '', $row);
            $row = trim(preg_replace('/\t+/', '', $row));

            if (empty($row)) continue;
            if ($this->checkIsNumber($row)) {
                $q_no = (int) $row;
                continue;
            }

            $processed_raw[$q_no][] = $row;
            $i++;
        }

        foreach($processed_raw as $i => $question) {

            if(!isset($question[0]) OR !isset($question[1])) continue;

            if(empty($question[0]) AND empty($question[1])) continue;

            $question_en = '';
            $question_rtl = '';
            $question_en .= $this->extractEquation($question[0], $question_en);
            $question_en = $this->fixEquation($question_en);

	if(preg_match("/^(<img).*$/", $question[1]) === 1) {
                $image_path = $this->extractImage($question[1]);
                $question_en .= "<p><img src='{$image_path}' /></p>";

                if(isset($question[2]))
                    $question[1] = $question[2];
            }

            $question_rtl .= $this->extractEquation($question[1], $question_rtl, true);
            $question_rtl = $this->fixEquation($question_rtl);
            if(isset($question[3]) AND preg_match("/^(<img).*$/", $question[3]) === 1) {
                $image_path = $this->extractImage($question[3]);
                $question_rtl .= "<p><img src='{$image_path}' /></p>";
            }

            $question_statement = [
                'question_en'   => $question_en,
                'question_rtl'  => $question_rtl
            ];

            $questions[] = $this->__insertShort($question_statement, $request);
        }

        return $questions;
    }

    private function importEngShortQuestions($request, $is_rtl = false)
    {
        $html       = $request->get('mathData');
        $raw_data   = explode('</p>', $html);

        $processed_raw = [];
        $questions  = [];
        $i          = 0;
        $q_no       = 0;

        foreach($raw_data as $row) {
            $row = str_replace(['<p>', '&nbsp;', '<br>', '\n', '\t', '\r'], '', $row);

            $row = trim($row);
            if (empty($row)) continue;
            if ($this->checkIsNumber($row)) {
                $q_no = (int) $row;
                continue;
            }

            $processed_raw[$q_no][] = $row;
            $i++;
        }

        foreach($processed_raw as $i => $question) {

            if(!isset($question[0]) OR empty($question[0]))
                continue;

            $question_en = '';
            $question_en .= $this->extractEquation($question[0], $question_en);
            $question_en = $this->fixEquation($question_en);
            if(isset($question[1]) AND preg_match("/^(<img).*$/", $question[1]) === 1) {
                $image_path = $this->extractImage($question[1]);
                $question_en .= "<p><img src='{$image_path}' /></p>";

            }

            if($is_rtl === true) {
                $question_statement = [
                    'question_en'   => "",
                    'question_rtl'  => $question_en
                ];
            } else {
                $question_statement = [
                    'question_en'   => $question_en,
                    'question_rtl'  => ""
                ];
            }

            $questions[] = $this->__insertShort($question_statement, $request);
        }
        return $questions;
    }

    private function importRtlShortQuestions($request)
    {
        return $this->importEngShortQuestions($request, 'rtl');
    }

    private function __insertShort($row, $request)
    {
        $question_en    = '';
        $question_rtl   = '';
        if(!empty($row['question_en']) AND !empty($row['question_rtl'])) {
            $question_en = $row['question_en'];
            $question_rtl = $row['question_rtl'];
        } else if(!empty($row['question_en'])) {
            $question_en = $row['question_en'];
            $question_rtl = '';
        } else if(!empty($row['question_rtl'])) {
            $question_en = '';
            $question_rtl = $row['question_rtl'];
        }

        $correct_option = '';
        $type_id = Helper::easyDecode($request->post('type_id'));
        $section_id = Helper::easyDecode($request->post('section_id'));
        $topic_id = Helper::checkIdZero($request->post('topic_id'));
        $class_id = Helper::easyDecode($request->post('class_id'));
        $subject_id = Helper::easyDecode($request->post('subject_id'));
        $question_level = $request->post('question_level');

        $question_english = QuestionTranslation::where('question_statement', 'like', $question_en)
            ->where('type_id', $type_id)
            ->where('section_id', $section_id)
            ->orderBy('id', 'DESC')->first();

        $question_urdu = QuestionTranslation::where('question_statement', 'like', $question_rtl)
            ->where('type_id', $type_id)
            ->where('section_id', $section_id)
            ->orderBy('id', 'DESC')->first();

        if (!empty($question_english)) {
            QuestionTranslation::where('question_id', $question_english->question_id)->delete();
            Question::where('id', $question_english->question_id)->delete();
            $question_english = [];
        }

        if (!empty($question_urdu)) {
            QuestionTranslation::where('question_id', $question_urdu->question_id)->delete();
            Question::where('id', $question_urdu->question_id)->delete();
            $question_urdu = [];
        }

        $question = [];
        $question = Question::create([
            'subject_id' => $subject_id,
            'class_id' => $class_id,
            'type_id' => $type_id,
            'section_id' => $section_id,
            'topic_id' => $topic_id,
        ]);
        $question->$question_level = 1;
        $question->save();

        if(!empty($question_en)) {
            QuestionTranslation::create([
                'question_id' => $question->id,
                'type_id' => $type_id,
                'section_id' => $section_id,
                'locale' => 'en',
                'question_statement' => $question_en,
                'correct_answer' => $correct_option
            ]);
        }

        if(!empty($question_rtl)) {
            QuestionTranslation::create([
                'question_id' => $question->id,
                'type_id' => $type_id,
                'section_id' => $section_id,
                'locale' => 'ur',
                'question_statement' => $question_rtl,
                'correct_answer' => $correct_option
            ]);
        }

        return Question::where('id', $question->id)
            ->with(['translations' => function ($query) {
                return $query->orderBy('id', "ASC");
            }])
            ->with('translations.options')
            ->first();
    }

    private function extractImage($string) {

        $img_url = substr($string, 10, -4);

        // Load the file contents into a variable.
        $contents = file_get_contents($img_url);

        // Save the variable as `google.html` file onto
        // your local drive, most probably at `your_laravel_project/storage/app/`
        // path (as per default Laravel storage config)
        $file_name = time() . '.jpg';
        $path = "public/math/" . $file_name;
        Storage::disk('local')->put($path, $contents);

        // -- Here your have savde the file from the URL
        // -- to your local Laravel storage folder on your server.
        // -- By default this is `your-laravel-project/storage/app` folder.

        // Now, if desired, and if you are doing this within a web application's
        // HTTP request (as opposite to CLI application)
        // the file can be sent to the browser (client) with the response
        // that instructs the browser to download the file at client side:

        // Get the file path within you local filesystem
        return asset('storage/math/'.$file_name);
    }

    private function cleanString($string) {
        return trim(str_replace(['<p>', '</p>', '(A)', '(B)', '(C)', '(D)'], '', $string));
    }

}
