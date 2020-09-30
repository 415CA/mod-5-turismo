import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  withRouter
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
  const destination = props.destination;
  const [isRendered, setIsRendered] = useState(true)
  const setQuery = props.setQuery

  const destProps = {
    name: destination.name,
    latitude: destination.latitude,
    longitude: destination.longitude,
  };

  const handleClick = () => {
    setIsRendered(false)
  }
  //  href={`/destination/${destination.name}`}

  const deleteRequest = () => {
    axios
      .delete(`http://localhost:3000/destinations/${destination.id}`)
      .then((response) => console.log('Delete', response));
  };

  return (
    <Fragment>
    <Grid item key={destination.name} xs={12} sm={6} md={4}>
      <Paper>
        <Card className={classes.card} >
          <CardActionArea>
          <CardMedia
            className={classes.cardMedia}
            image={destination.photo}
            title={destination.name}
          />
          <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2" align="center">
              {<b>{destination.name}</b>}
            </Typography>
          </CardContent>
        </CardActionArea>
          <IconButton onClick={() => deleteRequest(destination.id)}>
              <DeleteIcon/>
            Delete
          </IconButton>
      </Card>
        </Paper>
    </Grid>

    </Fragment>
  );
};

export default withRouter(MediaCard);
