<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/institutes', function () {
    return response()->json(\App\Institute::all());
});

Route::get('docs', 'API\PaperSystemController@phpdocs');

Route::get('/get-syllabus-types', 'API\PaperSystemController@getSyllabusTypes');
Route::get('/get-all-classes', 'API\PaperSystemController@getAllClasses');
Route::get('/get-all-subjects', 'API\PaperSystemController@getAllSubjects');
Route::get('/get-question-types', 'API\PaperSystemController@getQuestionTypes');
Route::get('/get-question-types-by-section-ids', 'API\PaperSystemController@getQuestionTypesBySectionIds');
Route::get('/get-classes-by-syllabus-types/{id}', 'API\PaperSystemController@getClassesBySyllabus');
Route::get('/get-subjects-by-class/{class_id}/{publisher_id}', 'API\PaperSystemController@getSubjectsByClassId');
Route::get('/get-a-subject-by-id/{subject_id}', 'API\PaperSystemController@getASubjectByID');
Route::get('/get-a-class-by-id/{class_id}', 'API\PaperSystemController@getAClassByID');

Route::get('/get-syllabus-by-subject/{id}', 'API\PaperSystemController@getSyllabusBySubject');
Route::get('/get-subject-sections/', 'API\PaperSystemController@getSubjectSections');
Route::get('/get-questions-by-class-subjects', 'API\PaperSystemController@getQuestionsByClassSubjects');
Route::get('/get-mcq-of-topic', 'API\PaperSystemController@getMcqOfTopic');
Route::get('/get-general-question', 'API\PaperSystemController@getGeneralQuestion');

Route::post('/validate-registration-key', 'API\PaperSystemController@validateKey');
Route::post('/add-class', 'API\PaperSystemController@addClass');
Route::post('/add-subject', 'API\PaperSystemController@addSubject');
Route::post('/update-subject', 'API\PaperSystemController@updateSubject');
Route::post('/add-syllabus-type', 'API\PaperSystemController@addSyllabusType');
Route::post('/update-publisher', 'API\PaperSystemController@updatePublisher');
Route::post('/add-subject-topic', 'API\PaperSystemController@addSubjectTopic');
Route::post('/add-mcq-question', 'API\PaperSystemController@addMcqQuestion');
Route::post('/add-match-column-question', 'API\PaperSystemController@addMatchColumnQuestion');
Route::post('/add-general-question', 'API\PaperSystemController@addGeneralQuestion');
Route::post('/add-image-question', 'API\PaperSystemController@addImageQuestion');
Route::post('/mark-as-correct-option', 'API\PaperSystemController@markAsCorrectOption');

// Syllabus type is later re-named to publisher
Route::post('remove-publisher', 'API\PaperSystemController@removeSyllabusType');
Route::post('remove-a-class', 'API\PaperSystemController@removeAClass');
Route::post('remove-a-subject', 'API\PaperSystemController@removeASubject');
Route::post('remove-a-section', 'API\PaperSystemController@removeASection');
Route::post('remove-a-topic', 'API\PaperSystemController@removeATopic');
Route::post('remove-a-question', 'API\PaperSystemController@removeAQuestion');
Route::any('search-questions', 'API\PaperSystemController@searchQuestions');
Route::post('search-papers', 'API\PaperSystemController@searchPapers');
Route::post('saved-papers', 'API\PaperSystemController@savedPapers');
Route::post('upload-papers', 'API\PaperSystemController@uploadPapers');
Route::post('remove-paper', 'API\PaperSystemController@removePaper');

Route::get('get-all-question-types', 'API\PaperSystemController@getAllQuestionTypes');
Route::post('add-question-type', 'API\PaperSystemController@addQuestionType');
Route::post('remove-question-type', 'API\PaperSystemController@deActiveQuestionTypeFromSection');
Route::post('confirm-questions', 'API\PaperSystemController@confirmQuestions');
Route::post('get-saved-questions', 'API\PaperSystemController@getSavedQuestions');
Route::post('get-answer-keys', 'API\PaperSystemController@getAnswerKeys');
Route::post('remove-saved-question-section', 'API\PaperSystemController@removeSavedQuestionSection');
Route::post('save-paper', 'API\PaperSystemController@savePaper');
Route::post('remove-saved-paper', 'API\PaperSystemController@removeSavedPaper');

/**
 * QUESTIONS IMPORT ROUTE
 */
Route::post('process-subject-topics-file', 'API\DataImportController@processSubjectTopicsFile');
Route::post('import-questions', 'API\QuestionImportController@importQuestions');
//Route::post('import-questions', 'API\MathQuestionImportController@importQuestions');
