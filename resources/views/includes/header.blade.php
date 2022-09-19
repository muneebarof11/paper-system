<style></style>
<nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
        <a class="navbar-brand" href="{{ URL::to('dashboard') }}">Question Paper Solutions </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="{{ URL::to('dashboard') }}">Dashboard <span
                            class="sr-only"></span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{ URL::to('Papers/create-paper') }}">Generate Paper <span
                            class="sr-only"></span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{ URL::to('saved-papers') }}">Saved Paper</a>
                </li>
                <li class="nav-item institute_name">
                    @isset($data->name)
                        Welcome {{ $data->name }}
                    @endisset
                </li>
            </ul>

            <ul class="form-inline navbar-nav">
                <li class="nav-item"></li>
                <li class="nav-item">
                    @if (\Illuminate\Support\Facades\Auth::check())
                        <a class="nav-link" href="{{ URL::to('logout') }}">Logout</a>
                    @else
                        <a class="nav-link" href="{{ URL::to('login') }}">Login</a>
                    @endif
                </li>
                <li class="nav-item">
                    @if (\App\Helper::checkUserRole('super', false))
                        <a class="nav-link" href="{{ URL::to('/App') }}">Register New Institute</a>
                    @endif
                </li>
                <li class="nav-item">
                    @if (\App\Helper::checkUserRole('admin', false) and isset($data->id))
                        <a class="nav-link" href="{{ URL::to('App/' . $data->id . '/users') }}">Users</a>
                    @endif
                </li>
            </ul>
        </div>
    </div>
</nav>

@if (isset($data->trial_active) && $data->trial_active == 1)
    <div class="alert alert-danger mb-0 text-center font-weight-bold" role="alert">
        Your trial is active now, and will end on {{ date('H:i a@F d, Y', strtotime($data->trial_expires_in)) }}
    </div>
@endif
