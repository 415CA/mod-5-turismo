import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Destinations from '../Destinations';
import { Paper } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import ExploreIcon from '@material-ui/icons/Explore';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%',
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const MediaCard = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const destination = props.destination;
  const [isRendered, setIsRendered] = useState(true);
  const setQuery = props.setQuery;
  const setCities = props.setCities;

  const handleClickSearch = (event) => {
    history.push({
      pathname: `/destination/${destination.name}`,
      state: {
        name: destination.name,
        latitude: destination.latitude,
        longitude: destination.longitude,
      },
    });
  };

  const destProps = {
    name: destination.name,
    latitude: destination.latitude,
    longitude: destination.longitude,
  };

  const handleClick = () => {
    setIsRendered(false);
  };
  //  href={`/destination/${destination.name}`}

  const deleteRequest = () => {
    axios
      .delete(`hhttps://turismo-backend-api.herokuapp.com/${destination.id}`)
      .then((response) => console.log('Delete', response));
  };

  return (
    <Fragment>
      <Grid item key={destination.name} xs={12} sm={6} md={4}>
        <Paper>
          <Card className={classes.card}>
            <CardActionArea onClick={() => handleClickSearch()}>
              <CardMedia
                className={classes.cardMedia}
                image={destination.photo}
                title={destination.name}
              />
              <CardContent className={classes.cardContent}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  align="center"
                >
                  {<b>{destination.name}</b>}
                </Typography>
              </CardContent>
            </CardActionArea>
            <Grid container justify="center">
              <Grid item>
                <IconButton onClick={() => handleClickSearch()}>
                  <ExploreIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() => deleteRequest(destination.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Card>
        </Paper>
      </Grid>
    </Fragment>
  );
};

export default withRouter(MediaCard);
