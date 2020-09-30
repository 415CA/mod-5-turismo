import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { MediaGrid } from '../Cards';
import { HeroImage, HeroUnit } from '../Images';
import Destinations from '../Destinations';

import DstImgItem from '../Destinations/ImageList/DstImgItem';
import { HeroImageLanding } from '../Images/HeroImage';
import LandingArticles from './LandingArticles'
import { Grid } from '@material-ui/core';


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Landing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState([]);

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
  }, []);

  return (
    <Fragment>
      <HeroImageLanding />
      <LandingArticles />
    </Fragment>
  );
};

export default Landing;
