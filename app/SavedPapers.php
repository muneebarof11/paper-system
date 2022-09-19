<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SavedPapers extends Model
{
    use SoftDeletes;

    protected $table = 'saved_papers';

    protected $fillable = [
        'publisher_id',
        'class_id',
        'subject_id',
        'title',
        'name',
        'medium',
        'paper_code',
        'paper_time',
        'total_marks',
        'is_saved',
        'section_ids',
        'topic_ids',
        'added_by'
    ];

    public function questions() {
        return $this->hasMany(SavePaperQuestions::class, 'saved_paper_id', 'id');
    }

    public function getPaperDateAttribute($value) {
        return !empty($value) ? date('d-m-Y', strtotime($value)) : '';
    }
}
