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

    <a href="{{ URL::to('App') }}">
        <button type="button" class="btn btn-danger float-left">Back</button>
    </a>

    {{ $institute->name }} Users

    <a href="{{ URL::to('App/users/create') }}">
        <button type="button" class="btn btn-primary float-right">Add New</button>
    </a>

    <div class="horizontal-separator mt-4 mb-4"></div>
@endsection

@section('content')
    <table id="listing" class="table table-striped table-bordered" style="width:100%">
        <thead>
            <tr>
                <th style="width: 10%">Name</th>
                <th style="width: 14%">Email</th>
                <th style="width: 14%">Username</th>
                <th style="width: 18%">Roles</th>
                <th style="width: 3%">Status</th>
                <td style="width: 5%">&nbsp;</td>
            </tr>
        </thead>
        <tbody>
            @if (!empty($data))
                @foreach ($data as $r)
                    <tr>
                        <th>{{ $r->name }}</th>
                        <th>{{ $r->email }}</th>
                        <th>{{ $r->username }}</th>
                        <th>
                            @if (!empty($r->roles))
                                <ul>
                                    @foreach ($r->roles as $role)
                                        <li>{{ $role->title }} </li>
                                    @endforeach
                                </ul>
                            @endif
                        </th>
                        <th>
                            @if ($r->status == 1)
                                <span class="badge badge-success">Active</span>
                            @else
                                <span class="badge badge-danger">In-Active</span>
                            @endif
                        </th>
                        <td>
                            <a href="{{ route('App.User.Edit', [$r]) }}">
                                <button type="button" class="btn btn-primary">Edit</button>
                            </a>
                            <a href="{{ route('App.User.Delete', ['id' => $r->id, 'inst_id' => $institute->id]) }}">
                                <button type="button" class="btn btn-danger">Delete</button>
                            </a>
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
