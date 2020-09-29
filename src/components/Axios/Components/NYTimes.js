import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import {
  Typography,
  Divider,
  Card,
  CardHeader,
  CardActionArea,
  CardActions,
  Avatar,
  IconButton,
} from '@material-ui/core';

const NYTimes = (search) => {
  const truncate = (description, n) => {
    return description?.length > n
      ? description.substr(0, n - 1) + '...'
      : description;
  };

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const NYTIMES_API_KEY = process.env.REACT_APP_NYTIMES;
  const destination = search.destination;

  const config = {
    method: 'get',
    url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${destination}&fq=news_desk:("Travel")ANDglocations:(${destination})&api-key=${NYTIMES_API_KEY}`,
  };

  useEffect(() => {
    async function getArticles() {
      setIsLoading(true);
      const request = await axios(config)
        .then((response) => {
          setArticles(response.data.response.docs);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
      return request;
    }
    getArticles();
  }, []);

  return (
    <div>
      <Card outlined raised={true} style={{ width: '30rem' }}>
        <CardHeader
          avatar={
            <Avatar
              alt="NYTimes"
              src="https://d24wuq6o951i2g.cloudfront.net/img/events/id/457/457735294/assets/bea.NYT-logo-2.png"
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
              New York Times Travel
            </Typography>
          }
        />
        <Divider />
        {articles.map((article) => {
          return (
            <Fragment key={article.web_url}>
              <CardActionArea
                onClick={() => window.open(article.web_url, '_blank')}
                key={article.id}
              >
                <div style={{ padding: '1rem' }}>
                  <Typography use="headline5" tag="div">
                    <b>{truncate(article.headline.main, 50)}</b>
                  </Typography>
                  <Typography use="body1" tag="p">
                    {truncate(article.abstract, 60)}
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

export default NYTimes;
