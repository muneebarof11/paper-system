import React, { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';

class Listing extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container" style={{ height: 400, width: '100%' }}>
                <DataGrid rows={this.props.rows} columns={this.props.columns} />
            </div>
        );
    }
}

export default Listing;
