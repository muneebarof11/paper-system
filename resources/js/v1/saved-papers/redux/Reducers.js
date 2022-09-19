import {
    FETCH_CLASSES_RESPONSE,
    FETCH_SUBJECTS_RESPONSE, REQUEST_INIT,
    SAVED_SEARCH_RESPONSE,
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

const savedPapersReducer = (state = initialState, action) => {
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
        case SAVED_SEARCH_RESPONSE:
            return {
                ...state,
                loading: false,
                papers_list: action.payload
            };
        default:
            return state;
    }
};



export default savedPapersReducer;
