<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Classes extends Model
{
    use SoftDeletes;

    protected $table = 'classes';

    protected $fillable = ['name', 'level', 'is_active'];

    protected $casts = [
        'some_date' => 'dateTime: Y-m-d'
    ];

    public function subjects() {
        return $this->belongsToMany(
            Subject::class,
            'class_subjects',
            'class_id',
            'subject_id')->withPivot('thumbnail');
    }
}
