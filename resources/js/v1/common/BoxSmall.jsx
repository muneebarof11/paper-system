import React, { Component } from 'react';

class BoxSmall extends  Component {

    constructor(props) {
        super(props);
        this.state = {
            box_class : "alert alert-primary jumbotron jumbotron-fluid ",
            icon_class: "fa "
        };

        this.cacheTopics = this.cacheTopics.bind(this);
    }

    cacheTopics(e) {
        e.preventDefault();
        window.location.href = this.props.url;
    }

    render() {
        return (
            <div
                className={this.props.parent_class + ' boxSm' }
                title={this.props.box_title}>
                <a href={this.props.url} onClick={this.cacheTopics}>
                    <div className={this.state.box_class + this.props.box_class}>
                        <div className="row">
                            {
                                this.props.medium == 'eng' || this.props.medium == 'dual'
                                    ?
                                        <h4 className={`display-5 mt-3 mb-4 ${this.props.medium == 'dual' && !this.props.rtl_none ? 'col-lg-6' : ''}`}>
                                            <i className={this.state.icon_class + this.props.icon_class}></i>
                                            &nbsp;
                                            {this.props.box_title}
                                        </h4>
                                    : ''
                            }

                            {
                                this.props.medium == 'dual' || this.props.medium == 'urdu'
                                    ? (
                                        <h4 className={`urdu-font display-5 mt-3 mb-4 ${this.props.medium == 'dual' ? 'col-lg-6' : ''} ${this.props.rtl_none ? 'd-none' : ''}`}>
                                            <i className={this.state.icon_class + this.props.icon_class}></i>
                                            &nbsp;
                                            {this.props.box_rtl_title}
                                        </h4>
                                    )
                                    : ''
                            }
                        </div>
                    </div>
                </a>
            </div>
        );
    }
}

export default BoxSmall;
