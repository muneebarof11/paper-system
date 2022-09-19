<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class QuestionTypeBySection extends Model
{
    public $timestamps = false;

    protected $table = 'question_type_by_section';

    protected $fillable = ['section_id', 'q_type_id'];

    public function question_type() {
        return $this->belongsTo(QuestionType::class,'id', 'q_type_id');
    }
}
