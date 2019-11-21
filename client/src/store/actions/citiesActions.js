//creating my three actions: loading fetch, fetch success or fetch error
export const FETCH_CITIES_PENDING = "FETCH_CITIES_PENDING";
export const FETCH_CITIES_SUCCESS = "FETCH_CITIES_SUCCESS";
export const FETCH_CITIES_ERROR = "FETCH_CITIES_ERROR";

export function fetchCitiesPending() {
  return {
    type: FETCH_CITIES_PENDING
  };
}

export function fetchCitiesSuccess(cities) {
  return {
    type: FETCH_CITIES_SUCCESS,
    payload: cities
  };
}

export function fetchCitiesError(error) {
  return {
    type: FETCH_CITIES_ERROR,
    payload: error
  };
}

// I am preparing my fetch to retrieve the cities list

export function fetchCities() {
  console.log("inside action");
  return dispatch => {
    dispatch(fetchCitiesPending());
    console.log("before fetch");
    fetch("/api/cities")
      .then(res => {
        console.log("fetched");
        if (res.ok) {
          return res.json();
        }
      })
      .then(json => {
        dispatch(fetchCitiesSuccess(json));
        return json;
      })
      .catch(err => {
        console.log("error");
        dispatch(fetchCitiesError(err));
      });
  };
}
