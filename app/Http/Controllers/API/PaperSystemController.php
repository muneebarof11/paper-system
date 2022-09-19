<?php

namespace App\Http\Controllers\API;

use App\Classes;
use App\Helper;
use App\Http\Controllers\Controller;
use App\Institute;
use App\PaperFiles;
use App\PreviousPapers;
use App\Question;
use App\QuestionOption;
use App\QuestionTranslation;
use App\QuestionType;
use App\QuestionTypeBySection;
use App\SavedPapers;
use App\Sections;
use App\Subject;
use App\SyllabusType;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use PhpOffice\PhpWord\IOFactory;
use PhpOffice\PhpWord\PhpWord;
use PhpOffice\PhpWord\Reader\Word2007;
use PHPUnit\TextUI\Help;

class PaperSystemController extends Controller
{
    /**
     * @param Request $request
     * @return string
     */
    public function validateKey(Request $request)
    {
        if (!$request->has('registration_key')) {
            return '0';
        }

        $key = $request->post('registration_key');
        $key_exist = Institute::where('registration_key', '=', $key)->first();
        if (!empty($key_exist)) {
            return '0';
        }
        return '1';
    }

    public function getSyllabusTypes()
    {
        return response()->json(
            SyllabusType::withCount('classes AS count')->get()
        );
    }

    public function getAllClasses()
    {
        $data = Classes::select('id', 'name', 'level', 'is_active', 'created_at')
            ->where('is_active', '=', 1)
            ->orderBy('level', 'ASC')
            ->get();
        return response()->json(($data));
    }

    public function getAllSubjects()
    {
        $data = Subject::select('id', 'name', 'cover_thumbnail', 'code', 'medium', 'is_active', 'allow_copy_import', 'created_at')
            ->where('is_active', '=', 1)
            ->orderBy('name', 'ASC')
            ->get();
        return response()->json(($data));
    }

    public function getQuestionTypes(Request $request)
    {
        $class_id = 0;
        $subject_id = 0;
        $section_id = 0;
        $data = [];
        $ids = [];
        if ($request->has('class_id'))
            $class_id = Helper::easyDecode($request->get('class_id'));

        if ($request->has('subject_id'))
            $subject_id = Helper::easyDecode($request->get('subject_id'));

        if ($request->has('section_id'))
            $section_id = Helper::easyDecode($request->get('section_id'));

        $subject = Subject::find($subject_id);

        if ($request->has('section_ids')) {
            $section_ids = explode('|', $request->get('section_ids'));
            $by_section = QuestionTypeBySection::whereIn('section_id', $section_ids)
                ->where('is_active', 1)
                ->get();
        } else {
            $by_section = QuestionTypeBySection::where('section_id', $section_id)
                ->where('is_active', 1)
                ->get();
        }

        $defaults = QuestionType::where('is_active', 1)
            ->where('class_id', 0)
            ->where('subject_id', 0)
            ->where('is_default', 1)
            ->orderBy('priority', 'ASC');

        if ($by_section->isNotEmpty()) {
            $ids = $by_section->pluck('q_type_id')->toArray();
            $data = QuestionType::whereIn('id', $ids)
                ->where('is_active', 1)
                ->orderBy('priority', 'ASC');

            // exclude urdu, isl and eng from union
            if (!in_array($subject->code, Subject::$special_subjects)) {
                $data = $defaults->union($data)->get();
            } else {
                $data = $data->get();
            }

        } else {
            // exclude urdu, isl and eng
            if (!in_array($subject->code, Subject::$special_subjects)) {
                $data = $defaults->get();
            }
        }

        foreach($data as &$d) {
            if(in_array($d->id, $ids)) {
                $d->removeable = 1;
            } else {
                $d->removeable = 0;
            }
        }

        if ($request->has('internal')) {
            return $data;
        }

        return response()->json($data);
    }

    public function getQuestionTypesBySectionIds(Request $request)
    {
        try {
            $request->request->add(['internal' => true]);
            $question_types = $this->getQuestionTypes($request);
            $q_types = [];
            if ($question_types->isNotEmpty()) {
                foreach ($question_types as $i => $qt) {
                    $q_types[$i] = ['label' => $qt->title, 'value' => $qt->id];
                }
            }

            return response()->json($q_types);
        } catch (\Exception $e) {
            return response()->json([$e->getMessage()]);
        }
    }

    public function getClassesBySyllabus($id)
    {
        $data = SyllabusType::select('id', 'name', 'is_active', 'created_at')
            ->where('id', '=', Helper::easyDecode($id))
            ->where('is_active', '=', 1)
            ->with(['classes' => function ($query) {
                return $query->where('is_active', '=', '1')
                    ->orderBy('level', 'ASC');
            }])
            ->first();
        return response()->json(($data));
    }

    public function getSubjectsByClassId($class_id, $publisher_id)
    {
        $data = Classes::select('id', 'name', 'level', 'is_active', 'created_at')
            ->where('id', '=', Helper::easyDecode($class_id))
            ->where('classes.is_active', '=', 1)
            ->with(['subjects' => function ($query) use ($publisher_id) {
                return $query->where('syllabus_type_id', '=', Helper::easyDecode($publisher_id))
                    ->orderBy('name', 'ASC');
            }])
            ->first();

        $response = $data;
        if($data->subjects->isNotEmpty()) {
            foreach ($data->subjects as $i => $subject) {
                if(!empty($subject->pivot->thumbnail)) {
                    $subject->cover_thumbnail = $subject->pivot->thumbnail;
                }
                unset($subject->pivot);
                $response['subjects'][$i] = $subject;
            }
        }
        return response()->json(($response));
    }

    public function getASubjectByID($subject_id)
    {
        $subjects = Subject::find(Helper::easyDecode($subject_id));
        return response()->json(($subjects));
    }

    public function getAClassByID($class_id)
    {
        $class = Classes::find(Helper::easyDecode($class_id));
        return response()->json(($class));
    }

    public function getSyllabusBySubject($id)
    {
        $s = Subject::where('id', '=', $id)
            ->with('syllabus_type')
            ->first();
    }

    public function getSubjectSections(Request $request)
    {
        if (!$request->has('class_id') || !$request->has('subject_id')) {
            return response()->json([]);
        }

        $class_id = Helper::easyDecode($request->get('class_id'));
        $subject_id = Helper::easyDecode($request->get('subject_id'));
        $syllabus_type_id = Helper::easyDecode($request->get('syllabus_type_id'));

        $sections = Sections::select('id', 'name', 'parent_id', 'parent_title', 'subject_code', 'rtl_name', 'rlt_parent_title')
            ->where('class_id', '=', $class_id)
            ->where('subject_id', '=', $subject_id)
            ->where('syllabus_type', '=', $syllabus_type_id)
            ->where('parent_id', '=', 0)
            ->where('is_active', '=', 1)
            ->orderBy('id', 'ASC')
            ->get();

        if ($sections->isNotEmpty()) {
            foreach ($sections as $i => $section) {
                $sections[$i]->topics = $section->children()->select('id', 'name', 'rtl_name', 'parent_id', 'parent_title', 'subject_code')->orderBy('order', 'ASC')->get();
            }
        }

        return response()->json($sections);
    }

