import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Divider,
  Card,
  CardHeader,
  CardActionArea,
  CardActions,
  CardMedia,
  Avatar,
  IconButton,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Guardian = (search) => {
  const classes = useStyles();

  const truncate = (description, n) => {
    return description?.length > n
      ? description.substr(0, n - 1) + '...'
      : description;
  };

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const destination = search.destination;
  const CURRENTS = process.env.REACT_APP_CURRENTS;

  var config = {
    method: 'get',
    url: `${'https://cors-anywhere.herokuapp.com/'}https://api.currentsapi.services/v1/search?keywords=${destination}&language=en&category=travel&apiKey=${CURRENTS}`,
  };

  useEffect(() => {
    async function getArticles() {
      setIsLoading(true);
      const request = await axios(config)
        .then((response) => {
          setArticles(response.data.news);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
      return request;
    }
    getArticles();
  }, []);
  

  return (
    <div>
      <Card outlined={true} raised={true} style={{ width: '30rem' }}>
        <CardHeader
          avatar={
            <Avatar
              alt="Currents"
              src="https://currentsapi.services/img/currents_api_logo.svg"
            />
          }
          display="inline"
          subheader={
            <Typography
              use="subtitle1"
              tag="div"
              style={{ padding: '1rem 1rem' }}
              align="justify"
            >
              Currents Travel
            </Typography>
          }
        />
        <Divider />
        {articles.slice(0, 10).map((article) => {
          return (
            <Fragment key={article.id}>
              <CardActionArea
                onClick={() => window.open(article.url, '_blank')}
              >
                <div style={{ padding: '1rem' }}>
                  <Typography use="headline5" tag="div">
                    <b>{truncate(article.title, 50)}</b>
                  </Typography>
                  <Typography use="headline5" tag="div">
                    {truncate(article.description, 50)}
                  </Typography>
                </div>
              </CardActionArea>
              <Divider />
            </Fragment>
          );
        })}
      </Card>
    </div>
  );
};

export default Guardian;
