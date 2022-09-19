<div class="container-fluid text-center">
    @if(session('alert-success'))
        <div class="alert alert-success" role="alert">
            {{session('alert-success')}}
        </div>
    @endif

    @if(session('alert-warning'))
        <div class="alert alert-warning" role="alert">
            {{session('alert-warning')}}
        </div>
    @endif

    @if(session('alert-danger'))
        <div class="alert alert-danger" role="alert">
            {{session('alert-danger')}}
        </div>
    @endif

    @if(session('alert-primary'))
        <div class="alert alert-primary" role="alert">
            {{session('alert-primary')}}
        </div>
    @endif

    @if (count($errors) > 0)
        <div class = "alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
</div>
