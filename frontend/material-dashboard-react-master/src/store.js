import {
	combineReducers,
	createStore,
	applyMiddleware
} from "redux";
import {
	composeWithDevTools
} from "redux-devtools-extension";
import thunk from "redux-thunk";

import languageReducer from './reducers/languageReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
    language: languageReducer,
    user: userReducer
  })
  
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
console.log(store.getState())

export default store