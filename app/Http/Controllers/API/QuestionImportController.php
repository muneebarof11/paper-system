<?php

namespace App\Http\Controllers\API;

use App\Classes;
use App\Contracts\Facades\ChannelLog as Logging;
use App\Helper;
use App\ImportModel;
use App\Question;
use App\QuestionOption;
use App\QuestionTranslation;
use App\QuestionType;
use App\Sections;
use App\Subject;
use App\SyllabusType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Facades\Excel as Excel;

class QuestionImportController extends DataImportController
{
    public function __construct()
    {
        parent::__construct();
    }

    private $mcq_question_csv_headers = [
        'sr',
        'question',
        'option A',
        'option B',
        'option C',
        'option D',
        'question um',
        'option A',
        'option B',
        'option C',
        'option D',
        'correct answer',
    ];

    private $short_question_csv_headers = [
        'sr',
        'question em',
        'question um'
    ];

    private $true_false_question_headers = [
        'sr',
        'question em',
        'question um',
        'correct answer'
    ];

    private $columns_question_headers = [
        'sr',
        'column a',
        'column b',
    ];

    private $rtl_para_trans_headers = [
        'sr',
        'question'
    ];

    private $rtl_mcq_headers = [
        'sr',
        'question',
        'option a',
        'option b',
        'option c',
        'option d',
        'correct answer'
    ];

    private $options_alphabets = ["(A)", "(B)", "(C)", "(D)"];

    public function importQuestions(Request $request)
    {
        $response = [
            'status' => true,
            'headers' => [],
            'message' => 'Please choose file!',
            'data' => []
        ];
        $subject_code = $request->get('subject_code');
        $mathData = $request->get('mathData');

        if(empty($mathData) and !$request->has('file')) {
            $response['message'] = 'Please paste questions in box to or choose CSV import!';
            return response()->json($response);
        }

        if(!empty($mathData) and !$request->has('file')) {
            return (new MathQuestionImportController())->importQuestions($request);
        }

        if (!$request->has('topic_id') || !$request->has('type_id') || !$request->has('section_id')) {
            $response['message'] = 'Something went wrong, please try again!';
            return response()->json($response);
        }

        $name = '';
        $destination = public_path('temp');
        $topic_id = Helper::easyDecode($request->post('topic_id'));
        $type_id = Helper::easyDecode($request->post('type_id'));
        $section_id = Helper::easyDecode($request->post('section_id'));

        if ($request->has('file')) {

            $file = $request->file('file');
            $extension = $file->getClientOriginalExtension();
            if (!in_array($extension, ['xlsx', 'csv', 'xls', 'doc', 'docx', 'zip'])) {
                $response['message'] = 'Excel & CSV file types are allowed!';
                return response()->json($response);
            }

            $name = "import_{$section_id}_{$topic_id}_{$type_id}_" .time() .'_'. Str::slug($file->getClientOriginalName()) . '.'.$file->getClientOriginalExtension();
            if (!file_exists($destination . '/' . $name)) {

                // if temp directory is not available
                if (!file_exists($destination))
                    mkdir($destination, 0777);

                $file->move($destination, $name);
            }
        }

        $file = $destination . '/' . $name;
        $questions = [];
        $question_type = QuestionType::find($type_id);
        $request->request->add(['question_type' => $question_type->name]);

        try {

            switch ($question_type->form_type) {
                case 'mcq':
                case 'mcqs':
                    if ($request->get('medium') == 'dual') {
                        $questions = $this->specialImportDualMCQ($file, $questions, $request);
                    } else if ($request->get('medium') == 'urdu') {
                        $questions = $this->specialImportRTLMcqQuestions($file, $questions, $request);
                    } else {
                        $questions = $this->specialImportMCQ($file, $questions, $request);
                    }
                    break;
                case 'general':
                    if ($request->get('medium') == 'dual') {
		$questions = $this->importDualShortQuestions($file, $questions, $request);
	        } else {
                        $questions = $this->importShortQuestions($file, $questions, $request);
                    }
                    break;
                case 'fill_in_the_blank':
                case 'true_false':
                    $questions = $this->importTrueFalseQuestions($file, $questions, $request);
                    break;
            }

            $response = [
                'status' => true,
                'message' => 'Success',
                'data' => $questions,
                'name' => $question_type->name
            ];

            if (isset($questions['status'])) {
                $response['message'] = $questions['message'];
                $response['status'] = false;
                $response['data'] = [];
            }

            return response()->json($response, 200, [], JSON_UNESCAPED_UNICODE);
        } catch (\Exception $e) {
            dd($e->getMessage());
            $response['message'] = $e->getMessage();
        }
    }

