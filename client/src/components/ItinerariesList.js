/*----- MATERIAL UI -----*/
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";

import ScheduleOutlinedIcon from "@material-ui/icons/ScheduleOutlined";
import AttachMoneyOutlinedIcon from "@material-ui/icons/AttachMoneyOutlined";

/*----- REACT/ROUTER/REDUX -----*/
import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux"; // connect component to  redux store.
import { bindActionCreators } from "redux";
import clsx from "clsx";

/*----- COMPONENTS/ACTIONS -----*/
import ActivitiesList from "../components/ActivitiesList";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    marginBottom: 15
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
  }
}));

const ItininerariesList = ({ itineraries, activities }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let path = window.location.pathname;
  let currentId = path.substring(path.lastIndexOf("/") + 1); // take the last part of the URL

  const itinerariesPerCity = itineraries.filter(
    itiner => itiner.city_id === currentId
  );

  console.log(itineraries);
  console.log(activities);

  return (
    <Fragment>
      {itinerariesPerCity.map(itinerary => (
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
                  src={itinerary.profile_img}
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
            <Typography variant="body2" color="textSecondary" component="p">
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
              >
                <Grid item xs={3}>
                  <ThumbUpAltOutlinedIcon fontSize="small" /> {itinerary.likes}
                </Grid>
                <Grid item xs={3}>
                  <ScheduleOutlinedIcon fontSize="small" /> {itinerary.duration}
                  h
                </Grid>
                <Grid item xs={3}>
                  <AttachMoneyOutlinedIcon fontSize="small" />
                  {itinerary.cost}
                </Grid>
              </Grid>
            </Typography>

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
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <ActivitiesList
                activities={activities}
                itinerary_id={itinerary._id}
              />
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </Fragment>
  );
};

export default ItininerariesList;
