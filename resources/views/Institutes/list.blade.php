@extends('layouts.laravel_view')

@section('head')
    <style>
        .row>div:last-child {
            display: flex;
            justify-content: flex-end;
        }

        .logo-image {
            max-width: 50px;
        }

        .container-fluid {
            padding-left: 80px;
            padding-right: 80px;
        }
    </style>
@endsection

@section('page_title')
    <div class="mt-4"></div>

    <a href="{{ URL::to('logout') }}">
        <button type="button" class="btn btn-danger float-left">Logout</button>
    </a>

    Your registered institutes

    <a href="{{ URL::to('App/create') }}">
        <button type="button" class="btn btn-primary float-right">Add New</button>
    </a>

    <div class="horizontal-separator mt-4 mb-4"></div>
@endsection


@section('content')
    <table id="listing" class="table table-striped table-bordered" style="width:100%">
        <thead>
            <tr>
                <th style="width: 10%">Name</th>
                <th style="width: 10%">Phone1</th>
                <th style="width: 10%">Phone2</th>
                <th style="width: 10%">Address1</th>
                <th style="width: 3%">Status</th>
                <th style="width: 5%">Register Date</th>
                <th style="width: 8%">Trial Ends</th>
                <th>Users</th>
                <td style="width: 20%">&nbsp;</td>
            </tr>
        </thead>
        <tbody>
            @if (!empty($data))
                @foreach ($data as $r)
                    <tr>
                        <th>{{ $r->name }}</th>
                        <th style="width: 10%">{{ $r->phone1 }}</th>
                        <th style="width: 10%">{{ $r->phone2 }}</th>
                        <th>{{ $r->address1 }}</th>
                        <th>
                            @if ($r->is_active == 1)
                                <span class="badge badge-success">Active</span>
                            @else
                                <span class="badge badge-danger">In-Active</span>
                            @endif
                        </th>
                        <th>{{ date('Y-m-d', strtotime($r->created_at)) }}</th>
                        <th style="width: 8%">
                            {{ $r->trial_active == 1 ? date('Y-m-d', strtotime($r->trial_expires_in)) : 'N/A' }}</th>
                        <td>
                            <a href="{{ URL::to("/App/{$r->id}/users") }}">
                                <button type="button" class="btn btn-dark">Users ({{ $r->users->count() }})</button>
                            </a>
                        </td>
                        <td style="width: 20%">
                            <a href="{{ route('App.show', [$r]) }}" class="d-block">
                                <button type="button" class="btn btn-primary">Edit Details</button>
                            </a>
                            @if ($r->is_active == 1)
                                <a href="{{ route('App.Toggle.Status', ['id' => $r->id, 'action' => 'disable']) }}"
                                    class="my-2 d-block">
                                    <button type="button" class="btn btn-danger">Dsiable Access</button>
                                </a>
                            @else
                                <a href="{{ route('App.Toggle.Status', ['id' => $r->id, 'action' => 'enable']) }}"
                                    class="my-2 d-block">
                                    <button type="button" class="btn btn-dark">Enable Access</button>
                                </a>
                            @endif

                            @if ($r->trial_active == 1)
                                <a href="{{ route('App.Toggle.Trial', ['id' => $r->id, 'days' => 0, 'status' => 'disable']) }}"
                                    class="my-2 d-block">
                                    <button type="button" class="btn btn-secondary">De-activate Trial</button>
                                </a>
                            @else
                                <a href="{{ route('App.Toggle.Trial', ['id' => $r->id, 'days' => 3, 'status' => 'enable']) }}"
                                    class="my-2 d-block">
                                    <button type="button" class="btn btn-success">Activate Trial</button>
                                </a>
                            @endif
                        </td>
                    </tr>
                @endforeach
            @else
                <tr>
                    <td colspan="10">
                        <h3>No Record found</h3>
                    </td>
                </tr>
            @endif
            </tfoot>
    </table>
@endsection()

@section('script')
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.22/js/dataTables.bootstrap4.min.js"></script>

    <script>
        $(document).ready(function() {
            $('#listing').DataTable();
        });
    </script>
@endsection()
