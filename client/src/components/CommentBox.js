import React, { Component } from "./node_modules/react";
import { connect } from "./node_modules/react-redux";
import moment from "./node_modules/moment";
import {
  fetchAxiosComments,
  postAxiosComments,
  delAxiosComments
} from "../store/actions/commentActions";
import { loadUser } from "../store/actions/authActions";

import TextField from "./node_modules/@material-ui/core/TextField";
import Avatar from "./node_modules/@material-ui/core/Avatar";
import Grid from "./node_modules/@material-ui/core/Grid";
import Button from "./node_modules/@material-ui/core/Button";
import Icon from "./node_modules/@material-ui/core/Icon";
import FormControl from "./node_modules/@material-ui/core/FormControl";
import List from "./node_modules/@material-ui/core/List";
import ListItem from "./node_modules/@material-ui/core/ListItem";
import ListItemText from "./node_modules/@material-ui/core/ListItemText";
import ListItemAvatar from "./node_modules/@material-ui/core/ListItemAvatar";
import Box from "./node_modules/@material-ui/core/Box";

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      input: ""
    };
    this.onChange = this.onChange.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    //this.props.loadUser();
    const itinerary_id = this.props.itineraryId;
    //console.log(this.props.itineraryId);

    this.props.fetchAxiosComments(itinerary_id);
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      input: event.target.value
    });
  };

  clickHandler = comment_id => {
    this.props.delAxiosComments(comment_id);
  };

  onSubmitLoggedIn = e => {
    const itinerary_id = this.props.itineraryId;
    //console.log(itinerary_id);
    e.preventDefault();
    let comments = {
      itinerary_id: itinerary_id,
      user_id: this.props.user._id,
      name: this.props.user.name,
      avatar: this.props.user.avatar,
      text: this.state.text,
      timestamp: moment(Date.now()).format("LLLL")
    };
    this.props.postAxiosComments(comments);
    this.setState({
      text: "",
      input: ""
    });
  };

  render() {
    //console.log("cambio", this.props);

    const commentList = this.props.fetchedComments.map(comment => (
      <ListItem alignItems="flex-start" key={comment._id}>
        <ListItemAvatar>
          <Avatar alt={comment.name} src={comment.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={comment.text}
          secondary={
            <React.Fragment>
              {comment.name} at: {comment.timestamp}
              {this.props.user.avatar === comment.avatar ? (
                <Box
                  component="span"
                  color="#2979ff"
                  onClick={() => this.clickHandler(comment._id)}
                >
                  -Delete
                </Box>
              ) : null}
            </React.Fragment>
          }
        />
      </ListItem>
    ));

    const commentForm = (
      <React.Fragment>
        <form onSubmit={this.onSubmitLoggedIn}>
          <FormControl>
            <Grid container spacing={0} alignItems="flex-start">
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="Write a comment"
                  type="text"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                />
              </Grid>

              <Grid item>
                <Button
                  type="submit"
                  value="Submit"
                  variant="contained"
                  color="primary"
                  endIcon={<Icon>send</Icon>}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </form>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <List className="comments">{commentList.reverse()}</List>
        {this.props.user ? <Box>{commentForm}</Box> : ""}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    fetchedComments: state.comments.fetchedComments
  };
};

export default connect(mapStateToProps, {
  loadUser,
  fetchAxiosComments,
  postAxiosComments,
  delAxiosComments
})(CommentBox);
