import React, { Component } from 'react';

class BoxButton extends  Component {

    constructor(props) {
        super(props);
        this.state = {
            box_class : "alert alert-primary jumbotron jumbotron-fluid ",
            icon_class: "fa "
        };

        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler() {
        // prop binding with parent component
        if (typeof this.props.onClick === 'function') {
            this.props.onClick(this.props.data, this.props.index);
        }
    }

    render() {
        return (
            <div className={this.props.parent_class + ' boxSm btnBox' } onClick={this.clickHandler}>
                <div className={this.state.box_class + this.props.box_class}>
                    <div className="row">
                        <h4 className="display-5 mt-3 mb-4">
                            <i className={this.state.icon_class + this.props.icon_class}></i>
                            &nbsp;
                            {this.props.box_title}
                        </h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default BoxButton;
