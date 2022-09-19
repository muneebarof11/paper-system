<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subject extends Model
{
    use SoftDeletes;

    protected $table = 'subjects';

    protected $fillable = ['name', 'cover_thumbnail', 'is_active', 'medium'];

    public static $special_subjects = ['eng', 'urd', 'isl'];

    public static $subject_section_map = [
        'urd' => [
            'subjective' => [
                'section' => 'حصہ نثر',
                'types' => [
                    'mcq' => 'کثیر الانتخابی سوالات',
                    'short_question' => 'مختصرسوالات',
                    'long_question' => 'نثر پاروں کی تشریح',
                    'long_question2' => 'سبق کا خلاصہ'
                ]
            ],
            'poetry' => [
                'section' => 'حصہ نظم',
                'types' => [
                    'mcq' => 'کثیر الانتخابی سوالات',
                    'short_question' => 'مختصرسوالات',
                    'long_question' => 'اشعار کی تشریح',
                    'long_question2' => 'نظم کا مرکزی خیال / خلاصہ'
                ]
            ],
            'poetry2' => [
                'section' => 'حصہ غزل',
                'types' => [
                    'mcq' => 'کثیر الانتخابی سوالات',
                    'short_question' => 'مختصرسوالات',
                    'long_question' => 'اشعار کی تشریح',
                    'long_question2' => 'کثیر الانتخابی سوالات',
                ]
            ],
            'grammer' => [
                'section' => 'حصہ گرامر',
                'types' => [
                    'short_question' => 'خطوط',
                    'short_question2' => 'درخواستیں',
                    'short_question3' => 'کہانیاں',
                    'short_question4' => 'مکالمے',
                    'long_question' => 'جملوں کی درستی',
                    'long_question2' => 'جملوں کی تکمیل'
                ]
            ]
        ],
        'eng' => [
            'subjective' => [
                'section' => 'Lessons',
                'types' => [
                    'mcq' => 'MCQs',
                    'short_question' => 'Short Questions',
                    'long_question' => 'Translate into Urdu',
                    'long_question2' => 'Summary',
                    'long_question3' => 'Phrases / Idioms',
                ]
            ],
            'subjective2' => [
                'section' => 'Poems',
                'types' => [
                    'mcq' => 'MCQs',
                    'short_question' => 'Short Questions',
                    'long_question' => 'Summary',
                    'long_question2' => 'Reference to the Context',
                ]
            ],
            'subjective3' => [
                'section' => 'Grammar',
                'types' => [
                    'mcq' => 'MCQs',
                    'long_question' => 'Letters',
                    'long_question2' => 'Stories',
                    'long_question3' => 'Dialogue',
                    'long_question4' => 'Comprehension Paragraph',
                    'short_question' => 'Translate into English (Tenses)',
                    'short_question2' => 'Active / passive voice',
                ]
            ],
        ],
        'isl' => [
            'subjective' => [
                'section' => 'آیات',
                'types' => [
                    'mcq' => 'کثیر الانتخابی سوالات',
                    'short_question' => 'مختصرسوالات',
                    'long_question' => 'آیات کا ترجمہ'
                ]
            ],
            'subjective2' => [
                'section' => 'احادیث',
                'types' => [
                    'mcq' => 'کثیر الانتخابی سوالات',
                    'short_question' => 'مختصرسوالات',
                    'long_question' => 'حدیث کا ترجمہ اور تشریح'
                ]
            ],
            'subjective3' => [
                'section' => 'موضوعاتی  مطالعہ',
                'types' => [
                    'mcq' => 'کثیر الانتخابی سوالات',
                    'short_question' => 'مختصرسوالات',
                    'long_question' => 'تفصیلی سوالات'
                ]
            ]
        ]
    ];

    public function classes()
    {
        return $this->belongsToMany(
            Classes::class,
            'class_subjects',
            'subject_id',
            'class_id');
    }

    public function syllabus_type()
    {
        return $this->belongsToMany(
            SyllabusType::class,
            'class_syllabus_type',
            'subject_id',
            'syllabus_type_id');
    }

    public function sections()
    {
        return $this->hasMany(Sections::class, 'subject_id', 'id');
    }
}
