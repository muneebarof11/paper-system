<?php

namespace App;

use Illuminate\Support\Facades\Auth;

class Helper
{
    public static function easyEncode($data) {
        return base64_encode($data);
    }

    public static function easyDecode($data) {
        return base64_decode($data);
    }

    public static function getSqlWithBindings($query)
    {
        return vsprintf(str_replace('?', '%s', $query->toSql()), collect($query->getBindings())->map(function ($binding) {
            return is_numeric($binding) ? $binding : "'{$binding}'";
        })->toArray());
    }

    public static function checkTopicID($id) {
        if($id == null OR $id === '' OR $id === "" OR $id === true OR $id === false OR $id == 'null' OR $id === "0" OR empty($id))
            return 0;

        return self::easyDecode($id);
    }

    public static function checkIdZero($id) {
        return self::checkTopicID($id);
    }

    public static function is_english($str) {
        if (strlen($str) != strlen(utf8_decode($str))) {
            return false;
        } else {
            return true;
        }
    }

    public static function convertSmartQuote($str) {
        $chr_map = array(
            // Windows codepage 1252
            "\xC2\x82" => "'", // U+0082⇒U+201A single low-9 quotation mark
            "\xC2\x84" => '"', // U+0084⇒U+201E double low-9 quotation mark
            "\xC2\x8B" => "'", // U+008B⇒U+2039 single left-pointing angle quotation mark
            "\xC2\x91" => "'", // U+0091⇒U+2018 left single quotation mark
            "\x91" => "'",     // U+0091⇒U+2018 left single quotation mark
            "\xC2\x92" => "'", // U+0092⇒U+2019 right single quotation mark
            "\x92s" => "'",    // U+0092⇒U+2019 right single quotation mark
            "\xC2\x93" => '"', // U+0093⇒U+201C left double quotation mark
            "\x93" => '"',     // U+0093⇒U+201C left double quotation mark
            "\xC2\x94" => '"', // U+0094⇒U+201D right double quotation mark
            "\x94" => '"',     // U+0094⇒U+201D right double quotation mark
            "\xC2\x9B" => "'", // U+009B⇒U+203A single right-pointing angle quotation mark

            // Regular Unicode     // U+0022 quotation mark (")
            // U+0027 apostrophe     (')
            "\xC2\xAB"     => '"', // U+00AB left-pointing double angle quotation mark
            "\xC2\xBB"     => '"', // U+00BB right-pointing double angle quotation mark
            "\xE2\x80\x98" => "'", // U+2018 left single quotation mark
            "\xE2\x80\x99" => "'", // U+2019 right single quotation mark
            "\xE2\x80\x9A" => "'", // U+201A single low-9 quotation mark
            "\xE2\x80\x9B" => "'", // U+201B single high-reversed-9 quotation mark
            "\xE2\x80\x9C" => '"', // U+201C left double quotation mark
            "\xE2\x80\x9D" => '"', // U+201D right double quotation mark
            "\xE2\x80\x9E" => '"', // U+201E double low-9 quotation mark
            "\xE2\x80\x9F" => '"', // U+201F double high-reversed-9 quotation mark
            "\xE2\x80\xB9" => "'", // U+2039 single left-pointing angle quotation mark
            "\xE2\x80\xBA" => "'", // U+203A single right-pointing angle quotation mark
        );
        $chr = array_keys  ($chr_map); // but: for efficiency you should
        $rpl = array_values($chr_map); // pre-calculate these two arrays
        return str_replace($chr, $rpl, html_entity_decode($str, ENT_QUOTES, "UTF-8"));
    }

    public static function mapMathSymbolsTolaTeX($str) {
        $chr_map = [
            'β' => '\beta ',
            '€' => ' ',
            'µ' => '\mu ',
            'α' => '\alpha ',
            'γ' => '\gamma ',
            'Σ' => '\Sigma ',
            'π' => '\pi ',
            'Ω' => '\Omega ',
            '∑' => '\Sigma ',
            '≠' => '\neq ',
            '±' => '\pm ',
            '≤' => '\leq ',
            '≥' => '\geq ',
            '∞' => '\infty ',
            'ω' => '\omega ',
            'λ' => '\lambda ',
//            '/' => '\frac ',
            '√' => '\sqrt ',
            'θ' => '\theta ',
            'ε' => '\epsilon ',
            'ε0' => '\epsilon_0 ',
            'δ' => '\delta ',
            'Δ' => '\Delta ',
            '⊂' => '\subset ',
            '⊃' => '\supset ',
            '∃' => '\exists ',
            '∀' => '\forall ',
            '' => '\to ',
            '∫' => '\int_ ',
//            '{' => '\{ ',
//            '}' => '\} ',
            '≈' => '\approx '
        ];
        $chr = array_keys  ($chr_map); // but: for efficiency you should
        $rpl = array_values($chr_map); // pre-calculate these two arrays
        return str_replace($chr, $rpl, $str);
    }

    public static function checkUserRole($checkRole, $redirect = true) {
        if(!Auth::user())
            return false;

        $roles = Auth::user()->roles;
        if(empty($roles)) {

            if($redirect)
                return redirect('access-denied');

            return false;
        }

        $role_names = $roles->pluck('name')->toArray();
        if(!in_array($checkRole , $role_names)) {

            if($redirect)
                return redirect('access-denied');

            return false;
        }

        return true;
    }
}
