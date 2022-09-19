import {
    ADD_CLASS_RESPONSE,
    FETCH_DATA_CLASSES_RESPONSE,
    FETCH_ALL_CLASSES_RESPONSE,
    FETCH_ALL_PUBLISHERS,
    REMOVE_CLASS_RESPONSE,
    REQUEST_INIT, FETCH_CLASS_BY_ID
} from "./Types";

import {syllabus_type_id} from "../../params";

let classes = [];
let all_classes = [];
let all_publishers = [];
let publisher = {name: ''};
if(window.__classes__) {
    classes = $helper.loadData(window.__classes__);
}
if(window.__all_classes__) {
    all_classes = $helper.loadData(window.__all_classes__);
}
if(window.__all_publishers__) {
    all_publishers = $helper.loadData(window.__all_publishers__);
}
const initialState = {
    loading: false,
    classes: classes,
    message: '',
    publisher: publisher,
    publishers: all_publishers,
    all_classes: all_classes,
    current_class: {name: '', level: ''}
};

const classesReducer = (state = initialState, action) => {
    let payload = state.classes;
    switch (action.type) {
        case REQUEST_INIT:
            return {
                ...state,
                loading: true
            };
        case FETCH_DATA_CLASSES_RESPONSE:
            return {
                ...state,
                loading: false,
                classes: action.payload,
                message: action.message
            };
        case FETCH_ALL_CLASSES_RESPONSE:
            return {
                ...state,
                all_classes: action.payload
            };
        case FETCH_ALL_PUBLISHERS:
            let publisher = action.payload.filter(item => {
                return $helper.easyDecode(syllabus_type_id) == item.id;
            });
            return {
                ...state,
                publishers: action.payload,
                publisher: publisher[0]
            };
        case REMOVE_CLASS_RESPONSE:
            if (Object.keys(action.payload).length > 0) {
                payload = payload.filter(item => {
                    return action.payload.id != item.id;
                });
            } else {
                alert(action.message);
            }
            return {
                ...state,
                loading: false,
                classes: payload,
                message: action.message
            };
        case ADD_CLASS_RESPONSE:
            if(Object.keys(action.payload).length > 0) {
                payload = [...payload,...[action.payload]];
                $('#popupModal').modal('hide');
            } else {
                alert(action.message);
            }
            return {
                ...state,
                loading: false,
                classes: payload,
                message: action.message
            };
        case FETCH_CLASS_BY_ID:
            return {
                ...state,
                current_class: action.payload,
            };
        default:
            return state;
    }
};


export default classesReducer;
