import React, { Component } from 'react';

class Header1 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid paper-page px-0 border-0">
                <div className="row paper-header mx-0">
                    <div className="col-sm-2">
                        <div className="image-holder">
                            <img className="card-img-top"
                                 src={`${$helper.getImageBasePath()}${this.props.institute.logo}`}
                                 alt="Card image cap"/>
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <h2 className={`institute-name`}>{this.props.institute.name}</h2>
                        <table className="table table-borderless mb-0">
                            <tbody>
                            <tr>
                                <th>Student Name:</th>
                                <td><input type="text" className='form-control' name="student_name"/></td>

                                <th>Class:</th>
                                <td>{this.props.current_class.name}</td>
                            </tr>
                            <tr>
                                <th>Paper Code:</th>
                                <td><input type="text" className='form-control' value={this.props.paper_code}/></td>
                                <th>Subject: </th>
                                <td>{this.props.subject.name}</td>
                            </tr>
                            <tr>
                                <th>Paper Date & Time:</th>
                                <td><input type="text" className='form-control' value={`${this.props.paper_date ? this.props.paper_date : ''} ${this.props.paper_time ? '('+this.props.paper_time+')' : ''}`} /></td>

                                <th>Total Marks:</th>
                                <td><input type="text" className='form-control' value={this.props.total_marks} /></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

}

export default Header1;
