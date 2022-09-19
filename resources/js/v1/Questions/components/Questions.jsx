import React, {Component, lazy, PureComponent} from 'react';
import {connect} from "react-redux";

import UrduQuestions  from "./urdu/UrduQuestions";
import GeneralQuestions from "./general/GeneralQuestions";
import IslamiyatlQuestions from "./islamiyat/IslamiyatlQuestions";
import MathQuestions from "./math/MathQuestions";
import EnglishQuestions from "./english/EnglishQuestions";
import PopupModal from "../../common/PopupModal";
import ImportModal from "../../common/ImportModal";
import BoxLayoutWithLeftPanel from "../../common/BoxLayoutWithLeftPanel";

// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from 'ckeditor5-classic-with-mathtype';

import CKEditor from 'ckeditor4-react-advanced';

import {addQuestionType, fetchAllQuestionType, importQuestions} from "../redux/Actions";
import {ckEditor_config, class_id, section_id, subject_id, syllabus_type_id, topic_id} from "../../params";

const subjectComponents = {
    all: GeneralQuestions,
    urd: UrduQuestions,
    eng: EnglishQuestions,
    math: MathQuestions,
    isl: IslamiyatlQuestions
};

class Questions extends PureComponent {

    constructor(props) {

        super(props);

        $helper.triggerLeftPaneCollapse();

        if (!syllabus_type_id || !class_id) {
            window.location.href = $helper.buildUrlWithParams(APP_URL + '/dashboard');
            return false;
        }

        if(!this.props.subject) {
            window.location.href = $helper.buildUrlWithParams(APP_URL + '/dashboard');
            return false;
        }

        let name = 'dual-medium-mcq-sample-sheet.xlsx';
        if(this.checkIfRtl())
            name = 'dual-medium-mcq-sample-sheet.xlsx';

        this.state = {
            page_title: '',
            file: {},
            selected_question_type_id: 0,
            selected_topic_id: topic_id,
            sample_file: name,
            medium: this.props.subject.medium,
            question_statement_en: '',
            question_statement_rtl: '',
            question_level: 'exercise',
            mathData: '',
            inlineEquations: false,
            englishSpecial: 'no'
        };

        this.updateFile = this.updateFile.bind(this);
        this.updateSQuestionTypeId = this.updateSQuestionTypeId.bind(this);
        this.updateSTopicId = this.updateSTopicId.bind(this);
        this.updateMedium = this.updateMedium.bind(this);
        this.updateEnglishSpecial = this.updateEnglishSpecial.bind(this);
        this.processImport = this.processImport.bind(this);
        this.add_question_type = this.add_question_type.bind(this);
        this.updateQuestionStatement = this.updateQuestionStatement.bind(this);
        this.updateQuestionStatements = this.updateQuestionStatements.bind(this);
        this.updateQuestionLevel = this.updateQuestionLevel.bind(this);
    }

    componentDidMount() {
        this.props.getAllQuestionTypes();
    }

    updateFile(e) {
        this.setState({file: e.target.files[0]})
    }

    updateSQuestionTypeId(e) {
        const sample_file = this.updateSampleFIleUrl(e.target.value);
        let englishSpecial = 'no';

        if(e.target.value == 259)
            englishSpecial = 'yes';

        this.setState({
            selected_question_type_id: e.target.value,
            sample_file: sample_file,
            englishSpecial: englishSpecial
        });
    }

    updateSampleFIleUrl(type) {
        let name = 'dual-medium-mcq-sample-sheet.xlsx';
        if(this.checkIfRtl())
            name = 'dual-medium-mcq-sample-sheet.xlsx';

        type = this.props.question_types.find(t => t.id == type);

        switch (type.name) {
            case 'mcq':
            case 'mcq2':
            case 'mcq3':
            case 'mcq4':
                if(this.checkIfRtl())
                    name = 'urdu-medium-mcq-sample-sheet.xlsx';
                else
                    name = 'dual-medium-mcq-sample-sheet.xlsx';
                break;
            case 'short_question':
            case 'short_question2':
            case 'short_question3':
            case 'short_question4':
            case 'long_question':
            case 'long_question2':
            case 'long_question3':
            case 'long_question4':
                if(this.checkIfRtl())
                    name = 'urdu-medium-questions-sample-sheet.xlsx';
                else
                    name = 'dual-medium-questions-sample-sheet.xlsx';
                break;
            case 'true_false':
                name = 'dual-medium-true-false-sample-sheet.xlsx';
                break;
            case 'fill_in_the_blank':
                name = 'dual-banks-sample-sheet.xlsx';
                break;
            case 'match_column':
                name = 'match-colum-sample-sheet.xlsx';
                break;
        }

        return name;
    }

