import React, { Component } from 'react';
import MathJax from 'react-mathjax-preview'
import {connect} from "react-redux";
import {removeQuestion} from "../../../redux/Actions";

class EngGeneralQuestion extends Component {

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
        this.displayCorrectAnswer = this.displayCorrectAnswer.bind(this);
        this.triggerRemoveItem = this.triggerRemoveItem.bind(this);
    }

    componentDidMount() {
        this.prepareQuestionData();
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
        let q = this.state.q;
        let number = this.state.number;

        return (
            <React.Fragment>
                {q.en.statement.length > 0
                    ?
                    <div className="mt-4 mb-4 row pt-2 pb-2">
                        <div className={`col-lg-11`}>
                            <h5 className={`mb-2`}>
                                <span style={{display: 'inline-block'}}>{number})</span> <div className={`${$helper.checkUTF8(q.en.statement) ? 'urdu-font' : ''}`} style={{display: 'inline-block'}} dangerouslySetInnerHTML={this.createMarkup(q.en.statement) } />
                                {this.displayCorrectAnswer(q.en.correct_answer)}
                            </h5>
                        </div>
                        <div className="col-lg-1">
                            <button typeof="button" className="btn btn-dark"
                                    onClick={() => this.triggerRemoveItem(q.id)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    : <React.Fragment/>
                }
                {
                    this.props.blank_lines
                        ? this.renderBlankLines()
                        : ''
                }
            </React.Fragment>
        )
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

    createMarkup(html) {
        return {__html: `${html}`};
    }

    displayCorrectAnswer(correct_answer) {
        correct_answer = correct_answer === 'T' ? 'T' : correct_answer;
        if(this.props.type === 'true_false' || this.props.type === 'fill_in_the_blank') {
            return <span className="correct-answer">&nbsp;&nbsp;({correct_answer})&nbsp;&nbsp;</span>
        }

        return <React.Fragment></React.Fragment>
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
        if (typeof t !== typeof undefined) {
            q.en.statement = t.question_statement;
            q.en.correct_answer = t.correct_answer;
        }

        this.setState({q: q, number: number})
    }
}

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
  return {
      removeQuestion: (formData, type, index) => dispatch(removeQuestion(dispatch, formData, type, index)),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(EngGeneralQuestion);
