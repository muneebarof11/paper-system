import React, {Component} from 'react';
import {updateSelectedQuestions} from "../../../redux/Actions";
import {connect} from "react-redux";

class PMCQ extends Component {

    constructor(props) {
        super(props);
        this.state = {
            q: {
                id: 0,
                checked: false,
                en: {
                    statement: '',
                    options: []
                },
                rtl: {
                    statement: '',
                    options: []
                },
                options: []
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
        const displayRtl = q.rtl.statement.length > 0 ? '' : 'd-none';

        return (
            (q.en.statement.length <=0 && q.rtl.statement.length <0)
                ? <React.Fragment /> :
                <div className={`mt-2 mb-2 col-sm-12 px-0 py-2 ${q.checked ? 'selected_question' : ''} question_row mcq-question`} onClick={this.updateSelectedQuestions}>
                    <div className="row col-sm-12 mx-0 px-0">
                        <div className="col-sm-6">
                            <h5 className={`mb-2`}
                                style={{fontSize: this.props.questionFontSize}}
                            >{number}) {q.en.statement}</h5>
                        </div>
                        <div className={`col-sm-6 urdu-font text-right ${displayRtl}`}>
                            <h4 className="mb-2 text-right"
                                style={{fontSize: this.props.questionFontSize}}
                            >{number})&nbsp;{q.rtl.statement}</h4>
                        </div>
                    </div>
                    <div className="row col-sm-12 mx-0 px-0">
                        {q.options.length > 0 ?
                            q.options.map((o, i) => {
                                return (
                                    <div className={`col-sm-3 mb-3`}  style={{fontSize: this.props.optionsFontSize}} dangerouslySetInnerHTML={this.createMarkup(o) }></div>
                                )
                            })
                            : <React.Fragment></React.Fragment>
                        }
                    </div>
                </div>
        )
    }

    createMarkup(html) {
        return {__html: `${html}`};
    }

    prepareMcqQuestionData() {
        let question = this.props.question;
        let number = this.props.number;
        if (question.length <= 0) return false;
        if (typeof question.translations === typeof undefined) return false;

        let q = this.state.q;
        let i = 0, j = 1;
        let t = question.translations.find(qt => qt.locale === 'en');

        if (t) {
            q.en.statement = t.question_statement;
            /**
             * get options
             */
            q.en.options = t.options.filter(option => {
                return option.translation_id == t.id;
            });

            q.en.correct_answer = t.correct_answer;
        }

        q.id = question.id;
        /**
         * loop through other language statement only if it exists
         * English, Urdu & Isl (or some other) will not have this index
         */
        t = question.translations.find(q => q.locale === 'ur');
        if (t) {
            q.rtl.statement = t.question_statement;

            q.rtl.options = t.options.filter(option => {
                return option.translation_id == t.id;
            });
            q.rtl.correct_answer = t.correct_answer;
        }

        q.options = this.buildOptions(q);
        this.setState({q: q, number: number});
    }

    buildOptions(q) {

        if(q.en.options.length > 0 && q.rtl.options.length > 0) {
            for(let i=0; i<=3; i++) {
                let statement = '';

                statement += ` (${$helper.getAlphabet(i)}) `;

                if(q.en.options[i]) {
                    statement += q.en.options[i].question_option;
                }

                if(q.rtl.options[i]) {
                    statement += `<span class="px-4 urdu-font">${q.rtl.options[i].question_option}</span>`;
                }

                q.options.push(statement);
            }
        } else if(q.en.options.length > 0) {
            for(let i=0; i<=3; i++) {
                let statement = '';

                statement += ` (${$helper.getAlphabet(i)}) `;

                if(q.en.options[i]) {
                    statement += q.en.options[i].question_option;
                }

                q.options.push(statement);
            }
        } else if(q.rtl.options.length > 0) {
            for(let i=0; i<=3; i++) {
                let statement = '';

                statement += ` (${$helper.getAlphabet(i)}) `;

                if(q.rtl.options[i]) {
                    statement += q.rtl.options[i].question_option;
                }

                q.options.push(statement);
            }
        }

        return q.options;
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

export default connect(mapStateToProps, mapDispatchToProps)(PMCQ);

