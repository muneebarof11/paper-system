import React, { Component } from "react";

class PageHeader extends Component {
    constructor(props) {
        super(props);
    }

    removeAllQuestions() {
        const total_questions = $(".tab-pane.active").find(".mb-4.row").length;
        let trigger_count = 0;
        if (window.confirm("Are you sure?")) {
            var realConfirm = window.confirm;
            window.confirm = function() {
                return true;
            };

            $(".tab-pane.active")
                .find(".mb-4.row")
                .each(function() {
                    let _this = $(this);
                    setTimeout(function() {
                        _this
                            .find(".col-lg-1")
                            .find("button")
                            .trigger("click");
                        trigger_count++;
                    }, 1000);
                });
            if (trigger_count >= total_questions) {
                window.confirm = realConfirm;
                location.reload();
            }
        }
    }

    render() {
        return (
            <section className="page_title">
                <h3>
                    <div className="pb-2 pt-3 clearfix">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6 text-right">
                                    {this.props.back_button ? (
                                        <a href={this.props.back_button_url}>
                                            <button
                                                type="button"
                                                className="btn btn-primary float-left"
                                            >
                                                {this.props.back_button_text}
                                            </button>
                                            &nbsp;
                                        </a>
                                    ) : (
                                        <React.Fragment></React.Fragment>
                                    )}

                                    <span className={this.props.rtl_font}>
                                        {" "}
                                        {this.props.title}{" "}
                                    </span>
                                </div>
                                <div className="col-md-6">
                                    {this.props.import_btn ? (
                                        <button
                                            type="button"
                                            className="ml-3 btn btn-primary float-right"
                                            data-toggle="modal"
                                            data-target="#popupModal2"
                                        >
                                            {this.props.import_text}
                                        </button>
                                    ) : (
                                        <React.Fragment></React.Fragment>
                                    )}

                                    {this.props.question_type_btn ? (
                                        <button
                                            type="button"
                                            className="btn btn-primary float-right mr-2"
                                            data-toggle="modal"
                                            data-target="#popupModal"
                                        >
                                            Add Question Type
                                        </button>
                                    ) : (
                                        <React.Fragment></React.Fragment>
                                    )}

                                    {this.props.add_button ? (
                                        <button
                                            type="button"
                                            className="btn btn-primary float-right"
                                            data-toggle="modal"
                                            data-target="#popupModal"
                                        >
                                            {this.props.add_button_text}
                                        </button>
                                    ) : (
                                        <React.Fragment></React.Fragment>
                                    )}

                                    {this.props.remove_btn ? (
                                        <button
                                            type="button"
                                            className="btn btn-danger float-right mr-2"
                                            onClick={() => {
                                                this.removeAllQuestions();
                                            }}
                                        >
                                            <i className="fa fa-trash"></i> All
                                            Questions
                                        </button>
                                    ) : (
                                        <React.Fragment></React.Fragment>
                                    )}
                                </div>
                            </div>
                        </div>
                        {this.props.title ? (
                            <div className="horizontal-separator mt-3 mb-2">
                                &nbsp;
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </h3>
            </section>
        );
    }
}

export default PageHeader;
