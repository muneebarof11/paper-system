<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Institute extends Model
{
    protected $table = 'institutes';

    protected $fillable = [
        'name',
        'registration_key',
        'phone1',
        'phone2',
        'address1',
        'address2',
        'logo_position',
        'logo',
        'logo_secondary',
        'is_active',
        'trial_expires_in',
        'trial_active'
    ];

    protected $hidden = [
      'registration_key'
    ];

    public function getCreatedAtAttribute($val) {
        return date('d M, Y', strtotime($val));
    }

    public function users()
    {
        return $this->hasMany(User::class, 'institute_id', 'id');
    }
}
