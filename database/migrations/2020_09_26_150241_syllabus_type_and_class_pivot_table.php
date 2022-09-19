<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SyllabusTypeAndClassPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('class_syllabus_type', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('syllabus_type_id', false);
            $table->bigInteger('class_id', false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('class_syllabus_type');
    }
}
