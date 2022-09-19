import React, {Component, lazy, PureComponent} from 'react';
import {connect} from "react-redux";
import "react-datepicker/dist/react-datepicker.css";

import {
    fetchAnswerKey,
    fetchSavedQuestions,
    savePaper,
    togglePaperSetting,
    updatePaperSetting
} from "../../Questions/redux/Actions";
import {fetchAllSubjects} from "../../subjects/redux/Actions";
import PEngGeneralQuestion from "../../Questions/components/english/listing/PEngGeneralQuestion";

const BubbleSheet = lazy(() => import("../../common/BubbleSheet"));
const Header1 = lazy(() => import("./Header1"));
const Header2 = lazy(() => import("./Header2"));
const Header3 = lazy(() => import("./Header3"));
const PopupModal = lazy(() => import("../../common/PopupModal"));
const ImportModal = lazy(() => import("../../common/ImportModal"));

const PMCQ = lazy(() => import("../../Questions/components/general/listing/PMCQ"));
const PGeneralQuestion = lazy(() => import("../../Questions/components/general/listing/PGeneralQuestion"));
const PRTLMCQ = lazy(() => import("../../Questions/components/urdu/listing/PRTLMCQ"));
const PRTLGeneralQuestion = lazy(() => import("../../Questions/components/urdu/listing/PRTLGeneralQuestion"));
const PISLGeneralQuestion = lazy(() => import("../../Questions/components/islamiyat/listing/PISLGeneralQuestion"));
const PMatchColumn = lazy(() => import("../../Questions/components/general/listing/PMatchColumn"));
const PImageQuestion = lazy(() => import("../../Questions/components/general/listing/PImageQuestion"));
const PMathMCQ = lazy(() => import("../../Questions/components/math/listing/PMathMCQ"));
const PMathGeneralQuestion = lazy(() => import("../../Questions/components/math/listing/PMathGeneralQuestion"));
const PEngMCQ = lazy(() => import("../../Questions/components/english/listing/PEngMCQ"));

const ref = React.createRef();
const __id = $helper.getParameterByName('__i');
const preview_only = $helper.getParameterByName('__p');

const components = {
    mcq: PMCQ,
    general: PGeneralQuestion,
    banks: PGeneralQuestion,
    true_false: PGeneralQuestion,
    columns: PMatchColumn,
    image: PImageQuestion
};

const rtl_components = {
    mcq: PRTLMCQ,
    general: PRTLGeneralQuestion,
    banks: PRTLGeneralQuestion,
    true_false: PRTLGeneralQuestion,
    short_question4: PRTLGeneralQuestion,
    columns: PMatchColumn,
    image: PImageQuestion,
};

const isl_components = {
    ...rtl_components,
    general: PISLGeneralQuestion,
};

const mat_components = {
    mcq: PMathMCQ,
    general: PMathGeneralQuestion,
    banks: PMathGeneralQuestion,
    true_false: PMathGeneralQuestion,
    columns: PMathGeneralQuestion,
};

const eng_components = {
    ...components,
    mcq: PEngMCQ,
    general: PEngGeneralQuestion
};

const headers = {
    Header1: Header1,
    Header2: Header2,
    Header3: Header3
};

class PaperPreview extends PureComponent {

    constructor(props) {

        super(props);

        $helper.triggerLeftPaneCollapse();

        if (!__id) {
            window.location.href = $helper.buildUrlWithParams(APP_URL + '/dashboard');
            return false;
        }

        let institute = window.localStorage.getItem('__i');
        if (!institute) {
            window.location.href = '/dashboard'
        }
        institute = JSON.parse(institute);

        this.state = {
            page_title: '',
            institute: institute,
            tableMcq: false,
            bubbleSheet: false,
            dualPrint: false,
            boldHeading: false,
            headerStyle: 'Header1',
            paper_name: '',
            paper_date: '',
            paper_time: '',
            total_marks: ''
        };

        this.savePaper = this.savePaper.bind(this);
        this.backAndEdit = this.backAndEdit.bind(this);
        this.updatePaperOption = this.updatePaperOption.bind(this);
        this.updatePaperSetting = this.updatePaperSetting.bind(this);
        this.toggleSettingOption = this.toggleSettingOption.bind(this);
    }

    componentDidMount() {
        const formData = new FormData();
        formData.append('__i', __id);
        this.props.fetchSavedQuestions(formData);
        this.props.fetchSubjects();
        this.props.fetchAnswerKey(formData);
    }

