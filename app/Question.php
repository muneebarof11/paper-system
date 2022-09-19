<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Question extends Model
{
    use SoftDeletes;

    protected $table = 'questions';

    protected $fillable = [
        'subject_id',
        'class_id',
        'type_id',
        'section_id',
        'topic_id',
        'is_active',
        'exercise',
        'past_paper',
        'additional'
    ];

    public function translations()
    {
        return $this->hasMany(QuestionTranslation::class, 'question_id', 'id');
    }

}
