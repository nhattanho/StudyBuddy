import {createStore} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"

const STORE_EMAIL = "STORE_EMAIL";
const STORE_PORTFOLIO = "STORE_PORTFOLIO";
const CHECK_LOGIN = "CHECK_LOGIN";


const initialState = {
    checkLogin: false,
};
  
export function storeCheckLogin(checkLogin) {
    return {
        type: CHECK_LOGIN,
        payload: {
        checkLogin: checkLogin,
        },
    };
}

function userReducer(state = initialState, action) {
    console.log("hit");
    const {payload} = action;
    switch(action.type) {
        case STORE_EMAIL:
            console.log("case store email");
            return {
                ...state,
                email: payload.email,
            };
        case CHECK_LOGIN:
            return {
                ...state,
                checkLogin: payload.checkLogin,
            };
        default:
            return state;
    }
}

let store = createStore(userReducer, composeWithDevTools());
export default store;