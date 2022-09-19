<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class QuestionOption extends Model
{
    protected $table = 'question_options';

    protected $fillable = [
        'question_id',
        'translation_id',
        'question_option',
        'is_active'
    ];

    public $timestamps = false;
}
