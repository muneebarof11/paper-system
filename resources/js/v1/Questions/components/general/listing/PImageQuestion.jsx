import React, { Component } from 'react';
import {removeQuestion, updateSelectedQuestions} from "../../../redux/Actions";
import {connect} from "react-redux";

class PImageQuestion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            q: {
                id: 0,
                en: {
                    statement: '',
                    image: ''
                },
                rtl: {
                    statement: '',
                    image: ''
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
            <div className={`mt-2 mb-2 col-sm-12 px-0 py-2 ${q.checked ? 'selected_question' : ''} question_row`} onClick={this.updateSelectedQuestions}>
                <div className="col-lg-6">
                    <div className="row">
                        <h5 className="mb-2 col-lg-12">
                            {number}) {q.en.statement}
                        </h5>
                        <div className="image-container col-lg-12">
                            <img src={$helper.getImageBasePath() + q.en.image} className="img-fluid" alt={q.en.statement} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    prepareQuestionData() {
        let question = this.props.question;
        let number = this.props.number;
        if(question.length <= 0) return false;
        if(typeof question.translations === typeof undefined) return false;

        let q = this.state.q;
        let i = 0, j = 1;
        let t = question.translations.find(q => q.locale === 'en');
        if(typeof t === typeof undefined) return false;
        if(typeof t.question_statement === typeof undefined) return false;

        // check its only urdu
        debugger;
        if($helper.checkUTF8(t.question_statement)) {
            q.rtl.statement = t.question_statement;
        } else {
            q.en.statement = t.question_statement;
        }

        q.id = question.id;
        q.en.image = t.question_image;

        /**
         * loop through other language statement only if it exists
         * English, Urdu & Isl (or some other) will not have this index
         */
        t = question.translations.find(q => q.locale === 'ur');
        if (typeof t !== typeof undefined) {
            q.rtl.statement = t.question_statement;
            q.rtl.image = t.question_image;
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

export default connect(mapStateToProps, mapDispatchToProps)(PImageQuestion);
