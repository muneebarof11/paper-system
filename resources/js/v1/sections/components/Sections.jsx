import React, { lazy, PureComponent } from "react";
import { connect } from "react-redux";
import { class_id, subject_id, syllabus_type_id } from "../../params";
import {
    addSection,
    hideTopicForm,
    processImport,
    removeSection,
    removeTopic,
    showTopicForm
} from "../redux/Actions";
const BoxLayout = lazy(() => import("../../common/BoxLayout"));
const PopupModal = lazy(() => import("../../common/PopupModal"));
const ImportModal = lazy(() => import("../../common/ImportModal"));
const BoxSmall = lazy(() => import("../../common/BoxSmall"));
const BoxButton = lazy(() => import("../../common/BoxButton"));
const SectionForm = lazy(() => import("./SectionForm"));

class Sections extends PureComponent {
    constructor(props) {
        super(props);

        if (!syllabus_type_id || !class_id) {
            window.location.href = $helper.buildUrlWithParams(
                APP_URL + "/dashboard"
            );
            return false;
        }

        if (!this.props.subject) {
            window.location.href = $helper.buildUrlWithParams(
                APP_URL + "/dashboard"
            );
            return false;
        }

        $helper.triggerLeftPaneCollapse();

        this.state = {
            file: {}
        };

        this.buttonClick = this.buttonClick.bind(this);
        this.hideTopicForm = this.hideTopicForm.bind(this);
        this.updateFile = this.updateFile.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.removeTopicItem = this.removeTopicItem.bind(this);
        this.processImport = this.processImport.bind(this);
    }

    componentDidMount() {
        this.props.fetchData();
    }

    buttonClick(info, index) {
        info = {
            seid: $helper.easyEncode(info.id),
            parent_id: $helper.easyEncode(info.parent_id),
            subject_code: info.subject_code,
            stid: syllabus_type_id,
            cid: class_id,
            suid: subject_id
        };
        let form = {
            info: JSON.stringify(info),
            is_loading: false,
            index: index
        };
        this.props.showTopicForm(form, index);
    }

    hideTopicForm(index) {
        this.props.hideTopicForm(index);
    }

    updateFile(e) {
        this.setState({ file: e.target.files[0] });
    }

    formSubmit(e) {
        e.preventDefault();

        const serialize = require("form-serialize");
        let form = document.querySelector(`#new_section_form`);
        let data = serialize(form, { hash: true });

        if (!data.topic_name && !data.topic_rlt_name) {
            alert("Either English or Urdu title is required");
            this.setState({ is_loading: false });
            return false;
        }

        const formData = new FormData();
        formData.append("parent_id", $helper.easyEncode("0"));
        formData.append(
            "subject_code",
            $helper.getSubjectCode(class_id, subject_id, syllabus_type_id)
        );
        formData.append(
            "parent_topic_name",
            data.parent_topic_name ? data.parent_topic_name : ""
        );
        formData.append(
            "parent_topic_rtl_name",
            data.parent_topic_rtl_name ? data.parent_topic_rtl_name : ""
        );
        formData.append("eng_name", data.topic_name ? data.topic_name : "");
        formData.append(
            "rlt_name",
            data.topic_rlt_name ? data.topic_rlt_name : ""
        );
        formData.append("syllabus_type_id", syllabus_type_id);
        formData.append("class_id", class_id);
        formData.append("subject_id", subject_id);

        this.props.addSection(formData);
    }

    processImport(e) {
        e.preventDefault();

        if (!this.state.file.name) {
            alert("Please choose CSV/Excel file!");
            return false;
        }

        const formData = new FormData();
        if (this.state.file.name)
            formData.append("file", this.state.file, this.state.file.name);

        formData.append("class_id", class_id);
        formData.append("subject_id", subject_id);
        formData.append("syllabus_type_id", syllabus_type_id);

        this.props.processImport(formData);
    }

    removeItem(id) {
        const c = window.confirm("Are you sure?");
        if (!c) return false;

        this.props.removeSection(id);
    }

    removeTopicItem(index, section_id, topic_id) {
        const c = window.confirm("Are you sure?");
        if (!c) return false;

        let formData = new FormData();
        formData.append("id", $helper.easyEncode(topic_id));
        formData.append("section_id", $helper.easyEncode(section_id));
        formData.append("topic_id", $helper.easyEncode(topic_id));

        this.props.removeTopic(index, formData);
    }

