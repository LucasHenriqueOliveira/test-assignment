import { createStore } from "redux";

const INITIAL_STATE = {
    activeModule: {},
    activeLesson: {},
    modules: [
        {
            id: 1,
            title: 'Users'
        },
        {
            id: 2,
            title: 'Admins'
        }
    ]
};

function reducer(state = INITIAL_STATE, action) {

    if (action.type === 'TOGGLE_SECTION') {
        return { 
            ...state, 
            activeSection: action.section,
            activeModule: action.module
        }
    }

    return state;
}

const store = createStore(reducer);

export default store;