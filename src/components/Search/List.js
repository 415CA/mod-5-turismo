import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

import { MediaCard } from '../Cards';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const List = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const setQuery = props.setQuery;

  var config = {
    method: 'get',
    url: 'http://localhost:3000/destinations',
  };

  useEffect(() => {
    async function getCities() {
      setIsLoading(true);
      const request = await axios(config)
        .then((response) => {
          setCities(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
      return request;
    }
    getCities();
  }, [cities]);

  const classes = useStyles();

  return (
    // <MediaGrid destinations={cities} setQuery={setQuery}/>

    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {cities.map((destination) => (
          <MediaCard
            destination={destination}
            setQuery={setQuery}
            setCities={setCities}
            key={destination.id}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default List;
