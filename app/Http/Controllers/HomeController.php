<?php

namespace App\Http\Controllers;

use App\Classes;
use App\Helper;
use App\Http\Controllers\API\PaperSystemController;
use App\Institute;
use App\PreviousPapers;
use App\SavedPapers;
use App\Sections;
use App\Subject;
use App\SyllabusType;
use App\User;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use PhpOffice\PhpWord\Style\Paper;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
//        Auth::loginUsingId(3);
        $this->middleware('auth')->except(['home']);
        $this->middleware('institute');
    }

    public function index()
    {
        $user = Auth::user();

        $data = Institute::find($user->institute_id);

        $roles = Auth::user()->roles;
        if(empty($roles)) {
            return redirect('access-denied');
        }

        $role_names = $roles->pluck('name')->toArray();

        if(!in_array('super', $role_names)) {
            return redirect('access-denied');
        }

        return view('layouts.react_view', ['data' => $data, 'user' => $user]);
    }

    public function school(Request $request)
    {
        $uri = $request->path();
        $user = Auth::user();
        $data = Institute::find($user->institute_id);

        $roles = Auth::user()->roles;
        if(empty($roles)) {
            return redirect('access-denied');
        }

        $role_names = $roles->pluck('name')->toArray();

        if(!in_array('super', $role_names)) {
            return redirect('access-denied');
        }

        return view('react.'.$uri, ['data' => $data, 'user' => $user]);
    }

    public function publishers(Request $request)
    {
        $uri = $request->path();
        $user = Auth::user();
        $data = Institute::find($user->institute_id);
        $publishers = SyllabusType::all()->toArray();
        return view('react.'.$uri, ['data' => $data, 'user' => $user, 'publishers' => $publishers]);
    }

    public function classes(Request $request)
    {
        if(!$request->has('stid')) return redirect('/dashboard');

        $uri = $request->path();
        if(Helper::checkUserRole('teacher', false)) {
            $uri = (str_replace('School', 'Papers', $uri));
        }

        $publisher_id = $request->get('stid');
        $api = new PaperSystemController();
        $classes_by_publisher = $api->getClassesBySyllabus($publisher_id)->getData(true);
        $all_classes = $api->getAllClasses()->getData(true);
        $all_publishers = SyllabusType::all()->toArray();

        $user = Auth::user();
        $data = Institute::find($user->institute_id);
        return view('react.'.$uri, [
            'data' => $data,
            'user' => $user,
            'classes' => !empty($classes_by_publisher) ? $classes_by_publisher['classes'] : [],
            'all_classes' => $all_classes,
            'all_publishers' => $all_publishers,
        ]);
    }

    public function subjects(Request $request)
    {
        if(!$request->has('stid')) return redirect('/dashboard');
        if(!$request->has('cid')) return redirect('/dashboard');

        $uri = $request->path();
        if(Helper::checkUserRole('teacher', false)) {
            $uri = (str_replace('School', 'Papers', $uri));
        }

        $publisher_id = $request->get('stid');
        $class_id = $request->get('cid');
        $api = new PaperSystemController();
        $subjects_by_class = $api->getSubjectsByClassId($class_id, $publisher_id);
        $all_subjects = $api->getAllSubjects();

        $subjects_by_class = $subjects_by_class->getData(true);
        $all_subjects = $all_subjects->getData(true);
        $all_classes = $api->getClassesBySyllabus($publisher_id)->getData(true);

        $user = Auth::user();
        $data = Institute::find($user->institute_id);
        return view('react.'.$uri, [
            'data' => $data,
            'user' => $user,
            'subjects' => !empty($subjects_by_class) ? $subjects_by_class['subjects'] : [],
            'all_subject' => $all_subjects,
            'all_classes' => !empty($all_classes) ? $all_classes['classes'] : [],
        ]);
    }

    public function sections(Request $request)
    {
        if(!$request->has('stid')) return redirect('/dashboard');
        if(!$request->has('cid')) return redirect('/dashboard');
        if(!$request->has('suid')) return redirect('/dashboard');

        $uri = $request->path();
        if(Helper::checkUserRole('teacher', false)) {
            $uri = (str_replace('School', 'Papers', $uri));
        }

        $publisher_id = $request->get('stid');
        $class_id = $request->get('cid');
        $subject_id = $request->get('suid');

        $api = new PaperSystemController();
        $request->request->add([
            'subject_id' => $subject_id,
            'class_id' => $class_id,
            'syllabus_type_id' => $publisher_id
        ]);

        $subject_sections = $api->getSubjectSections($request)->getData(true);
        $user = Auth::user();
        $data = Institute::find($user->institute_id);
        return view('react.'.$uri, [
            'data' => $data,
            'user' => $user,
            'subject_sections' => $subject_sections,
            'class' => Classes::find(Helper::easyDecode($class_id)),
            'subject' => Subject::find(Helper::easyDecode($subject_id)),
        ]);
    }

    public function questions(Request $request)
    {
        if(!$request->has('stid')) return redirect('/dashboard');
        if(!$request->has('cid')) return redirect('/dashboard');
        if(!$request->has('suid')) return redirect('/dashboard');

        $uri = $request->path();
        if(Helper::checkUserRole('teacher', false)) {
            $uri = (str_replace('School', 'Papers', $uri));
        }

        $publisher_id = $request->get('stid');
        $class_id = $request->get('cid');
        $subject_id = $request->get('suid');
        $section_id = $request->get('seid');
        $topic_id = $request->get('tid');

        $api = new PaperSystemController();
        $request->request->add([
            'syllabus_type_id' => $publisher_id,
            'class_id' => $class_id,
            'subject_id' => $subject_id,
            'section_id' => $section_id,
            'topic_id' => $topic_id
        ]);

        $all_question_types = $api->getAllQuestionTypes()->getData(true);
        $question_types = $api->getQuestionTypes($request)->getData(true);
        $questions = $api->getQuestionsByClassSubjects($request)->getData(true);
        $question_types_with_questions = [];
        for($i=0; $i < count($question_types); $i++) {
            $question_types_with_questions[$question_types[$i]['name']] = ['data' => $questions[$i]['questions']];
        }

        $user = Auth::user();
        $data = Institute::find($user->institute_id);
        $sections = $api->getSubjectSections($request)->getData(true);
        return view('react.'.$uri, [
            'data' => $data,
            'user' => $user,
            'question_types' => $question_types,
            'question_types_with_questions' => $question_types_with_questions,
            'all_question_types' => $all_question_types,
            'class' => Classes::find(Helper::easyDecode($class_id)),
            'subject' => Subject::find(Helper::easyDecode($subject_id)),
            'sections' => $sections
        ]);
    }

    public function preview(Request $request)
    {
        $uri = $request->path();
        $user = Auth::user();
        $data = Institute::find($user->institute_id);

        $roles = Auth::user()->roles;
        if($roles->isEmpty()) {
            return redirect('access-denied');
        }

        $role_names = $roles->pluck('name')->toArray();

        // if(!in_array('super', $role_names)) {
        //     return redirect('access-denied');
        // }

        $publishers = SyllabusType::all()->toArray();
        return view('react.'.$uri, ['data' => $data, 'user' => $user, 'publishers' => $publishers]);
    }

    public function papers()
    {
        $user = Auth::user();
        $data = Institute::find($user->institute_id);
        return view('layouts.react_view', ['data' => $data, 'user' => $user]);
    }

    public function oldPapers()
    {
        $user = Auth::user();
        $roles = Auth::user()->roles;
        if(empty($roles)) {
            return redirect('access-denied');
        }

        $data = Institute::find($user->institute_id);
        $publishers = SyllabusType::all()->toArray();
        return view('react.old', ['data' => $data, 'user' => $user, 'publishers' => $publishers]);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function home()
    {
        return redirect('/dashboard');
    }

    public function dashboard() {

        $user = Auth::user();
        $data = Institute::find($user->institute_id);

        $roles = Auth::user()->roles;
        if(empty($roles)) {
            return redirect('logout');
        }

        $role_names = $roles->pluck('name')->toArray();
        $role_names = implode(',', $role_names);
        $stats = [
            'publishers' => SyllabusType::all()->count(),
            'saved_papers' => SavedPapers::where('added_by', Auth::user()->id)->count(),
            'old_papers' => PreviousPapers::all()->count(),
            'past_papers' => 0
        ];
        return view('school.dashboard', ['data' => $data, 'user' => $user, 'roles' => $role_names, 'stats' => $stats]);
    }

    public function accesDenied() {
        $user = Auth::user();
        $data = Institute::find($user->institute_id);
        return view('auth.acces-denied', ['data' => $data, 'user' => $user]);
    }

    public function stats() {
        $user = Auth::user();
        $data = Institute::find($user->institute_id);

        $roles = Auth::user()->roles;
        $role_names = implode(',', $roles->pluck('name')->toArray());
        $recent_questions = [];
        $recent_sections = [];
        $recent_logins = [];
        $recent_question_types = [];

        return view('school.dashboard', [
            'data' => $data,
            'user' => $user,
            'roles' => $role_names,
        ]);
    }

    public function publisher() {
        return '';
    }
}
