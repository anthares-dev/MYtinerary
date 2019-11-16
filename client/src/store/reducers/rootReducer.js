import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
const rootReducer = combineReducers({ citiesRed: citiesReducer });
export default rootReducer;
