@extends('layouts.laravel_view')

@section('head')
    <style>
        a:hover {
            text-decoration: none;
        }

        .dasboard-col {
            border-left: 1px solid #cccccc;
            padding-top: 1.25rem;
            padding-bottom: 1.25rem;
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

        .jumbotron h2 {
            width: 100%;
            text-align: center;
            color: #FFF;
        }

        .profile-col {
            height: 100vh;
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

        .dashboard-boxes {
            background-position: center;
            background-size: cover;
            position: relative;
        }

        .dashboard-boxes a {
            width: 100%;
            height: 90%;
        }
    </style>
@endsection

@section('content')
    <div class="row">
        <div class="px-0 col-lg-2 bg-dark profile-col">

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
                        <a href="{{ route('App.User.Profile', [$user]) }}" class="btn btn-primary float-left">Settings</a>
                        <a href="{{ URL::to('/logout') }}" class="btn btn-danger float-right">
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="px-0 pt-0 col-lg-10 dasboard-col">
            <section>
                <h2 class="px-3 display-5 clearfix" style="border-bottom: 2px solid #000; padding: 1.1rem !important;
">
                    Easy papers solution
                </h2>
                <div class="container-fluid">
                    <div class="row pt-3">
                        <div class="col-md-4 dashboard-boxes">
                            <a href="{{ URL::to(getenv('REACT_V1_PAPER_ROUTES_PREFIX') . '/create-paper') }}"
                                style="background-image: url('{{ asset('img/generate-paper.jpg') }}'); display: block">
                                <div class="alert alert-primary jumbotron jumbotron-fluid"
                                    style="background-color: rgba(64, 197, 9, 0.7)">
                                    <div class="row">
                                        <h2 class="display-5 my-5"><i class="fa fa-plus-circle"></i> Generate new paper</h2>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div class="col-md-4 dashboard-boxes">
                            <a href="{{ URL::to('/saved-papers') }}"
                                style="background-image: url('{{ asset('img/saved-paper.jpg') }}'); display: block">
                                <div class="alert alert-primary jumbotron jumbotron-fluid"
                                    style="background-color: rgba(218, 4, 4, 0.7)">
                                    <div class="row">
                                        <h2 class="display-5 my-5"><i class="fa fa-save"></i> Saved papers
                                            ({{ $stats['saved_papers'] }})</h2>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div class="col-md-4 dashboard-boxes">
                            <a href="{{ URL::to(getenv('REACT_V1_PAPER_ROUTES_PREFIX') . '/past-papers') }}"
                                style="background-image: url('{{ asset('img/past-papers.jpg') }}'); display: block">
                                <div class="alert alert-primary jumbotron jumbotron-fluid"
                                    style="background-color: rgba(255, 167, 0, 0.7)">
                                    <div class="row">
                                        <h2 class="display-5 my-5"><i class="fa fa-clock-o"></i> Past papers
                                            ({{ $stats['past_papers'] }})</h2>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div class="col-md-4 dashboard-boxes">
                            <a href="{{ URL::to('previous-papers') }}"
                                style="background-image: url('{{ asset('img/pre-definde-papers.jpg') }}'); display: block">
                                <div class="alert alert-primary jumbotron jumbotron-fluid"
                                    style="background-color: rgba(0, 0, 0, 0.7)">
                                    <div class="row">
                                        <h2 class="display-5 my-5"><i class="fa fa-file-pdf-o"></i> Pre-defined papers
                                            ({{ $stats['old_papers'] }})</h2>
                                    </div>
                                </div>
                            </a>
                        </div>

                        @if (\App\Helper::checkUserRole('super', false))
                            <div class="col-md-4 dashboard-boxes">
                                <a href="{{ URL::to(getenv('REACT_V1_ROUTES_PREFIX') . '/publishers') }}"
                                    style="background-image: url('{{ asset('img/publishers.jpg') }}'); display: block">
                                    <div class="alert alert-primary jumbotron jumbotron-fluid"
                                        style="background-color: rgba(2, 20, 152, 0.7)">
                                        <div class="row">
                                            <h2 class="display-5 my-5"><i class="fa fa-file-text" aria-hidden="true"></i>
                                                Publisher ({{ $stats['publishers'] }})</h2>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        @endif

                    </div>
                </div>
            </section>

            @if (\App\Helper::checkUserRole('super', false))
                {{-- <h2 class="px-3 display-5 clearfix" style="border-bottom: 2px solid #000; padding: 1.1rem !important;
">
                    Syllabus
                </h2> --}}
                <div class="container-fluid">
                    <div class="row pt-3">

                        {{-- <div class="col-md-4 dashboard-boxes">
                            <a href="{{ URL::to(getenv('REACT_V1_ROUTES_PREFIX') . '/publishers') }}"
                                style="background-image: url('{{ asset('img/publishers.jpg') }}'); display: block">
                                <div class="alert alert-primary jumbotron jumbotron-fluid"
                                    style="background-color: rgba(2, 20, 152, 0.7)">
                                    <div class="row">
                                        <h2 class="display-5 my-5"><i class="fa fa-file-text" aria-hidden="true"></i>
                                            Publisher ({{ $stats['publishers'] }})</h2>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div> --}}
                        {{-- <div class="col-md-4"> --}}
                        {{-- <a href="{{URL::to(getenv('REACT_V1_PAPER_ROUTES_PREFIX').'/bubble-sheet')}}"> --}}
                        {{-- <div class="alert alert-primary jumbotron jumbotron-fluid classes-box"> --}}
                        {{-- <div class="row"> --}}
                        {{-- <h2 class="display-5 mt-3 mb-4"><i class="fa fa-graduation-cap" aria-hidden="true"></i> Answer Sheet</h2> --}}
                        {{-- </div> --}}
                        {{-- </div> --}}
                        {{-- </a> --}}
                        {{-- </div> --}}
                    </div>
            @endif
        </div>
    </div>
@endsection()

@section('script')
    <script>
        let is_admin = getParameterByName('is_admin');
        if (is_admin)
            localStorage.setItem('is_admin', is_admin);

        const data = {
            logo: "{{ $data->logo }}",
            name: "{{ $data->name }}",
            phone1: "{{ $data->phone1 }}",
            phone2: "{{ $data->phone2 }}",
            address: "{{ $data->address1 }}",
            roles: "{{ $roles }}"
        };

        localStorage.setItem('__i', JSON.stringify(data));

        function getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }
    </script>
@endsection()
