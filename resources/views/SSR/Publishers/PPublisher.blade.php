@extends('layouts.ssr_react_view')

@section('SSR')
    {!! ssr('js/SSR.js')
        ->context('publishers', $publishers)
        ->render()
     !!}
@endsection()