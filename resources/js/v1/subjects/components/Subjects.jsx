import React, {Component, lazy, PureComponent} from 'react';
import {connect} from "react-redux";

import BoxLayoutWithLeftPanel from "../../common/BoxLayoutWithLeftPanel";
const PopupModal = lazy(() => import("../../common/PopupModal"));
const BoxWithImage = lazy(() => import("../../common/BoxWithImage"));
const PopupModal2 = lazy(() => import("../../common/PopupModal2"));

import {addSubject, fetchAllSubjects, fetchSubjectsByClass, removeSubject, updateSubject} from "../redux/Actions";
import {class_id, syllabus_type_id} from "../../params";

class Subjects extends PureComponent {

    constructor(props) {
        super(props);

        if (!syllabus_type_id || !class_id) {
            window.location.href = $helper.buildUrlWithParams(APP_URL + '/dashboard');
            return false;
        }

        if (!this.props.a_class) {
            window.location.href = $helper.buildUrlWithParams(APP_URL + '/dashboard');
            return false;
        }

        this.state = {
            image: {},
            name: '',
            subjectToEdit: {
                id: 0,
                name: '',
                medium: '',
                image: {}
            }
        };

        this.updateFile = this.updateFile.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.updateFormSubmit = this.updateFormSubmit.bind(this);

        $helper.triggerLeftPaneCollapse();
    }

    componentDidMount() {
        this.props.fetchData();
        this.props.fetchSubjects();
    }

    updateFile(e) {
        this.setState({image: e.target.files[0]})
    }

    formSubmit(e) {
        e.preventDefault();

        const serialize = require('form-serialize');
        const form = document.querySelector(`#form`);
        const data = serialize(form, {hash: true});

        if (!data.name && !data.pre_name) {
            alert('Enter name or choose from the list');
            return false;
        }

        if (data.pre_name) {
            let info = data.pre_name.split('_');
            data.name = info[0]; // name of class
            data.medium = info[1]; // level of class
        }

        // if subject not selected from dropdown
        // it will check if paper type is selected
        if (!data.pre_name && !data.medium) {
            alert('Please choose paper type!');
        }

        const formData = new FormData();
        if (this.state.image.name)
            formData.append('image', this.state.image, this.state.image.name);

        formData.append('name', data.name);
        formData.append('medium', data.medium);

        formData.append('is_active', data.is_active);
        formData.append('class_id', class_id);
        formData.append('syllabus_type_id', syllabus_type_id);

        this.props.addItem(formData);
    }


    updateFormSubmit(e) {
        e.preventDefault();

        const serialize = require('form-serialize');
        const form = document.querySelector(`#formEdit`);
        const data = serialize(form, {hash: true});

        if (!data.name) {
            alert('Enter name');
            return false;
        }

        const formData = new FormData();
        if (this.state.image.name)
            formData.append('image', this.state.image, this.state.image.name);

        formData.append('id', $helper.easyEncode(this.state.subjectToEdit.id));
        formData.append('name', data.name);
        formData.append('medium', data.medium);
        formData.append('class_id', class_id);
        formData.append('syllabus_type_id', syllabus_type_id);

        this.props.updateItem(formData);
    }

    removeItem(id) {

        const c = window.confirm('Are you sure?');
        if (!c) return false;

        this.props.removeItem(id);
    }

    editItem(item) {
        this.setState({
            subjectToEdit: {
                id: item.id,
                name: item.name,
                medium: item.medium,
                image: item.cover_thumbnail
            }
        });
        $('#popupModal3').modal('show');
    }

