import * as Type from './Types';
import {class_id, subject_id, section_id, topic_id } from "../../params";
import {ADD_QUESTION_TYPE_RESPONSE} from "./Types";
import {FETCH_ALL_QUESTION_TYPE_RESPONSE} from "./Types";
import {REMOVE_QUESTION_TYPE_RESPONSE} from "./Types";
import {UPDATE_SELECTED_QUESTIONS} from "./Types";
import {TOGGLE_PAPER_SETTING} from "./Types";
import {UPDATE_PAPER_SETTING} from "./Types";
import {CLEAR_SELECTION} from "./Types";

export const requestInit = () => {
    return {
        type: Type.REQUEST_INIT,
        message: ''
    }
};

export const response_obj = (action_type, response) => {
    return {
        type: action_type,
        payload: response.data,
        message: response.message,
    }
};

export const fetchQuestionsResponse = response => {
    return response_obj(Type.FETCH_QUESTIONS_RESPONSE, response);
};

export const fetchQuestionTypesResponse = response => {
    return response_obj(Type.FETCH_QUESTION_TYPES_RESPONSE, response);
};

export const fetchQuestionsWithTypeErrorResponse = response => {
    return response_obj(Type.FETCH_QUESTIONS_WITH_TYPE_ERROR, response);
};

export const fetchQuestionTypesResponse2 = response => {
    return response_obj(Type.FETCH_QUESTION_TYPES_RESPONSE2, response)
};

export const importQuestionsResponse = response => {
    return {
        ...response_obj(Type.IMPORT_QUESTIONS_RESPONSE, response),
        name: response.name
    };
};

export const addQuestionResponse = (response) => {
  return {
      ...response_obj(Type.ADD_QUESTION_RESPONSE, response),
      name: response.type,
  };
};

export const removeQuestionResponse = (response) => {
  return {
      ...response_obj(Type.REMOVE_QUESTION_RESPONSE, response),
      name: response.type,
      index: response.index
  };
};

export const searchQuestionResponse = response => {
    return response_obj(Type.SEARCH_QUESTIONS_RESPONSE, response);
};

export const fetchQuestionTypes = (dispatch, sections_ids) => {
    dispatch(requestInit());

    let query_string = {class_id, subject_id, section_ids: sections_ids};

    return (dispatch) => {
        const query_params = $helper.buildQueryParams(query_string);
        $api.getData(`get-question-types-by-section-ids?${query_params}`)
            .then(res => {
                const data = {data: res, message: ''};
                dispatch(fetchQuestionTypesResponse2(data));
                return res;
            }).catch(error => {
            const data = {data: [], message: 'Error: ' + error};
            dispatch(fetchQuestionTypesResponse2(data));
        })
    }
};

export const fetchQuestionsWithTypes = (dispatch, is_section_id) => {
    dispatch(requestInit());

    let query_string = {class_id, subject_id};

    // in case need to fetch types by section id
    if(is_section_id)
        query_string.section_id = section_id;

    return (dispatch) => {
        const query_params = $helper.buildQueryParams(query_string);

        $api.getData(`get-question-types?${query_params}`)
            .then(res => {
                const data = {data: res, message: ''};
                dispatch(fetchQuestionTypesResponse(data));
                return res;
        }).then(res => {
            const query_params = $helper.buildQueryParams({class_id, subject_id, section_id, topic_id});
            $api.getData(`get-questions-by-class-subjects?${query_params}`)
                .then(res => {
                    const data = {data: res, message: ''};
                    dispatch(fetchQuestionsResponse(data));
                });
        }).catch(error => {
                const data = {data: [], message: 'Error: ' + error};
                dispatch(fetchQuestionsWithTypeErrorResponse(data));
            })
    }
};

export const showQuestionForm = (dispatch, form, index) => {
    return (dispatch) => {
        dispatch({
            type: Type.SHOW_QUESTION_FORM,
            form,
            index
        });
    };
};

export const hideQuestionFormResponse = index => {
    return {
        type: Type.HIDE_QUESTION_FORM,
        index
    };
};

export const hideQuestionForm = (dispatch, index) => {
    return (dispatch) => {
        dispatch(hideQuestionFormResponse(index));
    }
};

