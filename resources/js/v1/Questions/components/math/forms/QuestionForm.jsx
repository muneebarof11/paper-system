import React, { Component } from 'react';
import {addQuestion, hideQuestionForm} from "../../../redux/Actions";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-classic-with-mathtype';

import {connect} from "react-redux";
import {ckEditor_config, ckEditor_rtl_config} from "../../../../params";

class QuestionForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            question_en: '',
            question_rtl: '',
        };

        this.submitForm = this.submitForm.bind(this);
        this.hideTopicForm = this.hideTopicForm.bind(this);
        this.updateStatement = this.updateStatement.bind(this);
    }

    componentDidMount() {
        // this.initCustomCkEditor();
    }

    handleEditorChange(content, editor) {
    }

    hideTopicForm() {
        const confirmation = window.confirm('Are you sure you want to cancel?');
        if (!confirmation) return false;

        this.props.hideForm(this.props.index);
    }

    updateStatement(statement, type) {
        if(type === 'en') {
            this.setState({question_en: statement})
        } else {
            this.setState({question_rtl: statement})
        }
    }

    submitForm(e) {
        e.preventDefault();

        const serialize = require('form-serialize');
        let form = document.querySelector(`#sectionForm_${this.props.index}`);

        let form_data = serialize(form, { hash: true });

        if(this.state.question_en.length <= 0 && this.state.question_rtl.length <= 0) {
            alert('Either English or Urdu question statement is required');
            return false;
        }

        const formData = new FormData();
        for (let key in form_data) {
            formData.append(key, form_data[key]);
        }
        formData.append('question_en', this.state.question_en);
        formData.append('question_rtl', this.state.question_rtl);

        this.props.addQuestion(formData, this.props.endpoint, this.props.type, this.props.index);
    }

    render() {
        return (
            <form onSubmit={this.submitForm} className="mb-4 sectionForm" id={`sectionForm_${this.props.index}`}>
                <input type="hidden" value={this.props.form} name="section_info" />

                <div className="row">
                    <div className="form-group col-md-6 row">
                        <label className="col-lg-3 col-form-label" htmlFor="priority">Priority</label>
                        <select className="custom-select col-lg-9" name="priority" id="priority">
                            <option value="exercise">Exercise</option>
                            <option value="past_paper">Past Paper</option>
                            <option value="additional">Additional</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group container-fluid">
                        <h4><label className="col-form-label col-lg-12" htmlFor={`question_en_${this.props.index}`}>Question:</label></h4>
                        <div className="col-lg-12">
                            <CKEditor
                                editor={ClassicEditor}
                                onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                    this.setState({question_en: data})
                                }}
                                config={ckEditor_config}
                            />
                        </div>
                    </div>
                    <div className="form-group col-lg-12 container-fluid urdu-font">
                        <h4><label className="col-lg-12 col-form-label text-align-right" htmlFor={`question_rtl_${this.props.index}`}>:سوال</label></h4>
                        <div className="col-lg-12">
                            <CKEditor
                                editor={ClassicEditor}
                                onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                    this.setState({question_rtl: data})
                                }}
                                config={ckEditor_rtl_config}
                            />
                        </div>
                    </div>
                </div>

                <p className="mt-3"></p>

                <div className="form-group row">

                    <div className="mx-auto col-lg-6 row">
                        <button className="btn btn-primary col-lg-5" type="submit" disabled={this.props.loading}>
                            {this.props.loading ? 'Saving...' : 'Save'}
                        </button>
                        <button className="btn btn-danger col-lg-5" type="button" onClick={this.hideTopicForm}>
                            Cancel
                        </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm);
