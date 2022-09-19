
let initialState = {
    loading: false,
    message: '',
    sections: [],
    s_code: '',
    questions: [],
};

const paperReducer = (state = initialState, action) => {
    return {
        ...state,
        loading: false
    }
};

export default paperReducer;
