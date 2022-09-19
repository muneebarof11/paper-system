<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SavePaperQuestions extends Model
{
    protected $table = 'saved_papers_questions';

    public $timestamps = false;

    protected $fillable = [
        'search_results',
        'questions',
        'index'
    ];
}