    updateSTopicId(e) {
        this.setState({selected_topic_id: $helper.easyEncode(e.target.value)})
    }

    updateMedium(e) {
        this.setState({medium: e.target.value})
    }

    updateEnglishSpecial(e) {
        this.setState({englishSpecial: e.target.value})
    }

    updateQuestionLevel(e) {
        this.setState({question_level: e.target.value})
    }

    updateQuestionStatement(e, type) {
        if(type === 'rtl')
            this.setState({question_statement_rtl: e.target.value});
        else
            this.setState({question_statement_en: e.target.value});
    }

    updateQuestionStatements(e) {
        const type = this.props.all_question_types.find(qt => qt.id == e.target.value);
        if(type) {
            const statements = {
                question_statement_en: type.question_statement_en ? type.question_statement_en : '',
                question_statement_rtl: type.question_statement_rtl ? type.question_statement_rtl : ''
            };
            this.setState(statements);
        }
    }

    processImport(e) {
        e.preventDefault();

        const subject_code = this.props.subject.code;

        if(this.state.mathData.length <= 0 && !this.state.file.name) {
            alert('Please paste questions in box to or choose CSV import!');
            return false;
        }

        let topic_id = this.state.selected_topic_id;
        let type_id = this.state.selected_question_type_id;

        if(type_id == 0)
            type_id = this.props.question_types[0].id;

        const formData = new FormData();
        if (this.state.file.name) {
            const file_name = this.state.file.name.replace("'", '');
            formData.append('file', this.state.file, file_name);
        }

        formData.append('publisher_id', syllabus_type_id);
        formData.append('class_id', class_id);
        formData.append('subject_id', subject_id);
        formData.append('subject_code', subject_code);
        formData.append('type_id', $helper.easyEncode(type_id));
        formData.append('section_id', section_id);
        formData.append('topic_id', topic_id);
        formData.append('medium', this.state.medium);
        formData.append('mathData', this.state.mathData);
        formData.append('englishSpecial', this.state.englishSpecial);
        formData.append('question_level', this.state.question_level);

        this.props.importQuestions(formData);
    }

    add_question_type(e) {
        e.preventDefault();

        const serialize = require('form-serialize');
        const form = document.querySelector(`#question_type_form`);
        const data = serialize(form, { hash: true });

        if(!data.pre_defined_title && !data.title) {
            alert('Enter choose from the list or enter new');
            return false;
        }

        let id = 0;
        if(data.pre_defined_title && data.pre_defined_title.length > 0) {
            id = $helper.easyEncode(data.pre_defined_title);
        }

        const formData = new FormData();
        formData.append('form_type', data.form_type);
        formData.append('section_id', section_id);
        formData.append('subject_id', subject_id);
        formData.append('id', id);
        formData.append('title', data.title);
        formData.append('question_statement_en', this.state.question_statement_en);
        formData.append('question_statement_rtl', this.state.question_statement_rtl);

        this.props.addQuestionType(formData);
    }