    render() {
        const medium = this.props.subject.medium;
        let rtl_font = "";
        if (medium != "dual" || medium != "eng") {
            rtl_font = "urdu-font";
        }
        return (
            <React.Fragment>
                <div className="container">
                    {this.props.loading ? (
                        <div className="loader-wrapper">
                            <div className="loader"></div>
                        </div>
                    ) : (
                        <React.Fragment />
                    )}
                    <BoxLayout
                        title={`Topics (${this.props.subject.name}) - ${this.props.a_class.name}`}
                        back_button={true}
                        back_button_text="Back"
                        add_button={true}
                        add_button_url=""
                        add_button_text="Add new topic"
                        modal_btn={false}
                        import_btn={true}
                        import_text={`Import Topics`}
                        rtl_font={rtl_font}
                    >
                        {!this.props.loading &&
                        this.props.sections.length > 0 ? (
                            this.props.sections.map((data, i) => {
                                i += 1;
                                let url = $helper.buildUrlWithParams(
                                    "questions",
                                    {
                                        stid: syllabus_type_id,
                                        cid: class_id,
                                        suid: subject_id,
                                        seid: $helper.easyEncode(data.id)
                                    }
                                );

                                let name = "";
                                let rtl_none = data.rtl_name ? false : true;
                                let rtl_name = data.rtl_name;

                                if (medium == "dual" || medium == "eng") {
                                    if (data.name) name = data.name;
                                    else if (data.rtl_name)
                                        name = data.rtl_name;
                                } else {
                                    if (data.rtl_name) name = data.rtl_name;
                                }

                                const is_topics = data.topics.length;
                                const allow_delete =
                                    is_topics <= 0 ? true : false;
                                let parent_class = "  col-sm-11 ";

                                return (
                                    <div
                                        className={`col-md-12 ${
                                            this.props.subject.medium == "dual"
                                                ? "col-lg-6"
                                                : "col-lg-4"
                                        }`}
                                        id={`col-${i}`}
                                    >
                                        <div className="row">
                                            <BoxSmall
                                                url={url}
                                                box_class="classes-box"
                                                icon_class="fa-book"
                                                box_title={name}
                                                box_rtl_title={rtl_name}
                                                rtl_none={rtl_none}
                                                parent_class={parent_class}
                                                topics={data.topics}
                                                id={data.id}
                                                medium={medium}
                                            />
                                            <button
                                                onClick={() => {
                                                    this.removeItem(data.id);
                                                }}
                                                className="btn btn-danger col-lg-1"
                                                style={{ height: "40px" }}
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </div>
                                        {is_topics > 0 ? (
                                            data.topics.map((topic, j) => {
                                                let url = $helper.buildUrlWithParams(
                                                    "questions",
                                                    {
                                                        stid: syllabus_type_id,
                                                        cid: class_id,
                                                        suid: subject_id,
                                                        seid: $helper.easyEncode(
                                                            data.id
                                                        ),
                                                        tid: $helper.easyEncode(
                                                            topic.id
                                                        )
                                                    }
                                                );
                                                let topic_name = "";
                                                let topic_rtl_none = topic.rtl_name
                                                    ? false
                                                    : true;
                                                if (
                                                    medium == "dual" ||
                                                    medium == "eng"
                                                ) {
                                                    if (topic.name)
                                                        topic_name = topic.name;
                                                    else if (topic.rtl_name)
                                                        topic_name =
                                                            topic.rtl_name;
                                                } else {
                                                    if (topic.rtl_name)
                                                        topic_name =
                                                            topic.rtl_name;
                                                }
                                                return (
                                                    <div className="row">
                                                        <BoxSmall
                                                            url={url}
                                                            box_class="saved-papers-box"
                                                            icon_class="fa-book"
                                                            box_title={
                                                                topic_name
                                                            }
                                                            box_rtl_title={
                                                                topic.rtl_name
                                                            }
                                                            rtl_none={
                                                                topic_rtl_none
                                                            }
                                                            parent_class={
                                                                "col-lg-11"
                                                            }
                                                            topics={data.topics}
                                                            id={data.id}
                                                            medium={medium}
                                                        />
                                                        <button
                                                            onClick={() => {
                                                                this.removeTopicItem(
                                                                    i,
                                                                    data.id,
                                                                    topic.id
                                                                );
                                                            }}
                                                            className="btn btn-dark col-lg-1"
                                                            style={{
                                                                height: "40px"
                                                            }}
                                                        >
                                                            <i className="fa fa-trash"></i>
                                                        </button>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <React.Fragment></React.Fragment>
                                        )}
                                        {data.form ? (
                                            <SectionForm
                                                form={data.form.info}
                                                isLoading={data.form.is_loading}
                                                index={i - 1}
                                                hideForm={this.hideTopicForm}
                                                updateParentData={
                                                    this.updateParentData
                                                }
                                            />
                                        ) : (
                                            <React.Fragment></React.Fragment>
                                        )}
                                        {!data.form ? (
                                            <BoxButton
                                                url="javascript"
                                                box_class="transparent-box"
                                                icon_class="fa-plus-circle"
                                                box_title="Add New"
                                                parent_class=""
                                                onClick={this.buttonClick}
                                                index={i - 1}
                                                data={data}
                                            />
                                        ) : (
                                            <React.Fragment></React.Fragment>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <h2 className="container pt-4 pb-4">
                                {this.props.is_loading
                                    ? "Loading..."
                                    : "No topics found!"}
                            </h2>
                        )}
                    </BoxLayout>

                    <PopupModal>
                        <form onSubmit={this.formSubmit} id="new_section_form">
                            <h3>Add New Topic </h3>
                            <hr />

                            <div className="form-group row d-none">
                                <label
                                    className="col-sm-4 col-form-label"
                                    htmlFor="parent_topic_name"
                                >
                                    Topic Name (english)
                                </label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="parent_topic_name"
                                        placeholder="E.g: Chapter 1"
                                        name="parent_topic_name"
                                        value="Unit"
                                    />
                                </div>
                            </div>

                            <div className="form-group row d-none">
                                <label
                                    className="col-sm-4 col-form-label"
                                    htmlFor="parent_topic_rtl_name"
                                >
                                    Topic Name (Urdu)
                                </label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="parent_topic_rtl_name"
                                        placeholder="E.g: باب 1"
                                        name="parent_topic_rtl_name"
                                        value="باب"
                                    />
                                </div>
                            </div>

                            <hr className="d-none" />

                            <div className="form-group row">
                                <label
                                    className="col-sm-6 col-form-label"
                                    htmlFor="topic_name"
                                >
                                    Chapter / Exercise name (english)
                                </label>
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="topic_name"
                                        placeholder=""
                                        name="topic_name"
                                    />
                                </div>
                            </div>

                            <div className="form-group row urdu-font">
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="topic_rlt_name"
                                        placeholder=""
                                        name="topic_rlt_name"
                                    />
                                </div>
                                <label
                                    className="col-sm-6 col-form-label"
                                    htmlFor="topic_rlt_name"
                                >
                                    باب کا نام (urdu)
                                </label>
                            </div>

                            <div className="form-group">
                                <button
                                    className="btn btn-primary col-lg-12"
                                    type="submit"
                                    disabled={this.props.loading}
                                >
                                    {this.props.loading ? "Saving..." : "Add"}
                                </button>
                            </div>
                        </form>
                    </PopupModal>

                    <ImportModal>
                        <form
                            onSubmit={this.processImport}
                            id="import_section_form"
                        >
                            <h3>Import {this.props.subject.name} Topics </h3>
                            <hr />

                            <div className="form-group mb-3">
                                <label className="col-sm-12 col-form-label">
                                    Choose File
                                    <a
                                        target={`_blank`}
                                        href={`${APP_URL}/samples/Syllabus-physics-9th.xlsx`}
                                        className={`float-right`}
                                    >
                                        Download sample
                                    </a>
                                </label>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        id="customFile"
                                        name="file"
                                        onChange={this.updateFile}
                                    />
                                    <label
                                        className="custom-file-label"
                                        htmlFor="customFile"
                                    >
                                        Select CSV/Excel file
                                    </label>
                                </div>
                            </div>

                            <div className="form-group">
                                <button
                                    className="btn btn-primary col-lg-12"
                                    type="submit"
                                    disabled={this.props.loading}
                                >
                                    {this.props.loading
                                        ? "Saving..."
                                        : "Start Importing"}
                                </button>
                            </div>
                        </form>
                    </ImportModal>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.section.loading,
        message: state.section.message,
        subject: state.section.subject,
        sections: state.section.sections,
        topics_to_import: state.section.topics_to_import,
        headers: state.section.headers,
        a_class: state.section.a_class
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchData: () => dispatch(fetchSubjectTopics(dispatch)),
        fetchData: () => null,
        addSection: formData => dispatch(addSection(dispatch, formData)),
        removeSection: id => dispatch(removeSection(dispatch, id)),
        showTopicForm: (form, index) =>
            dispatch(showTopicForm(dispatch, form, index)),
        hideTopicForm: index => dispatch(hideTopicForm(dispatch, index)),
        removeTopic: (index, formData) =>
            dispatch(removeTopic(dispatch, index, formData)),
        processImport: formData => dispatch(processImport(dispatch, formData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sections);
