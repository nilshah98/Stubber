import { createStore, combineReducers } from "redux";

import languageReducer from './reducers/languageReducer'
import userTypeReducer from './reducers/userTypeReducer'

const reducer = combineReducers({
    language: languageReducer,
    userType: userTypeReducer
  })
  
const store = createStore(reducer)
console.log(store.getState())

export default store