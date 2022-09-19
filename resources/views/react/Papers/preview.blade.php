@extends('layouts.react_view')

@section('fonts')
    <style>
        @font-face {
            font-family: "Jameel Noori Nastaleeq regular";
            src: url("../../../fonts/JameelNooriNastaleeq.ttf") format("truetype");
            font-weight: normal;
            font-style: normal;
        }

        /**
        * "The best font that I have come across till now for the Qur'an Typesetting.
        * Copyright Pakistan Data Management Services (See http://pakdata.com/products/arabicfont/)"
        * REF: http://quran.mursil.com/Web-Print-Publishing-Quran-Text-Graphics-Fonts-and-Downloads/fonts-optimized-for-quran#TOC-Noor-e-Hidayat
         */
        @font-face {
            font-family: "Saleem Quran regular";
            src: url("../../../fonts/_PDMS_Saleem_QuranFont.ttf") format("truetype");
            font-weight: normal;
            font-style: normal;
        }

    </style>
@endsection

@section('react-app')
    <div id="react-app" class="mb-5">
        <div class="loader-wrapper"><div class="loader"></div></div>
    </div>
@endsection()

@section('script')
    <script src="{{asset('jsx/preview.js')}}"></script>
@endsection()