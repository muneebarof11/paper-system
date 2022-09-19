import React, {Component, lazy, PureComponent} from 'react';
import {connect} from "react-redux";

import BoxLayoutWithLeftPanel from "../../common/BoxLayoutWithLeftPanel";
const BoxWithImage = lazy(() => import("../../common/BoxWithImage"));

import {fetchSubjectsByClass} from "../redux/Actions";
import {class_id, syllabus_type_id} from "../../params";

class PSubjects extends PureComponent {

    constructor(props) {
        super(props);

        if (!syllabus_type_id || !class_id) {
            window.location.href = $helper.buildUrlWithParams(APP_URL + '/dashboard');
            return false;
        }

        if(!this.props.a_class) {
            window.location.href = $helper.buildUrlWithParams(APP_URL + '/dashboard');
            return false;
        }

        $helper.triggerLeftPaneCollapse();
    }

    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        return <React.Fragment>
            {this.props.loading ? <div className="loader-wrapper"><div className="loader"></div></div> : <React.Fragment /> }
            <BoxLayoutWithLeftPanel
                title={`Subjects of class (${this.props.a_class.name})`}
                back_button={true}
                back_button_text="Back"

                left_title="Classes"
                left_data={this.props.all_classes}
                publisher={syllabus_type_id}
                step={2}
            >
                {
                    !this.props.loading && this.props.subjects.length > 0
                        ? this.props.subjects.map((data) => {
                            let url = $helper.buildPaperUrlWithParams('sections', {
                                stid: syllabus_type_id,
                                cid: class_id,
                                suid: $helper.easyEncode(data.id)
                            });
                            return (
                                <div className="col-sm-12 col-md-6 col-lg-3 row section-box mb-4">
                                    <BoxWithImage
                                        url={url}
                                        box_class="classes-box"
                                        icon_class="fa-book"
                                        box_title={data.name}
                                        parent_class="col-lg-12"
                                        data={data}
                                        image={data.cover_thumbnail}
                                    />
                                </div>
                            )
                        })
                        : <h2 className="container pt-4 pb-4">{this.props.loading ? 'Loading...' : 'No subject found!' }</h2>
                }
            </BoxLayoutWithLeftPanel>
        </React.Fragment>
    }
}

const mapStateToProps = state => {
    const a_class = state.subject.all_classes.find(c => $helper.easyDecode(class_id) == c.id);
    return {
        subjects: state.subject.subjects,
        loading: state.subject.loading,
        all_subjects: state.subject.all_subjects,
        all_classes: state.subject.all_classes,
        a_class: a_class
    }
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchData: () => dispatch(fetchSubjectsByClass(dispatch)),
        fetchData: () => null,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PSubjects);