    private function importMcqQuestions($file, $questions, $request) {
        $i = 0;
        while (!feof($file)) {
            $row = fgetcsv($file);

            if ($i === 0) {
                $header = $this->validateHeadings($row, $this->mcq_question_csv_headers);
                if ($header['status'] === false) {
                    return $header;
                    break;
                }
            } else {
                $questions[] = $this->__insertMcq($row, $request);
            }

            $i++;
        }

        fclose($file);

        return $questions;
    }

    private function specialImportMCQ($file, $questions, $request) {
        $i = 0;
        $q_no = 0;
        $questions = [];
        $raw_questions = Excel::toArray(new ImportModel, $file);
        if(!empty($raw_questions)) {
            $raw_questions = $raw_questions[0];
        }
        $englishSpecial = $request->get('englishSpecial');
        foreach($raw_questions as $question) {

            if(empty($question[0])) continue;
            $questions[$q_no][] = $question[0];
            $i++;

            if($englishSpecial === 'yes')
                $y = 8;
            else
                $y = 10;

            if(fmod($i,$y) == 0) {
                $q_no++;
            }
        }

        $request->request->add(['method' => __FUNCTION__]);
        $this->writeLog($raw_questions, $request);

        if($englishSpecial === 'yes')
            return $this->specialInsertMCQWithoutLabel($questions, $request);
        else
            return $this->specialInsertMCQ($questions, $request);
    }

    private function specialInsertMCQ($questions, $request) {
        $p_questions = [];

        foreach($questions as $i => $raw_question) {
            $n = $raw_question[0];
            if(is_numeric($n)) {
                $row[1] = $raw_question[1];
                $row[2] = $raw_question[3];
                $row[3] = $raw_question[5];
                $row[4] = $raw_question[7];
                $row[5] = $raw_question[9];
                $row[6] = $row[7] = $row[8] = $row[9] = $row[10] = $row[11] = '';
                $this->writeLog($row, $request);

                $p_questions[] = $this->__insertMcq($row, $request);
            }
        }

        return $p_questions;
    }
    private function specialInsertMCQWithoutLabel($questions, $request) {
        $p_questions = [];

        foreach($questions as $i => $raw_question) {
            $n = $raw_question[0];
//            if(is_numeric($n)) {
            $row[1] = '!___!' . (++$i);
            $row[2] = $raw_question[1];
            $row[3] = $raw_question[3];
            $row[4] = $raw_question[5];
            $row[5] = $raw_question[7];
//                $row[5] = $raw_question[9];
            $row[6] = $row[7] = $row[8] = $row[9] = $row[10] = $row[11] = '';
            $this->writeLog($row, $request);

            $p_questions[] = $this->__insertMcq($row, $request);
//            }
        }

        return $p_questions;
    }

    private function specialImportRTLMcqQuestions($file, $questions, $request) {
        $i = 0;
        $q_no = 0;
        $questions = [];
        $raw_questions = Excel::toArray(new ImportModel, $file);
        if(!empty($raw_questions)) {
            $raw_questions = $raw_questions[0];
        }
        foreach($raw_questions as $question) {
            if(empty($question[0])) continue;
            $questions[$q_no][] = $question[0];
            $i++;
            if(fmod($i, 10) == 0) {
                $q_no++;
            }
        }

        $request->request->add(['method' => __FUNCTION__]);
        $this->writeLog($raw_questions, $request);
        return $this->specialInsertRTLMCQ($questions, $request);
    }

    private function specialInsertRTLMCQ($questions, $request) {
        $p_questions = [];
        foreach($questions as $raw_question) {
            $n = $raw_question[0];
            if(is_numeric($n)) {
                $row[6] = $raw_question[1];
                $row[7] = $raw_question[3];
                $row[8] = $raw_question[5];
                $row[9] = $raw_question[7];
                $row[10] = $raw_question[7];
                $row[1] = $row[2] = $row[3] = $row[4] = $row[5] = $row[11] = '';
                $this->writeLog($row, $request);
                $p_questions[] = $this->__insertMcq($row, $request);
            }
        }

        return $p_questions;
    }

