import React, { Fragment } from 'react';
import { MediaGrid } from '../Cards'
import {HeroImage, HeroUnit} from '../Images'

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Landing = () => {
  return (
    <Fragment>
        <HeroImage />
        <HeroUnit />
        <MediaGrid destinations={cards} />
    </Fragment>
  );
}

export default Landing; 