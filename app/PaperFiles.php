<?php


namespace App;


use Illuminate\Database\Eloquent\Model;

class PaperFiles extends Model
{
    public $timestamps = false;

    protected $table = 'paper_files';

    protected $fillable = ['previous_paper_id', 'file_path', 'name'];
}
