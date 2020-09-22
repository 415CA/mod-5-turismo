import React from 'react';
import { useHistory } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../../constants/routes';
import * as ROLES from '../../../constants/roles';
// Material Design Components
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
// Material Design Icons
// import {MenuIcon, VerifiedUserSharpIcon } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// Geolocation
import CurrentLocation from '../../Geolocation'

import Search from '../../Axios/Components/Search'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navigation = () => (
  <AuthUserContext.Consumer>
    {(authUser) =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => {
  const classes = useStyles();
  const history = useHistory();
  const handleClickLanding = () => history.push(ROUTES.LANDING);
  const handleClickAccount = () => history.push(ROUTES.ACCOUNT);
  const handleClickHome = () => history.push(ROUTES.HOME);
  const location = CurrentLocation();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            className={classes.title}
            onClick={handleClickLanding}
            location={location}
          >
            Turismo
          </Typography>

          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleClickHome}
            location={location}
          >
            <HomeIcon />
          </IconButton>

          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleClickAccount}
            location={location}
          >
            <AccountCircleIcon />
          </IconButton>
          {!!authUser.roles[ROLES.ADMIN] && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <VerifiedUserIcon />
            </IconButton>
          )}
          <SignOutButton />
        </Toolbar>
      </AppBar>
    </div>
  );
};

const NavigationNonAuth = () => {
  const classes = useStyles();
  const history = useHistory();
  const handleClick = () => history.push(ROUTES.SIGN_IN);
  const handleClickLanding = () => history.push(ROUTES.LANDING);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            className={classes.title}
            onClick={handleClickLanding}
          >
            Turismo
          </Typography>

          <Button color="inherit" onClick={handleClick}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navigation;
