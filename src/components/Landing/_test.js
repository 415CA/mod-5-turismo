import React from 'react';

import MediaCard from './MediaCard';
import Grid from '@material-ui/core/Grid';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
// import Typography from '@material-ui/core/Typography';
import HeroImage from './HeroImage';

export default function Test() {
  return (
    <div>
      <CssBaseline />
      <HeroImage />
      <Container></Container>
      <br></br>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justify="center"
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
    </div>
  );
}
