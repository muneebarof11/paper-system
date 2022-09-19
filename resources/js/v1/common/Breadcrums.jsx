import React, { Component } from 'react';

import {syllabus_type_id, class_id, subject_id, section_id, topic_id} from '../params';

class Breadcrums extends Component {

    constructor(props) {
        super(props);

        let breadcrums = [];
        let is_papers = false;
        if(window.location.href.indexOf('Papers') >= 0) {
            is_papers = true;
        }

        if(syllabus_type_id) {
            const endpoint = 'publisher';
            const url = is_papers ? $helper.buildPaperUrlWithParams(endpoint) : $helper.buildUrlWithParams(endpoint);
            breadcrums.push({
                title: 'Publisher',
                url:  url,
            });
        }

        if(class_id) {
            const endpoint = 'classes';
            const params = {stid: syllabus_type_id};
            const url = is_papers ? $helper.buildPaperUrlWithParams(endpoint, params) : $helper.buildUrlWithParams(endpoint, params);
            breadcrums.push({
                title: 'Class',
                url:  url
            });
        }

        if(subject_id) {
            const endpoint = 'subjects';
            const params = {stid: syllabus_type_id, cid: class_id, suid: subject_id};
            const url = is_papers ? $helper.buildPaperUrlWithParams(endpoint, params) : $helper.buildUrlWithParams(endpoint, params);
            breadcrums.push({
                title: 'Subject',
                url:  url
            });
        }

        if(section_id) {
            const endpoint = 'sections';
            const params = {stid: syllabus_type_id, cid: class_id, suid: subject_id, seid: section_id};
            const url = is_papers ? $helper.buildPaperUrlWithParams(endpoint, params) : $helper.buildUrlWithParams(endpoint, params);
            breadcrums.push({
                title: 'Topics',
                url:  url
            });
        }

        this.state = {
            breadcrums: breadcrums
        }

    }

    render() {
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb" style={{padding: '0.75rem'}}>
                    {
                        this.state.breadcrums.map((b, i) => {
                            return (
                                <li
                                    className={`breadcrumb-item ${i === (this.state.breadcrums.length -1) ? 'active' : ''}`}
                                >
                                    <a href={b.url}>{b.title}</a>
                                </li>
                            )
                        })
                    }
                </ol>
            </nav>
        )
    }

}

export default Breadcrums;
