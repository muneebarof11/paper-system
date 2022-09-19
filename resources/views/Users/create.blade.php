@extends('layouts.laravel_view')

@section('head')
    <style>
        .form-group.row {
            margin-left: 0;
            margin-right: 0;
        }
        .form-control.no-validate:valid {
            border-color: #ced4da;
            padding-right: .75rem;
            background-image: none;
        }
        .invalid-input-field {
            border-color: #e3342f;
            padding-right: calc(1.6em + 0.75rem);
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23e3342f' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23e3342f' stroke='none'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right calc(0.4em + 0.1875rem) center;
            background-size: calc(0.8em + 0.375rem) calc(0.8em + 0.375rem);
        }
        .key-invalid-feedback {
            width: 100%;
            margin-top: 0.25rem;
            font-size: 80%;
            color: #e3342f;
        }
    </style>
@endsection

@section('page_title')
    <div class="container">

        <a href="{{URL::to('App')}}">
            <button type="button" class="btn btn-primary float-left">Back</button>
        </a>

        Add User

    </div>
    <div class="horizontal-separator mt-4 mb-4"></div>
@endsection

@section('content')
    <div class="container">
        <form class="row needs-validation" novalidate action="{{route('App.User.Create')}}" method="POST" enctype="multipart/form-data">

            {{csrf_field()}}

            <section class="col-lg-12 col-sm-12">
                <div class="form-group row">
                    <label class="col-sm-12 col-form-label" for="instName">Name</label>
                    <input type="text" class="form-control" id="instName" placeholder="Enter Name"
                           name="name" required value="{{old('name')}}">
                    <div class="invalid-feedback">
                        Please enter name!
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-12 col-form-label" for="instPhone1">Email</label>
                    <input type="text" class="form-control" id="instPhone1" name="email" required  value="{{old('email')}}">
                    <div class="invalid-feedback">Email is required</div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-12 col-form-label" for="instPhone2">Username</label>
                    <input type="text" class="form-control" id="instPhone2" name="username" required value="{{old('username')}}">
                    <div class="invalid-feedback">Username is required</div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-12 col-form-label" for="instPhone2">Password</label>
                    <input type="password" class="form-control" id="instPhone2" name="password" required>
                    <div class="invalid-feedback">Password is required</div>
                </div>

                <div class="form-group row">
                    <label for="activeStatus">Role</label>
                    <select class="form-control no-validate" id="role" name="role">
                        @if(\App\Helper::checkUserRole('super', false))
                            <option value="admin">Admin</option>
                        @endif
                        <option value="teacher" selected>Teacher</option>
                    </select>
                </div>

                <div class="form-group row">
                    <label for="activeStatus">Active Status</label>
                    <select class="form-control no-validate" id="activeStatus" name="is_active">
                        <option value="1" selected>Active</option>
                        <option value="0">In-Active</option>
                    </select>
                </div>
                <div class="form-group row">
                    <button type="submit" class="btn btn-primary col-lg-12">Save</button>
                </div>
            </section>
        </form>
    </div>
@endsection()

@section('script')
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script>
        // Example starter JavaScript for disabling form submissions if there are invalid fields
        (function() {
            'use strict';
            window.addEventListener('load', function() {
                // Fetch all the forms we want to apply custom Bootstrap validation styles to
                var forms = document.getElementsByClassName('needs-validation');
                // Loop over them and prevent submission
                var validation = Array.prototype.filter.call(forms, function(form) {
                    form.addEventListener('submit', function(event) {
                        if (form.checkValidity() === false) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        form.classList.add('was-validated');
                    }, false);
                });
            }, false);
        })();
    </script>
@endsection
