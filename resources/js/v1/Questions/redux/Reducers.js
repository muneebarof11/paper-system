import * as Type from "./Types";
import { UPDATE_SELECTED_QUESTIONS } from "./Types";

let all_question_types = [];
let question_types = [];
let questions = {};
let subject = { name: "", medium: "", code: "" };
let a_class = { name: "", level: "" };
let sections = [];

if (window.__all_question_types__) {
    all_question_types = $helper.loadData(window.__all_question_types__);
}
if (window.__question_types__) {
    question_types = $helper.loadData(window.__question_types__);
}
if (window.__question_types_with_questions__) {
    questions = $helper.loadData(window.__question_types_with_questions__);
}
if (window.__subject__) {
    subject = $helper.loadData(window.__subject__);
}
if (window.__a_class__) {
    a_class = $helper.loadData(window.__a_class__);
}
if (window.__sections__) {
    sections = $helper.loadData(window.__sections__);
}
let initialState = {
    loading: false,
    message: "",
    question_types: question_types,
    questions: questions,
    sections: sections,
    subject: subject,
    current_class: a_class,
    s_code: subject.code,
    search_results: {},
    all_question_types: all_question_types,
    selected_question: [],
    confirmed_questions: [],
    confirmed_questions_info: {
        id: 0,
        publisher_id: 0,
        class_id: 0,
        subject_id: 0,
        medium: "dual",
        paper_code: "",
        paper_time: "",
        paper_date: "",
        total_marks: 0,
        bubbleSheet: 0,
        dualPrint: 0,
        boldHeading: 0,
        headerStyle: "Header1",
        questionFontSize: 12,
        optionFontSize: 12,
        table_mcq: 0
    },
    answerKey: []
};

