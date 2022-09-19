<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class QuestionType extends Model
{
    protected $table = 'question_types';

    protected $fillable = [
        'subject_id',
        'class_id',
        'name',
        'title',
        'parent_id',
        'section_id',
        'form_type',
        'allow_import',
        'is_active',
        'priority'
    ];

    public function questions() {
        return $this->hasMany(Question::class, 'type_id', 'id');
    }
}
