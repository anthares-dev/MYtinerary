/*----- REACT/ROUTER/REDUX -----*/
import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "react-slick";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import CommentBox from "./CommentBox";

const ActivitiesList = ({ activities, itineraryId }) => {
  var settings = {
    centerPadding: "60px",
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true
  };

  var activitiesPerItinerary = activities.filter(
    activit => activit.itinerary_id === itineraryId
  );

  //console.log(activities);
  //console.log(itineraryId);

  return (
    <Fragment>
      <Divider />
      <Box fontSize="h7.fontSize" textAlign="left">
        Activities
      </Box>
      <Slider {...settings} className="activity_slider">
        {activitiesPerItinerary.map((activity, i) => (
          <Card className="activity_card" key={i}>
            <CardActionArea>
              <CardMedia
                image={activity.img}
                title={activity.name}
                className="activity_card-media"
              />
              <Typography fontSize="h8.fontSize">{activity.name}</Typography>
            </CardActionArea>
          </Card>
        ))}
      </Slider>
      <Divider />
      <Box fontSize="h7.fontSize" textAlign="left">
        Comments
      </Box>
      <CommentBox itineraryId={itineraryId} />
    </Fragment>
  );
};

export default ActivitiesList;
