<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePrimaryTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('email')->unique()->nullable();
            $table->string('username')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('institutes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('registration_key')->unique();
            $table->string('name', 500);
            $table->string('logo', 255);
            $table->string('phone1', 100);
            $table->string('phone2', 100)->nullable();
            $table->string('address1', 1000);
            $table->string('address2', 1000)->nullable();
            $table->enum('logo_position', ['left', 'right', 'double'])->default('left');
            $table->tinyInteger('header_template', false)->default(1);
            $table->tinyInteger('is_active', false)->default(1);
            $table->timestamps();
        });

        Schema::create('syllabus_type', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')->unique();
            $table->tinyInteger('is_active', false)->default(1);
            $table->timestamps();
        });

        Schema::create('classes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('syllabus_type_ids', 50);
            $table->integer('level');
            $table->tinyInteger('is_active', false)->default(1);
            $table->timestamps();
        });

        Schema::create('subjects', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->integer('class_id', false);
            $table->string('syllabus_type_ids', 50);
            $table->string('cover_thumbnail', 255);
            $table->tinyInteger('is_active', false)->default(1);
            $table->timestamps();
        });

        Schema::create('class_subjects', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->longText('subject_ids');
            $table->string('syllabus_type_ids', 50);
            $table->tinyInteger('is_active', false)->default(1);
            $table->timestamps();
        });

        Schema::create('subject_sections', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('subject_id', false);
            $table->integer('class_id', false);
            $table->string('name');
            $table->integer('parent_id', false)->default(0);
            $table->tinyInteger('is_active', false)->default(1);
            $table->timestamps();
        });

        Schema::create('question_types', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('subject_id', false);
            $table->integer('class_id', false);
            $table->string('name');
            $table->integer('parent_id', false)->default(0);
            $table->tinyInteger('is_active', false)->default(1);
            $table->timestamps();
        });

        Schema::create('questions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('subject_id', false);
            $table->integer('class_id', false);
            $table->integer('type_id', false);
            $table->tinyInteger('is_active', false)->default(1);
            $table->timestamps();
        });

        Schema::create('question_translations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('question_id', false);
            $table->integer('type_id', false);
            $table->string('locale', 10)->default('en');
            $table->longText('question_statement');
            $table->string('question_image', 255);
            $table->longText('question_options');
            $table->longText('left_column_options');
            $table->longText('right_column_options');
            $table->string('correct_answer', 255);
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('institutes');
        Schema::dropIfExists('syllabus_type');
        Schema::dropIfExists('classes');
        Schema::dropIfExists('subjects');
        Schema::dropIfExists('class_subjects');
        Schema::dropIfExists('subject_sections');
        Schema::dropIfExists('question_types');
        Schema::dropIfExists('questions');
        Schema::dropIfExists('question_translations');
    }
}
