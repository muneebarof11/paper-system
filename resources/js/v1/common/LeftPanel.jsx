import React, { Component } from "react";
import {
    class_id,
    section_id,
    subject_id,
    syllabus_type_id,
    topic_id
} from "../params";
import Breadcrums from "./Breadcrums";

class LeftPanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const section = this.props.data.find(
            d => d.id == $helper.easyDecode(section_id)
        );
        const section_url = $helper.buildUrlWithParams("questions", {
            stid: syllabus_type_id,
            cid: class_id,
            suid: subject_id,
            seid: section_id
        });
        let topics = [];
        if (section) topics = section.topics;

        return (
            <div className="col-lg-3 py-0 pl-0 pr-0 listing-panel">
                <Breadcrums />

                <div className="py-2 pl-3 pr-3">
                    <h3 className="pl-2 py-2 mb-3">
                        {this.props.back_button ? (
                            <a href={this.props.back_button_url}>
                                <button
                                    type="button"
                                    className="btn btn-primary float-left"
                                >
                                    <i
                                        className="fa fa-arrow-circle-left"
                                        aria-hidden="true"
                                    ></i>
                                    &nbsp; &nbsp;
                                    {this.props.back_button_text}
                                </button>
                                &nbsp;
                            </a>
                        ) : (
                            <React.Fragment></React.Fragment>
                        )}

                        {this.props.title ? (
                            this.props.title
                        ) : (
                            <a
                                href={$helper.generateListItemUrl(
                                    0,
                                    3,
                                    syllabus_type_id,
                                    class_id,
                                    subject_id
                                )}
                                className="pl-3 py-1 pr-2"
                            >
                                <i
                                    className="fa fa-arrow-circle-left"
                                    aria-hidden="true"
                                    style={{ color: "#000" }}
                                ></i>{" "}
                                All topics
                            </a>
                        )}
                    </h3>

                    <p
                        className={`parent-item ${
                            this.props.title ? "d-none" : ""
                        } `}
                    >
                        {section ? (
                            section.name && section.name.length > 0 ? (
                                <a href={section_url}>{section.name}</a>
                            ) : (
                                <a
                                    href={section_url}
                                    className="urdu-font text-right"
                                >
                                    {section.rtl_name}
                                </a>
                            )
                        ) : this.props.data ? (
                            this.props.data.length > 0 ? (
                                this.props.data[0].name.length > 0 ? (
                                    <span>{this.props.data[0].name}</span>
                                ) : (
                                    <a href="" className="urdu-font text-right">
                                        {this.props.data[0].rtl_name}
                                    </a>
                                )
                            ) : (
                                ""
                            )
                        ) : (
                            ""
                        )}
                    </p>
                    <ol className={this.props.rtl_font}>
                        {this.props.data ? (
                            this.props.data.length > 0 ? (
                                topics.length > 0 ? (
                                    this.renderTopics(topics)
                                ) : (
                                    this.renderSections()
                                )
                            ) : (
                                this.renderSections()
                            )
                        ) : (
                            <React.Fragment></React.Fragment>
                        )}
                    </ol>
                </div>
            </div>
        );
    }

    renderSections() {
        return this.props.data.map((p, i) => {
            if (i === 0 && !this.props.title)
                return <React.Fragment></React.Fragment>;

            return (
                <li
                    className={`mb-2 ${
                        p.name && p.name.length <= 0
                            ? "urdu-font text-right"
                            : ""
                    }`}
                >
                    <a
                        href={$helper.generateListItemUrl(
                            p.id,
                            this.props.step,
                            syllabus_type_id,
                            class_id,
                            subject_id,
                            section_id
                        )}
                        className={`pl-3 py-1 pr-2 ${
                            $helper.easyDecode(topic_id) == p.id
                                ? "active-item"
                                : ""
                        } `}
                    >
                        {p.name && p.name.length > 0 ? p.name : p.rtl_name}
                    </a>
                </li>
            );
        });
    }

    renderTopics(topics) {
        return topics.map((p, i) => {
            return (
                <li
                    className={`mb-2 ${
                        p.name && p.name.length <= 0
                            ? "urdu-font text-right"
                            : ""
                    }`}
                >
                    <a
                        href={$helper.generateListItemUrl(
                            p.id,
                            this.props.step,
                            syllabus_type_id,
                            class_id,
                            subject_id,
                            section_id
                        )}
                        className={`pl-3 py-1 pr-2 ${
                            $helper.easyDecode(topic_id) == p.id
                                ? "active-item"
                                : ""
                        } `}
                    >
                        {p.name && p.name.length > 0 ? p.name : p.rtl_name}
                    </a>
                </li>
            );
        });
    }
}

export default LeftPanel;
