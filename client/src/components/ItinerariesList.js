/*----- MATERIAL UI -----*/
import Grid from "./node_modules/@material-ui/core/Grid";
import Card from "./node_modules/@material-ui/core/Card";
import CardHeader from "./node_modules/@material-ui/core/CardHeader";
import CardContent from "./node_modules/@material-ui/core/CardContent";
import CardActions from "./node_modules/@material-ui/core/CardActions";
import Collapse from "./node_modules/@material-ui/core/Collapse";
import Avatar from "./node_modules/@material-ui/core/Avatar";
import PersonIcon from "./node_modules/@material-ui/icons/Person";
import IconButton from "./node_modules/@material-ui/core/IconButton";
import Typography from "./node_modules/@material-ui/core/Typography";
import ExpandLessIcon from "./node_modules/@material-ui/icons/ExpandLess";
import MoreVertIcon from "./node_modules/@material-ui/icons/MoreVert";
import Chip from "./node_modules/@material-ui/core/Chip";
import Box from "./node_modules/@material-ui/core/Box";
import LocalOfferOutlinedIcon from "./node_modules/@material-ui/icons/LocalOfferOutlined";
import ThumbUpAltOutlinedIcon from "./node_modules/@material-ui/icons/ThumbUpAltOutlined";
import ScheduleOutlinedIcon from "./node_modules/@material-ui/icons/ScheduleOutlined";
import AttachMoneyOutlinedIcon from "./node_modules/@material-ui/icons/AttachMoneyOutlined";
import { makeStyles } from "./node_modules/@material-ui/core/styles";
import FormControlLabel from "./node_modules/@material-ui/core/FormControlLabel";
import Checkbox from "./node_modules/@material-ui/core/Checkbox";
import Favorite from "./node_modules/@material-ui/icons/Favorite";
import FavoriteBorder from "./node_modules/@material-ui/icons/FavoriteBorder";

/*----- REACT/ROUTER/REDUX -----*/
import React, { Fragment, useEffect } from "./node_modules/react";
import clsx from "./node_modules/clsx";
import { connect, useSelector, useDispatch } from "./node_modules/react-redux";

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
    width: 90
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
  const classes = useStyles();
  const dispatch = useDispatch();

  const [expandedId, setExpandedId] = React.useState(-1);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const user = useSelector(state => state.auth.user);
  const favItin = useSelector(state => state.auth.user.favorites);

  //console.log(user);
  //console.log(favItin);

  const handleExpandClick = i => {
    setExpandedId(expandedId === i ? -1 : i);
  };

  const handleFavorites = () => event => {
    let user_id = user.id;
    dispatch(loadUser());
    dispatch(fetchItinerariesId(user_id));
    if (user) {
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
      alert("Login first!");
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
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
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
            <IconButton aria-label="favorite">
              {favItin.includes(itinerary._id) ? (
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
              ) : (
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      value={itinerary._id}
                      onChange={handleFavorites(`${itinerary._id}`)}
                      checked={false}
                    />
                  }
                />
              )}
            </IconButton>
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
              <ExpandLessIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expandedId === i} timeout="auto" unmountOnExit>
            <CardContent>
              <ActivitiesList
                activities={activities}
                itineraryId={itinerary._id}
              />
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </Fragment>
  );
};

export default connect()(ItininerariesList);
