<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{csrf_token()}}">
    <script>window.Laravel = {csrfToken: '{{csrf_token()}}'}</script>

    <title>Test Solution - @yield('title')</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="//fonts.googleapis.com/earlyaccess/notonastaliqurdudraft.css" />
    <style>
        a:hover {
            text-decoration: none;
        }
        .dasboard-col {
            border-left: 1px solid #cccccc;
        }
        .image-holder {
            padding: 1.25rem;
            text-align: center;
        }
        .image-holder img {
            max-width: 70%;
        }
        .page_title .image-holder {
            padding: 0;
        }
        .card {
            text-align: center;
        }
        .jumbotron h2,
        .jumbotron h3,
        .jumbotron h4 {
            width: 100%;
            text-align: center;
            color: #FFF;
        }
    </style>
    <!-- COMPILED CSS -->
    <link href="{{asset('css/app.css')}}" rel="stylesheet"/>
</head>
<body>

    <main class="py-4 mb-5">
        <div class="container-fluid">
            <div id="react-app" class="mb-5 ssr-container">
                @yield('SSR')
            </div>
        </div>
    </main>
    <!-------------------------------------------->
</body>
</html>
