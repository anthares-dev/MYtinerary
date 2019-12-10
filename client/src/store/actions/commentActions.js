import axios from "axios";
import { FETCH_COMMENTS, POST_COMMENTS, DEL_COMMENTS } from "./typesActions";

//! GET COMMENTS  //-------------------------------------------------------------

export const fetchAxiosComments = itinerary_id => dispatch => {
  console.log("inside action fetching comments", { itinerary_id });
  axios.get(`/api/comments/${itinerary_id}`).then(res => {
    dispatch({
      type: FETCH_COMMENTS,
      payload: res.data
    });
  });
};

//! POST COMMENTS  //-------------------------------------------------------------

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

//! DELETE COMMENTS  //-------------------------------------------------------------

export const delAxiosComments = comment_id => dispatch => {
  console.log("inside action deleting comment", { comment_id });

  axios.delete(`/api/comments/${comment_id}`).then(res => {
    return dispatch({
      type: DEL_COMMENTS,
      payload: comment_id
    });
  });
};
