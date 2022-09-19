import React, {Component, lazy, PureComponent} from 'react';
import {connect} from "react-redux";

const Box = lazy(() => import("../../common/Box"));
import BoxLayoutWithLeftPanel from "../../common/BoxLayoutWithLeftPanel";
import {fetchClassesByPublisher} from "../redux/Actions";

import {syllabus_type_id} from "../../params";

class PClasses extends PureComponent {

    constructor(props) {
        super(props);

        if (!syllabus_type_id) {
            window.location.href = $helper.buildUrlWithParams(APP_URL + '/dashboard');
            return false;
        }

        if(!this.props.publisher) {
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
                        title={`Classes (${this.props.publisher.name})`}
                        back_button={true}
                        back_button_text="Go Back"
                        add_button={false}
                        left_title="Publishers"
                        left_data={this.props.publishers}
                        step={1}
                    >
                        {
                            !this.props.loading && this.props.classes.length > 0
                                ? this.props.classes.map((data) => {
                                    let url = $helper.buildPaperUrlWithParams('subjects', {
                                        stid: syllabus_type_id,
                                        cid: $helper.easyEncode(data.id)
                                    });
                                    return (
                                        <div className="col-sm-12 col-md-6 col-lg-4 row section-box mb-4">
                                            <Box
                                                url={`${url}`}
                                                box_class="classes-box"
                                                icon_class="fa-graduation-cap"
                                                box_title={data.name}
                                                parent_class="col-lg-12"
                                                data={data}
                                            />
                                        </div>
                                    )
                                })
                                :
                                <h2 className="container pt-4 pb-4">{this.props.loading ? 'Loading...' : `No class found associated with ${this.props.publisher.name}!`}</h2>
                        }
                    </BoxLayoutWithLeftPanel>

            </React.Fragment>
    }
}


const mapStateToProps = state => {
    const publisher = state.classes.publishers.find(p => $helper.easyDecode(syllabus_type_id) == p.id);
    return {
        classes: state.classes.classes,
        message: state.classes.message,
        loading: state.classes.loading,
        all_classes: state.classes.all_classes,
        publishers: state.classes.publishers,
        publisher: publisher
    }
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchData: () => dispatch(fetchClassesByPublisher(dispatch)),
        fetchData: () => null,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PClasses);
