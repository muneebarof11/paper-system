import {
    REQUEST_INIT,
    FETCH_DATA_SUBJECTS_RESPONSE,
    FETCH_ALL_SUBJECTS_RESPONSE,
    FETCH_ALL_CLASSES_RESPONSE,
    ADD_SUBJECT_RESPONSE,
    REMOVE_SUBJECT_RESPONSE,
    UPDATE_SUBJECT_RESPONSE
} from "./Types";

import {class_id, syllabus_type_id as publisher_id} from "../../params";

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
    return response_obj(FETCH_DATA_SUBJECTS_RESPONSE, response);
};

export const fetchAllClassesResponse = response => {
    return response_obj(FETCH_ALL_CLASSES_RESPONSE, response);
};

export const fetchAllSubjectsResponse = response => {
    return response_obj(FETCH_ALL_SUBJECTS_RESPONSE, response)
};

export const addResponse = response => {
    return response_obj(ADD_SUBJECT_RESPONSE, response)
};

export const removeResponse = response => {
    return response_obj(REMOVE_SUBJECT_RESPONSE, response)
};

export const fetchSubjectsByClass = (dispatch) => {
    dispatch(requestInit());
    return (dispatch) => {
        $api.getData(`get-subjects-by-class/${class_id}/${publisher_id}`)
        .then(res => {
            const data = {data: res.subjects, message: ''};
            dispatch(fetchResponse(data))
        }).catch(error => {
            const data = {data: [], message: 'Error: ' + error};
            dispatch(fetchResponse(data));
        })
    }
};

export const fetchAllClasses = (dispatch) => {
    return (dispatch) => {
        $api.getData(`get-classes-by-syllabus-types/${publisher_id}`)
        .then(res => {
            const data = {data: res.classes, message: ''};
            dispatch(fetchAllClassesResponse(data))
        }).catch(error => {
            const data = {data: [], message: 'Error: ' + error};
            dispatch(fetchAllClassesResponse(data));
        })
    }
};

export const fetchAllSubjects = (dispatch) => {
    return (dispatch) => {
        $api.getData('get-all-subjects')
            .then(res => {
                const data = {data: res, message: ''};
                dispatch(fetchAllSubjectsResponse(data))
            }).catch(error => {
            const data = {data: [], message: 'Error: ' + error};
            dispatch(fetchAllSubjectsResponse(data));
        });
    }
};

export const addSubject = (dispatch, formData) => {
    dispatch(requestInit());

    return (dispatch) => {
        $api.postData('add-subject', formData)
            .then(res => {
                let data = {data: {}, message: res.message};
                if (res.status) {
                    data.data = res.data;
                }
                dispatch(addResponse(data));
            }).catch(error => {
            const data = {data: {}, message: 'Error: ' + error};
            dispatch(addResponse(data));
        });
    }
};

const updateResponse = response => {
    return response_obj(UPDATE_SUBJECT_RESPONSE, response)
};

export const updateSubject = (dispatch, formData) => {
    dispatch(requestInit());

    return (dispatch) => {
        $api.postData('update-subject', formData)
            .then(res => {
                let data = {data: {}, message: res.message};
                if (res.status) {
                    data.data = res.data;
                }
                dispatch(updateResponse(data));
            }).catch(error => {
            const data = {data: {}, message: 'Error: ' + error};
            dispatch(updateResponse(data));
        });
    }
};

export const removeSubject = (dispatch, id) => {
    dispatch(requestInit());

    let formData = new FormData();
    formData.append('id', $helper.easyEncode(id));
    formData.append('class_id', class_id);

    return (dispatch) => {
        $api.postData('remove-a-subject', formData)
        .then(res => {
            let data = {data: {}, message: res.message};
            if (res.status) {
                data.data = res.data;
            }
            dispatch(removeResponse(data));
        }).catch(error => {
            const data = {data: {}, message: 'Error: ' + error};
            dispatch(removeResponse(data));
        });
    }
};
