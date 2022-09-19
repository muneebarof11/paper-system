<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Easy Paper Solution</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('plugins/font-awesome-4.7.0/css/font-awesome.min.css')}}">

    <!-- Styles -->
    <link href="https://papersystem.s3.ap-east-1.amazonaws.com/css/app.css" rel="stylesheet">

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Blaka+Ink">

    <style>
        .institute_name {
            font-size: 1rem;
            padding: 7px 0 0 14rem;
            color: #FFF;
            font-weight: 600;
        }
        .app-name {
            font-family: 'Blaka Ink', serif;
            font-size: 4rem !important;
        }
    </style>
    @yield('head')
</head>
<body>
<div id="app">
    {{-- @include('includes/header') --}}

    <main>
        <div class="container-fluid">
            @yield('content')
        </div>
    </main>

    @include('includes/footer')
</div>
<script>
    const API_ENDPOINT = '{{getenv('API_ENDPOINT')}}';
    const APP_ENDPOINT = '{{getenv('APP_URL')}}';
</script>
@yield('script')
</body>
</html>