    backAndEdit() {
        const url = $helper.buildPaperUrlWithParams('questions', {
            stid: $helper.easyEncode(this.props.info.publisher_id),
            cid: $helper.easyEncode(this.props.info.class_id),
            suid: $helper.easyEncode(this.props.info.subject_id),
            __i: $helper.easyEncode(this.props.info.id),
        });
        window.location.href = url;
    }

    savePaper() {
        if(this.state.paper_name.length <=0) {
            alert('Paper Name is required!');
            return false;
        }

        if(this.state.paper_date.length <=0) {
            alert('Paper Date is required!');
            return false;
        }
        const formData = new FormData();
        formData.append('id', __id);
        formData.append('paper_name', this.state.paper_name);
        formData.append('paper_code', this.props.info.paper_code);
        formData.append('paper_date', this.state.paper_date);
        formData.append('paper_time', this.state.paper_time);
        formData.append('total_marks', this.state.total_marks);
        formData.append('blank_lines', this.props.info.blank_lines);
        formData.append('bubbleSheet', this.props.info.bubbleSheet);
        formData.append('dualPrint', this.props.info.dualPrint);
        formData.append('boldHeading', this.props.info.boldHeading);
        formData.append('headerStyle', this.props.info.headerStyle);
        formData.append('questionFontSize', this.props.info.questionFontSize);
        formData.append('optionFontSize', this.props.info.optionFontSize);
        formData.append('class', this.props.current_class.name);
        formData.append('subject', this.props.subject.name);
        formData.append('section', this.props.info.section_ids);
        this.props.savePaper(formData);
    }

    updatePaperOption(key, value, shouldExecute) {
        let obj = [];
        obj[key] = value;
        this.setState(obj);
        if(shouldExecute !== false)
            this.updatePaperSetting(key, value)
    }

    toggleSettingOption(key) {
        const currentState = this.state[key];
        let obj = [];
        obj[key] = !currentState;
        this.setState(obj);
        this.props.togglePaperSetting(key);
    }

