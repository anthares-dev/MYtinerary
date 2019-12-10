import axios from "axios";
import { FETCH_COMMENTS, POST_COMMENTS, DEL_COMMENTS } from "./typesActions";

export const fetchAxiosComments = itinerary_id => dispatch => {
  console.log("inside fetch comments", { itinerary_id });

  axios.get(`/api/comments/${itinerary_id}`).then(res => {
    dispatch({
      type: FETCH_COMMENTS,
      payload: res.data
    });
  });
};

export const postAxiosCommentSuccess = data => {
  return {
    type: POST_COMMENTS,
    payload: data
  };
};

export const postAxiosComments = ({
  itinerary_id,
  user_id,
  name,
  avatar,
  text,
  timestamp
}) => {
  return dispatch => {
    console.log("inside post comments");
    return axios
      .post("/api/comments", {
        itinerary_id,
        user_id,
        name,
        avatar,
        text,
        timestamp
      })
      .then(res => {
        dispatch(postAxiosCommentSuccess(res.data));
      });
  };
};

export const delAxiosComments = comment_id => dispatch => {
  console.log("inside del comments", { comment_id });

  axios.delete(`/api/comments/${comment_id}`).then(res => {
    return dispatch({
      type: DEL_COMMENTS,
      payload: comment_id
    });
  });
};
