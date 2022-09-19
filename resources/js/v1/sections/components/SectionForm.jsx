import React, { Component, PureComponent } from 'react';
import {connect} from "react-redux";
import {addTopic, hideTopicForm} from "../redux/Actions";

class SectionForm extends PureComponent {

    constructor(props) {
        super(props);
        this.sectionTopicSubmit = this.sectionTopicSubmit.bind(this);
    }

    sectionTopicSubmit(e) {
        e.preventDefault();

        const serialize = require('form-serialize');
        let form = document.querySelector(`#sectionForm_${this.props.index}`);
        let data = serialize(form, { hash: true });
        if(!data.eng_name && !data.rlt_name) {
            alert('Either English or Urdu title is required');
            return false;
        }

        const section_info = JSON.parse(data.section_info);
        const formData = new FormData();

        formData.append('parent_id', section_info.seid);
        formData.append('subject_code', section_info.subject_code);
        formData.append('eng_name', (data.eng_name) ? data.eng_name : '');
        formData.append('rlt_name', (data.rlt_name) ? data.rlt_name : '');
        formData.append('syllabus_type_id', section_info.stid);
        formData.append('class_id', section_info.cid);
        formData.append('subject_id', section_info.suid);

        this.props.addTopic(this.props.index, formData);
    }

    render() {
        return (
            <form onSubmit={this.sectionTopicSubmit} className="sectionForm mb-5" id={`sectionForm_${this.props.index}`}>
                <input type="hidden" value={this.props.form} name="section_info" />
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label" htmlFor="eng_name">English title</label>
                    <div className="col-sm-8"><input type="text" className="form-control" id="eng_name" name="eng_name" /></div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label" htmlFor="rlt_name">Urdu title</label>
                    <div className="col-sm-8"><input type="text" className=" form-control" id="rlt_name" name="rlt_name" /></div>
                </div>
                <div className="form-group row">
                    <button className="btn btn-primary col-lg-5" type="submit" disabled={this.props.loading}>
                        {this.props.loading ? 'Saving...' : 'Save'}
                    </button>
                    <button className="btn btn-danger col-lg-5" type="button" onClick={() => {this.props.hideTopicForm(this.props.index)}}>
                        Cancel
                    </button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.section.loading,
        message: state.section.message
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addTopic: (index, formData) => dispatch(addTopic(dispatch, index, formData)),
        hideTopicForm: (index) => dispatch(hideTopicForm(dispatch, index))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionForm);
