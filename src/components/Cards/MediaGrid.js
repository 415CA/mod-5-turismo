import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import MediaCard from './MediaCard';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const MediaGrid = (array) => {
  const classes = useStyles();
  const destinations = array.destinations;

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {destinations.map((destination) => (
          <MediaCard key={destination} />
        ))}
      </Grid>
    </Container>
  );
};

export default MediaGrid;
