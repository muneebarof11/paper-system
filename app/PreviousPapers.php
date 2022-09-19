<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PreviousPapers extends Model
{
    use SoftDeletes;

    public $timestamps = false;

    protected $table = 'previous_papers';

    protected $fillable = [
        'publisher_id',
        'class_id',
        'subject_id',
        'chapter'
    ];

    public function files() {
        return $this->hasMany(PaperFiles::class, 'previous_paper_id','id');
    }
}
