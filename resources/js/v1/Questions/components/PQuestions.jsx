import React, { Component, lazy } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { connect } from "react-redux";
import Select from "react-select";
import ImportModal from "../../common/ImportModal";
import { fetchClass } from "../../levels/redux/Actions";
import { class_id, subject_id, syllabus_type_id } from "../../params";
import { fetchSubject } from "../../sections/redux/Actions";
import {
    clearSelection,
    confirmSelected,
    editQuestionSection,
    fetchQuestionTypes,
    fetchSavedQuestions,
    removeSavedQuestionSection,
    searchQuestions
} from "../redux/Actions";
import PEngGeneralQuestion from "./english/listing/PEngGeneralQuestion";

const PMCQ = lazy(() => import("./general/listing/PMCQ"));
const PGeneralQuestion = lazy(() =>
    import("./general/listing/PGeneralQuestion")
);
const PRTLMCQ = lazy(() => import("./urdu/listing/PRTLMCQ"));
const PRTLGeneralQuestion = lazy(() =>
    import("./urdu/listing/PRTLGeneralQuestion")
);
const PISLGeneralQuestion = lazy(() =>
    import("./islamiyat/listing/PISLGeneralQuestion")
);
const PMatchColumn = lazy(() => import("./general/listing/PMatchColumn"));
const PImageQuestion = lazy(() => import("./general/listing/PImageQuestion"));
const PMathMCQ = lazy(() => import("./math/listing/PMathMCQ"));
const PMathGeneralQuestion = lazy(() =>
    import("./math/listing/PMathGeneralQuestion")
);
const PEngMCQ = lazy(() => import("./english/listing/PEngMCQ"));

const __id = $helper.getParameterByName("__i");
let random_numbers = [];
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
    image: PImageQuestion
};

const isl_components = {
    ...rtl_components,
    general: PISLGeneralQuestion
};

const mat_components = {
    mcq: PMathMCQ,
    general: PMathGeneralQuestion,
    banks: PMathGeneralQuestion,
    true_false: PMathGeneralQuestion,
    columns: PMathGeneralQuestion
};

const eng_components = {
    ...components,
    mcq: PEngMCQ,
    general: PEngGeneralQuestion
};

let childRefs = [];

