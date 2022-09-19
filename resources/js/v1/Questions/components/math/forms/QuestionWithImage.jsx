import React, { Component } from 'react';
import {addQuestion, hideQuestionForm} from "../../../redux/Actions";
import {connect} from "react-redux";

class QuestionWithImage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            image: {}
        };

        this.submitForm = this.submitForm.bind(this);
        this.hideTopicForm = this.hideTopicForm.bind(this);
        this.updateFile = this.updateFile.bind(this);
        this.showImage = this.showImage.bind(this);
    }

    submitForm(e) {
        e.preventDefault();

        let file = this.state.image;
        if(!file.name) {
            alert('Please select an image');
            return false;
        }

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
        formData.append("file", file, file.name);

        this.props.addQuestion(formData, this.props.endpoint, this.props.type, this.props.index);
    }

    hideTopicForm(warning) {
        const confirmation = window.confirm('Are you sure you want to cancel?');
        if (!confirmation) return false;

        this.props.hideForm(this.props.index);
    }

    updateFile(e) {
        let id = `question_image_${this.props.index}`;
        const src = document.getElementById(id);
        const target = document.getElementById("question_image_preview");
        this.showImage(src, target);

        let file = e.target.files[0];
        this.setState({image: file});
    }

    showImage(src, target) {
        let fr = new FileReader();
        // when image is loaded, set the src of the image where you want to display it
        fr.onload = function(e) { target.src = this.result; };
        fr.readAsDataURL(src.files[0]);
    }

    render() {
        return (
            <form onSubmit={this.submitForm} className="mb-4 sectionForm" id={`sectionForm_${this.props.index}`} encType="multipart/form-data">
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
                    <div className="form-group col-lg-6 row">
                        <label className="col-form-label col-lg-2" htmlFor={`question_en_${this.props.index}`}>Question:</label>
                        <div className="col-lg-10">
                            <textarea className="form-control" name="question_en" id={`question_en_${this.props.index}`} rows="3"></textarea>
                        </div>
                    </div>
                    <div className="form-group col-lg-6 row urdu-font">
                        <div className="col-lg-10">
                            <textarea className="form-control text-align-right" name="question_rtl" id={`question_rtl_${this.props.index}`} rows="3"></textarea>
                        </div>
                        <label className="col-lg-2 col-form-label text-align-right" htmlFor={`question_rtl_${this.props.index}`}>:سوال</label>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-lg-6 row">
                        <label className="col-lg-3 col-form-label">Choose Image</label>
                        <div className="custom-file col-lg-8">
                            <input type="file" className="custom-file-input" id={`question_image_${this.props.index}`} name="question_image" onChange={this.updateFile} />
                            <label className="custom-file-label" htmlFor={`question_image_${this.props.index}`}>Choose file</label>
                        </div>
                    </div>
                    <div className="form-group col-lg-6 row urdu-font">
                        <img id="question_image_preview" className="img-thumbnail mx-auto row-cols-8" />
                    </div>
                </div>

                <p className="mt-3"></p>

                <div className="form-group row">

                    <div className="mx-auto col-lg-6 row">
                        <button className="btn btn-primary col-lg-5" type="submit" disabled={this.state.is_loading}>
                            {this.state.is_loading ? 'Saving...' : 'Save'}
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionWithImage);
