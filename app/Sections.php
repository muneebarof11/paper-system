<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sections extends Model
{
    use SoftDeletes;

    protected $table = 'subject_sections';

    protected $fillable = [
        'class_id',
        'subject_id',
        'section_id',
        'syllabus_type',
        'name',
        'rtl_name',
        'parent_id',
        'parent_title',
        'rlt_parent_title',
        'subject_code',
        'is_active'
    ];

    public function children()
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    public function parent()
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    public function questions()
    {
        return $this->hasMany(Question::class, 'section_id', 'id');
    }

    public function topic_questions() {
        return $this->hasMany(Question::class, 'topic_id', 'id');
    }

}
