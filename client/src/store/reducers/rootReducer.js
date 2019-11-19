import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import itinerariesReducer from "./itinerariesReducer";
import activitiesReducer from "./activitiesReducer";
const rootReducer = combineReducers({
  citiesRed: citiesReducer,
  itinerariesRed: itinerariesReducer,
  activitiesRed: activitiesReducer
});
export default rootReducer;