    private function specialImportDualMCQ($file, $questions, $request) {
        $i = 0;
        $q_no = 0;
        $questions = [];
        $raw_questions = Excel::toArray(new ImportModel, $file);
        if(!empty($raw_questions)) {
            $raw_questions = $raw_questions[0];
        }

        for($index = 0; $index < count($raw_questions); $index++) {
            $question = $raw_questions[$index][0];

            if($question !== FALSE AND empty($question)) continue;

            if($question === TRUE) $question = "True";
            if($question === FALSE) $question = "False";
            if($question === null) $question = "Null";

            $questions[$q_no][] = $question;
            $i++;

            if(fmod($i ,16) == 0) {
                $q_validated = $this->checkMCQOptionsCount($questions[$q_no]);
                $questions[$q_no] = $q_validated['correct_question'];

                $q_no++;

                if($q_validated['update_counter'] === true) {
                    // not sure if it should be 4 or 5,
                    // for some cases it worked for 4 and for some it worked for 5
                    $index = $index - 4;
                }
            }
        }

        $request->request->add(['method' => __FUNCTION__]);
        $this->writeLog($raw_questions, $request, 'raw');
        return $this->specialInsertDualMCQ($questions, $request);
    }

    private function checkMCQOptionsCount($question) {
        $q = [
            'correct_question' => [],
            'update_counter' => false
        ];

        if(
            in_array($question[4], $this->options_alphabets) AND
            in_array($question[7], $this->options_alphabets) AND
            in_array($question[10], $this->options_alphabets) AND
            in_array($question[13], $this->options_alphabets)
        ) {
            $q['correct_question'] = $question;
            return $q;
        }

        $q['correct_question'][] = $question[0];
        $q['correct_question'][] = $question[1];
        $q['correct_question'][] = $question[2];
        $q['correct_question'][] = $question[3];

        $q['correct_question'][] = $question[4];        // "(A)"
        $q['correct_question'][] = '';
        $q['correct_question'][] = $question[5];

        $q['correct_question'][] = $question[6];        // "(B)"
        $q['correct_question'][] = '';
        $q['correct_question'][] = $question[7];

        $q['correct_question'][] = $question[8];        // "(C)"
        $q['correct_question'][] = '';
        $q['correct_question'][] = $question[9];

        $q['correct_question'][] = $question[10];        // "(D)"
        $q['correct_question'][] = '';
        $q['correct_question'][] = $question[11];

        $q['update_counter'] = true;
        return $q;
    }

    private function specialInsertDualMCQ($questions, $request) {
        $p_questions = [];
        foreach($questions as $index => $raw_question) {
            $n = $raw_question[0];
            Log::info("Is Numeric ({$index}): {$n} :: " . is_numeric($n));
            if(is_numeric($n)) {
                $row[1] = addslashes($raw_question[1]);     // question em
                $row[2] = $raw_question[6];     // question um
                $row[3] = isset($raw_question[9]) ? $raw_question[9] : '';     // option em 1
                $row[4] = isset($raw_question[12]) ? $raw_question[12] : '';    // 2
                $row[5] = isset($raw_question[15]) ? $raw_question[15] : '';    // 3
                $row[6] = isset($raw_question[3]) ? $raw_question[3] : '';     // 4
                $row[7] = isset($raw_question[5]) ? $raw_question[5] : '';     // option um 1
                $row[8] = isset($raw_question[8]) ? $raw_question[8] : '';     // 2
                $row[9] = isset($raw_question[11]) ? $raw_question[11] : '';    // 3
                $row[10] = isset($raw_question[14]) ? $raw_question[14] : '';    // 4
                $row[11] = '';                  // correct option
                $this->writeLog($row, $request, 'insert');
                $p_questions[] = $this->__insertMcq($row, $request);
            }
        }

        return $p_questions;
    }

