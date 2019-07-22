
const initialState = [];


export default function progress(state=initialState, action) {
    let progressList = state.slice();

    switch (action.type) {

        case 'FETCH_PROGRESS':
            return [...state, ...action.progress];

        case 'ADD_PROGRESS':
            return [...state, action.progress];

        case 'UPDATE_PROGRESS':
            let progressToUpdate = progressList[action.courseIndex];
            progressToUpdate.course_URL = action.progress.course_URL;
            progressList.splice(action.courseIndex, 1, progressToUpdate);
            return progressList;

        case 'DELETE_PROGRESS':
            progressList.splice(action.courseIndex, 1);
            return progressList;

        default:
            return state;
    }
}
