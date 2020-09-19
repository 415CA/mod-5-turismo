import React from 'react';
import Grid from '@material-ui/core/Grid';
import DstImgItem from '../ImageList/DstImgItem'

const DstListGrid = (props) => {
  const destinations = props.destinations;

  return (
    <Grid container spacing={4}>
      {destinations.map((destination) => {
        return <DstImgItem destination={destination} />;
      })}
    </Grid>
  );
}

export default DstListGrid; 