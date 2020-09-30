// import DstListGrid from './CardList'
// import DstImgItem from './ImageList'
// export { DstListGrid, DstImgItem };

import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
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
  Grid
} from '@material-ui/core';
import Guardian from '../../components/Axios/Components/Guardian';
import Weather from '../../components/Axios/Components/Weather';
import Unsplash from '../../components/Axios/Components/Unsplash';
import Yelp from '../../components/Axios/Components/Yelp';
import Michelin from '../../components/Axios/Components/Michelin';
import NYTimes from '../../components/Axios/Components/NYTimes';
import GoogleMap from '../../components/Axios/Components/GoogleMap';
import Test from '../../components/Axios/Components/TestCard'

const Destinations = (city) => {
  const { name, latitude, longitude } = city;
  const [image, setImage] = useState('')
  const [imageLoaded, setImageLoaded] = useState(false)

  const getImage = (unsplashImage) => {
    setImage(unsplashImage);
    setImageLoaded(true);
    console.log("image", image);
  }

  return (
    <Fragment>
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