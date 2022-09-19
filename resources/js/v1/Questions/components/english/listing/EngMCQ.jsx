import React, { Component } from 'react';
import {markCorrectOption, removeQuestion} from "../../../redux/Actions";
import {connect} from "react-redux";

class EngMCQ extends Component {

    constructor(props) {
        super(props);

        this.state = {
            q: {
                id: 0,
                en: {
                    statement: '',
                    options: []
                },
                rtl: {
                    statement: '',
                    options: []
                }
            },
            number: 0
        };

        this.prepareMcqQuestionData = this.prepareMcqQuestionData.bind(this);
        this.triggerRemoveItem = this.triggerRemoveItem.bind(this);
    }

    componentDidMount() {
        // this.prepareMcqQuestionData();
    }

    triggerRemoveItem(id) {
        const c = window.confirm('Are you sure?');
        if (!c) return false;

        const formData = new FormData();
        formData.append('id', $helper.easyEncode(id));
        formData.append('type', this.props.type);

        this.props.removeQuestion(formData, this.props.type, this.props.number-1);
    }

    render() {
        let data = this.prepareMcqQuestionData();
        if(data === false) return <React.Fragment />
        let number = data.number;
        let q = data.q;

        return (
            <div className="mt-4 mb-4 row pb-4 pt-2">
                <div className="col-lg-11">
                    <h4 className={`mb-2`}>{number}) {q.en.statement}</h4>
                    <div className="row">
                        {q.en.options.length > 0 ?
                            q.en.options.map((o, i) => {
                                return (
                                    <div
                                        onClick={() => this.markOptionAsCorrect($helper.getAlphabet(i), i)}
                                        className={`option-${this.props.question.id}-${i} ${q.en.correct_answer == $helper.getAlphabet(i) ? 'correct-answer' : ''} question-option col-lg-3`}>
                                        <strong>{$helper.getAlphabet(i)})</strong> &nbsp;
                                        {o.question_option}</div>
                                )
                            })
                            : <React.Fragment></React.Fragment>
                        }
                    </div>
                </div>
                <div className="col-lg-1">
                    <button typeof="button" className="btn btn-dark"
                            onClick={() => this.triggerRemoveItem(q.id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        )
    }

    markOptionAsCorrect(correct_answer, i) {
        const formData = new FormData();
        formData.append('id', $helper.easyEncode(this.props.question.id));
        formData.append('correct_answer', correct_answer);

        $(`[class^="option-${this.props.question.id}"]`).removeClass('correct-answer');
        $(`.option-${this.props.question.id}-${i}`).addClass('correct-answer');

        this.props.markOptionAsCorrect(formData);
    }

    prepareMcqQuestionData() {
        let question = this.props.question;
        let number = this.props.number;
        if(question.length <= 0) return false;
        if(typeof question.translations === typeof undefined) return false;

        let q = this.state.q;
        let i = 0, j = 1;
        let t = question.translations.find(q => q.locale === 'en');
        if(!t) return false;

        q.en.statement = t.question_statement.indexOf(`!___!`) !== -1 ? '' : t.question_statement ;
        /**
         * get options
         */
        q.en.options = t.options.filter(option => {
            return option.question_option;
        });

        q.id = question.id;
        q.en.correct_answer = t.correct_answer;

        // this.setState({q: q, number: number})
        return {q: q, number: number};
    }
}

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispatch => {
    return {
        removeQuestion: (formData, type, index) => dispatch(removeQuestion(dispatch, formData, type, index)),
        markOptionAsCorrect: (formData) => dispatch(markCorrectOption(dispatch, formData))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EngMCQ);

