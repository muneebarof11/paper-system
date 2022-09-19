@extends('layouts.laravel_view')

@section('head')
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
        .jumbotron h2 {
            width: 100%;
            text-align: center;
            color: #FFF;
        }
    </style>
@endsection

@section('content')
<div class="row">
    <div class="col-lg-3 profile-col">

        <div class="card">
            <div class="image-holder">
                <img class="card-img-top" src="{{asset($data->logo)}}" alt="Card image cap">
            </div>
            <div class="card-body">
                <h4 class="card-title mb-3">{{$data->name}}</h4>
                <h4 class="card-title mb-3">{{$user->name}}</h4>
                <p class="card-title mb-3">{{$data->phone1}}</p>
                <div class="clearfix">
                    <a href="#" class="btn btn-primary float-left">Settings</a>
                    <a href="{{URL::to('/logout')}}" class="btn btn-danger float-right">
                        Logout
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-9 dasboard-col">
        <section>
            <h2 class="display-5 clearfix">
                Papers
                <hr />
            </h2>
            <div class="row">

                <div class="col-md-4">
                    <a href="{{URL::to(getenv('REACT_V1_PAPER_ROUTES_PREFIX').'/create-paper')}}">
                        <div class="alert alert-primary jumbotron jumbotron-fluid generate-new-box">
                            <div class="row">
                                <h2 class="display-5 mt-3 mb-4"><i class="fa fa-plus-circle"></i> Generate new paper</h2>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="col-md-4">
                    <a href="{{URL::to('/saved-papers')}}">
                        <div class="alert alert-primary jumbotron jumbotron-fluid saved-papers-box">
                            <div class="row">
                                <h2 class="display-5 mt-3 mb-4"><i class="fa fa-save"></i> Saved papers</h2>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="col-md-4">
                    <a href="{{URL::to(getenv('REACT_V1_PAPER_ROUTES_PREFIX').'/past-papers')}}">
                        <div class="alert alert-primary jumbotron jumbotron-fluid past-papers-box">
                            <div class="row">
                                <h2 class="display-5 mt-3 mb-4"><i class="fa fa-clock-o"></i> Past papers</h2>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="col-md-4">
                    <a href="{{URL::to('previous-papers')}}">
                        <div class="alert alert-primary jumbotron jumbotron-fluid pre-defined-box">
                            <div class="row">
                                <h2 class="display-5 mt-3 mb-4"><i class="fa fa-file-pdf-o"></i> Old papers</h2>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </section>

        <section class="mt-2 mb-2">&nbsp;</section>

        <h2 class="display-5 clearfix">
            Syllabus
            <hr />
        </h2>
        <div class="row">
            <div class="col-md-4">
                <a href="{{URL::to(getenv('REACT_V1_ROUTES_PREFIX').'/publisher')}}">
                    <div class="alert alert-primary jumbotron jumbotron-fluid syllabus-type-box">
                        <div class="row">
                            <h2 class="display-5 mt-3 mb-4"><i class="fa fa-file-text" aria-hidden="true"></i> Publisher</h2>
                        </div>
                    </div>
                </a>
            </div>
            <div class="col-md-4">
                <a href="{{URL::to(getenv('REACT_V1_PAPER_ROUTES_PREFIX').'/bubble-sheet')}}">
                    <div class="alert alert-primary jumbotron jumbotron-fluid classes-box">
                        <div class="row">
                            <h2 class="display-5 mt-3 mb-4"><i class="fa fa-graduation-cap" aria-hidden="true"></i> Answer Sheet</h2>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>

@endsection()

@section('script')
<script>
    let is_admin = getParameterByName('is_admin');
    if(is_admin)
        localStorage.setItem('is_admin', is_admin);

    const data = {
        logo: "{{$data->logo}}",
        name: "{{$data->name}}",
        phone1: "{{$data->phone1}}",
        phone2: "{{$data->phone2}}",
        address: "{{$data->address1}}",
        roles: "{{$roles}}"
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