    render() {
        const c_name = this.props.a_class ? this.props.a_class.name : '';
        const s_name = this.props.subject ? this.props.subject.name : '';
        const title = `Questions (${this.props.topic_name} - ${s_name}, ${c_name} )`;
        return (
            <React.Fragment>
                {this.props.loading ? <div className="loader-wrapper"><div className="loader"></div></div> : <React.Fragment /> }
                <div className="container questions_container">
                    <BoxLayoutWithLeftPanel
                        title={title}
                        rtl_font={this.props.subject.medium === 'urdu' ? 'urdu-font' : ''}
                        back_button={false}
                        back_button_text="Back"
                        left_data={this.props.sections}
                        import_btn={true}
                        import_text={`Import Questions`}
                        question_type_btn={true}
                        step={5}
                        remove_btn={true}
                    >
                        {
                            this.renderComponentBySubjectType()
                        }
                    </BoxLayoutWithLeftPanel>
                </div>

                <ImportModal>
                    <form onSubmit={this.processImport} id="import_section_form">

                        <h3>Import {this.props.subject.name} Questions </h3>
                        <hr/>

                        <div className="row mb-4">
                            <div className="form-group col-lg-4">
                                <label className="col-sm-12 col-form-label" htmlFor="topic">Select Topic</label>
                                <select className={`custom-select ${this.checkIfRtl() ? 'urdu-font' : ''}`} name="topic_id" id="topic" onChange={this.updateSTopicId}>
                                    <option value="0">{this.checkIfRtl() ? this.props.section.rtl_name : this.props.section.name }</option>
                                    {this.props.topics.length > 0
                                        ? this.props.topics.map(t => {
                                            return <option value={t.id} selected={t.id == $helper.easyDecode(topic_id)}>
                                                {!t.name || t.name.length <=0 ? t.rtl_name : t.name}
                                            </option>
                                        })
                                        : <React.Fragment></React.Fragment>}
                                </select>
                            </div>

                            <div className="form-group col-lg-4">
                                <label className="col-sm-12 col-form-label" htmlFor="question_type_id">Question Type</label>
                                <select className={`custom-select ${this.checkIfRtl() ? 'urdu-font' : ''}`} name="question_type_id" id="question_type" onChange={this.updateSQuestionTypeId}>
                                    {this.props.question_types.length > 0
                                        ? this.props.question_types.map(t => {
                                            if(t.allow_import)
                                                return <option value={t.id}>{t.title}</option>
                                        })
                                        : <React.Fragment></React.Fragment>}
                                </select>
                            </div>

                            <div className="form-group col-lg-4">
                                <label className="col-sm-12 col-form-label" htmlFor="q_level">Questions Level</label>
                                <select className={`custom-select`} name="q_level" id="q_level" onChange={this.updateQuestionLevel}>
                                    <option value="exercise" selected={true}>Exercise</option>
                                    <option value="past_paper">Past paper</option>
                                    <option value="additional">Additional</option>
                                </select>
                            </div>

                            {
                                this.props.subject.code === 'eng' ?
                                    <div className="form-group col-lg-4 row">
                                        <div className="form-group col-lg-6">
                                            <label className="col-sm-12 col-form-label" htmlFor="medium">Medium</label>
                                            <select className={`custom-select`} name="medium" id="medium" onChange={this.updateMedium}>
                                                <option value="dual" selected={this.props.subject.medium === 'dual'}>Dual Medium</option>
                                                <option value="eng" selected={this.props.subject.medium === 'eng'}>English Only</option>
                                                <option value="urdu" selected={this.props.subject.medium === 'urdu'}>Urdu Only</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-lg-6">
                                            <label className="col-sm-12 col-form-label" htmlFor="special">Special?</label>
                                            <select className={`custom-select`} name="special" id="special" onChange={this.updateEnglishSpecial}>
                                                <option value="yes">Yes</option>
                                                <option value="no" selected={true}>No</option>
                                            </select>
                                        </div>
                                    </div>
                                    :
                                    <div className="form-group col-lg-4">
                                        <label className="col-sm-12 col-form-label" htmlFor="medium">Questions Medium</label>
                                        <select className={`custom-select`} name="medium" id="medium" onChange={this.updateMedium}>
                                            <option value="dual" selected={this.props.subject.medium === 'dual'}>Dual Medium</option>
                                            <option value="eng" selected={this.props.subject.medium === 'eng'}>English Only</option>
                                            <option value="urdu" selected={this.props.subject.medium === 'urdu'}>Urdu Only</option>
                                        </select>
                                    </div>
                            }

                            {
                                this.props.subject.code ?
                                    <div className="form-group col-lg-4">
                                        <label className="col-sm-12 col-form-label">Choose File
                                            <a target={`_blank`} href={`${APP_URL}/samples/${this.state.sample_file}`} className={`float-right`}>Download sample</a>
                                        </label>
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" id="customFile" name="file" onChange={this.updateFile} />
                                            <label className="custom-file-label" htmlFor="customFile">Select file (Excel / CSV)</label>
                                        </div>
                                    </div>
                                    : <React.Fragment/>
                            }

                            <div className="form-group col-lg-4">
                                <label className="col-sm-12 col-form-label">&nbsp;</label>
                                <button className="btn btn-primary col-lg-12" type="submit"
                                        disabled={this.props.loading}
                                >
                                    {this.props.loading ? 'Saving...' : 'Start Importing'}
                                </button>
                            </div>
                        </div>

                        {
                            this.props.subject.allow_copy_import == '1' ?
                                <div className="col-lg-12">
                                    <h3>Paste your questions here:</h3>
                                    <CKEditor
                                        // editor={ClassicEditor}
                                        onChange={ ( event, editor ) => {
                                            // for ckedito5, its by 2nd param (editor)
                                            const data = event.editor.getData();
                                            this.setState({mathData: data})
                                        }}
                                        // config={ckEditor_config}
                                    />
                                </div>
                                : ''
                        }
                    </form>
                </ImportModal>

                <PopupModal className="modal-xl">
                    <form onSubmit={this.add_question_type} id="question_type_form">

                        <h3>Add question type to current screen </h3>
                        <hr/>

                        <div className="row mb-4">
                            <div className="form-group col-lg-4">
                                <label className="col-sm-12 col-form-label">Form Type</label>
                                <select
                                    id="form_type"
                                    className="custom-select"
                                    name="form_type"
                                    data-toggle="popover"
                                    title="Note"
                                    data-html="true"
                                    data-trigger="focus"
                                    data-content="<div>1. Dictation, pair of words will be of <b>MCQ type</b></div>
                                    <div>2. Plurals, Word opposites etc will be of <b>Column type</b></div>
                                    <div>3. Most of questions fit into <b>General type</b></div>">
                                    <option value="mcq">Multiple Choice type</option>
                                    <option value="general">General type</option>
                                    <option value="banks">Fill in blank type</option>
                                    <option value="columns">Column type</option>
                                    <option value="image">Questions with Images type</option>
                                    <option value="true_false">True / False type</option>
                                </select>
                            </div>

                            <div className="form-group col-lg-4">
                                <label className="col-sm-12 col-form-label">Select from list</label>
                                <select className="custom-select" name="pre_defined_title" onChange={this.updateQuestionStatements}>
                                    <option value="">-Select-</option>
                                    {
                                        this.props.all_question_types.length > 0
                                            ? this.props.all_question_types.map(t => {
                                                return <option value={t.id} className={$helper.checkUTF8(t.title) ? `urdu-font` : ''}>{t.title}</option>
                                            })
                                            : <React.Fragment></React.Fragment>
                                    }
                                </select>
                            </div>

                            <div className="form-group col-lg-4">
                                <label className="col-sm-12 col-form-label">or Add new</label>
                                <input type="text" className="form-control"
                                       placeholder="Enter question type"
                                       name="title"
                                       autoComplete="off"
                                />
                            </div>

                        </div>

                        <div className="form-group">
                            <label className="col-sm-12 col-form-label">Enter Question Statement (EM)</label>
                            <input type="text" className="form-control"
                                   placeholder="Question statement (em)"
                                   name="question_statement_em"
                                   autoComplete="off"
                                   value={this.state.question_statement_en}
                                   onChange={this.updateQuestionStatement}
                            />

                            <label className="col-sm-12 col-form-label">Enter Question Statement (UM)</label>
                            <input type="text" className="form-control urdu-font"
                                   placeholder="Question statement (um)"
                                   name="question_statement_um"
                                   autoComplete="off"
                                   value={this.state.question_statement_rtl}
                                   onChange={(e) => this.updateQuestionStatement(e, 'rtl') }
                            />
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary col-lg-12" type="submit"
                                    disabled={this.props.loading}
                            >
                                {this.props.loading ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </form>
                </PopupModal>
            </React.Fragment>
        )
    }

    renderComponentBySubjectType() {
        let c = <React.Fragment></React.Fragment>;
        let SpecificComponent = subjectComponents['all'];

        // subject code will always be 1st 3 letters of Subject Name
        if(this.props.subject.code == 'isl') {
            SpecificComponent = subjectComponents['isl'];
        } else if (this.props.subject.code == 'mat') {
            SpecificComponent = subjectComponents['math'];
        } else if(this.props.subject.code == 'eng') {
            SpecificComponent = subjectComponents['eng'];
        } else if(this.props.subject.medium === 'urdu') {
            SpecificComponent = subjectComponents['urd'];
        } else {
            SpecificComponent = subjectComponents['all'];
        }

        return <SpecificComponent />;
    }

    checkIfRtl() {
        return this.props.subject.medium === 'urdu' ? true : false;
        const rtl_subjects = this.props.subjects.filter(s => s.medium === 'urdu');
        const codes = rtl_subjects.map(s => s.code);
        return codes.indexOf(this.props.subject.code) !== -1 ? true : false;
    }
}

$(document).ready(function(){
    $('[data-toggle="popover"]').popover();
});

const mapStateToProps = state => {
    const sections = state.questions.sections;
    let topic = '';
    const section = sections.find(s => $helper.easyDecode(section_id) == s.id);
    if (topic_id) {
        topic = section.topics.find(s => $helper.easyDecode(topic_id) == s.id);
    } else {
        topic = section;
    }
    let topic_name = '';
    if(topic) {
        topic_name = topic.name && topic.name.length > 0
            ? topic.name
            : topic.rtl_name;
    }
    return {
        loading: state.questions.loading,
        a_class: state.questions.current_class,
        subject: state.questions.subject,
        sections: sections,
        s_code: state.questions.subject.code,
        topic_name: topic_name,
        section: section,
        topics: section ? section.topics : [],
        question_types: state.questions.question_types,
        subjects: state.subject.subjects,
        all_question_types: state.questions.all_question_types
    }
};

const mapDispatchToProps = dispatch => {
    return {
        importQuestions: (formData) => dispatch(importQuestions(dispatch, formData)),
        addQuestionType: (formData) => dispatch(addQuestionType(dispatch, formData)),
        // getAllQuestionTypes: () => dispatch(fetchAllQuestionType(dispatch))
        getAllQuestionTypes: () => null
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);