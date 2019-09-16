import { combineReducers } from 'redux';
import progress from "./progress";
import auth from "./auth";
import course from "./course"


const progressApp = combineReducers({
    progress, auth, course,
})

export default progressApp;
