import {combineReducers} from "redux";
import publisherReducer from "./publishers/redux/Reducers";
import classesReducer from "./levels/redux/Reducers";
import subjectReducer from "./subjects/redux/Reducers";
import sectionsReducer from "./sections/redux/Reducers";
import questionsReducer from "./Questions/redux/Reducers";
import preDefinedReducer from './pre-defined-papers/redux/Reducers'
import savedPapersReducer from "./saved-papers/redux/Reducers";
import paperReducer from "./Paper/redux/Reducers";

const rootReducer = combineReducers({
    publishers: publisherReducer,
    classes: classesReducer,
    subject: subjectReducer,
    section: sectionsReducer,
    questions: questionsReducer,
    paper: paperReducer,
    pre: preDefinedReducer,
    saved: savedPapersReducer
});

export default rootReducer;
