/*----- MATERIAL UI -----*/
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ScheduleOutlinedIcon from "@material-ui/icons/ScheduleOutlined";
import AttachMoneyOutlinedIcon from "@material-ui/icons/AttachMoneyOutlined";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import CircularProgress from "@material-ui/core/CircularProgress";

/*----- REACT/ROUTER/REDUX -----*/
import React, { Fragment, useEffect } from "react";
import clsx from "clsx";
import { connect, useSelector, useDispatch } from "react-redux";

/*----- COMPONENTS/ACTIONS -----*/
import ActivitiesList from "./ActivitiesList";
import {
  addFavorites,
  delFavorites
} from "../store/actions/itinerariesActions";
import { loadUser } from "../store/actions/authActions";
import { fetchItinerariesId } from "../store/actions/profileActions";

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: 20
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    width: 110
  },
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    }
  },
  list: {
    width: 200
  },
  actionIcon: {
    color: "red"
  }
}));

const ItininerariesList = ({ itineraries, activities }) => {
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const user = useSelector(state => state.auth.user);

  const classes = useStyles();
  const dispatch = useDispatch();

  const [expandedId, setExpandedId] = React.useState(-1);

  console.log(user);

  let favItin;
  if (user) {
    console.log("in user");

    favItin = user.favorites;
  } else {
    favItin = [];
  }

  console.log(favItin);

  const handleExpandClick = i => {
    setExpandedId(expandedId === i ? -1 : i);
  };

  const handleFavorites = () => event => {
    if (user) {
      dispatch(loadUser());
      let user_id = user.id;
      dispatch(fetchItinerariesId(user_id));
      let itinerary_id = event.currentTarget.value;

      var isChecked = event.target.checked;

      if (isChecked === true) {
        dispatch(addFavorites(user_id, itinerary_id));
        dispatch(loadUser());
      } else {
        dispatch(delFavorites(user_id, itinerary_id));
        dispatch(loadUser());
        dispatch(fetchItinerariesId(user_id));
      }
    } else {
      alert("Please login first");
    }
  };

  return (
    <Fragment>
      {itineraries.map((itinerary, i) => (
        <Card className={classes.card} key={itinerary._id}>
          <CardHeader
            avatar={
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
                className={classes.avatar}
              >
                <Avatar
                  aria-label="user"
                  alt={itinerary.profile_name}
                  src={itinerary.profile_img + "?img=" + i}
                >
                  <PersonIcon />
                </Avatar>
                <Typography variant="caption" component="p">
                  {itinerary.profile_name}
                </Typography>
              </Grid>
            }
            title={itinerary.title}
            subheader={itinerary.sub_title}
          />

          <CardContent>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid item xs={3}>
                <Typography variant="body2" color="textSecondary" component="p">
                  <ThumbUpAltOutlinedIcon fontSize="small" /> {itinerary.likes}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2" color="textSecondary" component="p">
                  <ScheduleOutlinedIcon fontSize="small" /> {itinerary.duration}
                  h
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2" color="textSecondary" component="p">
                  <AttachMoneyOutlinedIcon fontSize="small" />
                  {itinerary.cost}
                </Typography>
              </Grid>
            </Grid>

            <Box className={classes.root}>
              {itinerary.hashtags.map((hashtag, i) => (
                <Chip
                  key={i}
                  icon={<LocalOfferOutlinedIcon />}
                  label={hashtag}
                  component="a"
                  href="#chip"
                  clickable
                  size="small"
                />
              ))}
            </Box>
          </CardContent>
          <CardActions disableSpacing>
            {favItin.includes(itinerary._id) ? (
              <IconButton aria-label="favorite">
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      value={itinerary._id}
                      onChange={handleFavorites(`${itinerary._id}`)}
                      checked={true}
                    />
                  }
                />
              </IconButton>
            ) : (
              <Fragment>
                <IconButton aria-label="favorite">
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<FavoriteBorder color="error" />}
                        checkedIcon={<Favorite color="error" />}
                        value={itinerary._id}
                        onChange={handleFavorites(`${itinerary._id}`)}
                        checked={false}
                      />
                    }
                  />
                </IconButton>

                {/*<Typography variant="body2" color="textSecondary" component="p">
                  add to your favorites
                </Typography>*/}
              </Fragment>
            )}

            {/* <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>*/}
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expandedId
              })}
              onClick={() => handleExpandClick(i)}
              aria-expanded={expandedId === i}
              aria-label="show more"
            >
              <ExpandLessIcon color="primary" fontSize="large" />
            </IconButton>
          </CardActions>
          <Collapse in={expandedId === i} timeout="auto" unmountOnExit>
            <CardContent>
              {activities && itinerary._id ? (
                <ActivitiesList
                  activities={activities}
                  itineraryId={itinerary._id}
                />
              ) : (
                <CircularProgress color="primary" />
              )}
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </Fragment>
  );
};

export default connect()(ItininerariesList);
