/*
import {
  FETCH_ITINERARIES_ID,
  POST_FAVORITES,
  DELETE_FAVORITES,
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from "../actions/typesActions";

const initialState = {
  user: {},
  itineraries: [],
  favitin: [],
  favid: [],
  profile: []
  // likes: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state
        // loading: true
      };
    // GETS FAVORITES IDS FROM PROFILE
    case GET_PROFILE:
      return {
        ...state,
        favid: action.payload.favorites
        // loading: false
      };
    // GETS FAVORITES FROM ITINERARIES USING ITIN ID
    case FETCH_ITINERARIES_ID:
      return {
        ...state,
        favitin: action.payload
      };
    // SAVE FAVOURITES
    case ADD_FAVORITES:
      return {
        ...state,
        favid: [action.payload, ...state.favid]
      };
    // REMOVE FAVOURITES
    case DELETE_FAVORITES:
      return {
        ...state,
        favitin: state.favitin.filter(
          favorite => favorite._id !== action.payload
        )
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };

    default:
      return state;
  }
}
*/
