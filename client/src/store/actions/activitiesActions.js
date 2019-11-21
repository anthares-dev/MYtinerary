//creating my three actions: loading fetch, fetch success or fetch error
export const FETCH_ACTIVITIES_PENDING = "FETCH_ACTIVITIES_PENDING";
export const FETCH_ACTIVITIES_SUCCESS = "FETCH_ACTIVITIES_SUCCESS";
export const FETCH_ACTIVITIES_ERROR = "FETCH_ACTIVITIES_ERROR";

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

export function fetchActivities() {
  console.log("inside action activity");
  return dispatch => {
    dispatch(fetchActivitiesPending());
    console.log("before fetch");
    fetch("/API/activities/all")
      .then(res => {
        console.log("fetched");
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
