import React, { Component } from 'react';

class BoxSmall2 extends  Component {

    constructor(props) {
        super(props);
        this.state = {
            box_class : "alert alert-primary jumbotron jumbotron-fluid ",
        };
    }


    render() {
        return (
            <div className={this.props.parent_class + ' boxSm' } title={this.props.box_title}>
                <div className={this.state.box_class + this.props.box_class}>
                    <div className="row">
                        <h4 className="display-5 mt-3 mb-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name={`[${this.props.id}][]`} id={`check_${this.props.id}`} />
                                <label className="form-check-label" htmlFor={`check_${this.props.id}`}>
                                    {this.props.box_title}
                                </label>
                            </div>
                        </h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default BoxSmall2;
