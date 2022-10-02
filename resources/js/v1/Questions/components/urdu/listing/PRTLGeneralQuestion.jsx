import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSelectedQuestions } from "../../../redux/Actions";

class PRTLGeneralQuestion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            q: {
                id: 0,
                en: {
                    statement: ""
                },
                rtl: {
                    statement: ""
                }
            },
            number: 0
        };

        this.prepareQuestionData = this.prepareQuestionData.bind(this);
        this.updateSelectedQuestions = this.updateSelectedQuestions.bind(this);
    }

    componentDidMount() {
        this.prepareQuestionData();
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

        if (this.props.only_display) {
            return false;
        }

        const hasSelectedAlready = $(event.target).closest(
            ".selected_question"
        );

        if (hasSelectedAlready.length > 0) {
            console.log("found", hasSelectedAlready.length);
            hasSelectedAlready.removeClass("selected_question");
            this.props.updateSelectedQuestions(formData);
            this.setState({ q });
            return false;
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
            if (questions_count >= allowed && !this.state.q.checked) {
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
            <React.Fragment>
                <div
                    id={`q-${q.id}`}
                    key={q.id}
                    className={`mt-2 ${
                        !this.validateBlankLineValue() ? "mb-2" : ""
                    } col-sm-12 px-0 py-2 ${
                        q.checked ? "selected_question" : ""
                    } question_row general-question`}
                    onClick={this.updateSelectedQuestions}
                >
                    <div className={`urdu-font text-right col-sm-12`}>
                        <h5
                            className="mb-2 text-right"
                            style={{ fontSize: this.props.questionFontSize }}
                        >
                            <span style={{ display: "inline-block" }}>
                                {number})
                            </span>{" "}
                            <div
                                style={{ display: "inline-block" }}
                                dangerouslySetInnerHTML={this.createMarkup(
                                    q.rtl.statement
                                )}
                            />
                        </h5>
                    </div>
                </div>
                {this.props.blank_lines ? this.renderBlankLines() : ""}
            </React.Fragment>
        );
    }

    createMarkup(html) {
        return { __html: `${html}` };
    }

    validateBlankLineValue() {
        if (
            this.props.blank_lines === null ||
            this.props.blank_lines === "" ||
            this.props.blank_lines === 0 ||
            this.props.blank_lines === "0"
        ) {
            return false;
        }

        return true;
    }

    renderBlankLines() {
        if (this.props.type != "general") return [];
        let p = [];
        if (!this.validateBlankLineValue()) return false;
        for (let i = 1; i <= this.props.blank_lines; i++) {
            p.push(<p className="blank_line">&nbsp;</p>);
        }
        return p;
    }

    prepareQuestionData() {
        let question = this.props.question;
        let number = this.props.number;
        if (question.length <= 0) return false;
        if (typeof question.translations === typeof undefined) return false;

        let q = this.state.q;

        let i = 0,
            j = 1;
        let t = question.translations.find(qt => qt.locale === "en");

        q.id = question.id;
        if (t) {
            q.en.statement = t.question_statement;
            q.en.correct_answer = t.correct_answer;
        }

        /**
         * loop through other language statement only if it exists
         * English, Urdu & Isl (or some other) will not have this index
         */
        t = question.translations.find(qt => qt.locale === "ur");
        if (typeof t !== typeof undefined) {
            q.rtl.statement = t.question_statement;
            q.rtl.correct_answer = t.correct_answer;
        }

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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PRTLGeneralQuestion);
