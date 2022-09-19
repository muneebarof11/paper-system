import React, { Component } from 'react';
import {removeQuestion, updateSelectedQuestions} from "../../../redux/Actions";
import {connect} from "react-redux";

class PMatchColumn extends Component {

    constructor(props) {
        super(props);

        this.prepareMcqQuestionData = this.prepareMcqQuestionData.bind(this);

        this.state = {
            q: {
                id: 0,
                en: {
                    statement: '',
                    columns: [],
                },
            },
            number: 0
        }
    }

    componentDidMount() {
        this.prepareMcqQuestionData();
        this.updateSelectedQuestions = this.updateSelectedQuestions.bind(this);
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
            <div className={`mt-2 mb-2 col-sm-12 px-0 py-2 ${q.checked ? 'selected_question' : ''} question_row`} onClick={this.updateSelectedQuestions}>
                <div className="col-lg-10">
                    <h5 className="mb-2">{number}) {q.en.statement}</h5>
                    <table className="table-bordered col-lg-6">
                        <tbody>
                        {q.en.columns.length > 0 ?
                            q.en.columns.map((c, i) => {
                                return (
                                    <tr>
                                        <td className="py-2 pl-2">{c.A}</td>
                                        <td className="py-2 pl-2">{c.B}</td>
                                    </tr>
                                )
                            })
                            : <React.Fragment></React.Fragment>
                        }
                        </tbody>
                    </table>
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
        if(t && Object.keys(t).length <= 0) {
            t = question.translations.find(q => q.locale === 'ur');
        }

        if(!t) return false;

        q.id = question.id;
        q.en.statement = t.question_statement;
        let columnA = t.left_column_options.length > 0 ? JSON.parse(t.left_column_options) : [];
        let columnB = t.right_column_options.length > 0 ? JSON.parse(t.right_column_options) : [];
        for(let k=0; k < columnA.length; k++) {
            q.en.columns.push({A: columnA[k], B: columnB[k]})
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

export default connect(mapStateToProps, mapDispatchToProps)(PMatchColumn);

