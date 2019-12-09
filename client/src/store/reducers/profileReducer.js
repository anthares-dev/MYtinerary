import {
  FETCH_ITINERARIES_ID_PENDING,
  FETCH_ITINERARIES_ID_SUCCESS
} from "../actions/typesActions";

const initialState = {
  pending: false,
  favItineraries: []
};

function profileReducer(state = initialState, action) {
  switch (action.type) {
    // GETS FAVORITES FROM ITINERARIES USING ITIN ID
    case FETCH_ITINERARIES_ID_PENDING:
      return {
        ...state,
        pending: true
      };

    case FETCH_ITINERARIES_ID_SUCCESS:
      return {
        ...state,
        pending: false,
        favItineraries: action.payload
      };

    default:
      return state;
  }
}

export default profileReducer;
