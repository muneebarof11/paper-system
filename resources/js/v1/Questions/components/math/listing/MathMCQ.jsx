import React, { Component } from "react";
import { markCorrectOption, removeQuestion } from "../../../redux/Actions";
import { connect } from "react-redux";
import MathJax from "react-mathjax-preview";

var Latex = require("react-latex");

class MathMCQ extends Component {
    constructor(props) {
        super(props);

        this.state = {
            q: {
                id: 0,
                en: {
                    statement: "",
                    options: []
                },
                rtl: {
                    statement: "",
                    options: []
                },
                options: []
            },
            number: 0
        };

        this.prepareMcqQuestionData = this.prepareMcqQuestionData.bind(this);
        this.triggerRemoveItem = this.triggerRemoveItem.bind(this);
    }

    componentDidMount() {
        this.prepareMcqQuestionData();
    }

    triggerRemoveItem(id) {
        const c = window.confirm("Are you sure?");
        if (!c) return false;

        const formData = new FormData();
        formData.append("id", $helper.easyEncode(id));
        formData.append("type", this.props.type);

        this.props.removeQuestion(
            formData,
            this.props.type,
            this.props.number - 1
        );
    }

    render() {
        const q = this.state.q;
        const number = this.state.number;
        const hide_eng = this.props.medium === "urdu";
        const display_rtl = q.rtl.statement.length > 0;

        return (
            <React.Fragment>
                <div className={`row mt-2 mb-2 col-sm-12 px-0 py-2`}>
                    <div className={`col-lg-6 ${hide_eng ? "d-none" : ""}`}>
                        <h5 className={`mb-2`}>
                            {number}) <MathJax math={q.en.statement} />
                        </h5>
                    </div>
                    <div
                        className={`urdu-font text-right ${
                            hide_eng ? "col-lg-11" : "col-lg-5"
                        } ${q.rtl.statement.length > 0 ? "" : "d-none"}`}
                    >
                        <h5 className="mb-2 text-right">
                            {number}) <MathJax math={q.rtl.statement} />
                        </h5>
                    </div>
                    <div className="col-lg-1">
                        <button
                            typeof="button"
                            className="btn btn-dark"
                            onClick={() => this.triggerRemoveItem(q.id)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                </div>

                <div className="row col-sm-12 mx-0 px-0">
                    {q.options && q.options.length > 0 ? (
                        q.options.map((o, i) => {
                            return (
                                <div
                                    className={`col-sm-4 mb-3 option-${
                                        this.props.question.id
                                    }-${i} ${
                                        q.en.correct_answer ==
                                        $helper.getAlphabet(i)
                                            ? "correct-answer"
                                            : ""
                                    } question-option`}
                                    style={{
                                        fontSize: this.props.optionsFontSize
                                    }}
                                    onClick={() =>
                                        this.markOptionAsCorrect(
                                            $helper.getAlphabet(i),
                                            i
                                        )
                                    }
                                    dangerouslySetInnerHTML={this.createMarkup(
                                        o
                                    )}
                                ></div>
                            );
                        })
                    ) : (
                        <React.Fragment></React.Fragment>
                    )}
                </div>
            </React.Fragment>
        );
    }

    markOptionAsCorrect(correct_answer, i) {
        const formData = new FormData();
        formData.append("id", $helper.easyEncode(this.props.question.id));
        formData.append("correct_answer", correct_answer);

        $(`[class^="option-${this.props.question.id}"]`).removeClass(
            "correct-answer"
        );
        $(`.option-${this.props.question.id}-${i}`).addClass("correct-answer");

        this.props.markOptionAsCorrect(formData);
    }

    prepareMcqQuestionData() {
        let question = this.props.question;
        let number = this.props.number;
        if (question.length <= 0) return false;
        if (typeof question.translations === typeof undefined) return false;

        let q = this.state.q;
        let i = 0,
            j = 1;
        let t = question.translations.find(q => q.locale === "en");

        q.id = question.id;

        if (t) {
            q.en.statement = t.question_statement;
            q.en.options = t.options.filter(option => {
                return option.translation_id == t.id;
            });
            q.en.correct_answer = t.correct_answer;
        }

        /**
         * loop through other language statement only if it exists
         * English, Urdu & Isl (or some other) will not have this index
         */
        t = question.translations.find(q => q.locale === "ur");
        if (t) {
            q.rtl.statement = t.question_statement;
            q.rtl.options = t.options.filter(option => {
                return option.translation_id == t.id;
            });
        }

        q.options = this.buildOptions(q);
        this.setState({ q: q, number: number });
    }

    buildOptions(q) {
        if (q.en.options.length > 0 && q.rtl.options.length > 0) {
            for (let i = 0; i <= 3; i++) {
                let statement = "";

                statement += ` (${$helper.getAlphabet(i)}) `;

                if (q.en.options[i]) {
                    statement += q.en.options[i].question_option;
                }

                if (q.rtl.options[i]) {
                    statement += `<span class="px-4 urdu-font text-right">${q.rtl.options[i].question_option}</span>`;
                }

                q.options.push(statement);
            }
        } else if (q.en.options.length > 0) {
            for (let i = 0; i <= 3; i++) {
                let statement = "";

                statement += ` (${$helper.getAlphabet(i)}) `;

                if (q.en.options[i]) {
                    statement += q.en.options[i].question_option;
                }

                q.options.push(statement);
            }
        } else if (q.rtl.options.length > 0) {
            for (let i = 0; i <= 3; i++) {
                let statement = "";

                statement += ` (${$helper.getAlphabet(i)}) `;

                if (q.rtl.options[i]) {
                    statement += `<span class="px-4 urdu-font text-right">${q.rtl.options[i].question_option}</span>`;
                }

                q.options.push(statement);
            }
        }

        return q.options;
    }

    createMarkup(html) {
        return { __html: `${html}` };
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        removeQuestion: (formData, type, index) =>
            dispatch(removeQuestion(dispatch, formData, type, index)),
        markOptionAsCorrect: formData =>
            dispatch(markCorrectOption(dispatch, formData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MathMCQ);
