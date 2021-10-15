import {createStore} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"

const initialSate = {
    
}

function userReducer(state = initialSate, action) {
    console.log("hit");
    const {payload} = action;
    switch(action.type) {
        default:
            return state;
    }
}

let store = createStore(userReducer, composeWithDevTools());
export default store;