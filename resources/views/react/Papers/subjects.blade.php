@extends('layouts.react_view')

@section('react-app')
    <div id="react-app" class="mb-5">
        <div class="loader-wrapper"><div class="loader"></div></div>
    </div>
@endsection()

@section('script')
    <script>
        window.__subjects__ = "{{base64_encode(json_encode($subjects))}}";
        window.__all_subject__ = "{{base64_encode(json_encode($all_subject))}}";
        window.__all_classes__ = "{{base64_encode(json_encode($all_classes))}}";
    </script>
    <script src="{{asset('jsx/psubjects.js')}}"></script>
@endsection()