import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

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
  const [articles, setArticles] = useState([]);
  const query = search.destination;
  const GUARDIAN_API_KEY = process.env.REACT_APP_GUARDIAN

  var config = {
    method: 'get',
    url: `https://content.guardianapis.com/search?section=travel&order-by=newest&show-elements=all&q=${query}&api-key=&${GUARDIAN_API_KEY}`,
    headers: {
      'Cookie': 'AWSELB=75B9BD811C5C032EDEF76366759629DCCB8726D7A3F618940E371452074647C45436E28DF7E4519DDF3CD336789F71716B110728D885CC55F31FA9D5C529B6DC764DB539F4; AWSELBCORS=75B9BD811C5C032EDEF76366759629DCCB8726D7A3F618940E371452074647C45436E28DF7E4519DDF3CD336789F71716B110728D885CC55F31FA9D5C529B6DC764DB539F4'
    }
  };

  useEffect(() => {
    async function getArticles() {
      const request = await axios(config)
        .then(function (response) {
          setArticles(response.data.response.results);
        })
        .catch(function (error) {
          console.log(error);
        });
      return request;
    }
    getArticles();
  }, []);

  const disArticles = () => {
    let displayArticles;
    if (articles) {
      displayArticles = articles.map((article) => {
        return (
          <Fragment key={article.id}>
            <ListItem alignItems="flex-start" key={article.id}>
              <ListItemAvatar>
                <Avatar
                  alt="Guardian"
                  src="https://uploads.guim.co.uk/2018/01/15/600x400.png"
                />
              </ListItemAvatar>
              <ListItemText primary={article.webTitle}  />
              <React.Fragment>
                <IconButton
                  aria-label="read"
                  onClick={() =>
                    window.open(article.webUrl, '_blank')
                  }
                >
                  <LocalLibraryIcon />
                </IconButton>
                <IconButton aria-label="bookmark">
                  <BookmarkIcon />
                </IconButton>
              </React.Fragment>
            </ListItem>
          <Divider variant="inset" component="li" />

          </Fragment>
        );
      });
    }
    return displayArticles;
  };

  return (
    <div className={classes.root}>
      <h2>The Guardian</h2>
      <List>{disArticles()}</List>
    </div>
  );
};

export default Guardian;
