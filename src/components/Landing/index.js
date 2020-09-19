import React, { useState, useEffect } from 'react';

import MediaCard from './MediaCard';

import Grid from '@material-ui/core/Grid';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
// import Typography from '@material-ui/core/Typography';
import HeroImage from './HeroImage'
import { Typography } from '@material-ui/core';

const Landing = (props) => {

  return (
    <div>
      <CssBaseline />
      <HeroImage />
      <br></br>
      <Container maxWidth="lg">
        <Typography variant="h5" component="h5">
          Explore Destinations
        </Typography>
        <hr></hr>
      </Container>
      <br></br>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          // justify="center"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid item>
            <MediaCard />
          </Grid>
          <Grid item>
            <MediaCard />
          </Grid>
          <Grid item>
            <MediaCard />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg">
        <Typography variant="h5" component="h5">
          Explore Destinations
        </Typography>
        <hr></hr>
      </Container>
    </div>
  );
}

export default Landing; 