import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
// import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  mapResponsive: {
    overflow: 'hidden',
    paddingBottom: '56.25%',
    position: 'relative',
    height: 0,
  },
  mapResponsiveiframe: {
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    rounded: true,
  },
}));

const GoogleMap = (search) => {
  const classes = useStyles();

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const query = search.destination;
  const GOOGLE = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  return (
    <Fragment>
      <Container>
        <Paper
          className={classes.mainFeaturedPost}
          elevation={3}
          outlined
          raised={true}
        >
          <div id="map" className={classes.mapResponsive}>
            <iframe
              className={classes.mapResponsiveiframe}
              // width="450"
              // height="600"
              frameBorder="0"
              src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE}&q=${query}`}
              allowFullScreen
            ></iframe>
          </div>
        </Paper>
      </Container>
    </Fragment>
  );
};

export default GoogleMap;
