import {
    FETCH_CLASSES_RESPONSE,
    FETCH_SUBJECTS_RESPONSE,
    REQUEST_INIT,
    SEARCH_RESPONSE,
    UPLOAD_FILES_RESPONSE
} from "./Types";

const initialState = {
  loading: false,
  message: '',
    publishers: [],
    classes: [],
    subjects: [],
    topics: [],
    papers_list: []
};

const preDefinedReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_CLASSES_RESPONSE:
            return {
                ...state,
                loading: false,
                classes: action.payload
            };
        case FETCH_SUBJECTS_RESPONSE:
            return {
                ...state,
                loading: false,
                subjects: action.payload
            };
        case SEARCH_RESPONSE:
            return {
                ...state,
                loading: false,
                papers_list: action.payload
            };
        case UPLOAD_FILES_RESPONSE:
            return {
                ...state,
                loading: false,
                papers_list: action.payload
            };
        default:
            return state;
    }
};



export default preDefinedReducer;
