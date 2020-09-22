import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const Unsplash = (search) => {
  const classes = useStyles();
  const [photos, setPhotos] = useState([]);
  const query = search.destination;
  const UNSPLASH_API_KEY = process.env.REACT_APP_UNSPLASH

  var config = {
    method: 'get',
    url: `https://api.unsplash.com/search/photos?query=${query}&order_by=relevant&orientation=landscape`,
    headers: {
      'Accept-Version': 'v1',
      Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
    },
  };

  useEffect(() => {
    async function getPhotos() {
      const request = await axios(config)
        .then(function (response) {
          setPhotos(response.data.results);
        })
        .catch(function (error) {
          console.log(error);
        });
      return request;
    }
    getPhotos();
  }, []);

  const disPhotos = () => {
    let displayPhotos;
    if (photos) {
      displayPhotos = photos.map((photo) => {
        return (

          <GridListTile key={photo.id}>
            <img
              src={photo.urls.regular}
              alt={photo.alt_description}
            />
            <GridListTileBar
              title={photo.description}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${photo.id}`}>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </GridListTile>

        )
      });
    }
    return displayPhotos;
  };

  return (
    <div className={classes.root}>
      <h2>Photos</h2>
      <GridList
        className={classes.gridList}
        cols={2.5}
        cellHeight={160}
      >
        {disPhotos()}
      </GridList>
    </div>
  );
};

export default Unsplash;
