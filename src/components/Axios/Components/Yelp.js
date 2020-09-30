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

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const useStyles = makeStyles((theme) => ({

  cardGrid: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  card: {
    maxWidth: 345,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%',
  },
  cardContent: {
    flexGrow: 1,
  },
  avatar: {
    backgroundColor: red,
  },
}));

const Yelp = (search) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const query = search.destination;
  const YELP_API_KEY = process.env.REACT_APP_YELP_API_KEY;

  var config = {
    method: 'get',
    url: `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?term=&location=${query}`,
    headers: {
      Authorization:
        `Bearer ${YELP_API_KEY}`,
    },
  };

  useEffect(() => {
    async function getListings() {
      setIsLoading(true);
      const request = await axios(config)
        .then(function (response) {
          setListings(response.data.businesses);
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
      return request;
    }
    getListings();
  }, []);

  const truncate = (description, n) => {
    return description?.length > n
      ? description.substr(0, n - 1) + '...'
      : description;
  };

  const truncateAvatar = (description, n) => {
    return description?.length > n
      ? description.substr(0, n - 0)
      : description;
  };

  return (
    <div className={classes.root}>
      <Container
        className={classes.cardGrid}
        maxWidth="md"
      >
        <Grid container spacing={2}>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            listings.slice(0, 15).map((listing) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={listing.id}>
                  <Card
                    className={classes.card}
                    outlined
                    raised={true}
                  >
                    <CardActionArea
                      href={listing.url}
                      target="_blank"
                    >
                      <CardHeader
                        avatar={
                          <Avatar
                            aria-label="recipe"
                            className={classes.avatar}
                          >
                            {truncateAvatar(listing.name, 1)}
                          </Avatar>
                        }
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title={truncate(listing.name, 20)}
                        subheader={
                          listing.price
                            ? `Rating: ${listing.rating} | Price ${listing.price}`
                            : `Rating: ${listing.rating}`
                        }
                      />
                      <CardMedia
                        className={classes.cardMedia}
                        image={listing.image_url}
                        title={truncate(listing.name, 20)}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h5"
                        >
                          {truncate(listing.name, 20)}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {listing.categories.length > 1
                            ? listing.categories.map((category) => {
                                return `${category.title} `;
                              })
                            : listing.categories.map((category) => {
                                return category.title;
                              })}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Yelp;