export const addQuestion = (dispatch, formData, endpoint, type, index) => {
    dispatch(requestInit());

    return (dispatch) => {
        $api.postData(endpoint, formData)
            .then(res => {
                let data = {data: {}, message: res.message, type, index};
                if (res.status) {
                    data.data = res.data;
                    dispatch(addQuestionResponse(data, type));
                    dispatch(hideQuestionFormResponse(index));
                } else {
                    dispatch(addQuestionResponse(data, type));
                }
            }).catch(error => {
            const data = {data: {}, message: 'Error: ' + error, type, index};
            dispatch(addQuestionResponse(data));
        });
    }
};

export const removeQuestion = (dispatch, formData, type, index) => {
    dispatch(requestInit());

    return (dispatch) => {
        $api.postData('remove-a-question', formData)
            .then(res => {
                let data = {data: {}, message: res.message, type, index};
                if (res.status) {
                    data.data = res.data;
                }
                dispatch(removeQuestionResponse(data));
            }).catch(error => {
                const data = {data: {}, message: 'Error: ' + error, type, index};
                dispatch(removeQuestionResponse(data));
        });
    }
};

export const importQuestions = (dispatch, formData) => {
    dispatch(requestInit());

    console.log(formData, 'importQuestions');

    return (dispatch) => {
        $api.postData('import-questions', formData)
            .then(res => {
                const data = {data: {}, message: res.message, name: res.name};
                if (res.status) {
                    data.data = res.data;
                    data.name = res.name;
                }
                location.reload();
                dispatch(importQuestionsResponse(data));
            }).catch(error => {
            location.reload();
            const data = {data: {}, message: 'Error: ' + error};
            dispatch(importQuestionsResponse(data));
        });
    }
};


export const searchQuestions = (dispatch, formData) => {
    dispatch(requestInit());

    let endpoint = 'search-questions';
    let params = [];
    for(var pair of formData.entries()) {
        params[pair[0]] = pair[1];
    }

    endpoint += '?' + $helper.buildQueryParams(params);
    return (dispatch) => {
        $api.getData(endpoint)
            .then(res => {
                const data = {data: {}, message: res.message};
                if (res.status) {
                    data.data = res.data;
                }
                dispatch(searchQuestionResponse(data));
            }).catch(error => {
            const data = {data: {}, message: 'Error: ' + error};
            dispatch(searchQuestionResponse(data));
        });
    }
};

const addQuestionTypeResponse = response => {
    return response_obj(ADD_QUESTION_TYPE_RESPONSE, response);
};

export const addQuestionType = (dispatch, formData) => {
    dispatch(requestInit());

    return (dispatch) => {
        $api.postData('add-question-type', formData)
            .then(res => {
                const data = {data: {}, message: res.message};
                if (res.status) {
                    data.data = res.data;
                }
                dispatch(addQuestionTypeResponse(data));
            }).catch(error => {
                const data = {data: {}, message: 'Error: ' + error};
                dispatch(addQuestionTypeResponse(data));
        });
    }
};

const removeQuestionTypeResponse = response => {
    return response_obj(REMOVE_QUESTION_TYPE_RESPONSE, response);
};

export const removeQuestionType = (dispatch, formData) => {
    dispatch(requestInit());
    return (dispatch) => {
        $api.postData('remove-question-type', formData)
            .then(res => {
                const data = {data: {}, message: res.message};
                if (res.status) {
                    data.data = res.data;
                }
                dispatch(removeQuestionTypeResponse(data));
            }).catch(error => {
            const data = {data: {}, message: 'Error: ' + error};
            dispatch(removeQuestionTypeResponse(data));
        });
    }
};

const fetchAllQuestionTypeResponse = response => {
    return response_obj(FETCH_ALL_QUESTION_TYPE_RESPONSE, response)
};

export const fetchAllQuestionType = (dispatch) => {
    return (dispatch) => {
        $api.getData('get-all-question-types')
            .then(res => {
                const data = {data: res, message: ''};
                dispatch(fetchAllQuestionTypeResponse(data));
            }).catch(error => {
                const data = {data: [], message: 'Error: ' + error};
                dispatch(fetchAllQuestionTypeResponse(data));
        })
    }
};

const selectedQuestionsResponse = (response) => {
    return {
        type: UPDATE_SELECTED_QUESTIONS,
        ...response
    }
};

