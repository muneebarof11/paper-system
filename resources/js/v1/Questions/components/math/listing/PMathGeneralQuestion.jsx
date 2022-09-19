import React, { Component } from 'react';
import MathJax from 'react-mathjax-preview'
import {connect} from "react-redux";
import {removeQuestion, updateSelectedQuestions} from "../../../redux/Actions";

class PMathGeneralQuestion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            q: {
                id: 0,
                en: {
                    statement: '',
                },
                rtl: {
                    statement: '',
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

    updateSelectedQuestions() {
        const key =  this.props.type;

        if(this.props.only_display) {
            return false;
        }

        if(this.props.selected_question.length > 0) {
            const question_info = this.props.selected_question.find(sq => sq.key == key);
            const questions_count = question_info.questions ? question_info.questions.length : 0;
            const allowed = this.props.total_allowed;
            if(questions_count >= allowed && !this.state.q.checked) {
                alert(`You can select maximum ${allowed} questions`);
                return false;
            }
        }

        const formData = {
            key: key,
            title: this.props.title,
            each_question_marks: this.props.each_question_marks,
            total_allowed: this.props.total_allowed,
            ignore: this.props.ignore,
            question: this.props.question,
            form_type: this.props.form_type
        };

        this.props.updateSelectedQuestions(formData);

        let checked = !this.state.q.checked;
        let q = {
            ...this.state.q,
            checked: checked
        };
        this.setState({q})
    }

    render() {
        const q = this.state.q;
        const number = this.state.number;
        const display_rtl = q.rtl.statement.length > 0;
        const hide_eng = this.props.medium === 'urdu';

        return (
            <div className={`mt-2 mb-2 col-sm-12 px-0 py-2 ${q.checked ? 'selected_question' : ''} question_row`} onClick={this.updateSelectedQuestions}>
                <div className={`${!display_rtl ? 'col-lg-11': 'col-lg-6'} ${hide_eng ? 'd-none' : ''}`}>
                    <h5 className={`mb-2`}>
                        {number}) <MathJax math={q.en.statement} />
                    </h5>
                </div>
                <div className={`urdu-font text-right ${hide_eng ? 'col-lg-11' : 'col-lg-6'} ${!display_rtl ? 'd-none' : ''}`}>
                    <h5 className="mb-2 text-right">
                        {number}) <MathJax math={q.rtl.statement} />
                    </h5>
                </div>
            </div>
        )
    }

    createMarkup(html) {
        return {__html: `${html}`};
    }

    prepareQuestionData() {
        let question = this.props.question;
        let number = this.props.number;
        if(question.length <= 0) return false;
        if(typeof question.translations === typeof undefined) return false;

        let q = this.state.q;

        let i = 0, j = 1;
        let t = question.translations.find(q => q.locale === 'en');

        q.id = question.id;
        if(t) {
            q.en.statement = t.question_statement;
            q.en.correct_answer = t.correct_answer;
        }
        /**
         * loop through other language statement only if it exists
         * English, Urdu & Isl (or some other) will not have this index
         */
        t = question.translations.find(q => q.locale === 'ur');
        if (t) {
            q.rtl.statement = t.question_statement;
            q.rtl.correct_answer = t.correct_answer;
        }

        this.setState({q: q, number: number})
    }
}

const mapStateToProps = state => {
    return {
        selected_question: state.questions.selected_question
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateSelectedQuestions: (formData) => dispatch(updateSelectedQuestions(dispatch, formData))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PMathGeneralQuestion);
