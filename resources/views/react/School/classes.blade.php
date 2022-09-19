@extends('layouts.react_view')

@section('react-app')
    <div id="react-app" class="mb-5">
        <div class="loader-wrapper"><div class="loader"></div></div>
    </div>
@endsection()

@section('script')
    <script>
        window.__classes__ = "{{base64_encode(json_encode($classes))}}";
        window.__all_classes__ = "{{base64_encode(json_encode($all_classes))}}";
        window.__all_publishers__ = "{{base64_encode(json_encode($all_publishers))}}";
    </script>
    <script src="{{asset('jsx/classes.js')}}"></script>
@endsection()