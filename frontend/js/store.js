import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';
import baseReducer from "./reducers/baseReducer";

const reducers = combineReducers({
  base: baseReducer,
});

export const store = createStore(reducers, applyMiddleware(thunk));