    updatePaperSetting(key, value) {
        this.props.updatePaperSetting(key, value);
        this.updatePaperOption(key, value, false);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.info.headerStyle !== this.props.info.headerStyle) {
            this.renderHeader();
        }
        if(prevProps.questions.length !== this.props.questions.length && preview_only) {
            setTimeout(function() {
                window.print();
            }, 1000)
        }
    }

    render() {
        const paper_code = `${this.props.subject.code}-${this.props.current_class.level}`;
        let filename = `${this.props.current_class.name}-${this.props.subject.name}-paper.pdf`;
        filename.replace(' ', '-');
        return (
            <React.Fragment>
                <section className="paper-preview">
                    {
                        preview_only === null
                            ?
                            <div className="container-fluid paper-settings mb-3 pt-3 border-bottom">

                                <h3 className="border-bottom">Paper Settings</h3>

                                <div className="row mx-0">
                                    <div className="form-check col-lg-2">
                                        <br/>
                                        <input className="form-check-input" type="checkbox" value="" id="bubbleSheet" onChange={() => this.toggleSettingOption('bubbleSheet')}
                                        />
                                        <label className="form-check-label" htmlFor="bubbleSheet">
                                            Bubble Sheet?
                                        </label>

                                        <br/>
                                        <input className="form-check-input" type="checkbox" value="" id="dualPrint" onChange={() => this.toggleSettingOption('dualPrint')}
                                        />
                                        <label className="form-check-label" htmlFor="dualPrint">
                                            Dual Print?
                                        </label>
                                    </div>

                                    <div className="form-check col-lg-2">
                                        <br/>
                                        <input className="form-check-input" type="checkbox" id="boldHeadings" onChange={() => this.toggleSettingOption('boldHeading')}
                                        />
                                        <label className="form-check-label" htmlFor="boldHeadings">
                                            Bold Headings?
                                        </label>

                                        <br/>
                                        <input className="form-check-input" type="checkbox" id="tableMCQ" onChange={() => this.toggleSettingOption('table_mcq')}
                                        />
                                        <label className="form-check-label" htmlFor="tableMCQ">
                                            Table MCQ?
                                        </label>
                                    </div>

                                    <div className="form-group col-lg-2 mb-0">
                                        <label className="col-sm-12 col-form-label px-0" htmlFor="headerStyle">Header
                                            Style</label>
                                        <select className="custom-select" id="headerStyle"
                                                onChange={(e) => this.props.updatePaperSetting('headerStyle', e.target.value)}>
                                            <option value="Header1"
                                                    selected={this.props.info.headerStyle === 'Header1'}>Header 1
                                            </option>
                                            <option value="Header2"
                                                    selected={this.props.info.headerStyle === 'Header3'}>Header 2
                                            </option>
                                            <option value="Header3"
                                                    selected={this.props.info.headerStyle === 'Header3'}>Header 3
                                            </option>
                                        </select>
                                    </div>

                                    <div className="form-group col-lg-2  mb-0">
                                        <label className="col-sm-12 col-form-label" htmlFor="heading_size">Questions
                                            Size</label>
                                        <input type="number" min="10" max="25" step="0.25" className='form-control'
                                               name="heading_size" value={this.props.info.questionFontSize} id="heading_size"
                                               onChange={(e) => this.props.updatePaperSetting('questionFontSize', e.target.value)} />
                                    </div>

                                    <div className="form-group col-lg-2 mb-0">
                                        <label className="col-sm-12 col-form-label" htmlFor="options_size">Options
                                            Size</label>
                                        <input type="number" min="10" max="25" step="0.25" className='form-control'
                                               name="options_size" value={this.props.info.optionFontSize} id="options_size"
                                               onChange={(e) => this.props.updatePaperSetting('optionFontSize', e.target.value)} />
                                    </div>

                                    <div className="form-group col-lg-2 mb-0">
                                        <label className="col-sm-12 col-form-label" htmlFor="options_size">Blank Lines</label>
                                        <input type="number" min="0" max="20" className='form-control'
                                               name="blank_lines" value={this.props.info.blank_lines} id="blank_lines"
                                               onChange={(e) => this.props.updatePaperSetting('blank_lines', e.target.value)} />
                                    </div>

                                </div>

                                <div className="row mx-0">

                                    <div className="form-group col-lg-3">
                                        <label className="col-sm-12 col-form-label">&nbsp;</label>
                                        <button className="btn btn-danger col-lg-12 px-0"
                                                onClick={this.backAndEdit}>Back / Edit
                                        </button>
                                    </div>

                                    <div className="form-group col-lg-3">
                                        <label className="col-sm-12 col-form-label">&nbsp;</label>
                                        <button className="btn btn-warning col-lg-12 px-0"
                                                data-toggle="modal" data-target="#popupModal"
                                                disabled={this.props.loading ? true : false}
                                        >{this.props.loading ? 'Saving...' : 'Save For Later'}</button>
                                    </div>

                                    <div className="form-group col-lg-3">
                                        <div className="col-lg-12 px-0 mx-0 row">
                                            <div className="col-sm-6 pl-0">
                                                <label className="col-sm-12 col-form-label">&nbsp;</label>
                                                <button className="btn btn-primary col-lg-12 px-0"
                                                        onClick={() => window.print()}>Print
                                                </button>
                                            </div>
                                            <div className="col-sm-6 pr-0">
                                                <label className="col-sm-12 col-form-label">&nbsp;</label>
                                                <button className="btn btn-primary col-lg-12 px-0" data-toggle="modal" data-target="#popupModal2">Answer Key
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group col-lg-3">
                                        <label className="col-sm-12 col-form-label">&nbsp;</label>
                                        <button className="btn btn-dark col-lg-12 px-0" onClick={()=>window.print()}>Download as PDF</button>
                                    </div>

                                </div>
                            </div>
                            : <div className="form-group col-lg-3 no-print">
                                <label className="col-sm-12 col-form-label">&nbsp;</label>
                                <button className="btn btn-primary col-lg-12 px-0"
                                        onClick={() => window.print()}>Print
                                </button>
                            </div>
                    }

                    <section ref={ref}>
                    {
                        this.renderHeader()
                    }

                    {
                        this.state.bubbleSheet
                            ? (
                                <section className="my-2">
                                    <BubbleSheet />
                                </section>
                            )
                            : <React.Fragment></React.Fragment>
                    }

                    <div className="container-fluid rendered-paper-questions mt-4 pb-3 px-0">
                        <img className="background-image" src={`${$helper.getImageBasePath()}${this.state.institute.logo}`} alt="" />
                        {
                            this.renderConfirmedQuestions()
                        }
                    </div>

                    {
                        this.state.dualPrint
                            ? (
                                <section className="paper-preview">
                                    {
                                        this.renderHeader()
                                    }
                                    {
                                        this.state.bubbleSheet
                                            ? (
                                                <section className="my-2">
                                                    <BubbleSheet />
                                                </section>
                                            )
                                            : <React.Fragment></React.Fragment>
                                    }
                                    <div className="container-fluid rendered-paper-questions mt-4 pb-3 px-0">
                                        <img className="background-image" src={`${$helper.getImageBasePath()}${this.state.institute.logo}`} alt="" />
                                        {
                                            this.renderConfirmedQuestions()
                                        }
                                    </div>
                                </section>
                            )
                            : <React.Fragment></React.Fragment>
                    }
                    </section>
                </section>

                <PopupModal>
                    <form method="POST" id="saveForm">

                        <h3>Save Paper</h3>
                        <hr/>

                        <div className="form-group">
                            <label className="col-sm-12 col-form-label" htmlFor="className">Enter Name</label>
                            <input type="text" className="form-control" id="className"
                                   placeholder="Enter name"
                                   onChange={(e) => this.updatePaperOption('paper_name', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="col-sm-12 col-form-label" htmlFor="paper_date">Enter Paper Date</label>
                            <input type="text" className="form-control" id="paper_date"
                                   placeholder="Enter Date"
                                   onChange={(e) => this.updatePaperOption('paper_date', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="col-sm-12 col-form-label" htmlFor="paper_time">Enter Paper Time</label>
                            <input type="text"className="form-control" id="paper_time"
                                   placeholder="Enter Time"
                                   onChange={(e) => this.updatePaperOption('paper_time', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="col-sm-12 col-form-label" htmlFor="total_marks">Enter Total Marks</label>
                            <input type="text" className="form-control" id="total_marks"
                                   placeholder="Enter Total Marks"
                                   onChange={(e) => this.updatePaperOption('total_marks', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary col-lg-12" type="button"
                                    disabled={this.props.loading}
                                    onClick={this.savePaper}
                            >
                                {this.props.loading ? 'Saving...' : 'Save'}
                            </button>
                        </div>

                    </form>
                </PopupModal>
                <ImportModal>
                    <h3>Answers Key

                        <button className="no-print float-right btn btn-primary" onClick={() => window.print()}>Print</button>
                    </h3>
                    <hr/>
                    {this.renderAnswerKey()}
                </ImportModal>
            </React.Fragment>
        )
    }

    checkIfRtl() {
        const rtl_subjects = this.props.subjects.filter(s => s.medium === 'urdu');
        const codes = rtl_subjects.map(s => s.code);
        return codes.indexOf(this.props.subject.code) !== -1 ? true : false;
    }

    renderHeader() {
        const HeaderComponent =  headers[this.props.info.headerStyle];
        return <HeaderComponent
            institute={this.state.institute}
            paper_code={this.props.info.paper_code}
            subject={this.props.subject}
            paper_time={this.props.info.paper_time}
            paper_date={this.props.info.paper_date}
            total_marks={this.props.info.total_marks}
            current_class={this.props.current_class}
            updatePaperSetting={this.updatePaperSetting}
        />
    }

    renderAnswerKey() {
        let toRender = [];
        if(this.props.answerKey.length <= 0)
            return [];

        for (let i in this.props.answerKey) {
            toRender.push(<h4 className="mb-0 mt-3">Question: {parseInt(i )+ 1}</h4>);
            toRender.push(<div className="row col-sm-12">{this.answers(this.props.answerKey[i].answers)}</div>);
        }

        return toRender;
    }

    answers(answers) {
        let toRender = [];
        let a = 1;
        for(let j=0; j < answers.length; j++) {
            toRender.push(<div className="col-sm-2">{a}. <strong>{answers[j]}</strong></div>);
            a++;
        }
        return toRender;
    }

    renderConfirmedQuestions() {
        return this.props.questions.map((obj, i) => {

            if(!obj.confirmed) {
                return <React.Fragment />
            }

            let c = '';
            if(this.props.subject.code == 'isl') {
                c = isl_components[obj.form_type]
            } else if(this.props.subject.code == 'urd') {
                c = rtl_components[obj.form_type]
            } else if(this.props.subject.code == 'mat') {
                c = mat_components[obj.form_type]
            } else if(this.props.subject.code == 'eng') {
                c = eng_components[obj.form_type]
            } else if(this.props.subject.medium === 'urdu') {
                c = rtl_components[obj.form_type]
            } else {
                c = components[obj.form_type];
            }
            const SpecificComponent = c;
            const title = this.generateTitle2(obj, i);
            const questions = obj.questions.length > 0
                ? obj.questions.map((q, j) => {
                    return <SpecificComponent
                        question={q}
                        number={j+1}
                        only_display
                        type={obj.form_type}
                        questionFontSize={this.ptToRem(this.props.info.questionFontSize)}
                        optionsFontSize={this.ptToRem(this.props.info.optionFontSize)}
                        blank_lines={this.props.info.blank_lines}
                    />
                })
                : <section className="col-lg-12">Loading...</section>

            let table_mcq_class = '';
            if(obj.form_type === 'mcq' && this.props.info.table_mcq == 1) {
                table_mcq_class = 'table-mcq';
            }
            const displayed_questions = <section className={`${obj.form_type}-question-section ${table_mcq_class} displayed-questions col-sm-12 px-0`}>{questions}</section>;

            return [title, displayed_questions];
        })
    }

    ptToRem(n) {
        return 0.0833 * parseFloat(n) + 'rem';
    }

    generateTitle2(obj, i) {
        let additional_class = $helper.checkUTF8(obj.title) ? 'urdu-font' : '';
        const info = this.calculateMarks2(obj);
        const is_ignored = obj.ignore > 0 ? '(Any ' + (obj.questions.length - obj.ignore) + ')' : '';
        const is_ignored_rtl = obj.ignore > 0 ? '( کوئی بھی ' + (obj.questions.length - obj.ignore) + ')' : '';
        const d_eng_question_title = this.props.subject.medium === 'urdu' ? false : true;
        const d_rtl_question_title = this.props.subject.medium === 'eng' ? false : true;

        return <div className="question_title_row pt-3 col-sm-12 row px-0 mx-0">
            <div className={`${!d_rtl_question_title ? 'col-sm-8' : 'col-sm-4'} ${!d_eng_question_title ? 'd-none' : ''}`}>
                <h4 style={{fontSize: this.ptToRem(this.props.info.questionFontSize), fontWeight: 'bold' }}>Q{i+1}) {obj.question_statement_en}: {is_ignored}</h4>
            </div>
            <div className="col-sm-4 text-center" style={{fontSize: this.ptToRem(this.props.info.questionFontSize), fontWeight: 'bold' }}>
                Total Marks: {`${info.question_count} x ${info.each_question_marks} = ${info.marks}`}
            </div>

            <div className={`urdu-font text-right ${!d_eng_question_title ? 'col-sm-8' : 'col-sm-4'} ${!d_rtl_question_title ? 'd-none' : ''}`}>
                <h4 style={{fontSize: this.ptToRem(this.props.info.questionFontSize), fontWeight: 'bold' }}>
                    س{i+1}) {obj.question_statement_rtl} :{is_ignored_rtl}
                </h4>
            </div>
        </div>
    }

    calculateMarks2(obj) {
        const questions = obj.questions.length - obj.ignore;
        const marks = questions > 0 ? parseInt(obj.each_question_marks) * questions : 0;

        return {
            question_count: questions,
            each_question_marks: obj.each_question_marks,
            marks: marks
        }
    }
}

const mapStateToProps = state => {
    return {
        loading: state.questions.loading,
        subject: state.questions.subject,
        current_class: state.questions.current_class,
        subjects: state.subject.subjects,
        questions: state.questions.confirmed_questions,
        info: state.questions.confirmed_questions_info,
        answerKey: state.questions.answerKey
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSavedQuestions: (formData) => dispatch(fetchSavedQuestions(dispatch, formData)),
        fetchAnswerKey: (formData) => dispatch(fetchAnswerKey(dispatch, formData)),
        savePaper: (formData) => dispatch(savePaper(dispatch, formData)),
        fetchSubjects: () => dispatch(fetchAllSubjects(dispatch)),
        togglePaperSetting: (key) => dispatch(togglePaperSetting(dispatch, key)),
        updatePaperSetting: (key, value) => dispatch(updatePaperSetting(dispatch,key, value))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PaperPreview);
