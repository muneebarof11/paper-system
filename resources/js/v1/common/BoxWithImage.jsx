import React, { Component } from 'react';

class BoxWithImage extends  Component {

    constructor(props) {
        super(props);
        let title_class = 'show_title';

        this.state = {
            box_class : "alert alert-primary jumbotron jumbotron-fluid ",
            icon_class: "fa ",
            is_active_class: this.props.data.is_active == 0 ? ' in-active ' : '',
            title_class: title_class
        }
    }

    componentDidMount() {
        if(this.props.image) {
            let title_class = this.props.image.indexOf('placeholder') > 0 ? 'show_title' : '';
            this.setState({title_class})
        }
    }

    render() {
        return (
            <div className={`${this.props.parent_class} box-with-image`} title={this.props.box_title}>
                <a href={this.props.url}>
                    <div className={this.state.box_class + this.props.box_class + this.state.is_active_class }>
                        <div className="row">
                            {
                                this.props.image
                                    ? <img src={`${APP_URL + '/' +this.props.image}`} className="cover-image mx-auto" />
                                    : ''
                            }
                            <h3 className={`display-5 mt-3 mb-4 ${this.state.title_class}`}>
                                {this.props.box_title}
                            </h3>
                        </div>
                    </div>
                </a>
            </div>
        );
    }
}

export default BoxWithImage;
