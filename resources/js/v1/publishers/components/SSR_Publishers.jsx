import React, { Component} from 'react';
import ReactDOMServer from 'react-dom/server';
import BoxLayout from "../../common/BoxLayout";
import Box from "../../common/Box";
import PopupModal from "../../common/PopupModal";
import {addPublisher, removePublisher, updatePublisher} from "../redux/Actions";
import PopupModal2 from "../../common/PopupModal2";

import {connect} from "react-redux";

class SSR_Publishers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            itemToEdit: {
                id: 0,
                name: '',
                status: 1,
            }
        };

        this.formSubmit = this.formSubmit.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.updateFormSubmit = this.updateFormSubmit.bind(this);
    }


    formSubmit(e) {
        e.preventDefault();

        const serialize = require('form-serialize');
        const form = document.querySelector(`#form`);
        const data = serialize(form, { hash: true });

        if(!data.name) {
            alert('Name is required');
            return false;
        }

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('is_active', data.is_active);

        this.props.addItem(formData);
    }

    removeItem(id) {

        const c = window.confirm('Are you sure?');
        if (!c) return false;

        this.props.removeItem(id);

    }

    editItem(item) {
        this.setState({
            itemToEdit: {
                id: item.id,
                name: item.name,
                status: item.is_active,
            }
        });
        $('#popupModal3').modal('show');
    }

    updateFormSubmit(e) {
        e.preventDefault();

        const serialize = require('form-serialize');
        const form = document.querySelector(`#formEdit`);
        const data = serialize(form, {hash: true});

        if (!data.name) {
            alert('Enter name');
            return false;
        }

        const formData = new FormData();

        formData.append('id', $helper.easyEncode(this.state.itemToEdit.id));
        formData.append('name', data.name);
        formData.append('is_active', data.is_active);

        this.props.updateItem(formData);
    }

    render() {
        return <React.Fragment>
                <BoxLayout
                    add_button={true}
                    add_button_url=""
                    add_button_text="Add new Publisher"
                >
                    {
                        this.props.data.map((data) => {
                            let url = `/classes?stid=${$helper.easyEncode(data.id)}`;
                            return (
                                <div className="col-md-4 row section-box mb-4">
                                    <Box
                                        url={url}
                                        box_class="saved-papers-box"
                                        icon_class="fa-file-text"
                                        box_title={data.name}
                                        parent_class="col-lg-12"
                                        data={data}
                                    />
                                    <div className="col-lg-12 action-btn">
                                        <button typeof="button" className="hover-scale btn btn-dark col-lg-6"
                                                onClick={() => this.editItem(data)}>Edit
                                        </button>
                                        <button typeof="button" className="hover-scale btn btn-dark col-lg-6" onClick={() => {this.removeItem(data.id)}}>Remove</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </BoxLayout>

            <PopupModal>
                <form onSubmit={this.formSubmit} method="POST" id="form">

                    <h3>Add New Syllabus type</h3>
                    <hr/>

                    <div className="form-group">
                        <label className="col-sm-12 col-form-label" htmlFor="className">Name</label>
                        <input type="text" className="form-control" id="className"
                               placeholder="Enter name"
                               name="name"
                               autoComplete="off"
                        />
                    </div>

                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="is_active"
                                   id="active" value="1" checked />
                            <label className="form-check-label" htmlFor="active">Active</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="is_active"
                                   id="in_active" value="0" />
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

            <PopupModal2>
                <form onSubmit={this.updateFormSubmit} id="formEdit">

                    <h3>Edit Publisher</h3>
                    <hr/>

                    <div className="form-group">
                        <label className="col-sm-12 col-form-label" htmlFor="className">Name</label>
                        <input type="text" className="form-control" id="className"
                               placeholder="Enter publisher name"
                               name="name"
                               value={this.state.itemToEdit.name}
                               onChange={(e) => this.setState({itemToEdit: {...this.state.itemToEdit, name: e.target.value}})}
                        />
                    </div>

                    <div className="form-group">
                        <label className="col-sm-12 col-form-label" htmlFor="is_active">Active Status</label>
                        <select className="custom-select" name="is_active" id="is_active">
                            <option selected={this.state.itemToEdit.status === '1'} value="1">Active
                            </option>
                            <option selected={this.state.itemToEdit.status === '0'} value="0">In-Active
                            </option>
                        </select>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary col-lg-12" type="submit"
                                disabled={this.props.loading}
                        >
                            {this.props.loading ? 'Saving...' : 'Update'}
                        </button>
                    </div>

                </form>
            </PopupModal2>
        </React.Fragment>
    }
}

let { publishers } = context;

const html = ReactDOMServer.renderToString(
    <SSR_PPublishers loading={false} data={publishers}  />
);

dispatch(html);
