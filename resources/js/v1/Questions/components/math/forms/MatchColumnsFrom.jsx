import React, { Component } from 'react';
import {addQuestion, hideQuestionForm} from "../../../redux/Actions";
import {connect} from "react-redux";

class MatchColumnsFrom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: [1]
        };

        this.submitForm = this.submitForm.bind(this);
        this.hideTopicForm = this.hideTopicForm.bind(this);
        this.addOption = this.addOption.bind(this);
        this.removeOption = this.removeOption.bind(this);
    }

    addOption() {
        let options = this.state.options;
        let last_option = options[options.length-1] + 1;
        options.push(last_option);
        this.setState({options: options});
    }

    removeOption(index) {
        let options = this.state.options;

        if(options.length === 1) {
            return false;
        }

        options.splice(index, 1);
        this.setState({options: options});
    }

    submitForm(e) {
        e.preventDefault();

        const serialize = require('form-serialize');
        let form = document.querySelector(`#sectionForm_${this.props.index}`);
        let form_data = serialize(form, { hash: true });

        if(!form_data.question_en && !form_data.question_rtl) {
            alert('Question statement is required');
            return false;
        }

        if(!form_data.option_en && !form_data.option_rtl) {
            alert('Column A & Column B are required');
            return false;
        }

        form_data['option_en'] = JSON.stringify(form_data['option_en']);
        form_data['option_rtl'] = JSON.stringify(form_data['option_rtl']);

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
                        <label className="col-form-label col-lg-3" htmlFor={`question_en_${this.props.index}`}>Question:</label>
                        <div className="col-lg-9"><input type="text" className="form-control" id={`question_en_${this.props.index}`} name="question_en" /></div>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-lg-12 text-center row">
                        <div className="col-lg-6">Column A</div>
                        <div className="col-lg-6">Column B</div>
                    </div>
                </div>

                {
                    this.state.options.length > 0
                        ? this.state.options.map((o, i) => {
                            let j= i+1;
                            return (
                                <div className="row">
                                    <div className="form-group col-lg-6 row">
                                        <label className="col-form-label col-lg-3" htmlFor={`option_en_${j}`}>{$helper.getAlphabet(i)}:</label>
                                        <div className="col-lg-7"><input type="text" className="form-control" id={`option_en_${j}`} name={`option_en[${i}]`} /></div>
                                        <div className="col-lg-2">
                                            <button type="button" className="action-btn btn btn-warning float-right" onClick={this.addOption}><i className="fa fa-plus-circle"></i></button>
                                        </div>
                                    </div>
                                    <div className="form-group col-lg-6 row">
                                        <div className="col-lg-2">
                                            <button type="button" className={`${i === 0 ? 'd-none' : ''} action-btn btn btn-danger`} onClick={() => {this.removeOption(i)}}><i className="fa fa-minus-circle"></i></button>
                                        </div>
                                        <div className="col-lg-7">
                                            <input type="text" className="form-control text-align-right" id={`option_rtl_${j}`} name={`option_rtl[${i}]`}/></div>
                                        <label className="col-lg-3 col-form-label text-align-right"
                                               htmlFor={`option_rtl_${j}`}>:{$helper.getAlphabet(i)} </label>
                                    </div>
                                </div>
                            )
                        })
                        : <React.Fragment></React.Fragment>

                }

                <hr className="mt-3" />

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

export default connect(mapStateToProps, mapDispatchToProps)(MatchColumnsFrom);