    private function __insertMcq($row, $request)
    {
        try {
            $options_en = [$row[2], $row[3], $row[4], $row[5]];
            $options_rtl = [$row[7], $row[8], $row[9], $row[10]];
            $question_en = Helper::convertSmartQuote($row[1]);
            $question_rtl = $row[6];

            $correct_option = ucwords($row[11]);

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

    private function importShortQuestions($file, $questions, $request)
    {
        $i = 0;
        $q_no = 0;
        $questions = [];
        $raw_questions = Excel::toArray(new ImportModel, $file);
        if(!empty($raw_questions)) {
            $raw_questions = $raw_questions[0];
        }
        foreach($raw_questions as $question) {
            if(empty($question[0]) AND empty($question[1])) continue;
            $questions[$q_no][] = nl2br($question[0]);

            $i++;
            if(fmod($i,2) == 0) {
                $q_no++;
            }
        }

        $request->request->add(['method' => __FUNCTION__]);
        $this->writeLog($raw_questions, $request);

        foreach($questions as $row) {
            $this->writeLog($row, $request);
            $questions[] = $this->__insertShort($row, $request);
        }

        return $questions;
    }

    private function importDualShortQuestions($file, $questions, $request)
    {
        $i = 0;
        $q_no = 0;
        $questions = [];
        $raw_questions = Excel::toArray(new ImportModel, $file);
        if(!empty($raw_questions)) {
            $raw_questions = $raw_questions[0];
        }
        foreach($raw_questions as $question) {
            if(empty($question[0]) AND empty($question[1])) continue;
            $questions[$q_no][] = $question[0];
            $i++;
            if(fmod($i, 4) == 0) {
                $q_no++;
            }
        }

        $request->request->add(['method' => __FUNCTION__]);
        $this->writeLog($raw_questions, $request);

        $response = [];
        foreach($questions as $row) {
            $this->writeLog($row, $request);
            $response[] = $this->__insertShort($row, $request);
        }

        return $response;
    }

    private function __insertShort($row, $request)
    {
        if(isset($row[1]) AND isset($row[3])) {
            $question_en = $row[1];
            $question_rtl = $row[3];
        } else if(isset($row[1]) AND !Helper::is_english($row[1])) {
            $question_en = '';
            $question_rtl = $row[1];
        } elseif (isset($row[1])) {
            $question_en = $row[1];
            $question_rtl = '';
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

    private function importTrueFalseQuestions($file, $questions, $request)
    {
        $i = 0;
        while (!feof($file)) {
            $row = fgetcsv($file);

            if ($i === 0) {
                $header = $this->validateHeadings($row, $this->true_false_question_headers);
                if ($header['status'] === false) {
                    return $header;
                    break;
                }
            } else {

                // skip empty rows
//                if (empty($row[1] AND empty($row[2]))) continue;
                $questions[] = $this->__insertTrueFalse($row, $request);
            }

            $i++;
        }

        fclose($file);

        return $questions;
    }

    private function __insertTrueFalse($row, $request) {
        $question_en = $row[1];
        $question_rtl = $row[2];
        $correct_option = ucwords($row[3]);
        $type_id = Helper::easyDecode($request->post('type_id'));
        $section_id = Helper::easyDecode($request->post('section_id'));
        $topic_id = Helper::easyDecode($request->post('topic_id'));
        $class_id = Helper::easyDecode($request->post('class_id'));
        $subject_id = Helper::easyDecode($request->post('subject_id'));

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
        if (empty($question_english) AND empty($question_urdu)) {
            $question = Question::create([
                'subject_id' => $subject_id,
                'class_id' => $class_id,
                'type_id' => $type_id,
                'section_id' => $section_id,
                'topic_id' => $topic_id,
            ]);

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
        }

        return Question::where('id', $question->id)
            ->with(['translations' => function ($query) {
                return $query->orderBy('id', "ASC");
            }])
            ->with('translations.options')
            ->first();
    }

    private function importParaTranslationQuestions($file, $questions, $request)
    {
        $i = 0;
        while (!feof($file)) {
            $row = fgetcsv($file);

            if ($i === 0) {
                $header = $this->validateHeadings($row, $this->rtl_para_trans_headers);
//                if ($header['status'] === false) {
//                    return $header;
//                    break;
//                }
            } else {

                // skip empty rows
                if (empty($row[0])) continue;
                if(is_numeric($row[0])) continue;
                $questions[] = $this->__insertRTLShort($row, $request);
            }

            $i++;
        }

        fclose($file);

        return $questions;
    }

    private function __insertRTLShort($row, $request)
    {
        $question_rtl = $row[0];
        $correct_option = '';
        $type_id = Helper::easyDecode($request->post('type_id'));
        $section_id = Helper::easyDecode($request->post('section_id'));
        $topic_id = Helper::easyDecode($request->post('topic_id'));
        $class_id = Helper::easyDecode($request->post('class_id'));
        $subject_id = Helper::easyDecode($request->post('subject_id'));

        $question_urdu = QuestionTranslation::where('question_statement', 'like', $question_rtl)
            ->orderBy('id', 'DESC')->first();

        if (!empty($question_urdu))
            $question_urdu = $question_urdu->question;

        $question = [];
        if (empty($question_urdu)) {
            $question = Question::create([
                'subject_id' => $subject_id,
                'class_id' => $class_id,
                'type_id' => $type_id,
                'section_id' => $section_id,
                'topic_id' => $topic_id,
            ]);
        } else {
            $question = (object)['id' => $question_urdu->id];
        }

        if (empty($question_urdu)) {
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

    private function importRTLMcqQuestions($file, $questions, $request)
    {
        $i = 0;
        while (!feof($file)) {
            $row = fgetcsv($file);

            if ($i === 0) {
                $header = $this->validateHeadings($row, $this->rtl_mcq_headers);
                if ($header['status'] === false) {
                    return $header;
                    break;
                }
            } else {

                // skip empty rows
//                if (empty($row[1])) continue;
                $questions[] = $this->__insertRTLMcq($row, $request);
            }

            $i++;
        }

        fclose($file);

        return $questions;
    }

    private function __insertRTLMcq($row, $request)
    {
        $options_rtl = [$row[2], $row[3], $row[4], $row[5]];
        $question_rtl = $row[1];

        $correct_option = ucwords($row[6]);
        $translation_um_id = 0;

        $type_id = Helper::easyDecode($request->post('type_id'));
        $section_id = Helper::easyDecode($request->post('section_id'));
        $topic_id = Helper::easyDecode($request->post('topic_id'));
        $class_id = Helper::easyDecode($request->post('class_id'));
        $subject_id = Helper::easyDecode($request->post('subject_id'));

        $q_rtl = $question_urdu = QuestionTranslation::where('question_statement', 'like', $question_rtl)
            ->orderBy('id', 'DESC')->first();

        if (!empty($question_urdu)) {
            $question_urdu = $question_urdu->question;
            $translation_um_id = $question_urdu->id;
        }

        $question = [];
        if (empty($question_urdu)) {
            $question = Question::create([
                'subject_id' => $subject_id,
                'class_id' => $class_id,
                'type_id' => $type_id,
                'section_id' => $section_id,
                'topic_id' => $topic_id,
            ]);
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
        } else {
            $question = (object)['id' => $question_urdu->id];

            $q_rtl->correct_answer = $correct_option;
            $q_rtl->save();

            QuestionOption::where('translation_id', $translation_um_id)->delete();
            foreach ($options_rtl as $option) {
                $option = trim($option);
                if (empty($option)) continue;
                QuestionOption::create([
                    'translation_id' => $translation_um_id,
                    'question_id' => $question->id,
                    'question_option' => $option
                ]);
            }
        }

        return Question::where('id', $question->id)
            ->with(['translations' => function ($query) {
                return $query->orderBy('id', "ASC");
            }])
            ->with('translations.options')
            ->first();
    }

    private function writeLog($data, $request, $data_type = 'insert') {
        $file_name = '';
        $type_id = Helper::checkIdZero($request->post('publisher_id'));
        if($type_id !== 0) {
            $publisher = SyllabusType::find($type_id);
            $file_name .= Str::slug($publisher->name);
        }

        $class_id = Helper::checkIdZero($request->post('class_id'));
        if($class_id !== 0) {
            $class = Classes::find($class_id);
            $file_name .= '_'. Str::slug($class->name);
        }

        $subject_id = Helper::checkIdZero($request->post('subject_id'));
        if($subject_id !== 0) {
            $subject = Subject::find($subject_id);
            $file_name .= '_'. Str::slug($subject->name);
        }

        $section_id = Helper::checkIdZero($request->post('section_id'));
        if($section_id !== 0) {
            $section = Sections::find($section_id);
            $name = !empty($section->name) ? Str::slug($section->name) : Str::slug($section->rtl_name);
            $file_name .= '_' . $name .'_';
        }

        $topic_id = Helper::checkIdZero($request->post('topic_id'));
        if($topic_id !== 0) {
            $section = Sections::find($topic_id);
            $name = !empty($section->name) ? Str::slug($section->name) : Str::slug($section->rtl_name);
            $file_name .= '_' . $name .'_';
        }

        $file_name .= $request->post('medium') .'_';
        $file_name .= $request->post('question_level'). '_';
        $file_name .= $request->post('question_type'). '_';
        $file_name .= '_' . date('YmdHi') . '.log';
        $data['request_data'] = $request->all();
        Logging::write('import', json_encode($data), $file_name);
    }

}
