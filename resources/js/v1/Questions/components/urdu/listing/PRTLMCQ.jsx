import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSelectedQuestions } from "../../../redux/Actions";

class PRTLMCQ extends Component {
    constructor(props) {
        super(props);

        this.state = {
            q: {
                id: 0,
                checked: false,
                en: {
                    statement: "",
                    options: []
                },
                rtl: {
                    statement: "",
                    options: []
                }
            },
            number: 0
        };

        this.prepareMcqQuestionData = this.prepareMcqQuestionData.bind(this);
        this.updateSelectedQuestions = this.updateSelectedQuestions.bind(this);
    }

    componentDidMount() {
        this.prepareMcqQuestionData();
    }

    updateSelectedQuestions(event) {
        const key = this.props.type;
        const formData = {
            key: key,
            title: this.props.title,
            each_question_marks: this.props.each_question_marks,
            total_allowed: this.props.total_allowed,
            ignore: this.props.ignore,
            question: this.props.question,
            form_type: this.props.form_type
        };
        let checked = !this.state.q.checked;
        let q = {
            ...this.state.q,
            checked: checked
        };

        const hasSelectedAlready = $(event.target).closest(
            ".selected_question"
        );

        if (hasSelectedAlready.length > 0) {
            console.log("found", hasSelectedAlready.length);
            hasSelectedAlready.removeClass("selected_question");
            this.props.updateSelectedQuestions(formData);
            this.setState({ q });
            return false;
        } else {
            console.log("not found", hasSelectedAlready.length);
        }

        if (
            this.props.each_question_marks == 0 ||
            this.props.total_allowed == 0
        ) {
            return false;
        }

        if (this.props.selected_question.length > 0) {
            const question_info = this.props.selected_question.find(
                sq => sq.key == key
            );
            const questions_count = question_info.questions
                ? question_info.questions.length
                : 0;
            const allowed = this.props.total_allowed;
            if (questions_count >= allowed) {
                alert(`You can select maximum ${allowed} questions`);
                return false;
            }
        }

        this.props.updateSelectedQuestions(formData);
        this.setState({ q });
    }

    render() {
        let q = this.state.q;
        let number = this.state.number;

        return (
            <div
                className={`mt-2 mb-2 col-sm-12 px-0 py-2 ${
                    q.checked ? "selected_question" : ""
                } question_row mcq-question`}
                onClick={this.updateSelectedQuestions}
            >
                <div
                    className={`col-sm-12 urdu-font text-right ${
                        q.rtl.statement.length > 0 ? "" : "d-none"
                    }`}
                >
                    <h4
                        className="mb-2 text-right"
                        style={{ fontSize: this.props.questionFontSize }}
                    >
                        {number})&nbsp;{q.rtl.statement}
                    </h4>
                    <div className="row mx-0">
                        {q.rtl.options.length > 0 ? (
                            q.rtl.options.map((o, i) => {
                                return (
                                    <div
                                        className={`col-sm-3 urdu-font text-right`}
                                        style={{
                                            fontSize: this.props.optionsFontSize
                                        }}
                                    >
                                        <strong>
                                            {$helper.getAlphabet(i)}){" "}
                                        </strong>
                                        &nbsp;
                                        {o.question_option}
                                    </div>
                                );
                            })
                        ) : (
                            <React.Fragment></React.Fragment>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    prepareMcqQuestionData() {
        let question = this.props.question;
        let number = this.props.number;
        if (question.length <= 0) return false;
        if (typeof question.translations === typeof undefined) return false;

        let q = this.state.q;
        let i = 0,
            j = 1;
        let t = question.translations[0];

        // check its only urdu
        if (t) {
            q.rtl.statement = t.question_statement;

            q.rtl.options = t.options.filter(option => {
                return option.translation_id == t.id;
            });
            q.en.correct_answer = t.correct_answer;
        }

        q.id = question.id;
        this.setState({ q: q, number: number });
    }
}

const mapStateToProps = state => {
    return {
        selected_question: state.questions.selected_question
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateSelectedQuestions: formData =>
            dispatch(updateSelectedQuestions(dispatch, formData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PRTLMCQ);
