<?php

namespace App\Http\Middleware;

use App\Institute;
use Carbon\Carbon;
use Closure;
use Illuminate\Support\Facades\Auth;

class InstituteMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = Auth::user();
        if(empty($user ))
            return redirect('logout');

        $data = Institute::where('id', $user->institute_id)->first();
        if(empty($data)) {
            Auth::logout();
            return redirect('login')->with('alert-danger', 'Your account has been blocked, please contact system admin!');
        }

        if($data->trial_active === 1 AND $data->is_active === 0) {
            $now = Carbon::now();
            $trail_expire_time = Carbon::parse($data->trial_expires_in);
            if($now->gt($trail_expire_time))
            {
                Auth::logout();
                return redirect('login')->with('alert-danger', 'Your trial has ended, please contact system admin!');
            }

            return $next($request);
        }

        if($data->is_active === 0)
        {
            Auth::logout();
            return redirect('login')->with('alert-danger', 'Your account has been blocked, please contact system admin!');
        }

        return $next($request);
    }
}
