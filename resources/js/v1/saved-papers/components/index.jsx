import React, { lazy, PureComponent } from "react";
import { connect } from "react-redux";
import { fetchPublishers } from "../../publishers/redux/Actions";
import {
    fetchClassesByPublisherId,
    fetchSubjectsByClassId,
    removeSavedItem,
    searchPapers
} from "../redux/Actions";
const PopupModal = lazy(() => import("../../common/PopupModal"));

class SavedPapers extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            publisher_id: 0,
            class_id: 0,
            subject_id: 0,
            chapter_id: "",
            topics_list: []
        };

        this.fetchClasses = this.fetchClasses.bind(this);
        this.fetchSubjects = this.fetchSubjects.bind(this);
        this.updateSubjectId = this.updateSubjectId.bind(this);
        this.updateChapterId = this.updateChapterId.bind(this);
        this.searchPapers = this.searchPapers.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.viewTopics = this.viewTopics.bind(this);
    }

    componentDidMount() {
        this.props.fetchPublishers();
        this.searchPapers();
    }

    fetchClasses(e) {
        const publisher_id = $helper.easyEncode(e.target.value);
        this.props.fetchClassByPublisher(publisher_id);
        this.setState({ publisher_id });
    }

    fetchSubjects(e) {
        const publisher_id = this.state.publisher_id;
        const class_id = $helper.easyEncode(e.target.value);
        this.props.fetchSubjectsByClass(publisher_id, class_id);
        this.setState({ class_id });
    }

    updateSubjectId(e) {
        const subject_id = $helper.easyEncode(e.target.value);
        this.setState({ subject_id });
    }

    updateChapterId(e) {
        const chapter_id = e.target.value;
        this.setState({ chapter_id });
    }

    searchPapers() {
        const formData = new FormData();
        formData.append("__u", $helper.easyEncode(window.__user_id__));
        formData.append("publisher_id", this.state.publisher_id);
        formData.append("class_id", this.state.class_id);
        formData.append("subject_id", this.state.subject_id);
        formData.append("title", this.state.chapter_id);
        this.props.searchPapers(formData);
    }

    removeItem(id) {
        const formData = new FormData();
        formData.append("publisher_id", this.state.publisher_id);
        formData.append("class_id", this.state.class_id);
        formData.append("subject_id", this.state.subject_id);
        formData.append("chapter_id", this.state.chapter_id);
        formData.append("id", $helper.easyEncode(id));

        this.props.removeItem(formData);
    }

    viewTopics(sections) {
        this.setState({ topics_list: sections });
        $("#popupModal").modal("show");
    }

    render() {
        return (
            <React.Fragment>
                <section className="container-fluid">
                    <h3 className="pt-3">Saved Papers</h3>
                    <hr />

                    <div className="row mb-4">
                        <div className="form-group col-lg-3">
                            <label
                                className="col-sm-12 col-form-label"
                                htmlFor="medium"
                            >
                                Publishers:
                            </label>
                            <select
                                className="custom-select"
                                name="medium"
                                id="publishers"
                                onChange={this.fetchClasses}
                            >
                                <option value="">-Select-</option>
                                {this.props.publishers &&
                                this.props.publishers.length > 0 ? (
                                    this.props.publishers.map(p => {
                                        return (
                                            <option value={p.id}>
                                                {p.name}
                                            </option>
                                        );
                                    })
                                ) : (
                                    <React.Fragment></React.Fragment>
                                )}
                            </select>
                        </div>

                        <div className="form-group col-lg-3">
                            <label
                                className="col-sm-12 col-form-label"
                                htmlFor="medium"
                            >
                                Classes:
                            </label>
                            <select
                                className="custom-select"
                                name="medium"
                                id="classes"
                                onChange={this.fetchSubjects}
                            >
                                <option value="">-Select-</option>
                                {this.props.classes &&
                                this.props.classes.length > 0 ? (
                                    this.props.classes.map(p => {
                                        return (
                                            <option value={p.id}>
                                                {p.name}
                                            </option>
                                        );
                                    })
                                ) : (
                                    <React.Fragment></React.Fragment>
                                )}
                            </select>
                        </div>

                        <div className="form-group col-lg-3">
                            <label
                                className="col-sm-12 col-form-label"
                                htmlFor="medium"
                            >
                                Subjects:
                            </label>
                            <select
                                className="custom-select"
                                name="medium"
                                id="subjects"
                                onChange={this.updateSubjectId}
                            >
                                <option value="">-Select-</option>
                                {this.props.subjects &&
                                this.props.subjects.length > 0 ? (
                                    this.props.subjects.map(p => {
                                        return (
                                            <option value={p.id}>
                                                {p.name}
                                            </option>
                                        );
                                    })
                                ) : (
                                    <React.Fragment></React.Fragment>
                                )}
                            </select>
                        </div>

                        <div className="form-group col-lg-3">
                            <label
                                className="col-sm-12 col-form-label"
                                htmlFor="title"
                            >
                                Title:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                onChange={this.updateChapterId}
                            />
                        </div>

                        <div className="form-group col-lg-12">
                            <label className="col-sm-12 col-form-label">
                                &nbsp;
                            </label>
                            <button
                                className="btn btn-primary col-lg-12"
                                type="button"
                                disabled={this.props.loading}
                                onClick={this.searchPapers}
                            >
                                {this.props.loading ? "Searching..." : "Search"}
                            </button>
                        </div>
                    </div>

                    <h3 className={`mt-4`}>Papers List</h3>
                    <hr />

                    <div className="row papers-list px-3">
                        {this.props.papers_list.length > 0 ? (
                            this.props.papers_list.map((p, i) => {
                                const urlPreview = $helper.buildPaperUrlWithParams(
                                    "preview",
                                    { __i: $helper.easyEncode(p.id), __p: true }
                                );
                                const url = $helper.buildPaperUrlWithParams(
                                    "preview",
                                    { __i: $helper.easyEncode(p.id) }
                                );
                                return (
                                    <div className="col-lg-4">
                                        <div className="card pt-3 ml-2 mr-2 mb-4">
                                            <div className="card-body px-0 pb-0 py-0">
                                                <h4 className="card-title border-bottom pb-0 mb-2 border-bottom-0">
                                                    {p.title}
                                                </h4>
                                                <a
                                                    href={`${APP_URL}${urlPreview}`}
                                                    target={`_blank`}
                                                >
                                                    <h6 className="card-title border-bottom pb-0 mb-2">
                                                        {p.name} -{" "}
                                                        {p.paper_date}
                                                    </h6>
                                                </a>
                                                <div className="col-lg-12 px-0 saved_paper_actions">
                                                    <a
                                                        href={`${APP_URL}${urlPreview}`}
                                                        target={`_blank`}
                                                        className="col-lg-3 px-0"
                                                    >
                                                        <button
                                                            className="hover-scale btn btn-dark border-radius-0"
                                                            title="Print"
                                                            style={{
                                                                width: "25%"
                                                            }}
                                                        >
                                                            <i
                                                                className="fa fa-print"
                                                                aria-hidden="true"
                                                            ></i>
                                                        </button>
                                                    </a>
                                                    <a
                                                        onClick={() =>
                                                            this.viewTopics(
                                                                p.sections
                                                            )
                                                        }
                                                        className="col-lg-3 px-0"
                                                    >
                                                        <button
                                                            className="hover-scale btn btn-dark border-radius-0"
                                                            title="Topics"
                                                            style={{
                                                                width: "25%"
                                                            }}
                                                        >
                                                            <i
                                                                className="fa fa-th-list"
                                                                aria-hidden="true"
                                                            ></i>
                                                        </button>
                                                    </a>
                                                    <a
                                                        href={`${APP_URL}${url}`}
                                                        target={`_blank`}
                                                        className="col-lg-3 px-0"
                                                    >
                                                        <button
                                                            className="hover-scale btn btn-dark border-radius-0"
                                                            title="Edit"
                                                            style={{
                                                                width: "25%"
                                                            }}
                                                        >
                                                            <i
                                                                className="fa fa-pencil"
                                                                aria-hidden="true"
                                                            ></i>
                                                        </button>
                                                    </a>
                                                    <button
                                                        className="hover-scale btn btn-dark col-lg-3 px-0 border-radius-0"
                                                        title="Delete"
                                                        onClick={() => {
                                                            if (
                                                                !window.confirm(
                                                                    "Are you sure?"
                                                                )
                                                            )
                                                                return false;
                                                            this.removeItem(
                                                                p.id
                                                            );
                                                        }}
                                                    >
                                                        <i
                                                            className="fa fa-trash"
                                                            aria-hidden="true"
                                                        ></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <h4>Hit search from above to get result</h4>
                        )}
                    </div>

                    <PopupModal>
                        <h3>Topics</h3>
                        <hr />
                        {this.state.topics_list.length > 0 ? (
                            this.state.topics_list.map(s => (
                                <li className="my-0 text-left">
                                    {s.name.length <= 0 ? s.rtl_name : s.name}
                                </li>
                            ))
                        ) : (
                            <React.Fragment></React.Fragment>
                        )}
                    </PopupModal>
                </section>
            </React.Fragment>
        );
    }

    renderChapters() {
        let c_list = [];
        for (let i = 1; i <= 20; i++) {
            c_list.push(<option value={`chapter-{${i}`}>Chapter {i}</option>);
        }
        return c_list;
    }
}

const mapStateToProps = state => {
    return {
        publishers: state.publishers.publishers,
        classes: state.saved.classes,
        subjects: state.saved.subjects,
        papers_list: state.saved.papers_list,
        message: state.saved.message,
        loading: state.saved.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPublishers: () => dispatch(fetchPublishers(dispatch)),
        fetchClassByPublisher: publisher_id =>
            dispatch(fetchClassesByPublisherId(dispatch, publisher_id)),
        fetchSubjectsByClass: (publisher_id, class_id) =>
            dispatch(fetchSubjectsByClassId(dispatch, publisher_id, class_id)),
        searchPapers: formData =>
            dispatch(searchPapers(dispatch, formData, true)),
        removeItem: formData => dispatch(removeSavedItem(dispatch, formData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedPapers);
