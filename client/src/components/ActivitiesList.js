/*----- REACT/ROUTER/REDUX -----*/
import React, { Component, Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "react-slick";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import { Link, withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

const ActivitiesList = (activities, itinerary_id) => {
  var settings = {
    centerPadding: "60px",
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true
  };

  const activitiesPerItinerary = activities.activities.filter(
    activit => activit.itinerary_id === "5dd3e7921c9d440000bc0fd0"
  );

  console.log(activities);
  console.log(itinerary_id);

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
    </Fragment>
  );
};

export default ActivitiesList;
