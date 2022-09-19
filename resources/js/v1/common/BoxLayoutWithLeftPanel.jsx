import React, { Component } from "react";
import LeftPanel from "./LeftPanel";
import PageHeader from "./PageHeader";

class BoxLayoutWithLeftPanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <LeftPanel
                            back_button={this.props.back_button}
                            back_button_url="javascript:history.back()"
                            back_button_text={this.props.back_button_text}
                            title={this.props.left_title}
                            data={this.props.left_data}
                            step={this.props.step}
                            rtl_font={this.props.rtl_font}
                        />
                        <div className="ml-3 mr-3 col-lg-9 container-fluid content-area">
                            <PageHeader
                                title={this.props.title}
                                add_button={this.props.add_button}
                                add_button_url={this.props.add_button_url}
                                add_button_text={this.props.add_button_text}
                                modal_btn={
                                    !this.props.modal_btn
                                        ? true
                                        : this.props.modal_btn
                                }
                                rtl_font={
                                    !this.props.rtl_font
                                        ? ""
                                        : this.props.rtl_font
                                }
                                import_btn={this.props.import_btn}
                                import_text={this.props.import_text}
                                question_type_btn={this.props.question_type_btn}
                                remove_btn={this.props.remove_btn}
                            />
                            <section>
                                <div className="row">{this.props.children}</div>
                            </section>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BoxLayoutWithLeftPanel;
