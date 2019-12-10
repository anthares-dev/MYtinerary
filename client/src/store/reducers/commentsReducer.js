import {
  FETCH_COMMENTS,
  POST_COMMENTS,
  DEL_COMMENTS
} from "../actions/typesActions";

const initialState = {
  fetchedComments: []
};

function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return {
        ...state,
        fetchedComments: action.payload
      };

    case POST_COMMENTS:
      return {
        ...state,
        fetchedComments: [action.payload, ...state.fetchedComments]
      };

    case DEL_COMMENTS:
      console.log(action.payload);
      return {
        ...state,
        fetchedComments: state.fetchedComments.filter(
          (comment, i) => comment._id !== action.payload
        )
      };

    default:
      return state;
  }
}

export default commentsReducer;
