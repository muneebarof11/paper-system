import React, { Component } from "react";

class Box extends Component {
    constructor(props) {
        super(props);
        this.state = {
            box_class: "alert alert-primary jumbotron jumbotron-fluid ",
            icon_class: "fa ",
            is_active_class: this.props.data.is_active == 0 ? " in-active " : ""
        };
    }

    render() {
        return (
            <div
                className={this.props.parent_class}
                title={this.props.box_title}
            >
                <a href={this.props.url}>
                    <div
                        className={
                            this.state.box_class +
                            this.props.box_class +
                            this.state.is_active_class
                        }
                    >
                        <div className="row">
                            <h2 className="display-5 mt-3 mb-4 px-3">
                                <i
                                    className={
                                        this.state.icon_class +
                                        this.props.icon_class
                                    }
                                ></i>
                                &nbsp;
                                {this.props.box_title}
                                {this.props.data.count
                                    ? ` (${this.props.data.count})`
                                    : ``}
                            </h2>
                        </div>
                    </div>
                </a>
            </div>
        );
    }
}

export default Box;
