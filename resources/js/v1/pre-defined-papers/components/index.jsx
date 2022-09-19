import React, { Component, PureComponent } from "react";
import {fetchPublishers} from "../../publishers/redux/Actions";
import {connect} from "react-redux";
import {
    fetchClassesByPublisherId,
    fetchSubjectsByClassId,
    removeItem,
    searchPapers,
    uploadPapers
} from "../redux/Actions";

class PreDefined extends PureComponent {

    constructor(props) {
        super(props);

        let institute = window.localStorage.getItem('__i');
        let roles = '';
        if (institute) {
            institute = JSON.parse(institute);
            roles = institute.roles
        }

        this.state = {
            publisher_id: 0,
            class_id: 0,
            subject_id: 0,
            chapter_id: '',
            files: [],
            allow_remove: roles.indexOf('admin') !== -1 ? true : false
        };

        this.fetchClasses = this.fetchClasses.bind(this);
        this.fetchSubjects = this.fetchSubjects.bind(this);
        this.updateSubjectId = this.updateSubjectId.bind(this);
        this.updateFiles = this.updateFiles.bind(this);
        this.updateChapterId = this.updateChapterId.bind(this);
        this.searchPapers = this.searchPapers.bind(this);
        this.uploadPapers = this.uploadPapers.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    componentDidMount() {
        this.props.fetchPublishers();
        this.searchPapers();
    }

    fetchClasses(e) {
        const publisher_id = $helper.easyEncode(e.target.value);
        this.props.fetchClassByPublisher(publisher_id);
        this.setState({publisher_id})
    }

    fetchSubjects(e) {
        const publisher_id = this.state.publisher_id;
        const class_id = $helper.easyEncode(e.target.value);
        this.props.fetchSubjectsByClass(publisher_id, class_id);
        this.setState({class_id})
    }

    updateSubjectId(e) {
        const subject_id = $helper.easyEncode(e.target.value);
        this.setState({subject_id})
    }

    updateChapterId(e) {
        const chapter_id = e.target.value;
        this.setState({chapter_id})
    }

    updateFiles(e) {
        let files = [];
        if(e.target.files) {
            for(let i=0; i<e.target.files.length; i++) {
                files.push(e.target.files[i]);
            }
        }
        this.setState({files: files})
    }

    searchPapers() {
        const formData = new FormData();
        formData.append('publisher_id', this.state.publisher_id);
        formData.append('class_id', this.state.class_id);
        formData.append('subject_id', this.state.subject_id);
        formData.append('chapter_id', this.state.chapter_id);
        this.props.searchPapers(formData)
    }

    uploadPapers() {

        if(this.state.publisher_id === 0 || this.state.class_id === 0 || this.state.subject_id === 0 || this.state.chapter_id.length <= 0) {
            alert('Please choose options from above');
            return false;
        }

        if(this.state.files.length <=0) {
            alert('Please select file(s)');
            return false;
        }

        const formData = new FormData();
        formData.append('publisher_id', this.state.publisher_id);
        formData.append('class_id', this.state.class_id);
        formData.append('subject_id', this.state.subject_id);
        formData.append('chapter_id', this.state.chapter_id);

        for(let i=0; i<this.state.files.length; i++) {
            let file = this.state.files[i];
            formData.append('files[]', file, file.name);
        }

        this.props.uploadPapers(formData);
        this.setState({files: []})
    }

    removeItem(id) {
        const formData = new FormData();
        formData.append('publisher_id', this.state.publisher_id);
        formData.append('class_id', this.state.class_id);
        formData.append('subject_id', this.state.subject_id);
        formData.append('chapter_id', this.state.chapter_id);
        formData.append('id', $helper.easyEncode(id));

        this.props.removeItem(formData);
    }

    render() {
        return (

            <React.Fragment>
                <form id="pre_defined_papers">

                    <h3>Pre-defined Papers</h3>
                    <hr/>

                    <div className="row mb-4">
                        <div className="form-group col-lg-3">
                            <label className="col-sm-12 col-form-label" htmlFor="medium">Publishers:</label>
                            <select className="custom-select" name="medium" id="publishers" onChange={this.fetchClasses}>
                                <option value="">-Select-</option>
                                {
                                    this.props.publishers && this.props.publishers.length > 0
                                        ? this.props.publishers.map(p => {
                                            return <option value={p.id}>{p.name}</option>
                                        })
                                        : <React.Fragment></React.Fragment>
                                }
                            </select>
                        </div>

                        <div className="form-group col-lg-3">
                            <label className="col-sm-12 col-form-label" htmlFor="medium">Classes:</label>
                            <select className="custom-select" name="medium" id="classes" onChange={this.fetchSubjects}>
                                <option value="">-Select-</option>
                                {
                                    this.props.classes && this.props.classes.length > 0
                                        ? this.props.classes.map(p => {
                                            return <option value={p.id}>{p.name}</option>
                                        })
                                        : <React.Fragment></React.Fragment>
                                }
                            </select>
                        </div>

                        <div className="form-group col-lg-3">
                            <label className="col-sm-12 col-form-label" htmlFor="medium">Subjects:</label>
                            <select className="custom-select" name="medium" id="subjects" onChange={this.updateSubjectId}>
                                <option value="">-Select-</option>
                                {
                                    this.props.subjects && this.props.subjects.length > 0
                                        ? this.props.subjects.map(p => {
                                            return <option value={p.id}>{p.name}</option>
                                        })
                                        : <React.Fragment></React.Fragment>
                                }
                            </select>
                        </div>

                        <div className="form-group col-lg-3">
                            <label className="col-sm-12 col-form-label" htmlFor="medium">Topics:</label>
                            <select className="custom-select" name="medium" onChange={this.updateChapterId}>
                                <option value="">-Select-</option>
                                <option value="full-book">Full Book</option>
                                <option value="half-book">Half Book</option>
                                {this.renderChapters()}
                                <option value="others">Others</option>
                            </select>
                        </div>

                        <div className="form-group col-lg-6">
                            <label className="col-sm-12 col-form-label">&nbsp;</label>
                            <button className="btn btn-primary col-lg-12" type="button" disabled={this.props.loading} onClick={this.searchPapers}>
                                {this.props.loading ? 'Searching...' : 'Search'}
                            </button>
                        </div>

                        {
                            this.state.allow_remove
                                ? (
                                    <React.Fragment>
                                        <div className="form-group col-lg-3">
                                            <label className="col-sm-12 col-form-label">Choose File</label>
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input[]" multiple={true} id="customFile" name="file" onChange={this.updateFiles} />
                                                <label className="custom-file-label" htmlFor="customFile">Select file (PDF / DOC)</label>
                                            </div>
                                        </div>

                                        <div className="form-group col-lg-3">
                                            <label className="col-sm-12 col-form-label">&nbsp;</label>
                                            <button className="mr-3 btn btn-success col-lg-12" type="button" disabled={this.props.loading} onClick={this.uploadPapers}>
                                                {this.props.loading ? 'Uploading...' : 'Upload New'}
                                            </button>
                                        </div>
                                    </React.Fragment>
                                )
                                : ''
                            }
                    </div>
                </form>

                <h3 className={`mt-4`}>Papers List</h3>
                <hr/>

                <div className="row papers-list px-2">
                {this.props.papers_list.length > 0 ? this.props.papers_list.map((p, i) => {
                    return (
                        <div className={`card ml-2 mr-2 pt-5 mb-2 col-lg-3`}>
                            <a href={`${APP_URL}/${p.file_path}`} target={`_blank`}>
                                <i className="card-img-top fa fa-file-pdf-o"></i>
                            </a>
                            <div className="card-body">
                                <a href={`${APP_URL}/${p.file_path}`} target={`_blank`}>
                                    <h5 className="card-title">{p.name}</h5>
                                </a>
                                {this.state.allow_remove ?
                                    <button className="btn btn-dark col-lg-12" onClick={() => {
                                        if (!window.confirm('Are you sure?')) return false;
                                        this.removeItem(p.id)
                                    }
                                    }>Remove</button>
                                    : ''
                                }
                            </div>
                        </div>
                    )
                }) : <h4>Hit search from above to get result</h4>}
                </div>

            </React.Fragment>
        )
    }

    renderChapters() {
        let c_list = [];
        for(let i=1; i<=20; i++) {
            c_list.push(<option value={`chapter-{${i}`}>Chapter {i}</option>);
        }
        return c_list;
    }
}

const mapStateToProps = state => {
    return {
        publishers: state.publishers.publishers,
        classes: state.pre.classes,
        subjects: state.pre.subjects,
        papers_list: state.pre.papers_list,
        message: state.pre.message,
        loading: state.pre.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPublishers: () => dispatch(fetchPublishers(dispatch)),
        fetchClassByPublisher: (publisher_id) => dispatch(fetchClassesByPublisherId(dispatch, publisher_id)),
        fetchSubjectsByClass: (publisher_id, class_id) => dispatch(fetchSubjectsByClassId(dispatch, publisher_id, class_id)),
        searchPapers: (formData) => dispatch(searchPapers(dispatch, formData)),
        uploadPapers: (formData) => dispatch(uploadPapers(dispatch, formData)),
        removeItem: (formData) => dispatch(removeItem(dispatch, formData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreDefined);

