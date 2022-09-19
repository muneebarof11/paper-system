<?php

namespace App\Http\Controllers;

use App\Helper;
use App\Institute;
use App\Role;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class InstituteRegisterController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $checkRole = Helper::checkUserRole('super');
        if($checkRole !== true)
            return $checkRole;

        $data = Institute::orderBy('id', 'desc')->with(['users' => function($query) {
            return $query->count();
        }])->get();

        return view('Institutes.list', ['data' => $data]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $checkRole = Helper::checkUserRole('super');
        if($checkRole !== true)
            return $checkRole;

        return view('Institutes.create');
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function store(Request $request)
    {
        $checkRole = Helper::checkUserRole('super');
        if($checkRole !== true)
            return $checkRole;

        try {
            $post = $request->all();
            if (!$request->has('name')) {
                return redirect()->back()->with('alert-warning', 'Something went wrong, please contact system admin!');
            }

            $post['registration_key'] = base64_encode(base64_encode($post['name']));
            $institute = Institute::create($post);
            $file = $request->file('logo');
            $path = 'img/institutes/' . $institute->id;
            if(!empty($file)) {
                $logo = $this->fileUpload($post, $file, $path, 'primary_logo');
                $institute->update(['logo' => $logo]);
            }
            $file2 = $request->file('secondary_logo');
            if(!empty($file2)) {
                $logo_secondary = $this->fileUpload($post, $file2, $path, 'secondary_logo');
                $institute->update(['logo_secondary' => $logo_secondary]);
            }

            return redirect('App')->with('alert-success', $post['name'] . ' added to your system!');
        } catch (\Exception $e) {

            return redirect()->back()->with('alert-warning', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $checkRole = Helper::checkUserRole('super');
        if($checkRole !== true)
            return $checkRole;

        $institute = Institute::find($id);
        return view('Institutes.edit', ['data' => $institute]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $checkRole = Helper::checkUserRole('super');
        if($checkRole !== true)
            return $checkRole;

        try {
            $post = $request->all();
            $institute = Institute::find($id);
            if(empty($institute)) {
                return redirect()->back()->with('alert-warning', 'Key is invalid, please contact system admin!');
            }
            $institute->update($post);

            $file = $request->file('logo');
            $path = 'img/institutes/' . $institute->id;
            if(!empty($file)) {
                $logo = $this->fileUpload($post, $file, $path, 'primary_logo');
                $institute->update(['logo' => $logo]);
            }
            $file2 = $request->file('secondary_logo');
            if(!empty($file2)) {
                $logo_secondary = $this->fileUpload($post, $file2, $path, 'secondary_logo');
                $institute->update(['logo_secondary' => $logo_secondary]);
            }

            return redirect('App')->with('alert-success', $post['name'] . ' updated successfully!');
        } catch (\Exception $e) {

            return redirect()->back()->with('alert-warning', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function toggleInstituteStatus($id, $status)
    {
        $check_role = Helper::checkUserRole('super', true);
        if(!$check_role)
            return $check_role;

        $institute = Institute::find($id);
        if(empty($institute))
            return redirect()->back();

        $institute->is_active = $status === 'disable' ? 0 : 1;
        $institute->save();

        return redirect('App');
    }

    public function toggleInstituteTrial($id, $days, $status)
    {
        $check_role = Helper::checkUserRole('super', true);
        if(!$check_role)
            return $check_role;

        $institute = Institute::find($id);
        if(empty($institute))
            return redirect()->back()->with('Something went wrong!');

        $institute->trial_active = 0;
        $date = Carbon::now()->addDays($days);
        $institute->trial_expires_in = $date;

        if($status === 'enable')
            $institute->trial_active = 1;
            
        $institute->save();

        return redirect('App')->with('Trail activated');
    }

    private function fileUpload($post, $file, $path, $type) {

        $checkRole = Helper::checkUserRole('super');
        if($checkRole !== true)
            return $checkRole;

        $name = Str::slug($post['name']);
        $destination = public_path($path);
        $file_name = $name . '-'.$type.'.' . $file->extension();

        if(!file_exists($destination)) {
            mkdir($destination, 0777);
        }
        $file->move($destination, $file_name);
        return $path . '/' . $file_name;
    }

    public function users($inst_id) {

        if(empty($inst_id))
            return redirect('App');

        $checkSuper = Helper::checkUserRole('super');
        $checkAdmin = Helper::checkUserRole('admin');

        if($checkSuper !== true and $checkAdmin !== true)
            return $checkSuper;

        $institute = Institute::find($inst_id);
        session(['institute' => $institute]);

        if($checkSuper === true)
            $users = User::where('institute_id', $inst_id)
                ->where('username', '<>', 'superadmin')
                ->with('roles')->get();

        if($checkAdmin === true)
            $users = User::where('institute_id', $inst_id)
                ->where('added_by', Auth::user()->id)
                ->with('roles')->get();

        return view('Users.list', ['data' => $users, 'institute' => $institute]);
    }

    public function createUser() {
        $institute = session('institute');
        if(empty($institute))
            return redirect('App');

        $checkSuper = Helper::checkUserRole('super');
        $checkAdmin = Helper::checkUserRole('admin');

        if($checkSuper !== true and $checkAdmin !== true)
            return $checkSuper;

        return view('Users.create');
    }

    public function storeUser(Request $request) {

        $validator = Validator::make(
            $request->all(), [
                'name'=>'required',
                'email'=>'required|email:rfc',
                'username'=>'required',
                'password' => 'required',
            ]
        );

        if($validator->fails()) {
            return redirect()->back()->withInput()->withErrors($validator->errors());
        }

        $institute = session('institute');
        if(empty($institute))
            return redirect()->back()->withErrors(['errors' => ['Something went wrong']]);

        $user = User::where('username', $request->post('username'))
            ->where('institute_id', $institute->id)
            ->first();

        if(!empty($user)) {
            return redirect()->back()->withErrors(['errors' => ['User with Same username already exists!']]);
        }

        $user = User::create([
            'added_by' => Auth::user()->id,
            'institute_id' => $institute->id,
            'name' => $request->post('name'),
            'email' => $request->post('email'),
            'username' => $request->post('username'),
            'password' => Hash::make($request->post('password')),
            'status' => $request->post('is_active')
        ]);

        $role = Role::where('name', $request->post('role'))->first();
        if(!empty($role)) {
            $user->roles()->save($role);
        }

        Session::flash('alert-success', 'User Added!');
        return redirect("App/{$institute->id}/users");
    }

    public function editUser($id) {
        $institute = session('institute');
        if(empty($institute))
            return redirect('App');

        $checkSuper = Helper::checkUserRole('super');
        $checkAdmin = Helper::checkUserRole('admin');

        if($checkSuper !== true and $checkAdmin !== true)
            return $checkSuper;

        $data = User::find($id);
        $roles = $data->roles()->pluck('name')->toArray();
        $data->role = $roles[0];
        if($data->added_by != Auth::user()->id AND $checkSuper !== true) {
            return redirect('access-denied');
        }

        return view('Users.edit')->with(['data' => $data]);
    }

    public function deleteUser($id, $inst_id) {
        $user = User::find($id);
        if(empty($user)) return redirect()->back();

        $user->delete();
        return redirect("/App/{$inst_id}/users")->with("{$user->name} Removed!");
    }

    public function profileUser($id) {
        $data = Auth::user();
        if($data->id != $id) {
            return redirect('access-denied');
        }

        return view('Users.profile')->with(['data' => $data]);
    }

    public function updateUser(Request $request, $id) {

        $rules = [
            'name'=>'required',
            'email'=>'required|email:rfc',
        ];
        if($request->has('password') AND !empty($request->post('password'))) {
            $rules['password'] = 'required';
        }
        $validator = Validator::make($request->all(), $rules);

        if($validator->fails()) {
            return redirect()->back()->withInput()->withErrors($validator->errors());
            return redirect()->back()->withInput()->withErrors($validator->errors());
        }

        $user = User::find($id);
        $user->name = $request->post('name');
        $user->email = $request->post('email');
        if($request->has('is_active')) {
            $user->status = $request->post('is_active');
        }
        if($request->has('password') AND !empty($request->post('password'))) {
            $user->password = Hash::make($request->post('password')) ;
        }
        $user->save();

        Session::flash('alert-success', 'User Updated!');

        $institute = session('institute');
        if(!empty($institute))
            return redirect("App/{$institute->id}/users");
        else
            return redirect("dashboard");
    }
}
