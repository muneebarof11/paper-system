<?php

namespace App\Console\Commands;

use App\Question;
use App\Subject;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class GenerateEquationImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:image {subject}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This command will get math data from DB, and convert all math equations to images!';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $subject_name = $this->argument('subject');
        $subject = Subject::where('name', 'like', $subject_name)->first();
        if (empty($subject)) {
            $this->error('Subject not found!');
            return false;
        }

        $subject_questions = Question::where('subject_id', $subject->id)->where('is_active', 1)->get();
        foreach ($subject_questions as $question) {
            $this->info("Question: {$question->id}");
            $translations = $question->translations()->where('image_converted', 0)->orderBy('id', 'desc')->get();
            if ($translations->isNotEmpty()) {
                foreach ($translations as $translation) {
                    $statement = $translation->question_statement;
                    // $this->info($statement);

                    $updated_equation = '';
                    $updated_equation = $this->extractEquation($statement, $updated_equation, $question->id, $translation->id);
                    if ($updated_equation !== false and $updated_equation !== $translation->question_statement) {
                        try {

                            dd($updated_equation);
                            $translation->question_statement_original = $translation->question_statement;
                            $translation->question_statement = $updated_equation;
                            $translation->image_converted = 1;
                            $translation->save();

                            $this->info('ORIGINAL: ' . $translation->question_statement_original);
                            $this->info('UPDATED: ' . $translation->question_statement);
                            $this->info('');
                            $seconds = rand(10, 20);
                            sleep($seconds);
                        } catch (\Exception $e) {
                            $this->error($e->getMessage());
                        }
                    }
                }
            }
        }
    }

    private function extractEquation($string, $question, $qid, $tid)
    {
        try {
            $equation = '';
            $strpos = strpos($string, '$', 0);
            if ($strpos === FALSE) {
                $question .= $string;
                return $question;
            }

            // 1st part of string (before 1st img tag)
            $question .= substr($string, 0, $strpos);

            $eq_s_pos = strpos($string, '$');
            $o_eq_e_pos = $eq_e_pos = strpos(substr($string, $eq_s_pos + 1, strlen($string)), '$');

            $eq = substr($string, $eq_s_pos, $eq_s_pos + $eq_e_pos);
            $u_eq = str_replace('$', '', $eq);

            $url = "https://math.now.sh?from={$u_eq}";
            $contents = file_get_contents($url);
            $name = "equations/{$qid}_{$tid}_eq.svg";
            Storage::disk('public')->put($name, $contents);
            $eq_url = "/storage/{$name}";

            $this->info($eq_url);
            $eq_url = "<img src='{$eq_url}' alt='MATH EQUATION' class='equation-image' />";
            $string = str_replace($eq, $eq_url, $string);

            return $this->extractEquation($string, $question, $qid, $tid);
        } catch (\Exception $e) {
            $this->error($e->getMessage());
            return false;
        }
    }
}
