import {
    REQUEST_INIT,
    FETCH_DATA_CLASSES_RESPONSE,
    FETCH_ALL_CLASSES_RESPONSE,
    ADD_CLASS_RESPONSE,
    REMOVE_CLASS_RESPONSE,
    FETCH_ALL_PUBLISHERS, FETCH_CLASS_BY_ID
} from "./Types";
import {class_id, subject_id, syllabus_type_id} from "../../params";
import {fetchSubjectResponse} from "../../sections/redux/Actions";

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
    return response_obj(FETCH_DATA_CLASSES_RESPONSE, response)
};

export const fetchPublishersResponse = response => {
    return response_obj(FETCH_ALL_PUBLISHERS, response);
};

export const fetchAllClassesResponse = response => {
    return response_obj(FETCH_ALL_CLASSES_RESPONSE, response)
};

export const addResponse = response => {
    return response_obj(ADD_CLASS_RESPONSE, response)
};

export const removeResponse = response => {
    return response_obj(REMOVE_CLASS_RESPONSE, response)
};

export const fetchClassesByPublisher = (dispatch) => {
    dispatch(requestInit());
    return (dispatch) => {
        $api.getData(`get-classes-by-syllabus-types/${syllabus_type_id}`)
        .then(res => {
            const data = {data: res.classes, message: ''};
            dispatch(fetchResponse(data))
        }).catch(error => {
            const data = {data: [], message: 'Error: ' + error.exception};
            dispatch(fetchResponse(data));
        })
    }
};

export const fetchAllClasses = dispatch => {
    return (dispatch) => {
        $api.getData('get-all-classes')
        .then(res => {
            const data = {data: res, message: ''};
            dispatch(fetchAllClassesResponse(data))
        }).catch(error => {
            const data = {data: [], message: 'Error: ' + error.exception};
            dispatch(fetchAllClassesResponse(data));
        })
    }
};

export const fetchAllPublishers = (dispatch) => {
    return (dispatch) => {
        $api.getData('get-syllabus-types')
            .then(res => {
                const data = {data: res, message: ''};
                dispatch(fetchPublishersResponse(data))
            }).catch(error => {
            const data = {data: [], message: 'Error: ' + error.exception};
            dispatch(fetchPublishersResponse(data));
        });
    }
};

export const addClass = (dispatch, formData) => {
    dispatch(requestInit());

    return (dispatch) => {
        $api.postData('add-class', formData)
            .then(res => {
                let data = {data: {}, message: res.message};
                if (res.status) {
                    data.data = res.data;
                }
                dispatch(addResponse(data));
            }).catch(error => {
            const data = {data: {}, message: 'Error: ' + error.exception};
            dispatch(addResponse(data));
        });
    }
};

export const removeClass = (dispatch, id) => {
    dispatch(requestInit());

    let formData = new FormData();
    formData.append('id', $helper.easyEncode(id));
    formData.append('syllabus_type_id', syllabus_type_id);

    return (dispatch) => {
        $api.postData('remove-a-class', formData)
        .then(res => {
            let data = {data: {}, message: res.message};
            if (res.status) {
                data.data = res.data;
            }
            dispatch(removeResponse(data));
        }).catch(error => {
            const data = {data: {}, message: 'Error: ' + error.exception};
            dispatch(removeResponse(data));
        });
    }
};

const fetchClassResponse = response => {
    return response_obj(FETCH_CLASS_BY_ID, response);
};
export const fetchClass = (dispatch) => {
    return (dispatch) => {
        $api.getData(`get-a-class-by-id/${class_id}`)
            .then(res => {
                const data = {data: res, message: ''};
                dispatch(fetchClassResponse(data))
            }).catch(error => {
            const data = {data: [], message: 'Error: ' + error};
            dispatch(fetchClassResponse(data));
        })
    }
};


