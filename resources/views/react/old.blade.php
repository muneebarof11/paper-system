@extends('layouts.react_view')

@section('react-app')
    <div id="react-app" class="mb-5">
        <div class="loader-wrapper">
            <div class="loader"></div>
        </div>
    </div>
@endsection()

@section('script')
    <script>
        window.__data__ = "{{ base64_encode(json_encode($publishers)) }}";
        window.__user_id__ = "{{ Auth::user()->id }}";
        window.__isDraft__ = "{{ $isDraft }}"
    </script>
    <script src="{{ asset('jsx/saved-papers.js') }}"></script>
@endsection()
