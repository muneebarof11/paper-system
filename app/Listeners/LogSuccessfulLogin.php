<?php


namespace App\Listeners;


use Carbon\Traits\Date;
use Illuminate\Support\Facades\Auth;

class LogSuccessfulLogin
{
    public function handle() {
        $user = Auth::user();
        if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])){
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else if(isset($_SERVER['REMOTE_ADDR'])) {
            $ip = $_SERVER['REMOTE_ADDR'];
        } else {
            $ip = '0.0.0.0';
        }

        $user->info()->insert([
            'user_id' => $user->id,
            'last_login' => date('Y-m-d H:i:s', time()),
            'ip' => $ip
        ]);

    }
}
