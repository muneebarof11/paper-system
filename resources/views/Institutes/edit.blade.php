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
    <div class="container mt-4">

        Edit: {{ $data->name }}

        <a href="{{ URL::to('App') }}">
            <button type="button" class="btn btn-primary float-right">Back</button>
        </a>
    </div>
    <div class="horizontal-separator mt-4 mb-4"></div>
@endsection

@section('content')
    <div class="container">
        <form class="row needs-validation" novalidate action="{{ route('App.update', $data) }}" id="someform" method="POST"
            enctype="multipart/form-data">

            {{ csrf_field() }}

            <input type="hidden" name="_method" value="PUT">

            <section class="col-lg-6 col-sm-12">
                <div class="form-group row">
                    <label class="col-sm-12 col-form-label" for="instName">Name</label>
                    <input type="text" class="form-control" id="instName" placeholder="School / Academy name"
                        name="name" required value="{{ $data->name }}">
                    <div class="invalid-feedback">
                        Please enter name!
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-12 col-form-label" for="instPhone1">Phone1</label>
                    <input type="text" class="form-control" id="instPhone1" name="phone1" required
                        value="{{ $data->phone1 }}">
                    <div class="invalid-feedback">Phone# is required</div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-12 col-form-label" for="instPhone2">Phone2 (optional)</label>
                    <input type="text" class="form-control no-validate" id="instPhone2" name="phone2"
                        value="{{ $data->phone2 }}">
                </div>
                <div class="form-group row">
                    <label class="col-sm-12 col-form-label" for="instAddress1">Address 1</label>
                    <textarea class="form-control" id="instAddress1" rows="3" name="address1" required>{{ $data->address1 }}</textarea>
                    <div class="invalid-feedback">Address is required</div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-12 col-form-label" for="instAddress2">Address 2 (optional)</label>
                    <textarea class="form-control no-validate" id="instAddress1" rows="3" name="address2">{{ $data->address2 }}</textarea>
                </div>
            </section>
            <section class="col-lg-6 col-sm-12">
                <div class="form-group">
                    <label for="primaryLogo">Primary Logo</label>
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="primaryLogo" name="logo"
                            {{ empty($data->logo) ? 'required' : '' }}>
                        <label class="custom-file-label" for="primaryLogo">Choose file...</label>
                        <div class="invalid-feedback">Please choose a logo</div>
                    </div>
                    <img scr="{{ asset($data->logo) }}" class="img-thumbnail" />
                </div>

                <div class="form-group">
                    <label for="secondaryLogo">Secondary Logo</label>
                    <div class="custom-file">
                        <input type="file" class="custom-file-input no-validate" id="secondaryLogo"
                            name="secondary_logo">
                        <label class="custom-file-label" for="secondaryLogo">Choose file...</label>
                        <small class="form-text text-muted">Required only if logo position is selected as Double</small>
                    </div>
                    <img scr="{{ asset($data->logo_secondary) }}" class="img-thumbnail" />
                </div>

                <div class="form-group row">
                    <label for="activeStatus">Active Status</label>
                    <select class="form-control no-validate" id="activeStatus" name="is_active">
                        <option value="1" {{ $data->is_active == '1' ? 'selected' : '' }}>Active</option>
                        <option value="0" {{ $data->is_active == '0' ? 'selected' : '' }}>In-Active</option>
                    </select>
                </div>
                <div class="form-group row">
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </section>
        </form>
    </div>
@endsection()

<script src="https://code.jquery.com/jquery-2.2.4.js" integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
    crossorigin="anonymous"></script>
@section('script')
    <script>
        let someform = $('#someform');
        someform.prop('action', APP_ENDPOINT + '/12');
        console.log(someform.prop('action'));

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
