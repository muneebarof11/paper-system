<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script>
        window.Laravel = {
            csrfToken: '{{ csrf_token() }}'
        }
    </script>

    <title>Easy Paper Solution</title>

    <script>
        const APP_URL = '{{ getenv('APP_URL') }}';
        const API_ENDPOINT = '{{ getenv('API_ENDPOINT') }}';
        const REACT_V1_ROUTES_PREFIX = '{{ getenv('REACT_V1_ROUTES_PREFIX') }}';
        const REACT_V1_PAPER_ROUTES_PREFIX = '{{ getenv('REACT_V1_PAPER_ROUTES_PREFIX') }}';
    </script>
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

        .institute_name {
            font-size: 1rem;
            padding: 7px 0 0 14rem;
            color: #FFF;
            font-weight: 600;
        }

        .loader-wrapper {
            position: fixed;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: rgba(255, 255, 255, 0.9);
            z-index: 99999;
            top: 0;
            left: 0;
            padding: 20% 45%;
        }

        .loader {
            border: 16px solid #f3f3f3;
            border-radius: 50%;
            border-top: 16px solid #3498db;
            width: 120px;
            height: 120px;
            -webkit-animation: spin 2s linear infinite;
            /* Safari */
            animation: spin 2s linear infinite;
        }

        /* Safari */
        @-webkit-keyframes spin {
            0% {
                -webkit-transform: rotate(0deg);
            }

            100% {
                -webkit-transform: rotate(360deg);
            }
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }

        .paper-page .question_row,
        .random-selected .question_row,
        .displayed-questions .question_row {
            display: flex !important;
        }

        .paper-page .question_row.mcq-question,
        .random-selected .question_row.mcq-question,
        .displayed-questions .question_row.mcq-question {
            flex-direction: column;
        }

        @media print {

            .general-question-section,
            .question_title_row,
            #react-app,
            body {
                background: #FFFFFF !important;
            }
        }

        .profile-col {
            height: 100vh !important;
        }

        .profile-col .card {
            background: none;
            border: none;

        }

        .profile-col .card * {
            color: #FFF;
            text-align: left;
            padding-left: 0;
            padding-right: 0;
        }

        .profile-col .card .btn {
            width: 100%;
            margin-bottom: 10px;
            text-align: center
        }

        .profile-col .image-holder {
            border-bottom: 2px solid #FFF;
        }

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

        .listing-panel,
        .dasboard-col.collapsed {
            min-height: 100vh;
            height: 100%;
        }

        .dasboard-col.collapsed {
            flex: 0 0 100% !important;
            max-width: 100% !important;
        }

        .listing-panel>nav,
        .listing-panel>nav>.breadcrumb {
            box-shadow: none !important;
            background: #000 !important;
            color: #000 !important
        }

        .section_subsections {
            background: #f3f3f3;
            /* -webkit-box-shadow: 0px 0px 5px #808080;
            -moz-box-shadow: 0px 0px 5px #808080;
            box-shadow: 0px 0px 5px #808080; */
        }

        .section_subsections div.urdu-font {
            font-size: 1.05rem;
        }

        .section_subsections ul ul div.urdu-font {
            font-size: 1.1rem;
        }

        .section_subsections ul {
            padding-left: 0;
        }

        .paper-page {
            border: none !important
        }

        .paper-page .paper-options {
            background: #424242;
            color: #FFF;
        }

        .multi-select-with-checkboxes>div *,
        .multi-select-with-checkboxes>span * {
            color: #000;
        }
    </style>
    @yield('head')
</head>

<body>

    @include('includes/header')

    <!-------------------------------------------->
    <!--- ELEMENT FOR REACT COMPONENT TO LOAD --->
    <!-------------------------------------------->
    <main class="mb-5">
        <div class="container-fluid">
            <div class="row">
                <div class="px-0 col-lg-2 bg-dark profile-col">
                    <button class="toggle-pane-btn btn" onclick="toggleLeftPane()"><i class="fa fa-bars"
                            aria-hidden="true"></i></button>
                    <div class="px-0 card">
                        <div class="image-holder">
                            @if (\App\Helper::checkUserRole('super', false))
                                <h5 class="px-3">Welcome Super Admin</h5>
                            @elseif(\App\Helper::checkUserRole('teacher', false))
                                <h5 class="px-3">Teacher Login</h5>
                                <img class="card-img-top" src="{{ asset($data->logo) }}" alt="Card image cap">
                            @else
                                <img class="card-img-top" src="{{ asset($data->logo) }}" alt="Card image cap">
                            @endif
                        </div>
                        <div class="px-3 py-5 card-body">
                            <h4 class="card-title mb-5">{{ $data->name }}</h4>
                            <h4 class="card-title mb-2">{{ $user->name }}</h4>
                            <div class="clearfix">
                                <a href="{{ route('App.User.Profile', [$user]) }}"
                                    class="btn btn-primary float-left">Settings</a>
                                <a href="{{ URL::to('/logout') }}" class="btn btn-danger float-right">
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="px-0 pt-0 col-lg-10 dasboard-col">

                    @yield('react-app')

                    <section class="mt-2 mb-2">&nbsp;</section>

                </div>
            </div>
        </div>
    </main>
    <!-------------------------------------------->

    @include('includes/footer')
</body>
<script src="{{ asset('js/app.js') }}" type="text/javascript"></script>
@yield('fonts')
<link href="{{ asset('css/bootstrap.css') }}" rel="stylesheet" />
<link href="{{ asset('css/app.css') }}" rel="stylesheet" />

<style>
    h5 p {
        font-weight: normal;
         !important;
        display: block !important;
    }

    h5>div>p:first-child {
        display: inline !important;
    }

    h5>div>p:nth-child(2) {
        margin-top: 0.5rem
    }
</style>

@yield('footer-css')
<link rel="stylesheet" href="{{ asset('plugins/font-awesome-4.7.0/css/font-awesome.min.css') }}">

<script>
    function toggleLeftPane() {
        $('.profile-col').toggleClass('collapsed');
        $('.dasboard-col').toggleClass('collapsed');
    }
</script>
@yield('script')

</html>
