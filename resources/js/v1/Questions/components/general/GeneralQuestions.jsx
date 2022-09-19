import React, {Component, lazy, PureComponent} from 'react';
import BoxButton from "../../../common/BoxButton";

const McqForm = lazy(() => import("./forms/McqForm"));
const QuestionForm = lazy(() => import("./forms/QuestionForm"));
const TrueFalseForm = lazy(() => import("./forms/TrueFalseForm"));
const FillBlanksForms = lazy(() => import("./forms/FillBlanksForms"));
const MatchColumnsFrom = lazy(() => import("./forms/MatchColumnsFrom"));
const QuestionWithImage = lazy(() => import("./forms/QuestionWithImage"));

import {
    class_id,
    general_components as components,
    section_id,
    subject_id,
    syllabus_type_id,
    topic_id
} from "../../../params";
import {connect} from "react-redux";
import {fetchQuestionsWithTypes, removeQuestionType, showQuestionForm} from "../../redux/Actions";

class GeneralQuestion extends PureComponent {

    constructor(props) {

        super(props);

        $helper.triggerLeftPaneCollapse();

        this.state = {
            page_title: ''
        };

        this.fetchData = this.fetchData.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
        this.renderQuestions = this.renderQuestions.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.removeQuestionType = this.removeQuestionType.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.props.fetchQuestions();
    }

    buttonClick(info, index) {
        let all_data = this.state.question_types;
        info = {
            type_id: $helper.easyEncode(info.id),
            stid: syllabus_type_id,
            cid: class_id,
            suid: subject_id,
            seid: section_id,
            tid: topic_id,
        };

        let form = {info: JSON.stringify(info), is_loading: false, index: index};
        this.props.showForm(form, index);
    }

    removeQuestionType(id) {

        if(!window.confirm('Are you sure?')) return false;

        const formData = new FormData();
        formData.append('section_id', section_id);
        formData.append('id', $helper.easyEncode(id));

        this.props.removeQuestionType(formData);
    }

    render() {
        return (
            <React.Fragment>
                <div className="container questions_container">
                        <nav>
                            <div className="nav nav-tabs nav-fill" id="nav-tabs" role="tablist">
                                {
                                    this.props.question_types.length > 0
                                        ? this.props.question_types.map((type, i) => {
                                            return (
                                                <a
                                                    className={`nav-item nav-link ${i === 0 ? 'active' : ''}`}
                                                    id={`nav-${type.name}-tag`}
                                                    data-id={type.id}
                                                    data-toggle="tab"
                                                    href={`#nav-${type.name}`}
                                                    role="tab"
                                                    aria-controls={`nav-${type.name}`}
                                                    aria-selected={i === 0}
                                                >
                                                    {type.title}
                                                </a>
                                            )
                                        })
                                        : <React.Fragment></React.Fragment>
                                }
                            </div>
                        </nav>

                        <div className="tab-content" id="nav-tabContent">
                            {
                                this.props.question_types.length > 0
                                    ? this.props.question_types.map((data, i) => {
                                        i += 1;
                                        let url = 'javascript:;';
                                        return (
                                            <div
                                                className={`tab-pane fade ${i === 1 ? 'show active' : ''}`}
                                                id={`nav-${data.name}`}
                                                role="tabpanel"
                                                aria-labelledby={`nav-${data.name}-tag`}>

                                                <div className="row">
                                                    <div className="col-lg-12 float-right">
                                                        {
                                                            data.removeable === 1
                                                                ? <button className="mb-3 btn btn-danger remove-btn float-right" onClick={() => this.removeQuestionType(data.id)}>
                                                                    Remove this Question type <i className="fa fa-minus-circle" aria-hidden="true"></i>
                                                                </button>
                                                                : ''
                                                        }
                                                    </div>
                                                </div>

                                                <BoxButton
                                                    url="javascript"
                                                    box_class="transparent-box"
                                                    icon_class="fa-plus-circle"
                                                    box_title={`Add new Question`}
                                                    parent_class="add-question-btn"
                                                    onClick={this.buttonClick}
                                                    index={i - 1}
                                                    data={data}
                                                />
                                                {
                                                    this.renderForm(data, i)
                                                }
                                                {
                                                    this.renderQuestions(data, data.form_type)
                                                }

                                            </div>
                                        )
                                    })
                                    :
                                    <h2 className="container pt-4 pb-4">{this.props.loading ? 'Loading...' : 'No topics found!'}</h2>
                            }
                        </div>
                </div>
            </React.Fragment>
        )
    }

    renderQuestions(data, component) {

        if (typeof this.props.questions[data.name] === typeof undefined) return <React.Fragment></React.Fragment>
        if (typeof this.props.questions[data.name].data === typeof undefined) return '';

        return this.props.questions[data.name].data.length > 0
            ? this.props.questions[data.name].data.map((question, index) => {
                // Correct! JSX type can be a capitalized variable.
                const SpecificComponent = components[component];
                return <SpecificComponent question={question} number={index + 1} type={data.form_type} />;
            })
            : this.props.questions[data.name].is_loading ? <h3>Loading</h3> :
                <h3 className="mb-3">Start adding new question(s)</h3>;
    }

    renderForm(data, i) {
        let form = <React.Fragment></React.Fragment>;

        if (!data.form) {
            return form;
        }

        switch (data.form_type) {
            case 'mcq':
                form = <McqForm
                    form={data.form.info}
                    index={i - 1}
                    type={data.name}
                    endpoint="add-mcq-question"
                />
                break;
            case'general':
                form = <QuestionForm
                    form={data.form.info}
                    index={i - 1}
                    endpoint="add-general-question"
                    type={data.name}
                />
                break;
            case 'true_false':
                form = <TrueFalseForm
                    form={data.form.info}
                    index={i - 1}
                    endpoint="add-general-question"
                    type={data.name}
                />
                break;
            case 'banks':
                form = <FillBlanksForms
                    form={data.form.info}
                    index={i - 1}
                    endpoint="add-general-question"
                    type={data.name}
                />
                break;
            case 'columns':
                form = <MatchColumnsFrom
                    form={data.form.info}
                    index={i - 1}
                    endpoint="add-match-column-question"
                    type={data.name}
                />
                break;
            case 'image':
                form = <QuestionWithImage
                    form={data.form.info}
                    index={i - 1}
                    endpoint="add-image-question"
                    type={data.name}
                />
                break;
        }

        return form;
    }
}

const mapStateToProps = state => {
    return {
        loading: state.questions.loading,
        message: state.questions.message,
        question_types: state.questions.question_types,
        questions: state.questions.questions,
        s_code: state.questions.subject.code,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchQuestions: () => dispatch(fetchQuestionsWithTypes(dispatch, section_id)),
        fetchQuestions: () => null,
        showForm: (form, index) => dispatch(showQuestionForm(dispatch, form, index)),
        removeQuestionType: (form) => dispatch(removeQuestionType(dispatch, form))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralQuestion);
