import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { HeroImage } from '../../Images/';
import { Container } from '@material-ui/core';

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
  const UNSPLASH_API_KEY = process.env.REACT_APP_UNSPLASH;
  const searchPhotos = search.photos;

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
          searchPhotos(response.data.results[Math.floor(Math.random() * photos.length)])
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
          <GridListTile
            key={photo.id}
            onClick={() => window.open(photo.links.html, '_blank')}
          >
            <img
              src={photo.urls.regular}
              alt={photo.alt_description}
            />
          </GridListTile>
        );
      });
    }
    return displayPhotos;
  };

  return (
    <Fragment>
      <Container >
        <HeroImage
          image={photos[Math.floor(Math.random() * photos.length)]}
        />
      </Container>

      <br></br>
      <Container >
        <GridList
          className={classes.gridList}
          cols={2.5}
          cellHeight={400}
        >
          {disPhotos()}
        </GridList>
      </Container>
    </Fragment>
  );
};

export default Unsplash;
