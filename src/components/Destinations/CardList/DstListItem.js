import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

const DstListItem = (props) => {
  const classes = useStyles();
  const destination = props.destination

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea
        component="a"
        href={`/destinations/${destination.name}`}
      >
        <Card className={classes.card}>
          <Hidden xsDown>
            <CardMedia
              className={classes.cardMedia}
              image={destination.image}
              title={destination.name}
            />
          </Hidden>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {destination.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {destination.date}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {destination.description}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Learn More...
              </Typography>
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default DstListItem; 