import {
    REQUEST_INIT,
    FETCH_PUBLISHERS_DATA_RESPONSE,
    REMOVE_PUBLISHER_RESPONSE,
    ADD_PUBLISHER_RESPONSE,
    UPDATE_PUBLISHER_RESPONSE
} from "./Types";

let publishers = [];
if(window.__data__)
    publishers = JSON.parse($helper.easyDecode(window.__data__));

const initialState = {
  loading: false,
  publishers: publishers,
  message: ''
};
const publisherReducer = (state = initialState, action) => {
    let payload = state.publishers;
    switch (action.type) {
        case REQUEST_INIT:
            return {
                ...state,
                loading: true
            };
        case FETCH_PUBLISHERS_DATA_RESPONSE:
            return {
                ...state,
                loading: false,
                publishers: action.payload,
                message: action.message
            };
        case REMOVE_PUBLISHER_RESPONSE:
            if(Object.keys(action.payload).length > 0) {
                payload = payload.filter(item => {
                    return action.payload.id != item.id;
                });
            } else {
                alert(action.message);
            }
            return {
                ...state,
                loading: false,
                publishers: payload,
                message: action.message
            };
        case ADD_PUBLISHER_RESPONSE:
            if(Object.keys(action.payload).length > 0) {
                payload = [...payload, ...[action.payload]];
                $('#popupModal').modal('hide');
            } else {
                alert(action.message);
            }
            return {
                ...state,
                loading: false,
                publishers: payload,
                message: action.message
            };
        case UPDATE_PUBLISHER_RESPONSE:
            if(Object.keys(action.payload).length > 0) {
                payload = state.publishers.map(s => {
                    if(action.payload.id === s.id) {
                        return action.payload;
                    } else {
                        return s;
                    }
                });

                $('#popupModal3').modal('hide');
            } else {
                alert(action.message);
            }
            return {
                ...state,
                loading: false,
                publishers: payload,
                message: action.message
            };
        default:
            return {
                ...state,
                publishers: publishers
            };
    }
};



export default publisherReducer;
