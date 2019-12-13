/*----- REACT/ROUTER/REDUX/ACTIONS -----*/
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/actions/authActions";

/*----- MATERIAL UI -----*/
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
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
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import FaceIcon from "@material-ui/icons/Face";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { makeStyles } from "@material-ui/core/styles";
import GitHubIcon from "@material-ui/icons/GitHub";

//https://stackoverflow.com/questions/48443772/react-material-ui-bottomnavigation-component-routing-issue

const useStyles = makeStyles({
  avatar: {
    width: 35,
    height: 35
  },
  list: {
    width: 200
  },
  fullList: {
    width: "auto"
  }
});

function Appbar() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  //const user_id = useSelector(state => state.auth.user.id);
  // console.log(user);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const authLinks = (
    <div>
      <MenuItem>{user ? `Welcome ${user.name} ` : ""}</MenuItem>
      <Divider />

      <MenuItem
        component={Link}
        onClick={() => {
          handleClose();
        }}
        to={user ? `/profile/${user.id} ` : ""}
      >
        Profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          dispatch(logout());
          handleClose();
          window.location.replace("/");
        }}
      >
        Log out
      </MenuItem>
    </div>
  );

  const guestLinks = (
    <div>
      <MenuItem onClick={handleClose} component={Link} to="/signup">
        Register
      </MenuItem>
      <MenuItem onClick={handleClose} component={Link} to="/signin">
        Log in
      </MenuItem>
    </div>
  );

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
        {/*<ListItem button component={Link} to="/itineraries" key="3">
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary="Itineraries" />
        </ListItem>
      */}
      </List>

      <Divider />
      <List>
        {user ? (
          <Fragment>
            <ListItem
              button
              component={Link}
              to={user ? `/profile/${user.id} ` : ""}
              key="3"
            >
              <ListItemIcon>
                <FaceIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>

            <ListItem
              button
              onClick={() => {
                dispatch(logout());
                handleClose();
                window.location.replace("/");
              }}
              key="4"
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItem>
          </Fragment>
        ) : (
          <Fragment>
            <ListItem button component={Link} to="/signup" key="3">
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>

            <ListItem button component={Link} to="/signin" key="4">
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Log in" />
            </ListItem>
          </Fragment>
        )}
      </List>
      <List>
        <ListItem
          onClick={() => {
            window.location.replace("https://ubiqum.com/");
          }}
          key="5"
        >
          <ListItemIcon>
            <FavoriteIcon color="secondary" />
          </ListItemIcon>
          <ListItemText
            primary="MYtinerary"
            secondary="Made with love in Ubiqum, BCN / by Fulvio Vigilante"
          />
        </ListItem>

        <ListItem
          onClick={() => {
            window.location.replace(
              "https://github.com/anthares-dev/MYtinerary"
            );
          }}
          key="6"
        >
          <ListItemIcon>
            <GitHubIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="GitHub"
            secondary="Check Mytinerary repository "
          />
        </ListItem>
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
              {isAuthenticated && user.avatar ? (
                <Avatar
                  alt={user.name}
                  src={user.avatar}
                  className={classes.avatar}
                />
              ) : (
                <AccountCircleIcon fontSize="large" color="disabled" />
              )}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {isAuthenticated ? authLinks : guestLinks}
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

export default Appbar;
