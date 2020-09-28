import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import {
  Typography,
  Card,
  CardHeader,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Container,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: 32,
  },
  card: {
    minWidth: 275,
    marginBottom: 16,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
  flex: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  space: {
    marginRight: 8,
  },
  daily: {
    justifyContent: 'space-between',
    display: 'flex',
    marginRight: 32,
  },
}));

const Wikipedia = (search) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [article, setArticle] = useState('');
  const destination = search.destination;

  let config = {
    method: 'get',
    url: `${'https://cors-anywhere.herokuapp.com/'}https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${destination}&formatversion=2&exsentences=10&exlimit=1&explaintext=1`,
  };

  useEffect(() => {
    async function getWikipedia() {
      setIsLoading(true);
      const request = await axios(config)
        .then((response) => {
          setArticle(response.data.query.pages[0].extract);
          console.log(response.data.query.pages[0].extract);
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
      return request;
    }
    getWikipedia();
  }, [config.url]);

  const truncate = (description, n) => {
    return description?.length > n
      ? description.substr(0, n - 1) + '...'
      : description;
  };

  return (
    <div>
      <Container maxWidth="md" outlined raised={true}>
        {<p> {truncate(article, 400)} </p>}
      </Container>
    </div>
  );
};

export default Wikipedia;
