
const initialState = [];


export default function course(state=initialState, action) {

    switch (action.type) {

        case 'LIST_COURSES':
            return [...state, ...action.courses];

        default:
            return state;
    }
}
