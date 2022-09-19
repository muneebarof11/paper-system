import React, { Component } from 'react';
import {removeQuestion, updateSelectedQuestions} from "../../../redux/Actions";
import {connect} from "react-redux";

class PEngMCQ extends Component {

    constructor(props) {
        super(props);

        this.state = {
            q: {
                id: 0,
                en: {
                    statement: '',
                    options: [],
                    correct_answer: ''
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
        let q = this.state.q;
        let number = this.state.number;

        if(q.en.options.length <= 0) return <React.Fragment />;
        const statement_len = q.en.statement.length <= 0;

        return (
            <div className={`mt-2 mb-2 col-sm-12 px-0 py-2 ${q.checked ? 'selected_question' : ''} question_row mcq-question`} onClick={this.updateSelectedQuestions}>                <div className="col-lg-11">
                    { !statement_len ? <h4 className={`mb-2`}>{number}) {q.en.statement}</h4> : <React.Fragment />}
                    <div className="row">
                        { statement_len ? <div className="col-lg-1"> {number})</div> : <React.Fragment /> }
                        {q.en.options.length > 0 ?
                            q.en.options.map((o, i) => {
                                return (
                                    <div className={statement_len ? `col-lg-2` : `col-lg-3`}>
                                        <strong>{$helper.getAlphabet(i)})</strong> &nbsp;
                                        {o.question_option}</div>
                                )
                            })
                            : <React.Fragment></React.Fragment>
                        }
                    </div>
                </div>
            </div>
        )
    }

    prepareMcqQuestionData() {
        let question = this.props.question;
        let number = this.props.number;
        if(question.length <= 0) return false;
        if(typeof question.translations === typeof undefined) return false;

        let q = this.state.q;
        let i = 0, j = 1;
        let t = question.translations.find(q => q.locale === 'en');

        // check its only urdu
        if(t) {
            q.en.statement = t.question_statement.indexOf(`!___!`) !== -1 ? '' : t.question_statement ;

            q.en.correct_answer = t.correct_answer;
            /**
             * get options
             */
            q.en.options = t.options.filter(option => {
                return option.translation_id == t.id;
            });
        }

        q.id = question.id;

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

export default connect(mapStateToProps, mapDispatchToProps)(PEngMCQ);

