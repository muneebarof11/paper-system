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
        <section class="page_title">
            <h3>
                <div class="container pb-2 pt-3 clearfix">
                    <a href={{URL::to('dashboard')}}>
                        <button type="button" class="btn btn-primary float-left">Back</button>
                    </a>
                </div>
            </h3>
        </section>
        <section>
            <div class="jumbotron jumbotron-fluid">
                <div class="container-fluid">
                    <h1 class="text-center">Un-Authorized Access, please contact system admin!</h1>
                </div>
            </div>
        </section>
    </div>
</div>

@endsection()
