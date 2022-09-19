import React, {Component, lazy, PureComponent} from 'react';
import BoxLayoutWithLeftPanel from "../../common/BoxLayoutWithLeftPanel";
const Box = lazy(() => import("../../common/Box"));
const PopupModal = lazy(() => import("../../common/PopupModal"));
import {connect} from "react-redux";
import {fetchClassesByPublisher, fetchAllClasses, addClass, removeClass} from "../redux/Actions";
import {syllabus_type_id} from "../../params";
const levels = Array.from({length: 16}, (_, i) => i + 1);

class Classes extends PureComponent {

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


        this.formSubmit = this.formSubmit.bind(this);
        this.removeItem = this.removeItem.bind(this);

        $helper.triggerLeftPaneCollapse();
    }

    componentDidMount() {
        this.props.fetchData();
        this.props.fetchClasses();
    }

    formSubmit(e) {
        e.preventDefault();

        const serialize = require('form-serialize');
        const form = document.querySelector(`#form`);
        const data = serialize(form, { hash: true });

        if(!data.name && !data.pre_name) {
            alert('Enter name or choose from the list');
            return false;
        }

        // this will only be true if its selected from dropdown
        if(data.pre_name) {
            let info = data.pre_name.split('_');
            data.name = info[0]; // name of class
            data.level = info[1]; // level of class
        }

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('level', data.level);
        formData.append('is_active', data.is_ctive);
        formData.append('syllabus_type_id', syllabus_type_id);

        this.props.addItem(formData);
    }

    removeItem(id) {

        const c = window.confirm('Are you sure?');
        if (!c) return false;

        this.props.removeItem(id, syllabus_type_id);
    }

    render() {
        return <React.Fragment>
                    {this.props.loading ? <div className="loader-wrapper"><div className="loader"></div></div> : <React.Fragment /> }
                    <BoxLayoutWithLeftPanel
                        title={`Classes (${this.props.publisher.name})`}
                        back_button={true}
                        back_button_text="Go Back"
                        add_button={true}
                        add_button_url=""
                        add_button_text="Add new class"
                        left_title="Publishers"
                        left_data={this.props.publishers}
                        step={1}
                    >
                        {
                            !this.props.loading && this.props.classes.length > 0
                                ? this.props.classes.map((data) => {
                                    let url = $helper.buildUrlWithParams('subjects', {
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
                                            <div className="col-lg-12 action-btn">
                                                <button typeof="button" className="btn btn-danger col-lg-12"
                                                        onClick={() => {
                                                            this.removeItem(data.id)
                                                        }}>Remove
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <h2 className="container pt-4 pb-4">{this.props.loading ? 'Loading...' : `No class found associated with ${this.props.publisher.name}!`}</h2>
                        }
                    </BoxLayoutWithLeftPanel>

                    <PopupModal>
                        <form onSubmit={this.formSubmit} id="form">

                            <h3>Add New Class</h3>
                            <hr/>

                            <div className="form-group">
                                <label className="col-sm-12 col-form-label" htmlFor="className">Add new: Name</label>
                                <input type="text" className="form-control" id="className"
                                       placeholder="E.g: Six or Seven"
                                       name="name"
                                       autoComplete="off"
                                />
                            </div>

                            <div className="form-group">
                                <label className="col-sm-12 col-form-label" htmlFor="Name_pre">or Select Class</label>
                                <select className="custom-select" name="pre_name" id="Name_pre">
                                    <option value="">-Select existing class-</option>
                                    {this.props.all_classes.length > 0
                                        ? this.props.all_classes.map(c => {return <option value={`${c.name}_${c.level}`}>{c.name}</option>})
                                        : <React.Fragment></React.Fragment>}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="col-sm-12 col-form-label" htmlFor="classLevel">Class level</label>
                                <select className="custom-select form-control" name="level" id="classLevel">
                                    <option value="0">- E.g: Inter-I level is 11 -</option>
                                    {
                                        levels.map(i => {
                                            return <option value={i}>Level {i}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className="form-group d-none">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="is_active"
                                           id="active" value="1" checked/>
                                    <label className="form-check-label" htmlFor="active">Active</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="is_active"
                                           id="in_active" value="0"/>
                                    <label className="form-check-label" htmlFor="in_active">In-Active</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary col-lg-12" type="submit"
                                        disabled={this.props.loading}
                                >
                                    {this.props.loading ? 'Saving...' : 'Add'}
                                </button>
                            </div>

                        </form>
                    </PopupModal>
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
        // fetchClasses: () => dispatch(fetchAllClasses(dispatch)),
        fetchClasses: () => null,
        addItem: (form_data) => dispatch(addClass(dispatch, form_data)),
        removeItem: (id) => dispatch(removeClass(dispatch, id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Classes);