    public function getQuestionsByClassSubjects(Request $request)
    {
        if (!$request->has('class_id') OR !$request->has('subject_id') OR !$request->has('section_id')) {
            return response()->json([]);
        }

        $subject_id = Helper::easyDecode($request->get('subject_id'));
        $class_id = Helper::easyDecode($request->get('class_id'));
        $section_id = Helper::easyDecode($request->get('section_id'));
        $topic_id = $request->get('topic_id');
        $topic_id = Helper::checkTopicID($topic_id);

        $request->request->add(['internal' => true]);
        $questions_by_types = $this->getQuestionTypes($request);
        foreach ($questions_by_types as $i => $type) {
            $obj = $type->questions()
                ->where('subject_id', $subject_id)
                ->where('class_id', $class_id)
                ->where('section_id', $section_id);

            if ($topic_id != 0) {
                $obj = $obj->where('topic_id', $topic_id);
            }

            $obj = $obj->where('is_active', 1)
                ->orderBy('id', 'DESC')
                ->with(['translations' => function ($query) {
                    $query->orderBy('id', "ASC");
                }])
                ->with('translations.options');
            $questions_by_types[$i]['questions'] = $obj->get();
        }
        return response()->json($questions_by_types);
    }

    public function getMcqOfTopic(Request $request)
    {
        if (!$request->has('class_id') OR !$request->has('subject_id') OR !$request->has('type_id')) {
            return response()->json([]);
        }

        $type_id = Helper::easyDecode($request->get('type_id'));
        $subject_id = Helper::easyDecode($request->get('subject_id'));
        $class_id = Helper::easyDecode($request->get('class_id'));

        $questions = Question::where('type_id', $type_id)
            ->where('subject_id', $subject_id)
            ->where('class_id', $class_id)
            ->with(['translations' => function ($query) {
                return $query->orderBy('id', "ASC");
            }])
            ->with('translations.options')
            ->orderBy('id', 'ASC')
            ->get();

        return response()->json($questions);
    }

    public function getGeneralQuestion(Request $request)
    {
        if (!$request->has('class_id') OR !$request->has('subject_id') OR !$request->has('type_id')) {
            return response()->json([]);
        }

        $type_id = Helper::easyDecode($request->get('type_id'));
        $subject_id = Helper::easyDecode($request->get('subject_id'));
        $class_id = Helper::easyDecode($request->get('class_id'));

        $questions = Question::where('type_id', $type_id)
            ->where('subject_id', $subject_id)
            ->where('class_id', $class_id)
            ->with(['translations' => function ($query) {
                return $query->orderBy('id', "ASC");
            }])
            ->orderBy('id', 'ASC')
            ->get();

        return response()->json($questions);
    }

    public function addClass(Request $request)
    {
        try {
            if ($request->has('name') AND $request->has('syllabus_type_id')) {

                $syllabus_type_id = Helper::easyDecode($request->post('syllabus_type_id'));
                $name = $request->post('name');

                $syllabus = SyllabusType::where('id', $syllabus_type_id)->first();
                $class = Classes::firstOrCreate(['name' => $name, 'level' => $request->post('level')]);
                $associated_class = $syllabus->classes()->where('class_id', $class->id)->first();

                if (!empty($associated_class)) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Class with same name already exist!',
                        'data' => []
                    ]);
                }

