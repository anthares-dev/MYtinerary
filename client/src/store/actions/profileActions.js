import axios from "axios";
import {
  FETCH_ITINERARIES_ID_PENDING,
  FETCH_ITINERARIES_ID_SUCCESS
} from "./typesActions";

//! FETCH FAVORITES BY USER ID //-------------------------------------------------------------

export function fetchItinerariesIdPending() {
  return {
    type: FETCH_ITINERARIES_ID_PENDING
  };
}

export const fetchItinerariesId = user_id => dispatch => {
  console.log("inside action fetchItineraries per user ID");
  console.log(user_id);

  dispatch(fetchItinerariesIdPending());
  axios.get(`/api/profile/itineraries/${user_id}`).then(res => {
    dispatch({
      type: FETCH_ITINERARIES_ID_SUCCESS,
      payload: res.data
    });
  });
};
/*
export const fetchItinerariesId = favItin_id => dispatch => {
  console.log("inside action fetchItineraries per fav ID");
  console.log(favItin_id);

  dispatch(fetchItinerariesIdPending());
  axios
    .get("/api/profile/itineraries", { favItin_id: favItin_id })
    .then(res => {
      dispatch({
        type: FETCH_ITINERARIES_ID_SUCCESS,
        payload: res.data
      });
    });
};
*/