const questionsReducer = (state = initialState, action) => {
    let question_types = state.question_types;
    let questions = state.questions;
    let selected_question = state.selected_question;
    let confirmed_questions = state.confirmed_questions;
    let confirmed_questions_info = state.confirmed_questions_info;
    switch (action.type) {
        case Type.REQUEST_INIT:
            return {
                ...state,
                loading: true
            };
        case Type.FETCH_QUESTION_TYPES_RESPONSE:
            return {
                ...state,
                question_types: action.payload,
                message: action.message
            };
        case Type.FETCH_QUESTION_TYPES_RESPONSE2:
            payload = [...action.payload];
            return {
                ...state,
                loading: false,
                question_types: payload,
                message: action.message
            };
        case Type.FETCH_QUESTIONS_RESPONSE:
            for (let i = 0; i < question_types.length; i++) {
                questions[question_types[i].name] = {
                    data: action.payload[i].questions
                };
            }
            return {
                ...state,
                loading: false,
                questions: questions,
                message: action.message
            };
        case Type.FETCH_QUESTIONS_WITH_TYPE_ERROR:
            return {
                ...state,
                loading: false,
                message: action.message
            };
        case Type.SHOW_QUESTION_FORM:
            let index = action.index;

            let c_array = {
                ...question_types[index],
                form: action.form
            };

            let payload = [
                ...question_types.slice(0, index),
                c_array,
                ...question_types.slice(index + 1)
            ];

            return {
                ...state,
                loading: false,
                question_types: payload
            };
        case Type.HIDE_QUESTION_FORM:
            index = action.index;
            delete question_types[index].form;

            c_array = { ...question_types[index] };
            payload = [
                ...question_types.slice(0, index),
                c_array,
                ...question_types.slice(index + 1)
            ];
            return {
                ...state,
                loading: false,
                question_types: payload
            };
        case Type.ADD_QUESTION_RESPONSE:
            payload = {
                ...questions
            };
            if (Object.keys(action.payload).length > 0) {
                if (!payload[action.name]) {
                    payload[action.name] = { data: [] };
                }
                payload[action.name]["data"].push(action.payload);
            } else {
                alert(action.message);
            }
            return {
                ...state,
                loading: false,
                questions: payload
            };
        case Type.REMOVE_QUESTION_RESPONSE:
            payload = {
                ...questions
            };
            const name = mapQuestionType(action.name);
            delete payload[name].data[action.index];
            return {
                ...state,
                loading: false,
                questions: payload
            };
        case Type.IMPORT_QUESTIONS_RESPONSE:
            if (Object.keys(action.payload).length <= 0) {
                // alert(action.message);
                payload = questions;
            } else {
                payload = {
                    ...questions
                };
                payload[action.name].data = [
                    ...payload[action.name].data,
                    ...action.payload
                ];
                $("#popupModal2").modal("hide");
            }
            return {
                ...state,
                loading: false,
                questions: payload
            };
        case Type.SEARCH_QUESTIONS_RESPONSE:
            if (Object.keys(action.payload).length > 0) {
                payload = action.payload;
            } else {
                payload = {};
            }

            return {
                ...state,
                loading: false,
                search_results: payload
            };
        case Type.FETCH_SAVED_QUESTIONS:
            let questions_info = {};
            if (Object.keys(action.payload).length > 0) {
                payload = action.payload.questions;
                questions_info = {
                    ...action.payload
                };
                delete questions_info["questions"];
            } else {
                payload = [];
            }
            questions_info["table_mcq"] = 0;
            const subject = { ...questions_info.subject };
            subject.medium = questions_info.medium;
            return {
                ...state,
                loading: false,
                confirmed_questions: payload,
                confirmed_questions_info: questions_info,
                current_class: questions_info.current_class,
                subject: subject
            };
        case Type.FETCH_ALL_QUESTION_TYPE_RESPONSE:
            payload =
                action.payload && action.payload.length > 0
                    ? action.payload
                    : [];
            return {
                ...state,
                all_question_types: payload
            };
        case Type.ADD_QUESTION_TYPE_RESPONSE:
            let payload2 = [];
            if (Object.keys(action.payload).length > 0) {
                payload2 = [...[...state.question_types], action.payload];
                $("#popupModal").modal("hide");
            } else {
                payload2 = state.question_types;
            }
            return {
                ...state,
                loading: false,
                question_types: payload2
            };
        case Type.REMOVE_QUESTION_TYPE_RESPONSE:
            if (Object.keys(action.payload).length > 0) {
                payload2 = [...[...state.question_types]];

                payload2 = payload2.filter(t => t.id != action.payload.id);
            } else {
                payload2 = state.question_types;
            }
            return {
                ...state,
                loading: false,
                question_types: payload2
            };
        case UPDATE_SELECTED_QUESTIONS:
            selected_question = [...selected_question];

            if (selected_question.length > 0) {
                selected_question = selected_question.map(q => {
                    let questions = [...q["questions"]];
                    if (q.key == action.key) {
                        let index = -1;
                        q["questions"].filter((n, i) => {
                            if (n.id == action.question.id) index = i;
                        });

                        if (index != -1) {
                            q["questions"].splice(index, 1);
                            questions = q["questions"];
                        } else {
                            questions.push(action.question);
                        }
                    }
                    return {
                        ...q,
                        questions: questions
                    };
                });
            } else {
                const question = action.question;
                delete action.question;
                delete action.type;
                action.questions = [question];
                selected_question.push(action);
            }

            return {
                ...state,
                selected_question: selected_question
            };
        case Type.CONFIRM_SELECTED:
            selected_question = [...selected_question];
            selected_question = action.selected_question.map(q => {
                let config = {};
                if (q.key == action.key) {
                    config = { ...q };
                }
                return {
                    ...q,
                    ...config
                };
            });

            confirmed_questions.push(selected_question[0]);
            let info = action.info;
            info["table_mcq"] = 0;
            return {
                ...state,
                loading: false,
                search_results: [],
                selected_question: [],
                confirmed_questions: confirmed_questions,
                confirmed_questions_info: info
            };
        case Type.REMOVE_SAVED_QUESTION_SECTION:
            if (Object.keys(action.payload).length > 0) {
                payload = action.payload.questions;
            } else {
                payload = [];
            }
            return {
                ...state,
                loading: false,
                confirmed_questions: payload
            };
        case Type.SAVE_PAPER_RESPONSE:
            if (action.payload === true) {
                alert("Successfully saved!");
                $("#popupModal").modal("hide");
            } else {
                alert("Something went wrong, please try again later!");
            }
            return {
                ...state,
                loading: false
            };
        case Type.TOGGLE_PAPER_SETTING:
            let info_item = confirmed_questions_info[action.key];
            let updated_questions_info = {
                ...confirmed_questions_info
            };
            if (info_item == 0) info_item = 1;
            else info_item = 0;

            updated_questions_info[action.key] = info_item;
            return {
                ...state,
                confirmed_questions_info: updated_questions_info
            };

        case Type.UPDATE_PAPER_SETTING:
            let updated_questions_info2 = {
                ...confirmed_questions_info
            };
            updated_questions_info2[action.key] = action.value;
            return {
                ...state,
                confirmed_questions_info: updated_questions_info2
            };
        case Type.FETCH_ANSWER_KEYS:
            return {
                ...state,
                answerKey: action.payload
            };
        case Type.CLEAR_SELECTION:
            return {
                ...state,
                loading: false,
                selected_question: []
            };
        case Type.EDIT_QUESTION_SECTION:
            let search_results = action.params.search_results;

            let key = mapQuestionType(action.params.key);
            search_results[key]["edit"] = true;

            return {
                ...state,
                // loading: false,
                search_results: search_results,
                selected_question: action.params.selected_questions
            };
        case Type.MARK_AS_CORRECT_OPTION:
            return {
                ...state
            };
        default:
            return {
                ...state
            };
    }
};

function mapQuestionType(name) {
    switch (name) {
        case "mcq":
            name = "mcqs";
            break;
        case "mcqs":
            name = "mcqs";
            break;
        case "general":
            name = "short_questions";
            break;
        case "banks":
            name = "fill_in_the_blanks";
            break;
        case "image":
            name = "question_with_image";
            break;
        case "true_false":
            name = "truefalse";
            break;
        case "columns":
            name = "match_the_columns";
            break;
    }

    return name;
}

export default questionsReducer;
