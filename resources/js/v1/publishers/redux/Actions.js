import {
    REQUEST_INIT,
    FETCH_PUBLISHERS_DATA_RESPONSE,
    ADD_PUBLISHER_RESPONSE,
    REMOVE_PUBLISHER_RESPONSE, UPDATE_PUBLISHER_RESPONSE
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


export const fetchResponse = response => {
    return response_obj(FETCH_PUBLISHERS_DATA_RESPONSE, response)
};

export const addResponse = response => {
    return response_obj(ADD_PUBLISHER_RESPONSE, response)
};

export const removeResponse = response => {
    return response_obj(REMOVE_PUBLISHER_RESPONSE, response)
};

export const fetchPublishers = (dispatch) => {
    dispatch(requestInit());
    return (dispatch) => {
        $api.getData('get-syllabus-types')
        .then(res => {
            const data = {data: res, message: ''};
            dispatch(fetchResponse(data))
        }).catch(error => {
            const data = {data: [], message: 'Error: ' + error.exception};
            dispatch(fetchResponse(data));
        });
    }
};

export const addPublisher = (dispatch, formData) => {
    dispatch(requestInit());

    return (dispatch) => {
        $api.postData('add-syllabus-type', formData)
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

export const removePublisher = (dispatch, id) => {
    dispatch(requestInit());

    let formData = new FormData();
    formData.append('id', $helper.easyEncode(id));

    return (dispatch) => {
        $api.postData('remove-publisher', formData)
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

const updateResponse = response => {
    return response_obj(UPDATE_PUBLISHER_RESPONSE, response)
};

export const updatePublisher = (dispatch, formData) => {
    dispatch(requestInit());

    return (dispatch) => {
        $api.postData('update-publisher', formData)
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
