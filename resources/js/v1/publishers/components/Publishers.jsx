import React, { lazy, PureComponent } from "react";
import { connect } from "react-redux";
import PopupModal2 from "../../common/PopupModal2";
import {
    addPublisher,
    removePublisher,
    updatePublisher
} from "../redux/Actions";
const BoxLayout = lazy(() => import("../../common/BoxLayout"));
const Box = lazy(() => import("../../common/Box"));
const PopupModal = lazy(() => import("../../common/PopupModal"));

class Publishers extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            itemToEdit: {
                id: 0,
                name: "",
                status: 1
            }
        };

        this.formSubmit = this.formSubmit.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.updateFormSubmit = this.updateFormSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchData();
    }

    formSubmit(e) {
        e.preventDefault();

        const serialize = require("form-serialize");
        const form = document.querySelector(`#form`);
        const data = serialize(form, { hash: true });

        if (!data.name) {
            alert("Name is required");
            return false;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("is_active", data.is_active);

        this.props.addItem(formData);
    }

    removeItem(id) {
        const c = window.confirm("Are you sure?");
        if (!c) return false;

        this.props.removeItem(id);
    }

    editItem(item) {
        this.setState({
            itemToEdit: {
                id: item.id,
                name: item.name,
                status: item.is_active
            }
        });
        $("#popupModal3").modal("show");
    }

    updateFormSubmit(e) {
        e.preventDefault();

        const serialize = require("form-serialize");
        const form = document.querySelector(`#formEdit`);
        const data = serialize(form, { hash: true });

        if (!data.name) {
            alert("Enter name");
            return false;
        }

        const formData = new FormData();

        formData.append("id", $helper.easyEncode(this.state.itemToEdit.id));
        formData.append("name", data.name);
        formData.append("is_active", data.is_active);

        this.props.updateItem(formData);
    }

    render() {
        return (
            <React.Fragment>
                <div className="">
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
                        add_button={true}
                        add_button_url=""
                        add_button_text="Add new Publisher"
                    >
                        {this.props.publishers.length > 0 ? (
                            this.props.publishers.map(data => {
                                let url = $helper.buildUrlWithParams(
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
                                        <div className="col-lg-12 action-btn">
                                            <button
                                                typeof="button"
                                                className="hover-scale btn btn-dark col-lg-6"
                                                onClick={() =>
                                                    this.editItem(data)
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                typeof="button"
                                                className="hover-scale btn btn-dark col-lg-6"
                                                onClick={() => {
                                                    this.removeItem(data.id);
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <h2 className="container-fluid pt-4 pb-4">
                                {!this.props.loading
                                    ? "Loading..."
                                    : "No syllabus found!"}
                            </h2>
                        )}
                    </BoxLayout>

                    <PopupModal>
                        <form
                            onSubmit={this.formSubmit}
                            method="POST"
                            id="form"
                        >
                            <h3>Add New Syllabus type</h3>
                            <hr />

                            <div className="form-group">
                                <label
                                    className="col-sm-12 col-form-label"
                                    htmlFor="className"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="className"
                                    placeholder="Enter name"
                                    name="name"
                                    autoComplete="off"
                                />
                            </div>

                            <div className="form-group">
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="is_active"
                                        id="active"
                                        value="1"
                                        checked
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="active"
                                    >
                                        Active
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="is_active"
                                        id="in_active"
                                        value="0"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="in_active"
                                    >
                                        In-Active
                                    </label>
                                </div>
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

                    <PopupModal2>
                        <form onSubmit={this.updateFormSubmit} id="formEdit">
                            <h3>Edit Publisher</h3>
                            <hr />

                            <div className="form-group">
                                <label
                                    className="col-sm-12 col-form-label"
                                    htmlFor="className"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="className"
                                    placeholder="Enter publisher name"
                                    name="name"
                                    value={this.state.itemToEdit.name}
                                    onChange={e =>
                                        this.setState({
                                            itemToEdit: {
                                                ...this.state.itemToEdit,
                                                name: e.target.value
                                            }
                                        })
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label
                                    className="col-sm-12 col-form-label"
                                    htmlFor="is_active"
                                >
                                    Active Status
                                </label>
                                <select
                                    className="custom-select"
                                    name="is_active"
                                    id="is_active"
                                >
                                    <option
                                        selected={
                                            this.state.itemToEdit.status === "1"
                                        }
                                        value="1"
                                    >
                                        Active
                                    </option>
                                    <option
                                        selected={
                                            this.state.itemToEdit.status === "0"
                                        }
                                        value="0"
                                    >
                                        In-Active
                                    </option>
                                </select>
                            </div>

                            <div className="form-group">
                                <button
                                    className="btn btn-primary col-lg-12"
                                    type="submit"
                                    disabled={this.props.loading}
                                >
                                    {this.props.loading
                                        ? "Saving..."
                                        : "Update"}
                                </button>
                            </div>
                        </form>
                    </PopupModal2>
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
        // fetchData: () => dispatch(fetchPublishers(dispatch)),
        fetchData: () => null,
        addItem: form_data => dispatch(addPublisher(dispatch, form_data)),
        updateItem: form_data => dispatch(updatePublisher(dispatch, form_data)),
        removeItem: id => dispatch(removePublisher(dispatch, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Publishers);
