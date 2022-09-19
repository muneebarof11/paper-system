<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SyllabusType extends Model
{
    use SoftDeletes;

    protected $table = 'syllabus_type';

    protected $fillable = ['name', 'is_active', 'deleted_at'];

    public function classes() {
        return $this->belongsToMany(
            Classes::class,
            'class_syllabus_type',
            'syllabus_type_id',
            'class_id');
    }

    public function subjects() {
        return $this->belongsToMany(
            Subject::class,
            'class_syllabus_type',
            'syllabus_type_id',
            'class_id')->withPivot( 'subject_id');
    }
}