class PQuestions extends Component {
    constructor(props) {
        super(props);

        if (!syllabus_type_id || !class_id) {
            window.location.href = $helper.buildUrlWithParams(
                APP_URL + "/dashboard"
            );
            return false;
        }

        $helper.triggerLeftPaneCollapse();

        this.props.fetchClassById();
        this.props.fetchSubjectById();

        let institute = window.localStorage.getItem("__i");
        if (!institute) {
            window.location.href = "/dashboard";
        }
        institute = JSON.parse(institute);

        let options = [];
        let selected_items = [];
        let sections_ids = [];
        let topic_ids = [];

        options = !this.props.sections
            ? []
            : this.props.sections.map(s => {
                  let s_obj = {
                      id: s.id,
                      name: this.checkIfRtl ? s.rtl_name : s.name,
                      checked: s.checkbox
                  };
                  if (s.checkbox) {
                      selected_items.push(s_obj);
                      sections_ids.push(s.id);
                  }

                  let topics =
                      s.topics.length > 0
                          ? s.topics.map(t => {
                                let t_obj = {
                                    id: t.id,
                                    name: this.checkIfRtl ? t.rtl_name : t.name,
                                    checked: t.checkbox
                                };

                                if (t.checkbox) {
                                    selected_items.push(t_obj);
                                    topic_ids.push(t.id);
                                }

                                return t_obj;
                            })
                          : [];
                  return {
                      ...s_obj,
                      ...[...topics]
                  };
              });

        this.state = {
            page_title: "",
            institute: institute,
            options: options,
            selectedValue: selected_items,
            sections_ids: sections_ids,
            topic_ids: topic_ids,
            selectedOption: null,
            priority: [
                { label: "Select All", value: "*" },
                { label: "Exercise Questions", value: 1 },
                { label: "Past Paper Questions", value: 2 },
                { label: "Advance Questions", value: 3 }
            ],
            selectedPriority: { label: "Exercise Questions", value: 1 },
            ignore_questions: 0,
            total_questions: 10,
            each_question_marks: 1,
            current_key: "",
            medium: "dual",
            paper_code: "",
            paper_time: "",
            paper_date: "",
            total_marks: 0,
            blank_lines: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.searchQuestions = this.searchQuestions.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.updateQuestionMarks = this.updateQuestionMarks.bind(this);
        this.updateTotalQuestions = this.updateTotalQuestions.bind(this);
        this.UpdateIgnoreQuestions = this.UpdateIgnoreQuestions.bind(this);
        this.randomSelect = this.randomSelect.bind(this);
        this.confirmSelected = this.confirmSelected.bind(this);
        this.gotoPreview = this.gotoPreview.bind(this);
        this.updateSelectedMedium = this.updateSelectedMedium.bind(this);
        this.removeSavedQuestionSection = this.removeSavedQuestionSection.bind(
            this
        );
        this.updateStateValue = this.updateStateValue.bind(this);
        this.clearSelection = this.clearSelection.bind(this);
    }

    componentDidMount() {
        let sections_ids = this.state.sections_ids;
        this.props.fetchQuestionTypes(sections_ids.join("|"));

        if (__id) {
            const formData = new FormData();
            formData.append("publisher_id", syllabus_type_id);
            formData.append("class_id", class_id);
            formData.append("subject_id", subject_id);
            formData.append("sections_ids", this.state.sections_ids);
            formData.append("topic_ids", this.state.topic_ids);
            formData.append("__i", __id);
            this.props.fetchSavedQuestions(formData);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    updateStateValue(key, value) {
        let obj = [];
        obj[key] = value;
        this.setState(obj);
    }

    handleChange(selectedOption) {
        this.setState({ selectedOption });
    }

    handlePriorityChange(selectedOptions, event) {
        if (event.action === "select-option" && event.option.value === "*") {
            this.setState({ selectedPriority: this.state.priority });
        } else if (
            event.action === "deselect-option" &&
            event.option.value === "*"
        ) {
            this.setState({ selectedPriority: [] });
        } else {
            this.setState({ selectedPriority: selectedOptions });
        }
    }

    updateQuestionMarks(e) {
        this.setState({ each_question_marks: e.target.value });
    }

    updateTotalQuestions(e) {
        this.setState({ total_questions: e.target.value });
    }

    UpdateIgnoreQuestions(e) {
        this.setState({ ignore_questions: e.target.value });
    }

    updateSelectedMedium(e) {
        this.setState({ medium: e.target.value });
    }

    updatePaperHeader(e, type) {
        const data = {};
        data[type] = e.target.value;
        this.setState(data);
    }

    searchQuestions(e) {
        e.preventDefault();

        const serialize = require("form-serialize");
        let form = document.querySelector(`#searchQuestionsFrom`);
        let data = serialize(form, { hash: true });

        if (!this.state.selectedOption) {
            alert("Please choose question type(s)");
            return false;
        }

        if (
            !this.state.selectedPriority ||
            this.state.selectedPriority.length <= 0
        ) {
            alert("Please choose question priority");
            return false;
        }

        this.clearSelection();

        const formData = new FormData();
        formData.append(
            "question_types",
            JSON.stringify([this.state.selectedOption])
        );
        formData.append("medium", data.medium);
        formData.append("syllabus_type_id", syllabus_type_id);
        formData.append("class_id", class_id);
        formData.append("subject_id", subject_id);
        formData.append("sections_ids", this.state.sections_ids);
        formData.append("topic_ids", this.state.topic_ids);
        formData.append(
            "priority",
            JSON.stringify(this.state.selectedPriority)
        );

        formData.append("limit", -1);

        this.setState({ medium: data.medium });
        this.props.searchQuestions(formData);
    }

    removeSavedQuestionSection(index, marks, dontAskConfirmation) {
        if (dontAskConfirmation !== true) {
            const shouldDelete = window.confirm("Are you sure?");
            if (!shouldDelete) return false;
        }

        const formData = new FormData();
        formData.append("publisher_id", syllabus_type_id);
        formData.append("class_id", class_id);
        formData.append("subject_id", subject_id);
        formData.append("sections_ids", this.state.sections_ids);
        formData.append("topic_ids", this.state.topic_ids);
        formData.append("index", index);
        formData.append("marks", marks);
        this.props.removeSavedQuestionSection(formData);
        if (index) {
            let total_marks = parseInt(this.state.total_marks);
            total_marks -= marks;
            this.setState({ total_marks: total_marks });
        }
    }

    editSavedQuestionSection(index, obj, marks) {
        const sectionToEdit = this.props.confirmed_questions[index];
        let selected_questions = {
            ...obj,
            questions: sectionToEdit.questions
        };
        delete selected_questions["search_results"];
        const key = sectionToEdit.key;
        let params = {
            search_results: JSON.parse(this.props.info.search_results),
            selected_questions: [selected_questions],
            key: sectionToEdit.key,
            ...obj
        };
        this.removeSavedQuestionSection(this.props.info.index, marks, true);
        this.props.editQuestionSection(params);
        $(".fa-pencil").click(function() {
            $("html, body").animate(
                {
                    scrollTop: $(".search-result").offset().top - 100
                },
                1000
            );
        });

        setTimeout(() => {
            params.questions.forEach(question => {
                const element = document.getElementById(`q-${question.id}`);
                element.classLis / t.add("selected_question");
                // $(`q-${question.id}`).trigger("click");

                childRefs[question.id].current.updateSelectedQuestions();
            });

            var firstSelectedQuestion = document.getElementById(
                `q-${params.questions[0].id}`
            );
            var topPos = firstSelectedQuestion.offsetTop;
            document.getElementsByClassName(
                "search-result"
            )[0].scrollTop = topPos;
        }, 0);
    }

    randomSelect(totalItems) {
        this.clearSelection();

        random_numbers = [];
        // $(".selected_question").trigger("click");
        let should_iterate = this.state.total_questions;
        if (should_iterate <= 0) return false;

        if (should_iterate > totalItems) should_iterate = totalItems;

        let selectedItems = [];
        for (let i = 0; i < should_iterate; ) {
            console.log("should_iterate", i);
            let nthChild = this.randomIntFromInterval(1, totalItems);
            if (
                !$(`.question_row:nth-child(${nthChild})`).hasClass(
                    "selected_question"
                )
            ) {
                $(`.question_row:nth-child(${nthChild})`).trigger("click");
                selectedItems.push(nthChild);
                i++;
            }
        }

        $("#popupModal2").modal("show");
    }

    clearSelection() {
        $(".selected_question").trigger("click");
        this.props.clearSelection();
    }

    randomIntFromInterval(min, max) {
        // min and max included
        let n = Math.floor(Math.random() * (max - min + 1) + min);
        // console.log('should_iterate: random_numbers', random_numbers);
        // console.log('should_iterate N:', n);
        // console.log('should_iterate N:', random_numbers.indexOf(n) !== -1);
        if (random_numbers.indexOf(n) !== -1) {
            return this.randomIntFromInterval(min, max);
        }
        random_numbers.push(n);
        return n;
    }

    confirmSelected(obj) {
        if (this.props.selected_question.length <= 0) {
            alert("Please select question(s)!");
            return false;
        }

        if (
            this.props.selected_question[0].questions.length <
            this.state.total_questions
        ) {
            alert(`You must select ${this.state.total_questions} questions!`);
            return false;
        }

        const params = {
            each_question_marks: parseInt(this.state.each_question_marks),
            total_allowed: this.state.total_questions,
            ignore: this.state.ignore_questions,
            question_statement_en: obj.question_statement_en,
            question_statement_rtl: obj.question_statement_rtl,
            key: obj.key
        };
        const total_marks = this.calcTotalMarks(params);

        const formData = new FormData();
        const paper_code = `${this.props.subject.code}-${this.props.current_class.level}`;
        formData.append("publisher_id", syllabus_type_id);
        formData.append("__u", $helper.easyEncode(window.__user_id__));
        formData.append("class_id", class_id);
        formData.append("subject_id", subject_id);
        formData.append("medium", this.state.medium);
        formData.append("paper_code", paper_code);
        formData.append("paper_time", this.state.paper_time);
        formData.append("paper_date", this.state.paper_date);
        formData.append("total_marks", total_marks);
        formData.append("blank_lines", this.state.blank_lines);
        formData.append(
            "selected_question",
            JSON.stringify(this.props.selected_question)
        );
        formData.append(
            "search_results",
            JSON.stringify(this.props.search_results)
        );
        formData.append("sections_ids", this.state.sections_ids);
        formData.append("topic_ids", this.state.topic_ids);

        formData.append("params", JSON.stringify(params));

        this.props.confirmSelected(params, formData);
        this.setState({
            ignore_questions: 0,
            total_questions: 10,
            each_question_marks: 1,
            total_marks: total_marks,
            blank_lines: 0
        });
    }

    calcTotalMarks(params) {
        let total_marks = parseInt(this.state.total_marks);
        const sq_o = this.props.selected_question.find(sq => {
            return sq.key === params.key;
        });
        const obj = {
            questions: sq_o.questions,
            ignore: params.ignore,
            each_question_marks: params.each_question_marks
        };

        let response = this.calculateMarks2(obj);
        total_marks += response.marks;
        return parseInt(total_marks);
    }

    gotoPreview() {
        const url = $helper.buildPaperUrlWithParams("preview", {
            __i: $helper.easyEncode(this.props.info.id)
        });
        window.location.href = url;
    }

    render() {
        const url = $helper.buildPaperUrlWithParams("sections", {
            stid: syllabus_type_id,
            cid: class_id,
            suid: subject_id
        });
        return (
            <React.Fragment>
                {this.props.loading ? (
                    <div className="loader-wrapper">
                        <div className="loader"></div>
                    </div>
                ) : (
                    <React.Fragment />
                )}
                <div className="container pt-3">
                    <div className="row">
                        <a
                            href={url}
                            className="btn btn-primary col-lg-4 mb-3 float-left"
                        >
                            <i
                                class="fa fa-arrow-circle-o-left"
                                aria-hidden="true"
                            ></i>
                            &nbsp; Back to Sections
                        </a>
                        <h3
                            className={`col-lg-4 text-center  ${
                                this.props.subject.medium === "urdu"
                                    ? "urdu-font"
                                    : ""
                            }`}
                        >
                            {this.props.subject.name}
                            &nbsp; ({this.props.current_class.name}) &nbsp;
                        </h3>
                        {this.props.confirmed_questions.length > 0 ? (
                            <button
                                className="btn btn-danger col-lg-4 mb-3"
                                style={{ marginLeft: "auto" }}
                                onClick={this.gotoPreview}
                            >
                                Next
                            </button>
                        ) : (
                            <React.Fragment></React.Fragment>
                        )}
                    </div>
                </div>

                <div className="container paper-page">
                    <div
                        className="row paper-options"
                        style={{ minHeight: "200px" }}
                    >
                        <form
                            onSubmit={this.searchQuestions}
                            className={`col-lg-12`}
                            id="searchQuestionsFrom"
                        >
                            <div className="row">
                                <div className="form-group col-lg-3">
                                    <label
                                        className="col-sm-12 col-form-label"
                                        htmlFor="medium"
                                    >
                                        Paper type
                                    </label>
                                    <select
                                        className="custom-select"
                                        name="medium"
                                        id="medium"
                                        onChange={this.updateSelectedMedium}
                                    >
                                        {this.props.subject.medium ===
                                        "urdu" ? (
                                            <option value="urdu">
                                                Urdu Only
                                            </option>
                                        ) : this.props.subject.medium ===
                                          "eng" ? (
                                            <option value="eng">
                                                English Only
                                            </option>
                                        ) : (
                                            <>
                                                <option value="dual">
                                                    Dual Medium
                                                </option>
                                                <option value="eng">
                                                    English Only
                                                </option>
                                            </>
                                        )}
                                    </select>
                                </div>

                                <div className="form-group col-lg-3">
                                    <label
                                        className="col-sm-12 col-form-label"
                                        htmlFor="each_q_marks"
                                    >
                                        Each Question Marks
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="each_q_marks"
                                        value={this.state.each_question_marks}
                                        id="each_q_marks"
                                        onChange={this.updateQuestionMarks}
                                    />
                                </div>

                                <div className="form-group col-lg-3">
                                    <label
                                        className="col-sm-12 col-form-label"
                                        htmlFor="q_ignore"
                                    >
                                        Ignore Question(s)
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="q_ignore"
                                        value={this.state.ignore_questions}
                                        id="q_ignore"
                                        onChange={this.UpdateIgnoreQuestions}
                                    />
                                </div>

                                <div className="form-group col-lg-3">
                                    <label
                                        className="col-sm-12 col-form-label"
                                        htmlFor="required_q"
                                    >
                                        Total Questions
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="required_q"
                                        value={this.state.total_questions}
                                        id="required_q"
                                        onChange={this.updateTotalQuestions}
                                    />
                                </div>

                                <div className="form-group col-lg-4">
                                    <label
                                        className="col-sm-12 col-form-label"
                                        htmlFor="q_types"
                                    >
                                        Question Types
                                    </label>
                                    <Select
                                        value={this.state.selectedOption}
                                        onChange={this.handleChange}
                                        options={this.props.question_types}
                                        isSearchable
                                        className={`multi-select-custom custom-select ${
                                            this.checkIfRtl() ? "urdu-font" : ""
                                        }`}
                                    />
                                </div>

                                <div className="form-group col-lg-4 multi-select-with-checkboxes">
                                    <label
                                        className="col-sm-12 col-form-label"
                                        htmlFor="priority"
                                    >
                                        Priority
                                    </label>
                                    <ReactMultiSelectCheckboxes
                                        options={this.state.priority}
                                        value={this.state.selectedPriority}
                                        onChange={this.handlePriorityChange}
                                        isSearchable={false}
                                    />
                                </div>

                                <div className="form-group col-lg-4">
                                    <label
                                        className="col-sm-12 col-form-label"
                                        htmlFor="blank_lines"
                                    >
                                        Blank Lines
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="20"
                                        className="form-control"
                                        name="blank_lines"
                                        value={this.state.blank_lines}
                                        id="q_ignore"
                                        onChange={e =>
                                            this.updateStateValue(
                                                "blank_lines",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="form-group col-lg-12">
                                    <label className="col-sm-12 col-form-label">
                                        &nbsp;
                                    </label>
                                    <button
                                        className="btn btn-primary col-lg-12"
                                        type="submit"
                                        disabled={this.props.loading}
                                    >
                                        {this.props.loading
                                            ? "Loading..."
                                            : "Search Questions"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="row paper-questions pb-3">
                        {Object.keys(this.props.search_results).length > 0 ? (
                            this.renderQuestions()
                        ) : (
                            <React.Fragment></React.Fragment>
                        )}
                    </div>
                </div>

                <div className="container-fluid rendered-paper-questions mt-4 pb-3 px-0">
                    {this.renderConfirmedQuestions()}
                </div>
                {this.props.confirmed_questions.length > 0 ? (
                    <button
                        className="btn btn-danger col-lg-3 mr-3 mb-3 float-right"
                        onClick={this.gotoPreview}
                    >
                        Next
                    </button>
                ) : (
                    <React.Fragment></React.Fragment>
                )}

                <ImportModal>
                    <div className="clearfix">
                        <h3 className="float-left">Selected Questions</h3>
                        <button
                            className="btn btn-dark float-right trigger-add-question"
                            onClick={this.triggerAddQuestionBtn}
                        >
                            {" "}
                            Add these questions to paper{" "}
                        </button>
                    </div>

                    <hr />
                    {this.renderSelectedQuestions()}

                    <button
                        className="btn btn-dark float-right trigger-add-question"
                        onClick={this.triggerAddQuestionBtn}
                    >
                        {" "}
                        Add these questions to paper{" "}
                    </button>
                </ImportModal>
            </React.Fragment>
        );
    }

    checkIfRtl() {
        const rtl_subjects = this.props.subjects.filter(
            s => s.medium === "urdu"
        );
        const codes = rtl_subjects.map(s => s.code);
        return codes.indexOf(this.props.subject.code) !== -1 ? true : false;
    }

    triggerAddQuestionBtn() {
        $(".add-question-button").trigger("click");
        $("#popupModal2").modal("hide");
    }

    renderQuestions() {
        let result = "";
        let index = 1;

        return Object.keys(this.props.search_results).map((key, i) => {
            let obj = this.props.search_results[key];
            let c = components[obj.form_type];
            if (this.props.subject.code === "isl") {
                c = isl_components[obj.form_type];
            } else if (this.props.subject.medium === "urdu") {
                c = rtl_components[obj.form_type];
            } else if (this.props.subject.code === "mat") {
                c = mat_components[obj.form_type];
            } else if (this.props.subject.code === "eng") {
                c = eng_components[obj.form_type];
            }
            const SpecificComponent = c;
            const title = this.generateTitle(obj, key);
            const questions =
                obj.questions.length > 0 ? (
                    obj.questions.map((q, j) => {
                        return (
                            <SpecificComponent
                                question={q}
                                number={j + 1}
                                type={key}
                                title={obj.title}
                                each_question_marks={
                                    this.state.each_question_marks
                                }
                                total_allowed={this.state.total_questions}
                                ignore={this.state.ignore_questions}
                                form_type={obj.form_type}
                            />
                        );
                    })
                ) : (
                    <h3 className={`col-lg-12 mt-3 mb-3 pt-2 pb-2 py-3`}>
                        No Questions!
                    </h3>
                );

            const search_results = (
                <section className="search-result col-lg-12 px-0">
                    {questions}
                </section>
            );
            const buttons = (
                <div className="mb-3 col-lg-12 row mx-0">
                    <button
                        className="btn btn-dark col-lg-4 add-question-button"
                        onClick={() => this.confirmSelected(obj)}
                    >
                        Add Selected Questions
                    </button>
                    <button
                        className="btn btn-warning col-lg-4 random-select-button"
                        onClick={() => this.randomSelect(obj.questions.length)}
                    >
                        Random Select
                    </button>
                    <button
                        className="btn btn-primary col-lg-4"
                        onClick={this.clearSelection}
                    >
                        Clear Selection
                    </button>
                </div>
            );
            return [title, buttons, search_results];
        });
    }

    generateTitle(obj, key) {
        let additional_class = $helper.checkUTF8(obj.title) ? "urdu-font" : "";
        const info = this.calculateMarks(obj, key);
        return (
            <div className="title_row mb-3 col-lg-12 row">
                <div className="col-lg-4 mt-4">
                    Total Marks:{" "}
                    {`${info.question_count} x ${this.state.each_question_marks} = ${info.marks}`}
                </div>
                <div className="col-lg-4">
                    <h3
                        className={`col-lg-12 question_type_title ${additional_class} pt-2 pb-2 py-3`}
                    >
                        {obj.title}
                    </h3>
                </div>
                <div className="col-lg-4 mt-4">
                    Selected {info.question_count} Question(s) From{" "}
                    {obj.questions.length}
                </div>
            </div>
        );
    }

    calculateMarks(obj, key) {
        let marks = 0;
        let questions = [];
        let question_info = {};
        let each_question_marks = 0;
        if (this.props.selected_question.length > 0) {
            question_info = this.props.selected_question.find(
                sq => sq.key == key
            );
            questions = question_info ? question_info.questions : [];
            marks =
                questions.length > 0
                    ? parseInt(this.state.each_question_marks) *
                      questions.length
                    : 0;
        }

        return {
            question_count: questions.length,
            marks: marks
        };
    }

    renderConfirmedQuestions() {
        return this.props.confirmed_questions.map((obj, i) => {
            if (!obj.confirmed) {
                return <React.Fragment />;
            }

            let c = "";
            if (this.props.subject.code === "isl") {
                c = isl_components[obj.form_type];
            } else if (this.props.subject.medium === "urdu") {
                c = rtl_components[obj.form_type];
            } else if (this.props.subject.code === "mat") {
                c = mat_components[obj.form_type];
            } else if (this.props.subject.medium === "eng") {
                c = eng_components[obj.form_type];
            } else {
                c = components[obj.form_type];
            }
            const SpecificComponent = c;
            const title = this.generateTitle2(obj, i);
            const questions =
                obj.questions.length > 0 ? (
                    obj.questions.map((q, j) => {
                        return (
                            <SpecificComponent
                                question={q}
                                number={j + 1}
                                only_display
                            />
                        );
                    })
                ) : (
                    <React.Fragment></React.Fragment>
                );

            const displayed_questions = (
                <section className="displayed-questions col-lg-12 px-0">
                    {questions}
                </section>
            );

            return [title, displayed_questions];
        });
    }

    generateTitle2(obj, i) {
        let additional_class = $helper.checkUTF8(obj.title) ? "urdu-font" : "";
        const info = this.calculateMarks2(obj);
        const is_ignored =
            obj.ignore > 0
                ? "(Any " + (obj.questions.length - obj.ignore) + ")"
                : "";
        const is_ignored_rtl =
            obj.ignore > 0
                ? "( کوئی بھی " + (obj.questions.length - obj.ignore) + ")"
                : "";
        const d_eng_question_title =
            this.props.subject.medium === "urdu" ? false : true;
        const d_rtl_question_title =
            this.props.subject.medium === "eng" ? false : true;
        return (
            <div className="question_title_row pt-3 col-lg-12 row">
                <div
                    className={`${
                        !d_rtl_question_title ? "col-lg-8" : "col-lg-4"
                    } ${!d_eng_question_title ? "d-none" : ""}`}
                >
                    <h4>
                        Q{i + 1}) &nbsp; {obj.question_statement_en}:{" "}
                        {is_ignored}
                    </h4>
                </div>
                <div className="col-lg-4 text-center">
                    {this.editBtn(i, obj, info.marks)}
                    {this.removeBtn(
                        obj.id || this.props.info.index,
                        info.marks
                    )}
                    Total Marks:{" "}
                    {`${info.question_count} x ${info.each_question_marks} = ${info.marks}`}
                </div>

                <div
                    className={`urdu-font text-right ${
                        !d_eng_question_title ? "col-lg-8" : "col-lg-4"
                    } ${!d_rtl_question_title ? "d-none" : ""}`}
                >
                    <h4>
                        س{i + 1}) {obj.question_statement_rtl} :{is_ignored_rtl}
                    </h4>
                </div>
            </div>
        );
    }

    calculateMarks2(obj) {
        const questions = obj.questions.length - obj.ignore;
        const marks =
            questions > 0 ? parseInt(obj.each_question_marks) * questions : 0;

        return {
            question_count: questions,
            each_question_marks: obj.each_question_marks,
            marks: marks
        };
    }

    removeBtn(index, marks) {
        return (
            <i
                id={`remove-${index}`}
                className="fa fa-trash btn-danger"
                onClick={() => this.removeSavedQuestionSection(index, marks)}
            >
                &nbsp;
            </i>
        );
    }

    editBtn(index, obj, marks) {
        return (
            <i
                id={`edit-${index}`}
                className="fa fa-pencil btn-danger"
                onClick={() => this.editSavedQuestionSection(index, obj, marks)}
            >
                &nbsp;
            </i>
        );
    }

    renderSelectedQuestions() {
        if (this.props.selected_question.length <= 0) return <React.Fragment />;

        return this.props.selected_question.map(obj => {
            let c = "";
            if (this.props.subject.code === "isl") {
                c = isl_components[obj.form_type];
            } else if (this.props.subject.medium === "urdu") {
                c = rtl_components[obj.form_type];
            } else if (this.props.subject.code === "mat") {
                c = mat_components[obj.form_type];
            } else if (this.props.subject.medium === "eng") {
                c = eng_components[obj.form_type];
            } else {
                c = components[obj.form_type];
            }
            const SpecificComponent = c;
            const questions =
                obj.questions.length > 0 ? (
                    obj.questions.map((q, j) => {
                        return (
                            <SpecificComponent
                                question={q}
                                number={j + 1}
                                only_display
                            />
                        );
                    })
                ) : (
                    <React.Fragment></React.Fragment>
                );

            return (
                <section className="random-selected displayed-questions col-lg-12 px-0">
                    {questions}
                </section>
            );
        });
    }
}

const mapStateToProps = state => {
    const sections = $helper.getLocalData("selected_sections");
    return {
        subject: state.questions.subject,
        sections: sections,
        s_code: state.questions.subject.code,
        current_class: state.questions.current_class,
        question_types: state.questions.question_types,
        subjects: state.subject.subjects,
        loading: state.questions.loading,
        search_results: state.questions.search_results,
        selected_question: state.questions.selected_question,
        confirmed_questions: state.questions.confirmed_questions,
        info: state.questions.confirmed_questions_info
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSubjectById: () => dispatch(fetchSubject(dispatch)),
        fetchClassById: () => dispatch(fetchClass(dispatch)),
        fetchQuestionTypes: sections_ids =>
            dispatch(fetchQuestionTypes(dispatch, sections_ids)),
        fetchSavedQuestions: formData =>
            dispatch(fetchSavedQuestions(dispatch, formData)),
        searchQuestions: formData =>
            dispatch(searchQuestions(dispatch, formData)),
        confirmSelected: (params, formData) =>
            dispatch(confirmSelected(dispatch, params, formData)),
        removeSavedQuestionSection: formData =>
            dispatch(removeSavedQuestionSection(dispatch, formData)),
        clearSelection: () => dispatch(clearSelection(dispatch)),
        editQuestionSection: params =>
            dispatch(editQuestionSection(dispatch, params))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PQuestions);
