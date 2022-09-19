Subjeimport React, { Component } from 'react';
import {addQuestion, hideQuestionForm} from "../../../redux/Actions";
import {connect} from "react-redux";

class FillBlanksForms extends Component {
    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this);
        this.hideTopicForm = this.hideTopicForm.bind(this);
    }

    submitForm(e) {
        e.preventDefault();

        const serialize = require('form-serialize');
        let form = document.querySelector(`#sectionForm_${this.props.index}`);
        let form_data = serialize(form, { hash: true });

        if(!form_data.question_en && !form_data.question_rtl) {
            alert('Either English or Urdu question statement is required');
            return false;
        }

        const formData = new FormData();
        for (let key in form_data) {
            formData.append(key, form_data[key]);
        }

        this.props.addQuestion(formData, this.props.endpoint, this.props.type, this.props.index);
    }

    hideTopicForm(warning) {
        const confirmation = window.confirm('Are you sure you want to cancel?');
        if (!confirmation) return false;

        this.props.hideForm(this.props.index);
    }

    render() {
        return (
            <form onSubmit={this.submitForm} className="mb-4 sectionForm" id={`sectionForm_${this.props.index}`}>
                <input type="hidden" value={this.props.form} name="section_info" />
                <div className="row">
                    <div className="form-group col-lg-6 row">
                        <label className="col-form-label col-lg-3" htmlFor={`question_en_${this.props.index}`}>Question:</label>
                        <div className="col-lg-9"><input type="text" className="form-control" id={`question_en_${this.props.index}`} name="question_en" /></div>
                    </div>
                    <div className="form-group col-lg-6 row urdu-font">
                        <div className="col-lg-9"><input type="text" className="form-control text-align-right" id={`question_rtl_${this.props.index}`} name="question_rtl" /></div>
                        <label className="col-lg-3 col-form-label text-align-right" htmlFor={`question_rtl_${this.props.index}`}>سوال:</label>
                    </div>
                </div>

                <hr className="mt-3" />

                <div className="form-group row">

                    <div className="col-lg-6 row">
                        <button className="btn btn-primary col-lg-5" type="submit" disabled={this.props.loading}>
                            {this.props.loading ? 'Saving...' : 'Save'}
                        </button>
                        <button className="btn btn-danger col-lg-5" type="button" onClick={this.hideTopicForm}>
                            Cancel
                        </button>
                    </div>

                    <div className="form-group col-md-6 row">
                        <label className="col-lg-3 col-form-label" htmlFor={`correct_option_${this.props.index}`}>Correct Answer</label>
                        <div className="col-lg-9"><input type="text" className="form-control" id={`correct_option_${this.props.index}`} name="correct_option" /></div>
                    </div>
                </div>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.questions.loading,
        message: state.questions.message,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addQuestion: (formData, endpoint, type, index) => dispatch(addQuestion(dispatch, formData, endpoint, type, index)),
        hideForm: (index) => dispatch(hideQuestionForm(dispatch, index))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FillBlanksForms);
