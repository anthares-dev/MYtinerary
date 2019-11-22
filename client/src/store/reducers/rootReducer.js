import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import itinerariesReducer from "./itinerariesReducer";
import activitiesReducer from "./activitiesReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  citiesRed: citiesReducer,
  itinerariesRed: itinerariesReducer,
  activitiesRed: activitiesReducer,
  error: errorReducer,
  auth: authReducer
});

export default rootReducer;
