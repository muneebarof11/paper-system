@extends('layouts.laravel_view_auth')

@section('head')
    <style>
        body {
            overflow: hidden;
        }
        .left-section-login {
            background-color: #A0033A;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            height: 100vh;
            padding: 22% 11%;
        }
        .left-section-login img {
            max-width: 90%;
        }
        .right-section-login {
            padding: 4% 5%;
        }
        .right-section-login h1 {
            font-size: 3rem;
            font-weight: bolder
        }
        .login-message * {
            padding: 0;
            list-style: none;
            text-align: left;
            margin: 0
        }
        .login-message li {
            padding: 10px 20px !important;
        }
    </style>
@endsection

@section('content')

<div class="px-0 container-fluid">
    <div class="row">

        <div class="px-0 py-0 col-lg-6" style="position: relative">
            <div class="left-section-login align-middle">
                <img src="{{asset('img/login.svg')}}" alt="">
            </div>
        </div>

        <div class="col-md-6 right-section-login">
                <h1 class="app-name text-center mb-5">{{ __('Easy Paper Solution') }}</h1>

                <p class="mb-3">&nbsp;</p>

                <h1 class="mb-3">{{ __('Login') }}</h1>

                <div class="login-message mb-2">
                    @include('includes.alerts')
                </div>

                <div class="px-0 py-0 card-body">
                    <form method="POST" action="{{ route('login') }}">
                        @csrf

                        <div class="form-group ">
                            <label for="email" class=" col-form-label">{{ __('Username') }}</label>

                            <div class="">
                                <input id="username" type="text" class="form-control @error('username') is-invalid @enderror" name="username" value="{{ old('username') }}" required autofocus>

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="password" class=" col-form-label">{{ __('Password') }}</label>

                            <div class="">
                                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class=" col-md-6">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                    <label class="form-check-label" for="remember">
                                        {{ __('Remember Me') }}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-12">
                                <button type="submit" style="width: 100%" class="btn btn-primary">
                                    {{ __('Login') }}
                                </button>

                            </div>
                        </div>
                    </form>
            </div>
        </div>
    </div>
</div>
@endsection
