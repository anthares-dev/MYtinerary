//creating my three actions: loading fetch, fetch success or fetch error
import {
  FETCH_ACTIVITIES_PENDING,
  FETCH_ACTIVITIES_SUCCESS,
  FETCH_ACTIVITIES_ERROR
} from "../actions/typesActions";

//! GET ACTIVITIES  //-------------------------------------------------------------

export function fetchActivitiesPending() {
  return {
    type: FETCH_ACTIVITIES_PENDING
  };
}

export function fetchActivitiesSuccess(activities) {
  return {
    type: FETCH_ACTIVITIES_SUCCESS,
    payload: activities
  };
}

export function fetchActivitiesError(error) {
  return {
    type: FETCH_ACTIVITIES_ERROR,
    payload: error
  };
}

export function fetchActivities(city_id) {
  console.log("inside action activity", city_id);
  return dispatch => {
    dispatch(fetchActivitiesPending());
    //console.log("before fetch");
    fetch("/api/activities/" + city_id)
      .then(res => {
        //console.log("fetched");
        if (res.ok) {
          return res.json();
        }
      })
      .then(json => {
        dispatch(fetchActivitiesSuccess(json));
        return json;
      })
      .catch(err => {
        dispatch(fetchActivitiesError(err));
      });
  };
}
