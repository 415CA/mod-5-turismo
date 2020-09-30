import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Divider,
  Card,
  CardHeader,
  CardActionArea,
  CardActions,
  CardMedia,
  Avatar,
  IconButton,
  Grid, 
  Container, 
  Toolbar
} from '@material-ui/core';
import Guardian from '../../components/Axios/Components/Guardian';
import Weather from '../../components/Axios/Components/Weather';
import Unsplash from '../../components/Axios/Components/Unsplash';
import Yelp from '../../components/Axios/Components/Yelp';
import Michelin from '../../components/Axios/Components/Michelin';
import NYTimes from '../../components/Axios/Components/NYTimes';
import GoogleMap from '../../components/Axios/Components/GoogleMap';
import Test from '../../components/Axios/Components/TestCard'

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

const Destinations = (city) => {
  const classes = useStyles();

  const location = useLocation();
  console.log(location)
  const { name, latitude, longitude } = location.state;
  const [image, setImage] = useState('')
  const [imageLoaded, setImageLoaded] = useState(false)

  const getImage = (unsplashImage) => {
    setImage(unsplashImage);
    setImageLoaded(true);
    console.log("image", image);
  }


  return (
    <Fragment>

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
          <div>{name}</div>
          </Typography>
        </Toolbar>
      </Container>


      <Grid>
        <Test destination={name} />
        <br></br>
        <Unsplash destination={name} imageLoaded={getImage} />
        <br></br>
        <Weather
          name={name}
          destination={name}
          latitude={latitude}
          longitude={longitude}
        />
        <br></br>
        <GoogleMap
          destination={name}
          latitude={latitude}
          longitude={longitude}
        />
        <br></br>
        <Grid
          container
          spacing={5}
          direction="row"
          justify="center"
          alignItems="center"
          alignContent="center"
        >
          <Grid item>
            <NYTimes destination={name} />
          </Grid>
          <Grid item>
            <Guardian destination={name} />
          </Grid>
          <br></br>
          <Yelp destination={name} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Destinations; 