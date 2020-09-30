import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Container } from '@material-ui/core';

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

export default function LandingArticles(props) {
  const classes = useStyles();
  const { post } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);

  let config = {
    method: 'get',
    url: `http://newsapi.org/v2/everything?q=travel&from&sortBy&apiKey=6dcf6b1ce6584d8ca044c1d7410cd46e`,
  };

  useEffect(() => {
    async function getArticles() {
      setIsLoading(true);
      const request = await axios(config)
        .then((response) => {
          console.log(response)
          setArticles(response.data.articles);
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
      return request;
    }
    getArticles();
  }, []);

  const truncate = (description, n) => {
    return description?.length > n
      ? description.substr(0, n - 1) + '...'
      : description;
  };

  const articleCard = (article) => {
    return (
      <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${article.urlToImage})` }} onClick={() => window.open(article.url, '_blank')}>
        {/* Increase the priority of the hero background image */}
        {<img style={{ display: 'none' }} src={article.urlToImage} alt={article.name} />}
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent} >
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                {article.title}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {truncate(article.description, 150)}
              </Typography>
              {/* <Link variant="subtitle1" >
                {article.name}
              </Link> */}
            </div>
          </Grid>
        </Grid>
      </Paper>
    )
  }


  return (
    <Fragment>
      <br></br>
      <Container>
      {articles.map(article => articleCard(article))}
      </Container>
    </Fragment>
  );
}