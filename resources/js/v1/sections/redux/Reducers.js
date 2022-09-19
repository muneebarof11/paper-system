import {
    FETCH_DATA_SECTIONS_RESPONSE,
    FETCH_SUBJECT_RESPONSE,
    ADD_SECTION_RESPONSE,
    REMOVE_SECTION_RESPONSE,
    REQUEST_INIT,
    SHOW_TOPIC_FORM,
    HIDE_TOPIC_FORM, ADD_TOPIC_RESPONSE, REMOVE_TOPIC_RESPONSE, PROCESS_IMPORT_RESPONSE, SELECTED_SECTION_RESPONSE
} from "./Types";

let sections = [];
let subject = {name: '', code: ''};
let a_class = {name: ''};
if(window.__subject_sections__) {
    sections = $helper.loadData(window.__subject_sections__);
}
if(window.__subject__) {
    subject = $helper.loadData(window.__subject__);
}
if(window.__a_class__) {
    a_class = $helper.loadData(window.__a_class__);
}
const initialState = {
    loading: false,
    message: '',
    subject: subject,
    a_class: a_class,
    selected_sections: [],
    sections: sections
};

const sectionsReducer = (state = initialState, action) => {
    let payload = state.sections;
    switch (action.type) {
        case REQUEST_INIT:
            return {
                ...state,
                loading: true
            };
        case FETCH_DATA_SECTIONS_RESPONSE:
            payload = [
                ...action.payload
            ];
            return {
                ...state,
                loading: false,
                sections: payload,
                message: action.message
            };
        case FETCH_SUBJECT_RESPONSE:
            return {
                ...state,
                subject: action.payload,
            };
        case REMOVE_SECTION_RESPONSE:
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
                sections: payload,
                message: action.message
            };
        case ADD_SECTION_RESPONSE:
            if(Object.keys(action.payload).length > 0) {
                payload = [...payload, ...[action.payload]];
                $('#popupModal').modal('hide');
            } else {
                alert(action.message);
            }
            return {
                ...state,
                loading: false,
                sections: payload,
                message: action.message
            };
        case SHOW_TOPIC_FORM:
            let index = action.index;
            let c_array = {
                ...payload[index],
                form: action.form
            };
            payload = [
                ...payload.slice(0, index),
                c_array,
                ...payload.slice(index+1),
            ];
            return {
                ...state,
                sections: payload,
            };
        case HIDE_TOPIC_FORM:
            index = action.index;
            delete payload[index].form;

            c_array = {...payload[index]};
            payload = [
                ...payload.slice(0, index),
                c_array,
                ...payload.slice(index+1),
            ];
            return {
                ...state,
                sections: payload,
            };
        case ADD_TOPIC_RESPONSE:
            index = action.index;
            payload[index].topics ? payload[index].topics.push(action.payload): {topics: [action.payload]};
            c_array = {
                ...payload[index],
            };
            payload = [
                ...payload.slice(0, index),
                c_array,
                ...payload.slice(index+1),
            ];
            return {
                ...state,
                loading: false,
                sections: payload,
            };
        case REMOVE_TOPIC_RESPONSE:
            if(Object.keys(action.payload).length > 0) {
                index = action.index - 1;
                let topics = payload[index].topics.filter(t => {
                    return t.id != action.payload.id;
                });
                c_array = {
                    ...payload[index],
                    topics: topics
                };
                payload = [
                    ...payload.slice(0, index),
                    c_array,
                    ...payload.slice(index + 1),
                ];
            } else {
                alert(action.message);
            }
            return {
                ...state,
                loading: false,
                sections: payload,
            };
        case PROCESS_IMPORT_RESPONSE:

            if(Object.keys(action.payload).length <= 0) {
                alert(action.message);
            } else {
                payload = action.sections;
                $('#popupModal2').modal('hide');
            }

            return {
                ...state,
                loading: false,
                topics_to_import: [],
                headers: [],
                sections: payload
            };
        case SELECTED_SECTION_RESPONSE:
            const selected_sections = action.payload ? action.payload : [];
            $helper.saveLocalData('selected_sections', (selected_sections));
            return {
                ...state,
                loading: false,
                selected_sections: selected_sections
            };
        default:
            return {
                ...state,
                sections: sections
            };
    }
};


export default sectionsReducer;
