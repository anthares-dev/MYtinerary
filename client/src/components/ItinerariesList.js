import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
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

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
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
    backgroundColor: red[500]
  }
}));

export default function ItininerariesList() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="user">
            <PersonIcon />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Gaudi In A Day"
        subheader="An intinerary full of architecture and history"
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Likes: 34 12 Hours $$
        </Typography>
        <Box>
          <Chip
            label="# Art"
            component="a"
            href="#chip"
            clickable
            size="small"
          />
          <Chip
            label="# Architecture"
            component="a"
            href="#chip"
            clickable
            size="small"
          />
          <Chip
            label="# History"
            component="a"
            href="#chip"
            clickable
            size="small"
          />
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
          <Typography paragraph>Itinerary</Typography>
          <Typography paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
            assumenda recusandae earum eius deleniti nobis labore facilis
            repellendus ipsum dolores! Incidunt odio molestiae autem,
            voluptatibus est consectetur. Asperiores, iste. Iure.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
