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

import FavoritesButton from './FavoritesButton'

import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';

import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddLocationIcon from '@material-ui/icons/AddLocation';

import DestList from '../../../components/Search/List'

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

    const [click, setClick] = useState(false);
    const [id, setId] = useState(0);
    const [photo, setPhoto ] = useState('')
    const [photoLoaded, setPhotoLoaded] = useState(false)

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

  const destButton = {
    name: name,
    latitude: latitude,
    longitude: longitude,
  };

  const postRequest = () => {
    axios
      .post('http://localhost:3000/destinations', {
        name: name,
        latitude: latitude,
        longitude: longitude,
        photo: photo,
      })
      .then((response) => {
        setId(response.data.id);
      });
    setClick(true);
  };

  const deleteRequest = () => {
    axios
      .delete(`http://localhost:3000/destinations/${id}`)
      .then((response) => console.log('Delete', response));
    setClick(false);
  };

  const getPhotos = (image) => {
    setPhoto(image.urls.regular);
    console.log(image.urls.regular);
    setPhotoLoaded(true);
  }

  console.log("Photo", photo);

  return (
    <Fragment>
      <Container outlined raised={true}>
        <Toolbar className={classes.toolbar}>

          <IconButton
            name="add"
            type="submit"
            circular
            onClick={() => postRequest(destButton)}
          >
            <AddLocationIcon />
          </IconButton>

            <IconButton
              name="add"
              circular
              onClick={() => deleteRequest(id)}
            >
            <RemoveCircleIcon />
            </IconButton>



          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            {isLoading ? <div>Favorite Destinations</div> : <div>{name}</div>}
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
          </form>
        </Toolbar>
      </Container>

      {isLoading ? (
        <Fragment>
          <DestList setQuery={setQuery} />
        </Fragment>
      ) : (
        <Fragment>
          <Grid>
            <Unsplash destination={name} photos={getPhotos}/>
            <br></br>
              <Test destination={name} />
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
      )}
    </Fragment>
  );
};

export default Search;
