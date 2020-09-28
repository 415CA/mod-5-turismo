import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Guardian from './Guardian';
import Weather from './Weather';
import Unsplash from './Unsplash';
import Yelp from './Yelp';
import Michelin from './Michelin';
import NYTimes from './NYTimes';
import GoogleMap from './GoogleMap';
import Map from './Map';
import Test from './TestCard';

import Grid from '@material-ui/core/Grid';
import { StickyContainer, Sticky } from 'react-sticky';
import { GridList, Container } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';

import { HeroImage, HeroUnit } from '../../Images';

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SignOutButton from '../../Authentication/SignOut';

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

const Search = () => {
  const classes = useStyles();

  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const GOOGLE = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const saveData = {
    name,
    latitude,
    longitude,
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const result = await axios(url);
      setData(result.data);
      setName(result.data.results[0].address_components[0].long_name);
      setLatitude(result.data.results[0].geometry.location.lat);
      setLongitude(result.data.results[0].geometry.location.lng);
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return (
    <Fragment>
      <Container outlined raised={true}>
        <Toolbar className={classes.toolbar}>
          <Button>Favorite</Button>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            {isLoading ? <div></div> : <div>{name}</div>}
          </Typography>
          <form
            onSubmit={(event) => {
              setUrl(
                `https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE}&address=${query}&inputtype=textquery&language=en`,
              );
              event.preventDefault();
            }}
          >
            <TextField
              type="text"
              value={query}
              label="Search Destinations"
              onChange={(event) => setQuery(event.target.value)}
            />
            {/* <IconButton>
            <SearchIcon />
          </IconButton> */}
          </form>
        </Toolbar>
      </Container>

      {isLoading ? (
        <Fragment></Fragment>
      ) : (
        <Fragment>
          <Grid>
            <Test destination={name} />
            {/* <br></br>
            <Unsplash destination={name} />
            <br></br> */}
            {/* <Weather
              name={name}
              destination={query}
              latitude={latitude}
              longitude={longitude}
            />
            <br></br>
            <GoogleMap
              destination={query}
              latitude={latitude}
              longitude={longitude}
            />
            <br></br> */}

            {/* <br></br>

            <Grid
              container
              spacing={5}
              direction="row"
              justify="center"
              alignItems="center"
              alignContent="center"
            >
              <Grid item>
                <NYTimes destination={query} />
              </Grid>
              <Grid item>
                <Guardian destination={query} />
              </Grid>
              <br></br>
              <Yelp destination={query} />
            </Grid> */}
          </Grid>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Search;
