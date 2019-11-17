import React, { Fragment } from "react";
import TimelineIcon from "@material-ui/icons/Timeline";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import { Link, withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  list: {
    width: 200
  },
  fullList: {
    width: "auto"
  }
});
//https://stackoverflow.com/questions/48443772/react-material-ui-bottomnavigation-component-routing-issue

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem button component={Link} to="/" key="1">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem button component={Link} to="/cities" key="2">
          <ListItemIcon>
            <LocationCityIcon />
          </ListItemIcon>
          <ListItemText primary="Cities" />
        </ListItem>

        <ListItem button component={Link} to="/itineraries" key="3">
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary="Itineraries" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {["Profile"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <PersonIcon /> : <PersonIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Fragment>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid item xs={3}>
          <div>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              {<AccountCircleIcon fontSize="large" color="disabled" />}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Create Account</MenuItem>
              <MenuItem onClick={handleClose}>Login</MenuItem>
            </Menu>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div>
            <Button onClick={toggleDrawer("right", true)}>
              <MenuIcon fontSize="large" />
            </Button>

            <Drawer
              anchor="right"
              open={state.right}
              onClose={toggleDrawer("right", false)}
            >
              {sideList("right")}
            </Drawer>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default withRouter(Header);