    render() {
        return <React.Fragment>
            {this.props.loading ? <div className="loader-wrapper"><div className="loader"></div></div> : <React.Fragment /> }
            <BoxLayoutWithLeftPanel
                title={`Subjects of class (${this.props.a_class.name})`}
                back_button={true}
                back_button_text="Back"
                add_button={true}
                add_button_url=""
                add_button_text="Add new subject"

                left_title="Classes"
                left_data={this.props.all_classes}
                publisher={syllabus_type_id}
                step={2}
            >
                {
                    !this.props.loading && this.props.subjects.length > 0
                        ? this.props.subjects.map((data) => {
                            let url = $helper.buildUrlWithParams('sections', {
                                stid: syllabus_type_id,
                                cid: class_id,
                                suid: $helper.easyEncode(data.id)
                            });
                            return (
                                <div className="col-md-3 row section-box mb-4">
                                    <BoxWithImage
                                        url={url}
                                        box_class="classes-box"
                                        icon_class="fa-book"
                                        box_title={data.name}
                                        parent_class="col-lg-12"
                                        data={data}
                                        image={data.cover_thumbnail}
                                    />
                                    <div className="col-lg-12 action-btn">
                                        <button typeof="button" className="btn btn-primary col-lg-6"
                                                onClick={() => this.editItem(data)}>Edit
                                        </button>
                                        <button typeof="button" className="btn btn-danger col-lg-6" onClick={() => {
                                            this.removeItem(data.id)
                                        }}>Remove
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <h2 className="container pt-4 pb-4">{this.props.loading ? 'Loading...' : 'No subject found!'}</h2>
                }
            </BoxLayoutWithLeftPanel>

            <PopupModal>
                <form onSubmit={this.formSubmit} id="form">

                    <h3>Add New Subject</h3>
                    <hr/>

                    <div className="form-group">
                        <label className="col-sm-12 col-form-label" htmlFor="className">Enter new: Name</label>
                        <input type="text" className="form-control" id="className"
                               placeholder="Enter subject name"
                               name="name"
                               autoComplete="off"
                        />
                    </div>

                    <div className="form-group">
                        <label className="col-sm-12 col-form-label" htmlFor="Name_pre">or Select Subject</label>
                        <select className="custom-select" name="pre_name" id="Name_pre">
                            <option value="">-Select existing subject-</option>
                            {this.props.all_subjects.length > 0
                                ? this.props.all_subjects.map(c => {
                                    return <option value={`${c.name}_${c.medium}`}>{c.name}</option>
                                })
                                : <React.Fragment></React.Fragment>}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-12 col-form-label" htmlFor="medium">Paper type</label>
                        <select className="custom-select" name="medium" id="medium">
                            <option value="">-Select Paper type-</option>
                            <option value="dual">Dual Medium</option>
                            <option value="eng">English Only</option>
                            <option value="urdu">Urdu Only</option>
                        </select>
                    </div>


                    <div className="form-group mb-3">
                        <label className="col-sm-6 col-form-label">Subject Cover</label>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="customFile" name="file"
                                   onChange={this.updateFile}/>
                            <label className="custom-file-label" htmlFor="customFile">Choose image</label>
                        </div>
                    </div>

                    <div className="form-group d-none">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="is_active"
                                   id="active" value="1" checked/>
                            <label className="form-check-label" htmlFor="active">Active</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="is_active"
                                   id="in_active" value="0"/>
                            <label className="form-check-label" htmlFor="in_active">In-Active</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary col-lg-12" type="submit"
                                disabled={this.props.loading}
                        >
                            {this.props.loading ? 'Saving...' : 'Add'}
                        </button>
                    </div>

                </form>
            </PopupModal>

            <PopupModal2>
                <form onSubmit={this.updateFormSubmit} id="formEdit">

                    <h3>Edit Subject</h3>
                    <hr/>

                    <div className="form-group">
                        <label className="col-sm-12 col-form-label" htmlFor="className">Name</label>
                        <input type="text" className="form-control" id="className"
                               placeholder="Enter subject name"
                               name="name"
                               value={this.state.subjectToEdit.name}
                               onChange={(e) => this.setState({subjectToEdit: {...this.state.subjectToEdit, name: e.target.value}})}
                        />
                    </div>

                    <div className="form-group">
                        <label className="col-sm-12 col-form-label" htmlFor="medium">Paper type</label>
                        <select className="custom-select" name="medium" id="medium">
                            <option selected={this.state.subjectToEdit.medium === 'dual'} value="dual">Dual Medium
                            </option>
                            <option selected={this.state.subjectToEdit.medium === 'eng'} value="eng">English Only
                            </option>
                            <option selected={this.state.subjectToEdit.medium === 'urdu'} value="urdu">Urdu Only
                            </option>
                        </select>
                    </div>

                    <div className="form-group mb-3">
                        <label className="col-sm-6 col-form-label">Subject Cover</label>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="customFile" name="file"
                                   onChange={this.updateFile}/>
                            <label className="custom-file-label" htmlFor="customFile">Choose image</label>
                        </div>
                    </div>

                    <div className="form-group mb-3">
                        <img className="img-thumbnail" src={`${APP_URL}/${this.state.subjectToEdit.image}`} style={{maxWidth: '30%'}} />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary col-lg-12" type="submit"
                                disabled={this.props.loading}
                        >
                            {this.props.loading ? 'Saving...' : 'Update'}
                        </button>
                    </div>

                </form>
            </PopupModal2>
        </React.Fragment>
    }
}

const mapStateToProps = state => {
    const a_class = state.subject.all_classes.find(c => $helper.easyDecode(class_id) == c.id);
    return {
        subjects: state.subject.subjects,
        loading: state.subject.loading,
        all_subjects: state.subject.all_subjects,
        all_classes: state.subject.all_classes,
        a_class: a_class
    }
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchData: () => dispatch(fetchSubjectsByClass(dispatch)),
        fetchData: () => null,
        // fetchSubjects: () => dispatch(fetchAllSubjects(dispatch)),
        fetchSubjects: () => null,
        addItem: (form_data) => dispatch(addSubject(dispatch, form_data)),
        updateItem: (form_data) => dispatch(updateSubject(dispatch, form_data)),
        removeItem: (id) => dispatch(removeSubject(dispatch, id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Subjects);
