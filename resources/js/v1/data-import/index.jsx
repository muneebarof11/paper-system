import React, { Component } from 'react';
import PageHeader from "../common/PageHeader";

class DataImport extends Component {

    constructor(props) {
        super(props);

        this.state = {
            default_syllabus: 'Punjab Text',
            syllabus_types: [],
            classes: [],
            subjects: [],
            form: {
                syllabus: '',
                class: '',
                subject: '',
                file: {},
            },
            questions: [],
            is_loading: false
        };

        this.fetchData = this.fetchData.bind(this);
        this.updateSelectedSyllabus = this.updateSelectedSyllabus.bind(this);
        this.updateSelectedClass = this.updateSelectedClass.bind(this);
        this.updateSelectedSubject = this.updateSelectedSubject.bind(this);
        this.updateSelectedFile = this.updateSelectedFile.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    componentDidMount() {
        let data = $helper.getLocalData('import-options');
        if(data) {
            this.setState(data);
        } else {
            this.fetchData();
        }
    }

    fetchData() {
        $api.getData('import-questions/')
            .then(res => {
                $helper.saveLocalData('import-options', res);
                this.setState({
                    syllabus_types: res.syllabus_types,
                    classes: res.classes,
                    subjects: res.subjects
                })
            });
    }

    updateSelectedSyllabus(e) {
        let form = this.state.form;
        form.syllabus = e.target.value;
        this.setState(form);
        this.setState({default_syllabus: e.target.value})
    };

    updateSelectedClass(e) {
        let form = this.state.form;
        form.class = e.target.value;
        this.setState(form);
    };

    updateSelectedSubject(e) {
        let form = this.state.form;
        form.subject = e.target.value;
        this.setState(form);
    };

    updateSelectedFile(e) {
        let form = this.state.form;
        form.file = e.target.files[0];
        this.setState(form);
    }

    formSubmit(e) {
        e.preventDefault();

        let form = this.state.form;
        if(!form.file.name) {
            alert('You must select a file!');
            return false;
        }

        this.setState({is_loading: true});

        if(form.syllabus.length === 0)
            form.syllabus = this.state.default_syllabus;

        if(form.class.length === 0)
            form.class = this.state.classes[0].name;

        if(form.subject.length === 0)
            form.subject = this.state.subjects[0].name;

        this.setState(form);

        const formData = new FormData();
        formData.append('subject', form.subject);
        formData.append('class', form.class);
        formData.append('syllabus', form.syllabus);
        formData.append("file", form.file, form.file.name);

        $api.postData('evaluate-import/', formData)
            .then(res => {
                this.setState({questions: res});
            });
    }

    render() {
        return <React.Fragment>
            <PageHeader
                title="Import Questions"
                have_button={false}
            />

            <div className="container pt-3">
                <form className="row" onSubmit={this.formSubmit}>
                    <div className="form-group col-md-3">
                        <label className="col-sm-12 col-form-label" htmlFor="syllabus_type">Select Syllabus</label>
                        <select className="custom-select" name="syllabus_type" id="syllabus_type" value={this.state.default_syllabus} onChange={this.updateSelectedSyllabus}>
                            {
                                this.state.syllabus_types.length > 0
                                    ? this.state.syllabus_types.map((type) => {
                                        return <option value={type.name}>{type.name}</option>
                                    })
                                    : <option>Loading...</option>
                            }
                        </select>
                    </div>

                    <div className="form-group col-md-3">
                        <label className="col-sm-12 col-form-label" htmlFor="level">Class</label>
                        <select className="custom-select" name="level" id="level" onChange={this.updateSelectedClass}>
                            {
                                this.state.classes.length > 0
                                    ? this.state.classes.map((type) => {
                                        return <option value={type.name}>{type.name}</option>
                                    })
                                    : <option>Loading...</option>
                            }
                        </select>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-sm-12 col-form-label" htmlFor="subject">Subject</label>
                        <select className="custom-select" name="level" id="subject" onChange={this.updateSelectedSubject}>
                            {
                                this.state.subjects.length > 0
                                    ? this.state.subjects.map((type) => {
                                        return <option value={type.name}>{type.name}</option>
                                    })
                                    : <option>Loading...</option>
                            }
                        </select>
                    </div>

                    <div className="form-group col-md-3">
                        <label className="col-sm-12 col-form-label">&nbsp;</label>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="customFile" name="file" onChange={this.updateSelectedFile} />
                                <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                        </div>
                    </div>

                    <div className="form-group col-md-1">
                        <label className="col-sm-12 col-form-label">&nbsp;</label>
                        <button className="btn btn-primary" type="submit">Start</button>
                    </div>

                </form>
            </div>

            <table className="container table">
                <thead>
                    <tr>
                        {
                            this.state.questions.length <= 0
                                ? <th scope="col text-lg-center" style={{textAlign: 'center'}}><h2>
                                    {!this.state.is_loading
                                        ? 'Upload file to import questions!'
                                        : 'Loading...'
                                    }
                                </h2></th>
                                : this.state.questions.headers.map((header, i) => {
                                    return <th>{header}</th>
                                })
                        }
                    </tr>
                </thead>
                <tbody>
                    {

                    }
                    {
                        this.state.questions.length <= 0
                            ? <React.Fragment></React.Fragment>
                            : (
                                <tr>
                                    <td>{this.state.questions.data[1][0].q_no}</td>
                                    <td>{this.state.questions.data[1][0].type}</td>
                                    <td>{this.state.questions.data[1][0].section_title}</td>
                                    <td>{this.state.questions.data[1][0].statement}</td>
                                    <td>{this.state.questions.data[1][0].options.replace(/\u21B5/g,'<br/>')}</td>
                                    <td>{this.state.questions.data[1][0].statement_words.join('<br />')}</td>
                                    <td>{this.state.questions.data[1][0].column_left.replace(/\u21B5/g,'<br/>')}</td>
                                    <td>{this.state.questions.data[1][0].column_right.replace(/\u21B5/g,'<br/>')}</td>
                                </tr>
                            )
                    }
                </tbody>
            </table>

        </React.Fragment>
    }
}

export default DataImport;
