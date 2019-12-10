import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import itinerariesReducer from "./itinerariesReducer";
import activitiesReducer from "./activitiesReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import commentsReducer from "./commentsReducer";

const rootReducer = combineReducers({
  citiesRed: citiesReducer,
  itinerariesRed: itinerariesReducer,
  activitiesRed: activitiesReducer,
  error: errorReducer,
  auth: authReducer,
  profileRed: profileReducer,
  commentsRed: commentsReducer
});

export default rootReducer;
