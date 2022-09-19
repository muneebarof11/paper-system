<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class QuestionTranslation extends Model
{
    protected $table = 'question_translations';

    protected $fillable = [
        'question_id',
        'type_id',
        'section_id',
        'locale',
        'question_statement',
        'question_words',
        'question_image',
        'left_column_options',
        'right_column_options',
        'correct_answer'
    ];

    public function options() {
        return $this->hasMany(QuestionOption::class, 'question_id','question_id');
    }

    public function question() {
        return $this->belongsTo(Question::class, 'question_id', 'id');
    }
}
