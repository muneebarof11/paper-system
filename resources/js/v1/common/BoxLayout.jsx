import React, { Component } from "react";
import PageHeader from "./PageHeader";

class BoxLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section>
                <PageHeader
                    title={this.props.title}
                    back_button={this.props.back_button}
                    back_button_url="javascript:history.back()"
                    // back_button_url={this.props.history.goBack()}
                    back_button_text={this.props.back_button_text}
                    add_button={this.props.add_button}
                    add_button_url={this.props.add_button_url}
                    add_button_text={this.props.add_button_text}
                    modal_btn={
                        !this.props.modal_btn ? true : this.props.modal_btn
                    }
                    rtl_font={!this.props.rtl_font ? "" : this.props.rtl_font}
                    import_btn={this.props.import_btn}
                    import_text={this.props.import_text}
                />
                <div className="container-fluid">
                    <div className="row">{this.props.children}</div>
                </div>
            </section>
        );
    }
}

export default BoxLayout;
