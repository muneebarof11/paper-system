<?php


namespace App\Http\Controllers;


use App\SyllabusType;

class SSRController extends Controller
{
    public function ssrPublishers() {
        $publishers = SyllabusType::where('is_active', 1)->get();
        return view('SSR.Publishers.PPublisher', ['publishers' => $publishers]);
    }

    public function adminPublishers() {
        $publishers = SyllabusType::where('is_active', 1)->get();
        return view('SSR.Publishers.Publisher', ['publishers' => $publishers]);
    }
}
