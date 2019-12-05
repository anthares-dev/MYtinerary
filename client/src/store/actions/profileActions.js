import axios from "axios";
import {
  ADD_FAVORITES,
  DELETE_FAVORITES,
  FETCH_ITINERARIES_ID,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILE,
  GET_ERRORS
} from "./typesActions";

//-------------------------------------------------------------
// GET PROFILE FAVORITES
/*
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get("/auth/profileget").then(res => {
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  });
};

// SET PROFILE LOADING
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// CLEAR PROFILE
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
*/
//-------------------------------------------------------------

// FETCH FAVORITES BY USER ID
/*
export const fetchItinerariesID = favid => dispatch => {
  axios.post("/api/itinid", { favid: favid }).then(res => {
    dispatch({
      type: FETCH_ITINERARIES_ID,
      payload: res.data
    });
  });
  // .catch(err => console.log(err));
};
*/

//-------------------------------------------------------------
/*
// ADD FAVORITES
export const addFavorites = (user_id, itinerary_id) => dispatch => {
  axios
    .post(`/auth/users/profile/favorite/${user_id}/${itinerary_id}`)
    .then(() => {
      dispatch({
        type: ADD_FAVORITES,
        payload: itinerary_id
      });
    });
  // .catch(err => console.log(err));
};
*/
/*
// REMOVE FAVORITES
export const removeFavorites = (id, favData) => dispatch => {
  axios
    .delete(`/auth/profile/removefav/${id}/${favData}`)
    .then(() =>
      dispatch({
        type: DELETE_FAVORITES,
        payload: favData
      })
    )
    // CHECK ERROR payload: err.response.data
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
*/
