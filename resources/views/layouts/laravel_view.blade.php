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

        nav {
            background-color: #A0033A !important;
            -webkit-box-shadow: 0px 5px 10px #cccccc;
            -moz-box-shadow: 0px 5px 10px #cccccc;
            box-shadow: 0px 5px 10px #cccccc;
        }
        nav * {
            color: #FFF !important;
        }
        nav a:hover {
            font-weight: bolder;
        }
        .institute_name {
            font-size: 1rem;
            padding: 7px 0 0 14rem;
            color: #FFF;
            font-weight: 600;
        }
         .app-name {
            font-family: 'Blaka Ink', serif;
        }
        .my-6 { margin-bottom: 4rem !important; margin-top: 4rem !important;}
        .my-7 { margin-bottom: 5rem !important; margin-top: 4rem !important;}
        .my-8 { margin-bottom: 6rem !important; margin-top: 4rem !important;}
        .my-9 { margin-bottom: 7rem !important; margin-top: 4rem !important;}
    </style>
    @yield('head')
</head>
<body>
<div id="app">
    @include('includes/header')

    <main style="margin-top: -8px;">
        <div class="container-fluid">
            <section class="page_title">
                <h3>
                    @yield('page_title')
                </h3>
            </section>
            @include('includes.alerts')

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
