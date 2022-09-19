import React, { Component } from 'react';

class Header3 extends Component {
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
                    <div className="col-sm-8">
                        <h2 className={`institute-name mb-0`}>{this.props.institute.name}</h2>
                        <p className="institute_address text-center mb-0">{this.props.institute.address} PH:{this.props.institute.phone1}</p>
                        <div className="row col-sm-12 px-0 my-2">
                            <div className="col-sm-4 filled-section text-center py-2">CLASS: {this.props.current_class.name}</div>
                            <div className="col-sm-4 center-section filled-section text-center py-2">{this.props.subject.name}</div>
                            <div className="col-sm-4 filled-section text-center py-2">T-MARKS: {this.props.total_marks}</div>
                        </div>
                        <table className="table table-borderless mb-0">
                            <tbody>
                            <tr>
                                <th>SECTION:</th>
                                <td><input type="text" className='form-control' name="section"/></td>

                                <th>ST. NAME:</th>
                                <td><input type="text" className='form-control' name="student_name"/></td>

                                <th>DATE:</th>
                                <td>{this.props.paper_date ? this.props.paper_date : ''}</td>
                            </tr>
                            <tr>
                                <th>ROLL NO:</th>
                                <td><input type="text" className='form-control' name="roll_no" /></td>

                                <th>PAPER CODE:</th>
                                <td><input type="text" className='form-control' value={this.props.paper_code} onChange={(e) => this.props.updatePaperSetting('paper_code', e.target.value)} /></td>

                                <th>Paper Time:</th>
                                <td><input type="text" className='form-control' value={`${this.props.paper_time ? this.props.paper_time : ''}`} onChange={(e) => this.props.updatePaperSetting('paper_time', e.target.value)} /></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-sm-2">
                        <div className="image-holder">
                            <img className="card-img-top"
                                 src={`${$helper.getImageBasePath()}${this.props.institute.logo}`}
                                 alt="Card image cap"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Header3;
