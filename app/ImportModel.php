<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Maatwebsite\Excel\Concerns\ToModel;

class ImportModel extends Model implements ToModel
{
    public function model(array $row)
    {
        return $row[1];
    }
}