export const updateSelectedQuestions = (dispatch, formData) => {
    return (dispatch) => {
        const data = {...formData};
        dispatch(selectedQuestionsResponse(data));
    }
};

const confirmedQuestionResponse = (selected_question, key, res) => {
    return {
        type: Type.CONFIRM_SELECTED,
        selected_question: selected_question,
        key: key,
        info: res
    };
};
export const confirmSelected = (dispatch, params, formData) => {
    dispatch(requestInit());
    const questions = JSON.parse(formData.get('selected_question'));
    const selected_question = questions.map(q => {
        let config = {};
        if(q.key == params.key) {
            config = {
                each_question_marks : params.each_question_marks,
                ignore : params.ignore,
                total_allowed : params.total_allowed,
                confirmed: true,
                question_statement_en: params.question_statement_en,
                question_statement_rtl: params.question_statement_rtl,
            }
        }
        return {
            ...q,
            ...config
        }
    });

    formData.append('confirmed_questions', JSON.stringify(selected_question[0]));

    return (dispatch) => {
        $api.postData('confirm-questions', formData)
            .then(res => {
                dispatch(confirmedQuestionResponse(selected_question, params.key, res));
            }).catch(error => {
            dispatch(confirmedQuestionResponse(selected_question, params.key, {}));
        });
    }
};

const savedQuestionsResponse = response => {
    return response_obj(Type.FETCH_SAVED_QUESTIONS, response);
};
export const fetchSavedQuestions = (dispatch, formData) => {
    return (dispatch) => {
        const data = {data: [], message: ''};
        $api.postData('get-saved-questions', formData)
            .then(res => {
                data.message = res.message;
                data.data = res.data;
                dispatch(savedQuestionsResponse(data));
            }).catch(error => {
            dispatch(savedQuestionsResponse(data));
        });
    }
} ;

const answerKeyResponse = response => {
    return response_obj(Type.FETCH_ANSWER_KEYS, response);
};
export const fetchAnswerKey = (dispatch, formData) => {
    return (dispatch) => {
        const data = {data: [], message: ''};
        $api.postData('get-answer-keys', formData)
            .then(res => {
                data.data = res;
                dispatch(answerKeyResponse(data));
            }).catch(error => {
            dispatch(answerKeyResponse(data));
        });
    }
} ;

const removeSavedQuestionSectionResponse = response => {
    return response_obj(Type.REMOVE_SAVED_QUESTION_SECTION, response);
};
export const removeSavedQuestionSection = (dispatch, formData) => {
    return (dispatch) => {
        const data = {data: [], message: ''};
        $api.postData('remove-saved-question-section', formData)
            .then(res => {
                data.message = res.message;
                data.data = res.data;
                dispatch(removeSavedQuestionSectionResponse(data));
            }).catch(error => {
            dispatch(removeSavedQuestionSectionResponse(data));
        });
    }
} ;

const savePaperResponse = response => {
    return response_obj(Type.SAVE_PAPER_RESPONSE, response);
};
export const savePaper = (dispatch, formData) => {
    dispatch(requestInit());
    return (dispatch) => {
        const data = {data: [], message: ''};
        $api.postData('save-paper', formData)
            .then(res => {
                data.message = res.message;
                data.data = res.data;
                dispatch(savePaperResponse(data));
            }).catch(error => {
            dispatch(savePaperResponse(data));
        });
    }
};

const markCorrectOptionResponse = response => {
    return response_obj(Type.MARK_AS_CORRECT_OPTION, response);
};
export const markCorrectOption = (dispatch, formData) => {
    return (dispatch) => {
        const data = {data: [], message: ''};
        $api.postData('mark-as-correct-option', formData)
            .then(res => {
                data.message = res.message;
                data.data = res.data;
                dispatch(markCorrectOptionResponse(data));
            }).catch(error => {
            dispatch(markCorrectOptionResponse(data));
        });
    }
};

export const togglePaperSetting = (dispatch, key) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_PAPER_SETTING,
            key: key
        })
    }
};

export const updatePaperSetting = (dispatch, key, value) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_PAPER_SETTING,
            key: key,
            value: value
        })
    }
};

export const clearSelection = (dispatch) => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_SELECTION
        })
    }
};

export const editQuestionSection = (dispatch, params) => {
    return (dispatch) => {
        dispatch({
           type: Type.EDIT_QUESTION_SECTION,
            params
        });
    }
};


