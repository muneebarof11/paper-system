import React, { lazy, PureComponent } from "react";
import { connect } from "react-redux";

const BoxLayout = lazy(() => import("../../common/BoxLayout"));
const Box = lazy(() => import("../../common/Box"));

class PPublishers extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    {this.props.loading ? (
                        <div className="loader-wrapper">
                            <div className="loader"></div>
                        </div>
                    ) : (
                        <React.Fragment />
                    )}
                    <BoxLayout
                        title="Publishers"
                        back_button={true}
                        back_button_text="Back"
                        add_button={false}
                    >
                        {!this.props.loading &&
                        this.props.publishers.length > 0 ? (
                            this.props.publishers.map(data => {
                                let url = $helper.buildPaperUrlWithParams(
                                    "classes",
                                    {
                                        stid: $helper.easyEncode(data.id)
                                    }
                                );

                                return (
                                    <div
                                        className="col-lg-4 row section-box mb-4"
                                        key={data.id}
                                    >
                                        <Box
                                            url={url}
                                            box_class="saved-papers-box"
                                            icon_class="fa-file-text"
                                            box_title={data.name}
                                            parent_class="col-lg-12"
                                            data={data}
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            <h2 className="container-fluid pt-4 pb-4">
                                {this.props.loading
                                    ? "Loading..."
                                    : "No syllabus found!"}
                            </h2>
                        )}
                    </BoxLayout>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        publishers: state.publishers.publishers,
        message: state.publishers.message,
        loading: state.publishers.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchData: () => dispatch(fetchPublishers(dispatch))
        fetchData: () => null
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PPublishers);
