import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

const Yelp = (search) => {
  const classes = useStyles();
  const [listings, setListings] = useState([]);
  const query = search.destination;

  var config = {
    method: 'get',
    url: `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?term=&location=${query}`,
    headers: {
      Authorization:
        'Bearer daQkyIuSTmkUL-P3OQqQvQMQEwoihMKtnZ9Jv8e4gjOPk3nb_O_DYwD3ySG4p5b0DWCgt1MUjFgfB2wUNvjd3H5tdUCpD-UaVtGoHyZLi8IUI9rLN7orU_53-HdhX3Yx',
    },
  };

  useEffect(() => {
    async function getListings() {
      const request = await axios(config)
        .then(function (response) {
          setListings(response.data.businesses);
        })
        .catch(function (error) {
          console.log(error);
        });
      return request;
    }
    getListings();
  }, []);

  const disListings = () => {
    let displayListings;
    if (listings) {
      displayListings = listings.map((listing) => {
        return (
          <Paper
            key={listing.id}
            className={classes.mainFeaturedPost}
            style={{ backgroundImage: `url(${listing.image_url})` }}
          >
            {/* Increase the priority of the hero background image */}
            {
              <img
                style={{ display: 'none' }}
                src={listing.image_url}
                alt={listing.name}
              />
            }
            <div className={classes.overlay} />
            <Grid container>
              <Grid item md={6}>
                <div className={classes.mainFeaturedPostContent}>
                  <Typography
                    component="h1"
                    variant="h3"
                    color="inherit"
                    gutterBottom
                  >
                    {listing.name}
                  </Typography>
                  <Typography variant="h5" color="inherit" paragraph>
                    {listing.display_address}
                  </Typography>
                  <Link variant="subtitle1" href={listing.url}>
                    Explore
                  </Link>
                </div>
              </Grid>
            </Grid>
          </Paper>
        );
      });
    }
    return displayListings;
  };

  return (
    <div className={classes.root}>
      <h2>Yelp</h2>
      <Grid item xs={12} md={6}>
        {disListings()}
      </Grid>
    </div>
  );
};

export default Yelp;
