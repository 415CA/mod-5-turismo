import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

const Weather = (search) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false); 

  const [weather, setWeather] = useState({});
  const query = search.destination;
  const longitude = search.longitude;
  const latitude = search.latitude;
  const WEATHER_API_KEY = process.env.REACT_APP_WEATHER;

  var weatherConfig = {
    method: 'get',
    url: `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=minutely,hourly&appid=${WEATHER_API_KEY}`,
  };

  useEffect(() => {
    async function getWeather() {
      setIsLoading(true);
      const request = await axios(weatherConfig)
      .then((response) => {
        setWeather(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
      return request;
    }
    getWeather();
  }, []);

  return (
    <div className={classes.root}>
      <h2>Weather</h2>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <Fragment>
          <h3>{query}</h3>
          <div>Current Timezone: {weather.timezone}</div>
          {/* {/* <div>Current Temp: {weather.current.temp}</div> */}
          <div>
            {/* Current Description: {weather.current.weather.description}
            Current Main: {weather.current.weather.main}
            Current Icon: {weather.current.weather.icon} */}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Weather;
