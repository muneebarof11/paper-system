<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/**
 *******************************************************
 * This is generic route for all web views
 * All pages routes are defined in ReactJs App
 * /resources/js/components/Router.js (main file)
 *
 * And for v1, routes.js file is in v1 directory
 *******************************************************
 */

/**
 * INDEX ROUTE
 */
Route::get('/', 'HomeController@home')->name('home');

/**
 * AUTH ROUTES
 */
Auth::routes();

/**
 * ROUTE TO HANDLE REACT VIEWS
 * Routes List:
 * ----------------
 * 1. /dashboard
 * 2. /classes
 * 3. /subjects?{cid?} (base64 encoded class ID)
 * 4. /syllabus?{cid?}&{suid?} (base64 encoded class ID and subject ID}
 * 5. /sections?{cid?}&{suid?}&{stid} (base64 encoded class ID, subject ID and syllabus id}
 * 6. /import-questions
 *
 */
//Route::get('/School/{path?}', 'HomeController@index');
//Route::get('/Papers/{path?}', 'HomeController@papers');

Route::prefix('School')->middleware('institute')->group(function () {
    Route::get('/', function(){return redirect('/School/publishers');});
    Route::get('/publishers', 'HomeController@publishers');
    Route::get('/classes', 'HomeController@classes');
    Route::get('/subjects', 'HomeController@subjects');
    Route::get('/sections', 'HomeController@sections');
    Route::get('/questions', 'HomeController@questions');
});

Route::prefix('Papers')->middleware('institute')->group(function () {
    Route::get('/', function(){return redirect('/Papers/publishers');});
    Route::get('/create-paper', function(){return redirect('/Papers/publishers');});
    Route::get('/publishers', 'HomeController@publishers');
    Route::get('/classes', 'HomeController@classes');
    Route::get('/subjects', 'HomeController@subjects');
    Route::get('/sections', 'HomeController@sections');
    Route::get('/questions', 'HomeController@questions');
    Route::get('/preview', 'HomeController@preview');
});

Route::get('/previous-papers', 'HomeController@oldPapers');
Route::get('/saved-papers', 'HomeController@oldPapers');

/**
 * SHOULD BE ACCESS-ABLE TO ADMIN ONLY
 */
Route::resource('App', 'InstituteRegisterController');
Route::get('App/{id}/users', 'InstituteRegisterController@users');
Route::get('App/users/create', 'InstituteRegisterController@createUser');
Route::post('App/users/create', 'InstituteRegisterController@storeUser')->name('App.User.Create');
Route::get('App/users/edit/{id}', 'InstituteRegisterController@editUser')->name('App.User.Edit');
Route::get('App/users/delete/{id}/{inst_id}', 'InstituteRegisterController@deleteUser')->name('App.User.Delete');
Route::get('App/users/profile/{id}', 'InstituteRegisterController@profileUser')->name('App.User.Profile');
Route::post('App/users/edit/{id}', 'InstituteRegisterController@updateUser')->name('App.User.Update');
Route::get('App/{id}/{action}', 'InstituteRegisterController@toggleInstituteStatus')->name('App.Toggle.Status');
Route::get('App/{id}/trial/{days}/{status}', 'InstituteRegisterController@toggleInstituteTrial')->name('App.Toggle.Trial');

Route::get('/dashboard', 'HomeController@dashboard');
Route::get('/home', 'HomeController@home')->name('home');

Route::get('logout', 'Auth\LoginController@logout');
Route::get('access-denied', 'HomeController@accesDenied');

/**
 * DUMMY ROUTE
 */
Route::get('hash', function () {
    return \Illuminate\Support\Facades\Hash::make('03018172328');
});


/**
 * view ENDPOINTS
 */
//Route::get('/publishers', 'SSRController@ssrPublishers');
//Route::get('admin/publishers', 'SSRController@adminPublishers');

Route::get('test', function () {
   $q_types = \App\QuestionType::get();
   foreach($q_types as $type) {
       $name = \Illuminate\Support\Str::slug($type->title);
       $type->name = str_replace('-', '_', $name);
       $type->save();

       echo($type->name) . '<br />';

   }
});
