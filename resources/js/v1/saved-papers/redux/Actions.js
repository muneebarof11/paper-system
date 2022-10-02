import {
    FETCH_CLASSES_RESPONSE,
    FETCH_SUBJECTS_RESPONSE,
    REQUEST_INIT,
    SAVED_SEARCH_RESPONSE
} from "./Types";

export const requestInit = () => {
    return {
        type: REQUEST_INIT,
        message: ""
    };
};

const response_obj = (action_type, response) => {
    return {
        type: action_type,
        payload: response.data,
        message: response.message
    };
};

export const fetchClassesResponse = response => {
    return response_obj(FETCH_CLASSES_RESPONSE, response);
};

export const fetchClassesByPublisherId = (dispatch, publisher_id) => {
    return dispatch => {
        $api.getData(`get-classes-by-syllabus-types/${publisher_id}`)
            .then(res => {
                const data = { data: res.classes, message: "" };
                dispatch(fetchClassesResponse(data));
            })
            .catch(error => {
                const data = { data: [], message: "Error: " + error.exception };
                dispatch(fetchClassesResponse(data));
            });
    };
};

export const fetchSubjectsResponse = response => {
    return response_obj(FETCH_SUBJECTS_RESPONSE, response);
};

export const fetchSubjectsByClassId = (dispatch, publisher_id, class_id) => {
    return dispatch => {
        $api.getData(`get-subjects-by-class/${class_id}/${publisher_id}`)
            .then(res => {
                const data = { data: res.subjects, message: "" };
                dispatch(fetchSubjectsResponse(data));
            })
            .catch(error => {
                const data = { data: [], message: "Error: " + error };
                dispatch(fetchSubjectsResponse(data));
            });
    };
};

export const searchPaperResponse = response => {
    return response_obj(SAVED_SEARCH_RESPONSE, response);
};

export const searchPapers = (dispatch, formData, is_saved_papers) => {
    dispatch(requestInit());
    return dispatch => {
        let endpoint = `search-papers`;
        if (is_saved_papers) endpoint = `saved-papers`;

        formData.append("isDraft", window.__isDraft__);
        $api.postData(endpoint, formData)
            .then(res => {
                const data = { data: res, message: "" };
                // if(res.length <= 0 ) alert('No result found, start creating new!');
                dispatch(searchPaperResponse(data));
            })
            .catch(error => {
                const data = { data: [], message: "Error: " + error };
                dispatch(searchPaperResponse(data));
            });
    };
};

export const removeSavedItem = (dispatch, formData) => {
    dispatch(requestInit());
    return dispatch => {
        $api.postData(`remove-saved-paper`, formData)
            .then(res => {
                const data = { data: res ? res : [], message: "" };
                dispatch(searchPapers(dispatch, formData, true));
            })
            .catch(error => {
                const data = { data: [], message: "Error: " + error };
                dispatch(searchPapers(dispatch, formData, true));
            });
    };
};
