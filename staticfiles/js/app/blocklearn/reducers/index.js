import { combineReducers } from 'redux';
import progress from "./progress";
import auth from "./auth";


const progressApp = combineReducers({
    progress, auth,
})

export default progressApp;
