import {
    ADD_SUBJECT_RESPONSE,
    UPDATE_SUBJECT_RESPONSE,
    FETCH_DATA_SUBJECTS_RESPONSE,
    FETCH_ALL_CLASSES_RESPONSE,
    FETCH_ALL_SUBJECTS_RESPONSE,
    REMOVE_SUBJECT_RESPONSE,
    REQUEST_INIT
} from "./Types";
import {class_id} from "../../params";

let subjects = [];
let all_subjects = [];
let all_classes = [];
if(window.__subjects__) {
    subjects = $helper.loadData(window.__subjects__);
}
if(window.__all_subject__) {
    all_subjects = $helper.loadData(window.__all_subject__);
}
if(window.__all_classes__) {
    all_classes = $helper.loadData(window.__all_classes__);
}
const initialState = {
    loading: false,
    message: '',
    subjects: subjects,
    all_classes: all_classes,
    a_class: {name: ''},
    all_subjects: all_subjects
};
const subjectReducer = (state = initialState, action) => {
    let payload = subjects;
    switch (action.type) {
        case REQUEST_INIT:
            return {
                ...state,
                loading: true
            };
        case FETCH_DATA_SUBJECTS_RESPONSE:
            return {
                ...state,
                loading: false,
                subjects: action.payload,
                message: action.message
            };
        case FETCH_ALL_CLASSES_RESPONSE:
            let a_class = action.payload.filter(item => {
                return $helper.easyDecode(class_id) == item.id;
            });
            return {
                ...state,
                all_classes: action.payload,
                a_class: a_class[0]
            };
        case FETCH_ALL_SUBJECTS_RESPONSE:
            return {
                ...state,
                all_subjects: action.payload,
            };
        case REMOVE_SUBJECT_RESPONSE:
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
                subjects: payload,
                message: action.message
            };
        case ADD_SUBJECT_RESPONSE:
            if(Object.keys(action.payload).length > 0) {
                payload = [...payload, ...[action.payload]];
                $('#popupModal').modal('hide');
            } else {
                alert(action.message);
            }
            return {
                ...state,
                loading: false,
                subjects: payload,
                message: action.message
            };
        case UPDATE_SUBJECT_RESPONSE:
            if(Object.keys(action.payload).length > 0) {
                payload = state.subjects.map(s => {
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
                subjects: payload,
                message: action.message
            };
        default:
            return state;
    }
};


export default subjectReducer;
