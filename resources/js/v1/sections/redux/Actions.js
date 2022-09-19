import {
    REQUEST_INIT,
    FETCH_DATA_SECTIONS_RESPONSE,
    FETCH_SUBJECT_RESPONSE,
    ADD_SECTION_RESPONSE,
    ADD_TOPIC_RESPONSE,
    REMOVE_SECTION_RESPONSE,
    REMOVE_TOPIC_RESPONSE,
    SHOW_TOPIC_FORM,
    HIDE_TOPIC_FORM,
    PROCESS_IMPORT_RESPONSE,
    IMPORTED_TOPICS_RESPONSE, SELECTED_SECTION_RESPONSE
} from "./Types";

import {class_id, syllabus_type_id, subject_id} from "../../params";

export const requestInit  = () => {
    return {
        type: REQUEST_INIT,
        message: ''
    }
};

const response_obj = (action_type, response) => {
    return {
        type: action_type,
        payload: response.data,
        message: response.message,
    }
};

export const fetchResponse = response => {
    return response_obj(FETCH_DATA_SECTIONS_RESPONSE, response);
};

export const fetchSubjectResponse = response => {
    return response_obj(FETCH_SUBJECT_RESPONSE, response)
};

export const addSectionResponse = response => {
    return response_obj(ADD_SECTION_RESPONSE, response)
};

export const removeSectionResponse = response => {
    return response_obj(REMOVE_SECTION_RESPONSE, response)
};

export const processImportResponse = response => {
    return {
        ...response_obj(PROCESS_IMPORT_RESPONSE, response),
        headers: response.headers,
        sections: response.sections
    }
};

export const importTopicsResponse = response => {
    return response_obj(IMPORTED_TOPICS_RESPONSE, response);
};

export const addTopicResponse = response => {
    return {
        ...response_obj(ADD_TOPIC_RESPONSE, response),
        index: response.index,
    }
};

export const removeTopicResponse = response => {
    return {
        ...response_obj(REMOVE_TOPIC_RESPONSE, response),
        index: response.index,
    }
};

export const hideTopicFormResponse = index => {
    return {
        type: HIDE_TOPIC_FORM,
        index
    };
};

export const selectedSectionsResponse = response => {
    return response_obj(SELECTED_SECTION_RESPONSE, response)
};

export const fetchSubjectTopics = (dispatch) => {
    dispatch(requestInit());

    const query_params = $helper.buildQueryParams({class_id, subject_id, syllabus_type_id});
    return (dispatch) => {
        $api.getData(`get-subject-sections?${query_params}`)
        .then(res => {
            const data = {data: res, message: ''};
            dispatch(fetchResponse(data))
        }).catch(error => {
            const data = {data: [], message: 'Error: ' + error};
            dispatch(fetchResponse(data));
        })
    }
};

export const fetchSubject = (dispatch) => {
    return (dispatch) => {
        $api.getData(`get-a-subject-by-id/${subject_id}`)
            .then(res => {
                const data = {data: res, message: ''};
                dispatch(fetchSubjectResponse(data))
            }).catch(error => {
            const data = {data: [], message: 'Error: ' + error};
            dispatch(fetchSubjectResponse(data));
        })
    }
};

export const addSection = (dispatch, formData) => {
    dispatch(requestInit());

    return (dispatch) => {
        $api.postData('add-subject-topic', formData)
            .then(res => {
                let data = {data: {}, message: res.message};
                if (res.status) {
                    data.data = res.data;
                }
                dispatch(addSectionResponse(data));
            }).catch(error => {
            const data = {data: {}, message: 'Error: ' + error};
            dispatch(addSectionResponse(data));
        });
    }
};

export const removeSection = (dispatch, id) => {
    dispatch(requestInit());

    let formData = new FormData();

    formData.append('id', $helper.easyEncode(id));
    formData.append('class_id', class_id);
    formData.append('subject_id', subject_id);
    formData.append('section_id', $helper.easyEncode(id));

    return (dispatch) => {
        $api.postData('remove-a-section', formData)
        .then(res => {
            let data = {data: {}, message: res.message};
            if (res.status) {
                data.data = res.data;
            }
            dispatch(removeSectionResponse(data));
        }).catch(error => {
            const data = {data: {}, message: 'Error: ' + error};
            dispatch(removeSectionResponse(data));
        });
    }
};

export const showTopicForm = (dispatch, form, index) => {
    return (dispatch) => {
            dispatch({
                type: SHOW_TOPIC_FORM,
                form,
                index
        });
    };
};

export const hideTopicForm = (dispatch, index) => {
    return (dispatch) => {
        dispatch(hideTopicFormResponse(index));
    }
};

export const addTopic = (dispatch, index, formData) => {
    dispatch(requestInit());

    return (dispatch) => {
        $api.postData('add-subject-topic', formData)
            .then(res => {
                const data = {data: {}, message: res.message, index};
                if (res.status) {
                    data.data = res.data;
                }
                dispatch(addTopicResponse(data));
                dispatch(hideTopicFormResponse(index));
            }).catch(error => {
            const data = {data: {}, message: 'Error: ' + error, index};
            dispatch(addTopicResponse(data));
        });
    }

};

export const removeTopic = (dispatch, index, formData) => {
    dispatch(requestInit());

    return (dispatch) => {
        $api.postData('remove-a-topic', formData)
            .then(res => {
                const data = {data: {}, message: res.message, index};
                if (res.status) {
                    data.data = res.data;
                }
                dispatch(removeTopicResponse(data));
            }).catch(error => {
            const data = {data: {}, message: 'Error: ' + error, index};
            dispatch(removeTopicResponse(data));
        });
    }
};

export const processImport = (dispatch, formData) => {
    dispatch(requestInit());

    return (dispatch) => {
        $api.postData('process-subject-topics-file', formData)
            .then(res => {
                const data = {data: {}, message: res.message, headers: []};
                if (res.status) {
                    data.data = res.data;
                    data.headers = res.headers;
                    data.sections = res.sections;
                }
                dispatch(processImportResponse(data));
            }).catch(error => {
            const data = {data: {}, message: 'Error: ' + error, headers: []};
            dispatch(processImportResponse(data));
        });
    }
};

export const updateSelectedSections = (dispatch, selectedSections) => {
    return (dispatch) => {
        const data = {data: selectedSections, message: ""};
        dispatch(selectedSectionsResponse(data));
        const url = $helper.buildPaperUrlWithParams('questions', {
            stid : syllabus_type_id,
            cid: class_id,
            suid: subject_id,
        });
        window.location.href = url;
    }
};
