import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

import { compose } from 'recompose';
import {
  withAuthorization,
  withEmailVerification,
} from '../Authentication/Session';
import Search from '../Axios/Components/Search';
import { MediaGrid } from '../Cards';
import Destinations from '../Destinations';
import DestList from '../Search/List';
import { Typography, Container, Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <div>
      <Container>
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            <div>My Destinations</div>
          </Typography>
        </Toolbar>
      </Container>
      <DestList />
    </div>
  );
};

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
