import React, { Component } from 'react';
import {updateSelectedQuestions} from "../../../redux/Actions";
import {connect} from "react-redux";

class PISLGeneralQuestion extends Component {

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
        let q = this.state.q;
        let number = this.state.number;

        return (
            <React.Fragment>
                <div className={`mt-2 ${!this.validateBlankLineValue() ? 'mb-2' : ''} col-sm-12 px-0 py-2 ${q.checked ? 'selected_question' : ''} question_row`} onClick={this.updateSelectedQuestions}>
                    <div className={`arabic-font text-right col-sm-12`}>
                        <h5 className="mb-2 text-right"
                            style={{fontSize: this.props.questionFontSize}}
                        >
                            <span style={{display: 'inline-block'}}>{number})</span> <div style={{display: 'inline-block'}} dangerouslySetInnerHTML={this.createMarkup(q.rtl.statement) } />
                        </h5>
                    </div>
                </div>
                {
                    this.props.blank_lines
                        ? this.renderBlankLines()
                        : ''
                }
            </React.Fragment>
        )
    }

    createMarkup(html) {
        return {__html: `${html}`};
    }

    validateBlankLineValue() {
        if(this.props.blank_lines === null
            || this.props.blank_lines === ''
            || this.props.blank_lines === 0
            || this.props.blank_lines === '0') {
            return false;
        }

        return true
    }

    renderBlankLines() {
        if(this.props.type != 'general') return [];

        let p = [];
        if(!this.validateBlankLineValue()) return false;
        for(let i=1; i<=this.props.blank_lines; i++)
        {
            p.push(<p className="blank_line">&nbsp;</p>)
        }
        return p;
    }

    prepareQuestionData() {
        let question = this.props.question;
        let number = this.props.number;
        if(question.length <= 0) return false;
        if(typeof question.translations === typeof undefined) return false;

        let q = this.state.q;

        let i = 0, j = 1;
        let t = question.translations.find(qt => qt.locale === 'en');

        q.id = question.id;
        if(t) {
            q.en.statement = t.question_statement;
            q.en.correct_answer = t.correct_answer;
        }

        /**
         * loop through other language statement only if it exists
         * English, Urdu & Isl (or some other) will not have this index
         */
        t = question.translations.find(qt => qt.locale === 'ur');
        if (typeof t !== typeof undefined) {
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

export default connect(mapStateToProps, mapDispatchToProps)(PISLGeneralQuestion);
