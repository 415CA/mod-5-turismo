import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const NYTimes = (search) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const NYTIMES = process.env.REACT_APP_NYTIMES;
  const destination = search.destination;

  const config = {
    method: 'get',
    url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${destination}&fq=news_desk:("Travel")ANDglocations:(${destination})&api-key=${NYTIMES}`,
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
      <h2>NY Times</h2>
      <List>
        {articles.map((article) => {
          return (
            <Fragment key={article.id}>
              <ListItem alignItems="flex-start" key={article.id}>
                <ListItemAvatar>
                  <Avatar
                    alt="NYTimes"
                    src="https://d24wuq6o951i2g.cloudfront.net/img/events/id/457/457735294/assets/bea.NYT-logo-2.png"
                  />
                </ListItemAvatar>
                <ListItemText primary={article.headline.main} />
                <ListItemText primary={article.abstract} />
                <React.Fragment>
                  <IconButton
                    aria-label="read"
                    onClick={() =>
                      window.open(article.web_url, '_blank')
                    }
                  >
                    <LocalLibraryIcon />
                  </IconButton>
                  <IconButton aria-label="bookmark">
                    <BookmarkIcon />
                  </IconButton>
                </React.Fragment>
              </ListItem>
              <Divider variant="inset" component="div" />
            </Fragment>
          );
        })}
      </List>
    </div>
  );
};

export default NYTimes;
