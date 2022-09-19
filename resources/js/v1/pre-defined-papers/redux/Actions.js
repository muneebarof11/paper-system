import {
    REQUEST_INIT,
    FETCH_CLASSES_RESPONSE,
    FETCH_SUBJECTS_RESPONSE,
    UPLOAD_FILES_RESPONSE,
    SEARCH_RESPONSE
} from "./Types";

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
        message: response.message
    }
};

export const fetchClassesResponse = response => {
    return response_obj(FETCH_CLASSES_RESPONSE, response);
};

export const fetchClassesByPublisherId = (dispatch, publisher_id) => {
    return (dispatch) => {
        $api.getData(`get-classes-by-syllabus-types/${publisher_id}`)
            .then(res => {
                const data = {data: res.classes, message: ''};
                dispatch(fetchClassesResponse(data))
            }).catch(error => {
            const data = {data: [], message: 'Error: ' + error.exception};
            dispatch(fetchClassesResponse(data));
        })
    }
};

export const fetchSubjectsResponse = response => {
    return response_obj(FETCH_SUBJECTS_RESPONSE, response);
};

export const fetchSubjectsByClassId = (dispatch, publisher_id, class_id) => {
    return (dispatch) => {
        $api.getData(`get-subjects-by-class/${class_id}/${publisher_id}`)
            .then(res => {
                const data = {data: res.subjects, message: ''};
                dispatch(fetchSubjectsResponse(data))
            }).catch(error => {
            const data = {data: [], message: 'Error: ' + error};
            dispatch(fetchSubjectsResponse(data));
        })
    }
};

export const searchPaperResponse = response => {
    return response_obj(SEARCH_RESPONSE, response);
};

export const searchPapers = (dispatch, formData) => {
    dispatch(requestInit());
    return (dispatch) => {
        $api.postData(`search-papers`, formData)
            .then(res => {
                const data = {data: res, message: ''};
                if(res.length <= 0 ) alert('No result found, start upload new!');
                dispatch(searchPaperResponse(data))
            }).catch(error => {
            const data = {data: [], message: 'Error: ' + error};
            dispatch(searchPaperResponse(data));
        })
    }
};

export const uploadPaperResponse = response => {
    return response_obj(UPLOAD_FILES_RESPONSE, response);
};

export const uploadPapers = (dispatch, formData) => {
    dispatch(requestInit());
    return (dispatch) => {
        $api.postData(`upload-papers`, formData)
            .then(res => {
                const data = {data: res ? res : [], message: ''};
                dispatch(uploadPaperResponse(data))
            }).catch(error => {
            const data = {data: [], message: 'Error: ' + error};
            dispatch(uploadPaperResponse(data));
        })
    }
};

export const removeItem = (dispatch, formData) => {
    dispatch(requestInit());
    return (dispatch) => {
        $api.postData(`remove-paper`, formData)
            .then(res => {
                const data = {data: res ? res : [], message: ''};
                dispatch(uploadPaperResponse(data))
            }).catch(error => {
            const data = {data: [], message: 'Error: ' + error};
            dispatch(uploadPaperResponse(data));
        })
    }
};