                $syllabus->classes()->attach([$class->id]);
                return response()->json([
                    'status' => true,
                    'message' => 'New class added!',
                    'data' => $class
                ]);
            }

            return response()->json([
                'status' => false,
                'message' => 'Something went wrong!',
                'data' => []
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
                'data' => []
            ]);
        }
    }

    public function addSubject(Request $request)
    {
        try {
            if (!$request->has('name')) {
                return response()->json([
                    'status' => false,
                    'message' => 'Something went wrong!',
                    'data' => []
                ]);
            }

            $post = $request->all();
            $subject_name = $post['name'];
            $publisher_id = Helper::easyDecode($post['syllabus_type_id']);

            // get the subject associated with the classID
            $data = Classes::select('id', 'name', 'level')
                ->where('id', '=', Helper::easyDecode($post['class_id']))
                ->where('classes.is_active', '=', 1)
                ->first();

            $subjects = $data->subjects()->where('name', 'like', $subject_name)
                ->wherePivot('syllabus_type_id', $publisher_id)
                ->first();

            // if subject is already associated, give a message
            if (!empty($subjects)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Subject with same name already exist!',
                    'data' => []
                ]);
            }

            // create subject or if exist fetch it
            $subject = Subject::firstOrCreate(['name' => ucfirst($post['name'])]);

            // if file is uploaded, save it to public directory & update subject
            $thumbnail = '';
            if (empty($subject->cover_thumbnail)) {
                $subject->cover_thumbnail = $thumbnail = 'img/subjects-cover/cove_placeholder.png';
            }
            if ($request->has('image')) {
                $destination = public_path('img/subjects-cover');
                $file = $request->file('image');
                $level = $formatted_value = sprintf("%04d", $data->level) . '.';
                $name = Str::slug($subject->name);
                $name .= '-' . $level . '.' . $file->getClientOriginalExtension();

                if (!file_exists($destination . '/' . $name)) {

                    // if directory is not available
                    if (!file_exists($destination))
                        mkdir($destination, 0777);

                    $file->move($destination, $name);
                    $subject->cover_thumbnail = $thumbnail = 'img/subjects-cover/' . $name;
                }
            }

            if (mb_detect_encoding($post['name']) === 'ASCII') {
                $subject->code = strtolower(substr($post['name'], 0, 3));
            }

            $math_type_subjects = ['Computer', 'computer', 'Physics', 'physics', 'Statistics', 'statistics', 'Accounting', 'accounting', 'Chemistry', 'chemistry', 'Math', 'math', 'mathematics', 'Mathematics'];
	if(in_array($post['name'], $math_type_subjects)) {
	    $subject->code = 'mat';
	}

            $subject->medium = $post['medium'];
            $subject->save();

            // if subject code is eng || urd || isl,
            // get its specific sections and ad them
            // also add their relevant question type if needed
            if (in_array($subject->code, ['urd', 'isl', 'eng'])) {
                $this->__addSectionsAndQTypes($subject, $request);
            }

            // associate with current class
            $data->subjects()->attach([
                [
                    'subject_id' => $subject->id,
                    'syllabus_type_id' => Helper::easyDecode($post['syllabus_type_id']),
                    'thumbnail' => $thumbnail
                ]
            ]);

            return response()->json([
                'status' => true,
                'message' => 'New subject added!',
                'data' => $subject
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'line#' => $e->getLine(),
                'message' => $e->getFile() . $e->getMessage(),
                'data' => []
            ]);
        }
    }

    public function updateSubject(Request $request)
    {
        try {
            if (!$request->has('name')) {
                return response()->json([
                    'status' => false,
                    'message' => 'Something went wrong!',
                    'data' => []
                ]);
            }

            $post = $request->all();
            $subject = Subject::find(Helper::easyDecode($post['id']));
            if(empty($subject)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Something went wrong!',
                    'data' => []
                ]);
            }

            // if file is uploaded, save it to public directory & update subject
            $thumbnail = '';
            if (empty($subject->cover_thumbnail)) {
                $subject->cover_thumbnail = $thumbnail = 'img/subjects-cover/cove_placeholder.png';
            }

            if ($request->has('image')) {
                $destination = public_path('img/subjects-cover');
                $file = $request->file('image');
                $name = Str::slug($subject->name);
                $name .= '-' . time() . '.' . $file->getClientOriginalExtension();

                // if directory is not available
                if (!file_exists($destination))
                    mkdir($destination, 0777);

                $file->move($destination, $name);
                $thumbnail = 'img/subjects-cover/' . $name;
            }

            $subject->name = $post['name'];
            $subject->medium = $post['medium'];
            $subject->save();

            // get the subject associated with the classID
            $class = Classes::find(Helper::easyDecode($post['class_id']));
            $class->subjects()->updateExistingPivot($subject->id, ['thumbnail' => $thumbnail]);

            $subject->cover_thumbnail = $thumbnail;
            return response()->json([
                'status' => true,
                'message' => 'Subject Updated!',
                'data' => $subject
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'line#' => $e->getLine(),
                'message' => $e->getFile() . $e->getMessage(),
                'data' => []
            ]);
        }
    }

    public function updatePublisher(Request $request)
    {
        try {
            if (!$request->has('name')) {
                return response()->json([
                    'status' => false,
                    'message' => 'Something went wrong!',
                    'data' => []
                ]);
            }

            $post = $request->all();
            $publisher = SyllabusType::find(Helper::easyDecode($post['id']));
            if(empty($publisher)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Something went wrong!',
                    'data' => []
                ]);
            }

            $publisher->name = $post['name'];
            $publisher->is_active = $post['is_active'];
            $publisher->save();

            return response()->json([
                'status' => true,
                'message' => 'Publisher Updated!',
                'data' => $publisher
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'line#' => $e->getLine(),
                'message' => $e->getFile() . $e->getMessage(),
                'data' => []
            ]);
        }
    }

    /**
     * @param $subject
     * @param $request
     * @return bool
     */
    private function __addSectionsAndQTypes($subject, $request)
    {
        $mapping = Subject::$subject_section_map[$subject->code];
        if (empty($mapping))
            return false;

        $request_array = [
            'subject_id' => Helper::easyEncode($subject->id),
            'parent_id' => Helper::easyEncode(0),
            'subject_code' => $subject->code,
            'eng_name' => '',
            'rlt_name' => '',
            'parent_topic_name' => 'Unit',
            'parent_topic_rtl_name' => 'Unit',
            'internal' => true
        ];

        foreach ($mapping as $p_type => $q_types) {

            // Section Name
            if (in_array($subject->code, ['urd', 'isl'])) {
                $request_array['eng_name'] = '';
                $request_array['rlt_name'] = $q_types['section'];
            } else {
                $request_array['eng_name'] = $q_types['section'];
                $request_array['rlt_name'] = '';
            }

            // add section
            $request->request->add($request_array);
            $section = $this->addSubjectTopic($request);

            // add question type if not exist
            $order = 1;
            foreach ($q_types['types'] as $k => $t) {
                $question_type = QuestionType::firstOrCreate([
                    'title' => $t,
                ]);
                $name = Str::slug($t);
                $name = str_replace('-', '-', $name);
                $question_type->name = $name;
                $question_type->form_type = $k === 'mcq' ? 'mcq' : 'general';
                $question_type->save();

                QuestionTypeBySection::create([
                    'q_type_id' => $question_type->id,
                    'section_id' => $section->id,
                    'priority' => $order
                ]);
                $order++;
            }
        }
        return true;
    }

    public function addSyllabusType(Request $request)
    {
        try {
            if (!$request->has('name')) {
                return response()->json([
                    'status' => false,
                    'message' => 'Something went wrong!',
                    'data' => []
                ]);
            }

            $syllabus_type = $request->post('name');
            $syllabus = SyllabusType::where('name', 'like', $syllabus_type)->first();
            if (!empty($syllabus)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Already Exist!',
                    'data' => []
                ]);
            }

            $syllabus = SyllabusType::firstOrCreate(['name' => $syllabus_type]);
            $syllabus->is_active = $request->post('is_active');
            $syllabus->save();

            return response()->json([
                'status' => true,
                'message' => 'New syllabus added!',
                'data' => $syllabus
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'line#' => $e->getLine(),
                'message' => $e->getMessage(),
                'data' => []
            ]);
        }
    }

    public function addSubjectTopic(Request $request)
    {
        if (!$request->has('class_id') || !$request->has('subject_id')) {
            return response()->json([]);
        }

        $class_id = Helper::easyDecode($request->post('class_id'));
        $subject_id = Helper::easyDecode($request->post('subject_id'));
        $syllabus_type_id = Helper::easyDecode($request->post('syllabus_type_id'));
        $parent_id = Helper::easyDecode($request->post('parent_id'));
        $subject_code = $request->post('subject_code');
        $eng_name = $request->post('eng_name');
        $rtl_name = $request->post('rlt_name');
        $parent_title = $request->post('parent_topic_name');
        $parent_rtl_name = $request->post('parent_topic_rtl_name');

        $section = Sections::select('id', 'name', 'rtl_name')
            ->where('class_id', '=', $class_id)
            ->where('subject_id', '=', $subject_id)
            ->where('syllabus_type', '=', $syllabus_type_id)
            ->where('parent_id', '=', $parent_id)
            ->where('subject_code', '=', $subject_code);

        if ($parent_id == 0 AND (!empty($parent_title) AND !empty($parent_rtl_name))) {

            $section = $section->where(function ($query) use ($parent_title, $parent_rtl_name) {

                if (empty($parent_rtl_name)) {
                    return $query->where('parent_title', 'like', $parent_title);
                }

                if (empty($parent_title)) {
                    return $query->where('rlt_parent_title', 'like', $parent_rtl_name);
                }

                return $query->where('parent_title', 'like', $parent_title)
                    ->orWhere('rlt_parent_title', 'like', $parent_rtl_name);
            });
        }

        $section = $section->where(function ($query) use ($eng_name, $rtl_name) {

            if (empty($rtl_name)) {
                return $query->where('name', 'like', $eng_name);
            }

            if (empty($eng_name)) {
                return $query->where('rtl_name', 'like', $rtl_name);
            }

            return $query->where('name', 'like', $eng_name)
                ->orWhere('rtl_name', 'like', $rtl_name);
        })->first();

        if (!empty($section)) {

            if ($request->has('internal')) {
                return $section;
            }

            $msg = (!empty($eng_name)) ? $eng_name : $rtl_name;
            return response()->json([
                'status' => false,
                'message' => "'$msg' already exist!",
                'data' => $section
            ]);
        }

        $data = [
            'class_id' => $class_id,
            'subject_id' => $subject_id,
            'section_id' => 1,
            'syllabus_type' => $syllabus_type_id,
            'name' => !empty($eng_name) ? $eng_name : '',
            'rtl_name' => !empty($rtl_name) ? $rtl_name : '',
            'parent_id' => $parent_id,
            'subject_code' => $subject_code,
            'is_active' => 1
        ];
        if ($parent_id == 0) {
            $data['parent_title'] = !empty($parent_title) ? $parent_title : '';
            $data['rlt_parent_title'] = !empty($parent_rtl_name) ? $parent_rtl_name : '';
            $data['name'] = !empty($eng_name) ? $eng_name : '';
            $data['rtl_name'] = !empty($rtl_name) ? $rtl_name : '';
        }

        $section = Sections::create($data);
        $section->topics = [];

        if ($request->has('internal')) {
            return $section;
        }

        return response()->json([
            'status' => true,
            'message' => 'Topic added',
            'data' => $section
        ]);
    }

    public function addMcqQuestion(Request $request)
    {
        $section_info = json_decode($request->post('section_info'), true);
        $question_en = $request->post('question_en');
        $question_rtl = $request->post('question_rtl');
        $options_en = json_decode($request->post('option_en'));
        $options_rtl = json_decode($request->post('option_rtl'));

        $correct_option = $request->post('correct_option');
        $type_id = Helper::easyDecode($section_info['type_id']);
        $section_id = Helper::easyDecode($section_info['seid']);
        $topic_id = Helper::checkTopicID($section_info['tid']);
        $subject_id = Helper::easyDecode($section_info['suid']);
        $class_id = Helper::easyDecode($section_info['cid']);
        $priority = $request->post('priority');

        /**
         * if english question options are present but its statement is missing
         */
        if (empty($question_en) AND !empty($options_en)) {
            return response()->json([
                'status' => false,
                'message' => 'English question cannot be empty!',
                'data' => []
            ]);
        }
        /**
         * if english question is present but its options are missing
         */
        if (!empty($question_en) AND empty($options_en)) {
            return response()->json([
                'status' => false,
                'message' => 'Must add at-least one english option',
                'data' => []
            ]);
        }
        /**
         * if rtl question options are present but its statement is missing
         */
        if (empty($question_rtl) AND !empty($options_rtl)) {
            return response()->json([
                'status' => false,
                'message' => 'Urdu question cannot be empty!',
                'data' => []
            ]);
        }

        /**
         * if rtl question is present but its options are missing
         */
//        if (!empty($question_rtl) AND empty($options_rtl)) {
//            return response()->json([
//                'status' => false,
//                'message' => 'Must add at-least one Urdu option',
//                'data' => []
//            ]);
//        }

        $toSubmit = [
            'subject_id' => $subject_id,
            'class_id' => $class_id,
            'type_id' => $type_id,
            'section_id' => $section_id,
            'topic_id' => $topic_id,
        ];
        $toSubmit[$priority] = 1;
        $question = Question::create($toSubmit);

        /**
         * WE NEED TO PROCESS MATH QUESTIONS BEFORE SAVING
         */
        $subject = Subject::find($subject_id);
        if($subject->code == 'mat') {
            $params = [
                'question_en' => $question_en,
                'question_rtl' => $question_rtl,
                'options_en' => $options_en,
                'options_rtl' => $options_rtl,
                'correct_option' => $correct_option,
                'type_id' => $type_id,
                'section_id' => $section_id,
                'topic_id' => $topic_id,
                'subject_id' => $subject_id,
                'class_id' => $class_id
            ];
            return $this->__addMathMCQQuestion($params, $question);
        }

        if (!empty($question_en)) {
            $en = QuestionTranslation::create([
                'question_id' => $question->id,
                'type_id' => $type_id,
                'section_id' => $section_id,
                'locale' => 'en',
                'question_statement' => $question_en,
                'correct_answer' => $correct_option
            ]);
            if(!empty($options_en)) {
                foreach ($options_en as $option) {
                    QuestionOption::create([
                        'translation_id' => $en->id,
                        'question_id' => $question->id,
                        'question_option' => $option
                    ]);
                }
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
            if(!empty($options_rtl)) {
                foreach ($options_rtl as $option) {
                    QuestionOption::create([
                        'translation_id' => $rtl->id,
                        'question_id' => $question->id,
                        'question_option' => $option
                    ]);
                }
            }
        }

        $question = Question::where('id', $question->id)
            ->with(['translations' => function ($query) {
                return $query->orderBy('id', "ASC");
            }])
            ->with('translations.options')
            ->first();

        return response()->json([
            'status' => true,
            'message' => 'Success',
            'data' => $question
        ]);
    }

    /**
     * @param $params
     * @param $question
     * @return \Illuminate\Http\JsonResponse
     */
    private function __addMathMCQQuestion($params, $question) {

        if (!empty($params['question_en'])) {
            $params['question_en'] = Helper::mapMathSymbolsTolaTeX($params['question_en']);
            $en = QuestionTranslation::create([
                'question_id' => $question->id,
                'type_id' => $params['type_id'],
                'section_id' => $params['section_id'],
                'locale' => 'en',
                'question_statement' => $params['question_en'],
                'correct_answer' => $params['correct_option']
            ]);
            foreach ($params['options_en'] as $option) {
                $option = Helper::mapMathSymbolsTolaTeX($option);
                QuestionOption::create([
                    'translation_id' => $en->id,
                    'question_id' => $question->id,
                    'question_option' => $option
                ]);
            }
        }

        if (!empty($question_rtl)) {
            $params['question_rtl'] = '';
            $rtl = QuestionTranslation::create([
                'question_id' => $question->id,
                'type_id' => $params['type_id'],
                'section_id' => $params['section_id'],
                'locale' => 'ur',
                'question_statement' => $params['question_rtl'],
                'correct_answer' => $params['correct_option']
            ]);
            foreach ($params['options_rtl'] as $option) {
                QuestionOption::create([
                    'translation_id' => $rtl->id,
                    'question_id' => $question->id,
                    'question_option' => $option
                ]);
            }
        }

        $question = Question::where('id', $question->id)
            ->with(['translations' => function ($query) {
                return $query->orderBy('id', "ASC");
            }])
            ->with('translations.options')
            ->first();

        return response()->json([
            'status' => true,
            'message' => 'Success',
            'data' => $question
        ]);
    }

    public function addMatchColumnQuestion(Request $request)
    {
        $section_info = json_decode($request->post('section_info'), true);
        $question_en = $request->post('question_en');
        $options_column_a = ($request->post('option_en'));
        $options_column_b = ($request->post('option_rtl'));
        $priority = $request->post('priority');

        if (empty($question_en)) {
            return response()->json([
                'status' => false,
                'message' => 'Question cannot be empty!',
                'data' => []
            ]);
        }

        if (empty($options_column_a) AND empty($options_column_b)) {
            return response()->json([
                'status' => false,
                'message' => 'Column A and Column B, both cannot be empty'
            ]);
        }

        $type_id = Helper::easyDecode($section_info['type_id']);
        $section_id = Helper::easyDecode($section_info['seid']);
        $topic_id = Helper::checkTopicID($section_info['tid']);

        $question = Question::create([
            'subject_id' => Helper::easyDecode($section_info['suid']),
            'class_id' => Helper::easyDecode($section_info['cid']),
            'type_id' => $type_id,
            'section_id' => $section_id,
            'topic_id' => $topic_id,
            $priority => 1
        ]);

        QuestionTranslation::create([
            'question_id' => $question->id,
            'type_id' => $type_id,
            'section_id' => $section_id,
            'locale' => 'en',
            'question_statement' => $question_en,
            'correct_answer' => '',
            'left_column_options' => ($options_column_a),
            'right_column_options' => ($options_column_b)
        ]);

        $question = Question::where('id', $question->id)
            ->with(['translations' => function ($query) {
                return $query->orderBy('id', "ASC");
            }])
            ->with('translations.options')
            ->first();

        return response()->json([
            'status' => true,
            'message' => 'Success',
            'data' => $question
        ]);
    }

    public function addGeneralQuestion(Request $request)
    {
        $section_info = json_decode($request->post('section_info'), true);
        $question_en = $request->post('question_en');
        $question_rtl = $request->post('question_rtl');

        /**
         * if english question options are present but its statement is missing
         */
        if (empty($question_en) AND empty($question_rtl)) {
            return response()->json([
                'status' => false,
                'message' => 'English or Urdu question, both cannot be empty!',
                'data' => []
            ]);
        }

        $section_id = Helper::easyDecode($section_info['seid']);
        $topic_id = Helper::checkTopicID($section_info['tid']);
        $type_id = Helper::easyDecode($section_info['type_id']);
        $correct_answer = $request->post('correct_option');
        $priority = $request->post('priority');

        $question = Question::create([
            'subject_id' => Helper::easyDecode($section_info['suid']),
            'class_id' => Helper::easyDecode($section_info['cid']),
            'type_id' => $type_id,
            'section_id' => $section_id,
            'topic_id' => $topic_id,
            $priority => 1
        ]);

        if (!empty($question_en)) {
            $en = QuestionTranslation::create([
                'question_id' => $question->id,
                'type_id' => $type_id,
                'section_id' => $section_id,
                'locale' => 'en',
                'question_statement' => $question_en,
                'correct_answer' => $correct_answer
            ]);
        }

        if (!empty($question_rtl)) {
            $rtl = QuestionTranslation::create([
                'question_id' => $question->id,
                'type_id' => $type_id,
                'section_id' => $section_id,
                'locale' => 'ur',
                'question_statement' => $question_rtl,
                'correct_answer' => $correct_answer
            ]);
        }

        $question = Question::where('id', $question->id)
            ->with(['translations' => function ($query) {
                return $query->orderBy('id', "ASC");
            }])
            ->with('translations.options')
            ->first();

        return response()->json([
            'status' => true,
            'message' => 'Success',
            'data' => $question
        ]);
    }

    public function addImageQuestion(Request $request)
    {
        $options_en = [];
        $options_rtl = [];
        $section_info = json_decode($request->post('section_info'), true);
        $question_en = $request->post('question_en');
        $question_rtl = $request->post('question_rtl');
        $priority = $request->post('priority');

        /**
         * if english question options are present but its statement is missing
         */
        if (empty($question_en) AND empty($question_rtl)) {
            return response()->json([
                'status' => false,
                'message' => 'English or Urdu question, both cannot be empty!',
                'data' => []
            ]);
        }

        $subject_id = Helper::easyDecode($section_info['suid']);
        $section_id = Helper::easyDecode($section_info['seid']);
        $topic_id = Helper::checkTopicID($section_info['tid']);
        $type_id = Helper::easyDecode($section_info['type_id']);

        $question = Question::create([
            'subject_id' => Helper::easyDecode($section_info['suid']),
            'class_id' => Helper::easyDecode($section_info['cid']),
            'type_id' => $type_id,
            'section_id' => $section_id,
            'topic_id' => $topic_id,
            $priority => 1
        ]);

        if (!empty($question_en)) {
            $en = QuestionTranslation::create([
                'question_id' => $question->id,
                'type_id' => $type_id,
                'section_id' => $section_id,
                'locale' => 'en',
                'question_statement' => $question_en,
                'correct_answer' => ''
            ]);
        }

        if (!empty($question_rtl)) {
            $rtl = QuestionTranslation::create([
                'question_id' => $question->id,
                'type_id' => $type_id,
                'section_id' => $section_id,
                'locale' => 'ur',
                'question_statement' => $question_rtl,
                'correct_answer' => ''
            ]);
        }

        // if file is uploaded, save it to public directory & update subject
        if ($request->has('file')) {
            $destination = public_path("img/questions_{$subject_id}");
            $file = $request->file('file');
            $name = "question-{$question->id}-{$subject_id}." . $file->getClientOriginalExtension();

            if (!file_exists($destination . '/' . $name)) {

                // if directory is not available
                if (!file_exists($destination))
                    mkdir($destination, 0777);

                $file->move($destination, $name);
                $thumbnail = "img/questions_{$subject_id}/{$name}";
                $en->question_image = $thumbnail;
                $en->save();

                if (!empty($question_rtl)) {
                    $rtl->question_image = $thumbnail;
                    $rtl->save();
                }
            }
        }

        $question = Question::where('id', $question->id)
            ->with(['translations' => function ($query) {
                return $query->orderBy('id', "ASC");
            }])
            ->with('translations.options')
            ->first();

        return response()->json([
            'status' => true,
            'message' => 'Success',
            'data' => $question
        ]);
    }

    public function removeSyllabusType(Request $request)
    {
        if (!$request->has('id')) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong',
                'data' => []
            ]);
        }

        $syllabus = SyllabusType::find(Helper::easyDecode($request->post('id')));
        if (empty($syllabus)) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong',
                'data' => []
            ]);
        }

        $classes = $syllabus->classes()->get();
        if ($classes->isNotEmpty()) {
            return response()->json([
                'status' => false,
                'message' => "{$syllabus->name} has classes associated with it, You cannot remove it!",
                'data' => $syllabus
            ]);
        }

        $syllabus->delete();
        return response()->json([
            'status' => true,
            'message' => 'Removed!',
            'data' => $syllabus
        ]);
    }

    public function removeAClass(Request $request)
    {
        if (!$request->has('id') OR !$request->has('syllabus_type_id')) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong',
                'data' => []
            ]);
        }

        $id = Helper::easyDecode($request->post('id'));
        $syllabus_type_id = Helper::easyDecode($request->post('syllabus_type_id'));
        $class = Classes::find($id);
        if (empty($class)) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong',
                'data' => []
            ]);
        }

        $associated_data = $class->subjects()->where('syllabus_type_id', '=', $syllabus_type_id)->get();
        if ($associated_data->isNotEmpty()) {
            return response()->json([
                'status' => false,
                'message' => "{$class->name} has subjects associated with it, You cannot remove it!",
                'data' => $class
            ]);
        }

        $publisher = SyllabusType::find($syllabus_type_id);
        $publisher
            ->classes()
            ->wherePivot('class_id', '=', $class->id)
            ->wherePivot('syllabus_type_id', '=', $syllabus_type_id)
            ->detach();

        return response()->json([
            'status' => true,
            'message' => 'Removed!',
            'data' => $class
        ]);
    }

    public function removeASubject(Request $request)
    {
        if (!$request->has('id') OR !$request->has('class_id')) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong',
                'data' => []
            ]);
        }

        $id = Helper::easyDecode($request->post('id'));
        $class_id = Helper::easyDecode($request->post('class_id'));
        $subject = Subject::find($id);
        if (empty($subject)) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong',
                'data' => []
            ]);
        }

        $associated_data = $subject->sections()->where('class_id', $class_id)->get();
        if ($associated_data->isNotEmpty()) {
            return response()->json([
                'status' => false,
                'message' => "{$subject->name} has topics associated with it, You cannot remove it!",
                'data' => $subject
            ]);
        }

        Classes::find($class_id)->subjects()->wherePivot('subject_id', $subject->id)->detach();

        return response()->json([
            'status' => true,
            'message' => 'Removed!',
            'data' => $subject
        ]);
    }

    public function removeASection(Request $request)
    {
        if (!$request->has('id') OR !$request->has('section_id')) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong',
                'data' => []
            ]);
        }

        $id = Helper::easyDecode($request->post('id'));
        $section = Sections::find($id);
        if (empty($section)) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong',
                'data' => []
            ]);
        }

        $associated_data = $section->questions()->get();
        if ($associated_data->isNotEmpty()) {
            return response()->json([
                'status' => false,
                'message' => "{$section->name} has questions associated with it, You cannot remove it!",
                'data' => $section
            ]);
        }

        $section->delete();

        return response()->json([
            'status' => true,
            'message' => 'Removed!',
            'data' => $section
        ]);
    }

    public function removeATopic(Request $request)
    {
        if (!$request->has('id') OR !$request->has('topic_id')) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong',
                'data' => []
            ]);
        }

        $id = Helper::easyDecode($request->post('id'));
        $topic_id = Helper::easyDecode($request->post('topic_id'));
        $section = Sections::find($id);
        if (empty($section)) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong',
                'data' => []
            ]);
        }

        $associated_data = $section->topic_questions()->get();
        if ($associated_data->isNotEmpty()) {
            return response()->json([
                'status' => false,
                'message' => "{$section->name} has questions associated with it, You cannot remove it!",
                'data' => $section
            ]);
        }

        $section->delete();

        return response()->json([
            'status' => true,
            'message' => 'Removed!',
            'data' => $section
        ]);
    }

    public function removeAQuestion(Request $request)
    {
        if (!$request->has('id')) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong',
                'data' => []
            ]);
        }

        $id = $request->post('id');
        $question = Question::find(Helper::easyDecode($id));
        if (empty($question)) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong',
                'data' => []
            ]);
        }

        $question->delete();
        return response()->json([
            'status' => true,
            'message' => 'success',
            'data' => $question
        ]);
    }

    public function searchQuestions(Request $request)
    {
        if(empty($request->all())) {
            return response()->json([
                'status' => false,
                'message' => '',
                'data' => []
            ]);
        }

        $medium = $request->post('medium');
        $class_id = $request->post('class_id');
        $subject_id = $request->post('subject_id');
        $sections_ids = $request->post('sections_ids');
        $topic_ids = $request->post('topic_ids');
        $question_types = json_decode($request->post('question_types'), true);
        $question_types_ids = array_map(function ($type) {
            return $type['value'];
        }, $question_types);

        $question_types = QuestionType::whereIn('id', $question_types_ids)->get();
        $question_by_types = [];
        foreach ($question_types as $i => $type) {

            $type_title = $type->title;
            $name = $type->name;

            $questions = Question::where('subject_id', Helper::easyDecode($subject_id))
                ->where('class_id', Helper::easyDecode($class_id))
                ->where('type_id', $type->id);

            if (!empty($sections_ids)) {
                if (!is_array($sections_ids))
                    $sections_ids = explode(',', $sections_ids);
                $questions = $questions->whereIn('section_id', $sections_ids);
            }

            if (empty($sections_ids) AND !empty($topic_ids)) {
                if (!is_array($topic_ids))
                    $topic_ids = explode(',', $topic_ids);
                $questions = $questions->whereIn('topic_id', $topic_ids);
            }

            $questions = $questions->where('is_active', 1)
                ->with(['translations' => function($query) use ($medium) {
                    if ($medium == 'urdu') {
                        return $query->where('locale', 'ur')
                            ->orderBy('id', 'DESC');
                    } elseif ($medium == 'eng') {
                        return $query->where('locale', 'en')
                            ->orderBy('id', 'DESC');
                    } else {
                        return $query->orderBy('id', 'DESC');
                    }
                }, 'translations.options'])
                ->orderBy('id', 'DESC');

            $limit = $request->post('limit');
            if ($limit != -1)
                $questions = $questions->limit($limit);

//            dd(Helper::getSqlWithBindings($questions));
            $questions = $questions->orderBy('id', 'DESC')->get();
            $question_by_types[$name] = [
                'title' => $type_title,
                'key' => $type->name,
                'form_type' => $type->form_type,
                'question_statement_en' => $type->question_statement_en,
                'question_statement_rtl' => $type->question_statement_rtl,
                'questions' => $questions
            ];
        }

        return response()->json([
            'status' => true,
            'message' => '',
            'data' => $question_by_types
        ]);
    }

    public function searchPapers(Request $request)
    {
        if (!$request->has('publisher_id') || !$request->has('class_id')) {
            return response()->json([]);
        }

        $publisher_id = Helper::checkIdZero($request->post('publisher_id'));
        $class_id = Helper::checkIdZero($request->post('class_id'));
        $subject_id = Helper::checkIdZero($request->post('subject_id'));
        $chapter_id = $request->post('chapter_id');


        $result = new PreviousPapers();

        if($publisher_id !== 0)
            $result = $result->where('publisher_id', $publisher_id);

        if($class_id !== 0)
            $result = $result->where('class_id', $class_id);

        if($subject_id !== 0)
            $result = $result->where('subject_id', $subject_id);

        if(!empty($chapter_id)) {
            $result = $result->where('chapter', $chapter_id);
        }

        $result = $result->get();
        $files = [];
        if ($result->isNotEmpty()) {
            foreach($result as $r) {
                $fs = $r->files;
                if(!empty($fs)) {
                    foreach ($fs as $f)
                        $files[] = $f;
                }
            }
        }

        return response()->json($files);
    }

    public function savedPapers(Request $request)
    {
        if (!$request->has('publisher_id') || !$request->has('class_id')) {
            return response()->json([]);
        }

        $publisher_id = Helper::checkIdZero($request->post('publisher_id'));
        $class_id = Helper::checkIdZero($request->post('class_id'));
        $subject_id = Helper::checkIdZero($request->post('subject_id'));
        $title = $request->post('title');
        $user_id = Helper::easyDecode($request->post('__u'));

        $result = SavedPapers::select('id', 'name', 'title', 'section_ids', 'topic_ids', 'paper_date', 'paper_time');
        if($publisher_id !== 0)
            $result = $result->where('publisher_id', $publisher_id);

        if($class_id !== 0)
            $result = $result->where('class_id', $class_id);

        if($subject_id !== 0)
            $result = $result->where('subject_id', $subject_id);

        if(!empty($title))
            $result = $result->where('name', 'LIKE', "%{$title}%");

        $result = $result
            ->where('added_by', $user_id)
            ->orderBy('paper_date', 'ASC')->get();

        if ($result->isNotEmpty()) {
            foreach($result as &$r) {
                if(empty($r->section_ids))
                    $r->section_ids = $r->topic_ids;

                $r->sections = Sections::select('name', 'rtl_name')->whereIn('id', explode(',', $r->section_ids))->get();
            }
            return response()->json($result);
        }

        return response()->json([]);
    }

    public function uploadPapers(Request $request)
    {
        if (!$request->has('publisher_id') || !$request->has('class_id')) {
            return response()->json([]);
        }

        $publisher_id = Helper::checkIdZero($request->post('publisher_id'));
        $class_id = Helper::checkIdZero($request->post('class_id'));
        $subject_id = Helper::checkIdZero($request->post('subject_id'));
        $chapter_id = $request->post('chapter_id');

        if($publisher_id === 0 OR $class_id === 0 OR $subject_id === 0 OR empty($chapter_id)) {
            return response()->json([]);
        }

        $result = PreviousPapers::firstOrCreate([
            'publisher_id' => $publisher_id,
            'class_id' => $class_id,
            'subject_id' => $subject_id,
            'chapter' => $chapter_id
        ]);

        $data = [];
        if (!empty($result)) {
            if ($request->has('files')) {
                $destination = public_path('old-papers');
                $files = $request->file('files');
                foreach ($files as $file) {

                    $file_name = explode('.', $file->getClientOriginalName());
                    $name = str_replace(' ', '-', $file_name[0]) . '.' . $file->getClientOriginalExtension();
                    if (!file_exists($destination))
                        mkdir($destination, 0777);

                    $file->move($destination, $name);
                    $data[] = $result->files()->create([
                        'previous_paper_id' => $result->id,
                        'file_path' => "old-papers/${name}",
                        'name' => $file_name[0]
                    ]);
                }
            }
        }

        return response()->json($result->files);
    }

    public function removePaper(Request $request)
    {
        if (!$request->has('id')) {
            return [];
        }

        $id = Helper::easyDecode($request->post('id'));
        $item = PaperFiles::find($id);
        if ($item) {
            unlink(public_path($item->file_path));
        }
        $item->delete();

        $publisher_id = Helper::easyDecode($request->post('publisher_id'));
        $class_id = Helper::easyDecode($request->post('class_id'));
        $subject_id = Helper::easyDecode($request->post('subject_id'));
        $chapter_id = $request->post('chapter_id');

        $result = PreviousPapers::where([
            'publisher_id' => $publisher_id,
            'class_id' => $class_id,
            'subject_id' => $subject_id,
            'chapter' => $chapter_id
        ])->first();

        return response()->json(!empty($result) ? $result->files : []);
    }

    public function addQuestionType(Request $request)
    {
        $response = [
            'status' => false,
            'message' => '',
            'data' => []
        ];

        if (!$request->has('form_type') || !$request->has('section_id')) {
            return response()->json($response);
        }

        $form_type = $request->post('form_type');
        $section_id = Helper::easyDecode($request->post('section_id'));
        $subject_id = Helper::easyDecode($request->post('subject_id'));
        $title = $request->post('title');
        $id = $request->post('id');
        $question_statement_en = $request->post('question_statement_en');
        $question_statement_rtl = $request->post('question_statement_rtl');

        if ($id != '0') {
            $question_type = QuestionType::find(Helper::easyDecode($id));
        } else {
            $question_type = QuestionType::firstOrCreate([
                'form_type' => $form_type,
                'title' => $title
            ]);
        }

        // question type is found
        if (!empty($question_type)) {

            // check if for current section its found
            $by_section = QuestionTypeBySection::where([
                'section_id' => $section_id,
                'q_type_id' => $question_type->id
            ])->first();

            // if so & active too, its already exist
            if (!empty($by_section)) {
                if ($by_section->is_active == 1) {

                    $message = 'Question type you are adding already exist!';
                    $status = false;
                } else {
                    $by_section->is_active = 1;
                    $by_section->save();

                    $status = true;
                    $message = 'Success!';
                    $by_section;
                }
            } else { // not found against section
                QuestionTypeBySection::create([
                    'section_id' => $section_id,
                    'q_type_id' => $question_type->id
                ]);
                $status = true;
                $message = 'Success';
            }

            $name = Str::slug($question_type->title);
            $question_type->name = str_replace('-', '_', $name);
            $question_type->form_type = $form_type;
            $question_type->question_statement_en = $question_statement_en;
            $question_type->question_statement_rtl = $question_statement_rtl;
            $question_type->save();

            $question_type->removeable = 1;
            $response = [
                'status' => $status,
                'message' => $message,
                'data' => $question_type
            ];
        }

        return response()->json($response);
    }

    public function getAllQuestionTypes()
    {
        $question_types = QuestionType::select('id', 'title', 'question_statement_en', 'question_statement_rtl')
            ->where('is_active', 1)
            ->orderBy('title')
            ->get();

        return response()->json($question_types);
    }

    public function deActiveQuestionTypeFromSection(Request $request)
    {
        $response = [
            'status' => false,
            'message' => '',
            'data' => []
        ];

        if (!$request->has('id') || !$request->has('section_id')) {
            $response['message'] = 'Something went wrong!';
            return response()->json($response);
        }

        $id = Helper::easyDecode($request->post('id'));
        $section_id = Helper::easyDecode($request->post('section_id'));
        $question_type = QuestionType::find($id);
        if (!empty($question_type)) {
            $is_updated = QuestionTypeBySection::where([
                'section_id' => $section_id,
                'q_type_id' => $question_type->id
            ])->update(['is_active' => 0]);

            $response['status'] = $is_updated;
            $response['message'] = 'Success';
            $response['data'] = $question_type;
        }

        return response()->json($response);
    }

    public function confirmQuestions(Request $request)
    {
        $publisher_id = Helper::easyDecode($request->post('publisher_id'));
        $class_id = Helper::easyDecode($request->post('class_id'));
        $subject_id = Helper::easyDecode($request->post('subject_id'));
        $user_id = Helper::easyDecode($request->post('__u'));
        $medium = $request->post('medium');
        $paper_code = $request->post('paper_code');
        $paper_time = $request->post('paper_time');
        $paper_date = $request->post('paper_date');
        $total_marks = $request->post('total_marks');
        $blank_lines = $request->post('blank_lines');
        $selected_question = $request->post('confirmed_questions');
        $search_results = $request->post('search_results');
        $sections_ids = $request->post('sections_ids');
        $topic_ids = $request->post('topic_ids');

        $paper = SavedPapers::firstOrCreate([
            'added_by' => $user_id,
            'publisher_id' => $publisher_id,
            'class_id' => $class_id,
            'subject_id' => $subject_id,
            'section_ids' => $sections_ids,
            'topic_ids' => $topic_ids
        ]);

        $class = Classes::find($class_id);
        $subject = Subject::find($subject_id);

        $name = [];
        if(!empty($subject)) {
            $name[] = $subject->name;
            $paper_code = $subject->code;
        }
        if(!empty($class)) {
            $name[] = $class->name;
            $paper_code .= '-' .$class->level;
        }
        $name[] = '(DRAFT)';
        $name = implode(', ', $name);

        $paper->name = $name;
        $paper->title = $name;
        $paper->medium = $medium;
        $paper->paper_date = date('Y-m-d');
        $paper->paper_code = $paper_code;
        $paper->paper_time = $paper_time;
        $paper->paper_date = $paper_date;
        $paper->total_marks = $total_marks;
        $paper->blank_lines = $blank_lines;
        $paper->save();

        $index = $paper->questions->count();
        $paper->questions()->create([
            'search_results' => $search_results,
            'questions' => $selected_question,
            'index' => $index
        ]);

        return response()->json($paper);
    }

    public function getSavedQuestions(Request $request)
    {
        $publisher_id = Helper::easyDecode($request->post('publisher_id'));
        $class_id = Helper::easyDecode($request->post('class_id'));
        $subject_id = Helper::easyDecode($request->post('subject_id'));
        $sections_ids = $request->post('sections_ids');
        $topic_ids = $request->post('topic_ids');
        $id = Helper::checkIdZero($request->post('__i'));

        if($id !== 0) {
            $paper = SavedPapers::where('id', $id)
                ->with(['questions' => function($query) {
                    return $query->orderBy('index', 'ASC');
                }])
                ->first();
        } else {
            $paper = SavedPapers::where([
                'publisher_id' => $publisher_id,
                'class_id' => $class_id,
                'subject_id' => $subject_id,
                'section_ids' => $sections_ids,
                'topic_ids' => $topic_ids
            ])->with(['questions' => function ($query) {
                return $query->orderBy('index', 'ASC');
            }])
                ->first();
        }
        $questions = [];
        $payload = [];
        if(!empty($paper)) {
            $payload = $paper->toArray();
            $payload['subject'] = Subject::select('id', 'code', 'name')->where('id', $paper['subject_id'])->first();
            $payload['current_class'] = Classes::select('id', 'name')->where('id', $paper['class_id'])->first();
        }

        if($paper->questions->isNotEmpty()) {
            foreach ($paper['questions'] as $i => $question) {
                $q = json_decode($question['questions'], true);
                $q['id'] = $question['id'];
                $questions[$i] = $q;
                $questions[$i]['search_results'] = json_decode($question['search_results'], true);
                $payload['saved_paper_question_id'] = $question['id'];
            }

            $payload['questions'] = $questions;
        }

        return response()->json([
            'status' => true,
            'message' =>  'Success',
            'data' => $payload
        ]);
    }

    public function getAnswerKeys(Request $request)
    {
        $id = Helper::checkIdZero($request->post('__i'));
        $answers = [];
        $paper = SavedPapers::where('id', $id)
            ->with(['questions' => function($query) {
                return $query->orderBy('index', 'ASC');
            }])
            ->first();

        $answerA = ['A', 'B', 'C', 'D'];
        if($paper->questions->isNotEmpty()) {
            foreach($paper->questions as $i => $question) {
                $questions = json_decode($question->questions, true);
                $key = $questions['form_type'];
                if(!in_array($key, ['mcq', 'banks', 'true_false'])) continue;

                $title = $questions['title'];
                $questions = $questions['questions'];
                if(!empty($questions)) {
                    foreach($questions as $q) {
                        $iindex = rand(0, 3);
                        $model = QuestionTranslation::select('correct_answer')->where('question_id', $q['id'])->first();
                        // just a testing code
                        if(!empty($model) AND empty($model->correct_answer)) {
                            $model->correct_answer = $answerA[$iindex];
                            $model->save();
                        }
                        $answers[$i]['title'] = $title;
                        $answers[$i]['type'] = $key;
                        $answers[$i]['answers'][] = !empty($model) ? $model->correct_answer : '';
                    }
                }
            }
        }

        return response()->json($answers);
    }

    public function removeSavedQuestionSection(Request $request)
    {
        $publisher_id = Helper::easyDecode($request->post('publisher_id'));
        $class_id = Helper::easyDecode($request->post('class_id'));
        $subject_id = Helper::easyDecode($request->post('subject_id'));
        $sections_ids = $request->post('sections_ids');
        $topic_ids = $request->post('topic_ids');
        $index = (int) $request->post('index');
        $marks = (int) $request->post('marks');

        $paper = SavedPapers::where([
            'publisher_id' => $publisher_id,
            'class_id' => $class_id,
            'subject_id' => $subject_id,
            'section_ids' => $sections_ids,
            'topic_ids' => $topic_ids
        ])->first();

        $payload = [];
        if(!empty($paper)) {
            $paper->questions()->where('id', $index)->delete();
            if($index) {
                $total = (int)$paper->total_marks;
                $total -= $marks;
                $paper->total_marks = $total;
                $paper->save();
            }

            return $this->getSavedQuestions($request);
        }

        return response()->json([
            'status' => false,
            'message' =>  'Success',
            'data' => $payload
        ]);
    }

    public function savePaper(Request $request) {
        $response = [
            'status' => false,
            'message' =>  'Success',
            'data' => false
        ];

        if(!$request->has('id'))
            return response()->json($response);

        $paper = SavedPapers::find(Helper::easyDecode($request->post('id')));
        if(empty($paper))
            return response()->json($response);

        $name = $request->get('paper_name');
        $title = $request->post('subject');
        $title .= ', ' . $request->post('class');

        $paper->name = $name;
        $paper->title = $title;
        $paper->bubbleSheet = 0;
        $paper->dualPrint =  0;
        $paper->boldHeading = 0;
        $paper->headerStyle = $request->post('headerStyle');
        $paper->questionFontSize = $request->post('questionFontSize');
        $paper->optionFontSize = $request->post('optionFontSize');
        $paper->paper_code = $request->post('paper_code');
        $paper->paper_date = empty($request->post('paper_date')) ? date('Y-m-d') : str_replace('(Pakistan Standard Time)', '', $request->post('paper_date'));
        $paper->paper_time = empty($request->post('paper_time')) ? '' : $request->post('paper_time');
        $paper->total_marks = empty($request->post('total_marks')) ? 0 : $request->post('total_marks');;
        $paper->blank_lines = empty($request->post('blank_lines')) OR $request->post('blank_lines') === "null" ? 0 : $request->post('blank_lines');
        $paper->is_saved = 1;
        $paper->save();

        $response['data'] = true;
        return response()->json($response);
    }

    public function removeSavedPaper(Request $request)
    {
        if (!$request->has('id')) {
            return [];
        }

        $id = Helper::easyDecode($request->post('id'));
        $item = SavedPapers::find($id);
        if($item)
            $item->delete();

        return response()->json($item);
    }

    public function markAsCorrectOption(Request $request) {
        $response = [
            'status' => false,
            'message' => 'Something went wrong, please try again later!',
            'data' => []
        ];

        if(!$request->has('id') OR !$request->has('correct_answer')) {
            return $response;
        }

        $id = Helper::easyDecode($request->get('id'));
        $question_t = QuestionTranslation::where('question_id', $id)->first();
        if(empty($question_t))
            return $response;

        $question_t->correct_answer = $request->get('correct_answer');
        $question_t->save();

        $response['status'] = true;
        $response['message'] = 'Success';
        $response['data'] = $question_t;

        return $response;
    }
}
