import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { class_id, syllabus_type_id } from "../../params";
import { updateSelectedSections } from "../redux/Actions";
const BoxLayout = lazy(() => import("../../common/BoxLayout"));

class PSections extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sections: [],
            allSelected: false
        };

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

        try {
            this.updateSectionCheckBox = this.updateSectionCheckBox.bind(this);
            this.updateTopicCheckBox = this.updateTopicCheckBox.bind(this);
            this.generatePaperScreen = this.generatePaperScreen.bind(this);
            this.toggleSelection = this.toggleSelection.bind(this);

            $helper.triggerLeftPaneCollapse();
        } catch (e) {
            alert(
                "Something went wrong, please refresh page by pressing Ctrl + R"
            );
            console.log(e);
        }
    }

    componentDidMount() {
        const sections = this.props.sections;
        this.setState({ sections: sections });
        this.props.fetchData();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.sections.length != nextState.sections.length) {
            this.setState({
                sections: nextProps.sections
            });
        }
        return true;
    }

    updateSectionCheckBox(index, checked) {
        let sections = this.state.sections;
        sections[index].checkbox = !checked;
        if (sections[index].topics.length > 0) {
            sections[index].topics = sections[index].topics.map(t => {
                return {
                    ...t,
                    checkbox: !checked
                };
            });
        }
        this.setState({ sections });
    }

    generatePaperScreen() {
        if (!this.verifySelection()) {
            alert("You have not selected any topic!");
            return false;
        }

        let selected_sections = this.state.sections;
        this.props.updateSelectedSections(selected_sections);
    }

    updateTopicCheckBox(s_index, index, checked) {
        let sections = this.state.sections;
        sections[s_index].topics[index].checkbox = !checked;
        this.setState({ sections });
    }

    verifySelection() {
        let anySelected = false;
        this.state.sections.forEach(section => {
            if (section.checkbox === true) anySelected = true;

            if (section.topics.length > 0) {
                section.topics.forEach(topic => {
                    if (topic.checkbox === true) anySelected = true;
                });
            }
        });
        return anySelected;
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
                        rtl_font={rtl_font}
                    >
                        <div className="cpl-md-12 col-lg-12 mb-3 py-4 clearfix">
                            <button
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    width: "150px"
                                }}
                                className="btn btn-primary float-left generate-paper-btn"
                                onClick={this.toggleSelection}
                            >
                                {!this.state.allSelected
                                    ? "Select"
                                    : "Un-Select"}{" "}
                                All
                            </button>
                            <button
                                className="btn btn-primary float-right generate-paper-btn"
                                onClick={this.generatePaperScreen}
                            >
                                Next
                            </button>
                        </div>
                        {!this.props.loading &&
                        this.state.sections &&
                        this.state.sections.length > 0 ? (
                            this.state.sections.map((data, i) => {
                                i += 1;
                                const p_title = data.parent_title;
                                let name = data.name;

                                const is_topics = data.topics.length;
                                let parent_class = " col-11 col-sm-11 ";

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
                                            <ul className="section_subsections mx-2 px-2 py-3">
                                                <li key={data.id}>
                                                    <div className="form-check">
                                                        <input
                                                            className="parent-input section-checkbox form-check-input"
                                                            type="checkbox"
                                                            value={data.id}
                                                            id={`sectionCheckBox${data.id}`}
                                                            checked={
                                                                data.checkbox
                                                            }
                                                            onClick={() => {
                                                                this.updateSectionCheckBox(
                                                                    i - 1,
                                                                    data.checkbox
                                                                );
                                                            }}
                                                        />
                                                        <label
                                                            className={`form-check-label ${parent_class}`}
                                                            htmlFor={`sectionCheckBox${data.id}`}
                                                            onClick={() => {
                                                                this.updateSectionCheckBox(
                                                                    i - 1,
                                                                    data.checkbox
                                                                );
                                                            }}
                                                        >
                                                            <div
                                                                className="pl-3 font-weight-bolder"
                                                                onClick={() => {
                                                                    this.updateSectionCheckBox(
                                                                        i - 1,
                                                                        data.checkbox
                                                                    );
                                                                }}
                                                            >
                                                                {medium ==
                                                                "dual" ? (
                                                                    <div
                                                                        className="col-lg-12 row"
                                                                        dangerouslySetInnerHTML={this.createMarkup(
                                                                            `<div class="col-lg-6">${
                                                                                data.name
                                                                            }</div> <div class="col-lg-6 urdu-font text-right">${
                                                                                data.rtl_name ==
                                                                                null
                                                                                    ? ""
                                                                                    : data.rtl_name
                                                                            }</div>`
                                                                        )}
                                                                    />
                                                                ) : medium ==
                                                                  "urdu" ? (
                                                                    <div
                                                                        dangerouslySetInnerHTML={this.createMarkup(
                                                                            `<div class="urdu-font text-right">${
                                                                                data.rtl_name ==
                                                                                null
                                                                                    ? data.name
                                                                                    : data.rtl_name
                                                                            }</div>`
                                                                        )}
                                                                    />
                                                                ) : (
                                                                    data.name
                                                                )}
                                                            </div>
                                                        </label>
                                                    </div>
                                                </li>

                                                <ul>
                                                    {is_topics > 0 ? (
                                                        data.topics.map(
                                                            (topic, j) => {
                                                                return (
                                                                    <li
                                                                        key={
                                                                            topic.id
                                                                        }
                                                                    >
                                                                        <div className="form-check">
                                                                            <input
                                                                                className="section-checkbox form-check-input"
                                                                                type="checkbox"
                                                                                value={
                                                                                    topic.id
                                                                                }
                                                                                id={`sectionCheckBox${topic.id}`}
                                                                                checked={
                                                                                    topic.checkbox
                                                                                }
                                                                                onClick={() => {
                                                                                    this.updateTopicCheckBox(
                                                                                        i -
                                                                                            1,
                                                                                        j,
                                                                                        topic.checkbox
                                                                                    );
                                                                                }}
                                                                            />
                                                                            <label
                                                                                className={`form-check-label ${parent_class}`}
                                                                                htmlFor={`sectionCheckBox${topic.id}`}
                                                                                onClick={() => {
                                                                                    this.updateTopicCheckBox(
                                                                                        i -
                                                                                            1,
                                                                                        j,
                                                                                        topic.checkbox
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <div
                                                                                    className="pl-3"
                                                                                    onClick={() => {
                                                                                        this.updateTopicCheckBox(
                                                                                            i -
                                                                                                1,
                                                                                            j,
                                                                                            topic.checkbox
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    {medium ==
                                                                                    "dual" ? (
                                                                                        <div
                                                                                            className="col-lg-12 row"
                                                                                            dangerouslySetInnerHTML={this.createMarkup(
                                                                                                `<div class="col-lg-6">${
                                                                                                    topic.name
                                                                                                }</div> <div class="col-lg-6 urdu-font text-right">${
                                                                                                    topic.rtl_name ==
                                                                                                    null
                                                                                                        ? ""
                                                                                                        : topic.rtl_name
                                                                                                }</div>`
                                                                                            )}
                                                                                        />
                                                                                    ) : medium ==
                                                                                      "urdu" ? (
                                                                                        <div
                                                                                            dangerouslySetInnerHTML={this.createMarkup(
                                                                                                `<div class="urdu-font text-right">${
                                                                                                    topic.rtl_name ==
                                                                                                    null
                                                                                                        ? topic.rtl_name
                                                                                                        : topic.rtl_name
                                                                                                }</div>`
                                                                                            )}
                                                                                        />
                                                                                    ) : (
                                                                                        topic.name
                                                                                    )}
                                                                                </div>
                                                                            </label>
                                                                        </div>
                                                                    </li>
                                                                );
                                                            }
                                                        )
                                                    ) : (
                                                        <React.Fragment></React.Fragment>
                                                    )}
                                                </ul>
                                            </ul>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <h2 className="container pt-4 pb-4">
                                {this.props.loading
                                    ? "Loading..."
                                    : "No topics found!"}
                            </h2>
                        )}
                    </BoxLayout>
                </div>
            </React.Fragment>
        );
    }

    createMarkup(text) {
        return { __html: text };
    }

    toggleSelection() {
        let sections = this.state.sections;
        const allSelected = !this.state.allSelected;

        sections.forEach(section => {
            section.checkbox = allSelected;
            if (section.topics.length > 0) {
                section.topics = section.topics.map(t => {
                    return {
                        ...t,
                        checkbox: allSelected
                    };
                });
            }
        });

        console.log(sections, "sections");

        this.setState({ sections, allSelected });
    }
}

const mapStateToProps = state => {
    let sections = state.section.sections;
    sections = sections.map((s, i) => {
        let topics = s.topics;
        if (topics.length > 0) {
            topics = s.topics = s.topics.map(t => {
                return {
                    ...t,
                    checkbox: false
                };
            });
        }
        return {
            ...s,
            topics,
            checkbox: false
        };
    });
    return {
        loading: state.section.loading,
        message: state.section.message,
        subject: state.section.subject,
        sections: sections,
        selected_sections: [],
        a_class: state.section.a_class
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchData: () => dispatch(fetchSubjectTopics(dispatch)),
        fetchData: () => null,
        updateSelectedSections: selectedSections =>
            dispatch(updateSelectedSections(dispatch, selectedSections))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PSections);
