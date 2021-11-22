import {createStore} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import {persistStore, persistReducer} from 'redux-persist';
/*default storage*/
import storage from 'redux-persist/lib/storage'; 

const STORE_PAGE = "STORE_PAGE";
const STORE_EMAIL = "STORE_EMAIL";
const CHECK_LOGIN = "CHECK_LOGIN";
const STORE_USER_INFORMATION = "STORE_USER_INFORMATION";

const persistConfig = {
    key: 'root',
    storage,
}

const initialState = {
    id: "",
    checkLogin: false,
    name: "",
    email: "",
    about: "",
    major: "",
    year: "",
    birthday: "",
    classes: "",
    searchState: {
        filters: {
            year: [],
            classes: [],
            major: [],
        },
        page: 0
    },
    username: "",
    profileURL: "",
};
 
/**
* Shared user's checkLogin as global variable for application
* @param {object} - checkLogin - user's checkLogin status
* @return {object} - object saved the global variable for checkLogin
*/
export function storeCheckLogin(checkLogin) {
    return {
        type: CHECK_LOGIN,
        payload: {
        checkLogin: checkLogin,
        },
    };
}

/**
* Shared user's email as global variable for application
* @param {object} - email - user's email
* @return {object} - object saved the global variable for email
*/
export function storeEmail(email) {
    console.log("store user action");
    return {
      type: STORE_EMAIL,
      payload: {
        email: email,
      },
    };
  }

/**
* Shared user's information as global variable for application
* @param {object} - user's information
* @return {object} - object saved the global variable for information
*/
export function storeInformation(userinformation) {
    return {
        type: STORE_USER_INFORMATION,
        payload: {
            userinformation: userinformation,
        },
    };
}

/**
* Shared searchState as global variable for application
* @param {object} - page - requested page
* @return {object} - object saved the global variable for email
*/
export function storePage(page) {
    console.log("store seach action");
    return {
      type: STORE_PAGE,
      payload: {
        page: page,
      },
    };
  }

/**
* Shared user's information as global variable for application
* @param {object} initialState - user's initialize information
* @return {object} - object saved all global variables for application
*/
function userReducer(state = initialState, action) {
    console.log("hit");
    const {payload} = action;
    switch(action.type) {
        case STORE_PAGE:
            console.log("case store page");
            return {
                ...state,
                searchState: {
                    ...state.searchState,
                    page: payload.page
                }
            };
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
        case STORE_USER_INFORMATION:
            const {
                _id,
                name,
                username,
                about,
                email,
                major,
                year,
                birthday,
                checkLogin,
                classes,
                profileURL,
            } = payload.userinformation;
            return {
                ...state,
                name: name,
                username: username,
                about: about,
                email: email,
                major: major,
                checkLogin: checkLogin,
                classes: classes,
                birthday: birthday,
                year: year,
                id: _id,
                profileURL: profileURL,
            };
        default:
            return state;
    }
}

const persistedReducer = persistReducer(persistConfig, userReducer)
export const store = createStore(persistedReducer, composeWithDevTools());
export const persistor = persistStore(store);
export default {store, persistor};