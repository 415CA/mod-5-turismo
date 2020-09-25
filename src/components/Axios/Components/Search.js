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
import { GridList } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';


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
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const GOOGLE = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

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
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {isLoading ? <div>Search</div> : name}
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
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      ></Toolbar>

      {isLoading ? (
        <div>
          Loading ...
          <Test />
        </div>
      ) : (
        <Fragment>
          <Grid>
            {/* <GoogleMap
              destination={query}
              latitude={latitude}
              longitude={longitude}
            /> */}
            <Grid container spacing={1}>
              {/* <Grid item xs={12}>
                <Unsplash destination={query} />
              </Grid> */}
              {/* <Grid item xs={12}>
                <Yelp destination={query} />
              </Grid> */}
              {/* <Weather
                  name={name}
                  destination={query}
                  latitude={latitude}
                  longitude={longitude}
                />
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={6}>
                  <Guardian destination={query} />
                </Grid>
                <Grid item xs={6}>
                  <NYTimes destination={query} />
                </Grid>
              </Grid> */}
            </Grid>
          </Grid>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Search;
