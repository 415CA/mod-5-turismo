import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Divider,
  Header,
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import dayjs from 'dayjs';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  atmospheric: {
    fontSize: '28px',
    padding: '5px',
  },
  buttons: {
    color: 'black',
  },
  // card: {
  //   minWidth: 600,
  //   minHeight: 600,
  // },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  error: {
    color: 'red',
    padding: '10px',
  },
  fullList: {
    width: 'auto',
  },
  layout: {
    marginTop: '10px',
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  recommendation: {
    fontFamily: 'Montserrat, sans-serif',
    padding: '20px 0px 10px 0px',
    fontSize: '26px',
    textAlign: 'center',
  },
  root: {
    flexiGrow: 1,
    color: 'black',
  },
  search: {
    marginTop: '100px',
  },
  wi: {
    color: '#673ab7',
  },
}));

const Weather = (search) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const [weatherToday, setWeatherToday] = useState({});
  const [weatherDaily, setWeatherDaily] = useState({});
  const [weatherHash, setWeatherHash] = useState({});
  const query = search.destination;
  const name = search.name;
  const longitude = search.longitude;
  const latitude = search.latitude;
  const WEATHER_API_KEY = process.env.REACT_APP_WEATHER;
  let utc = require('dayjs/plugin/utc');
  let timezone = require('dayjs/plugin/timezone');
  dayjs.extend(utc);
  dayjs.extend(timezone);

  let weatherConfig = {
    method: 'get',
    url: `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=minutely,hourly&appid=${WEATHER_API_KEY}`,
  };

  useEffect(() => {
    async function getWeather() {
      setIsLoading(true);
      const request = await axios(weatherConfig)
        .then((response) => {
          setWeatherToday(response.data.current);
          setWeatherDaily(response.data.daily);
          setWeatherHash({
            dateTime: response.data.current.dt,
            feelsLike: response.data.current.feels_like,
            temperature: response.data.current.temp,
            windSpeed: response.data.current.wind_speed,
            sunrise: response.data.current.sunrise,
            sunset: response.data.current.sunset,
            humidity: response.data.current.humidity,
            description: response.data.current.weather[0].main,
            icon: response.data.current.weather[0].id,
            timezone: response.data.current.timezone,
          });
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
      return request;
    }
    getWeather();
  }, [weatherConfig.url]);

  const iconClass = `wi wi-owm-${weatherHash.icon}`;

  // <i className={iconClass} style={{ fontSize: '100px' }}></i>;

  return (
    <div className={classes.root}>
      <h2>Weather</h2>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <Fragment>
          <Container maxWidth="sm">
            <Card className={classes.card} >
              <CardHeader
                title={name}
                subheader={
                  <span>
                    {dayjs
                      .unix(weatherHash.dateTime)
                      .tz(weatherHash.timezone)
                      .format('dddd')}
                    ,{' '}
                    {dayjs
                      .unix(weatherHash.dateTime)
                      .tz(weatherHash.timezone)
                      .format('h:mm')}{' '}
                    {dayjs
                      .unix(weatherHash.dateTime)
                      .tz(weatherHash.timezone)
                      .format('A')}
                  </span>
                }
              />
              <CardContent>
                <CardMedia>
                  <i
                    className={iconClass}
                    style={{ fontSize: '128px', float: 'right' }}
                  ></i>
                </CardMedia>
                <span>
                  <Typography
                    variant="h2"
                    color="textPrimary"
                    component="h2"
                    style={{
                      fontFamily: 'Montserrat',
                      paddingTop: '10px',
                    }}
                  >
                    {Math.round(weatherHash.temperature)}&deg;F
                  </Typography>
                  <Grid container justify="center">
                    <Typography
                      variant="subtitle2"
                      className="atmospheric-conditions"
                      color="textSecondary"
                      style={{ paddingTop: '10px' }}
                    >
                      <span>
                        <CardMedia>
                          <i
                            className={'wi wi-owm-f050'}
                            style={{ fontSize: '20px' }}
                          ></i>
                          {weatherHash.windSpeed} mph Winds
                        </CardMedia>
                        <i
                          className={'wi wi-owm-f07a'}
                          style={{ fontSize: '20px' }}
                        ></i>
                        {weatherHash.humidity}% Humidity
                      </span>
                    </Typography>
                  </Grid>
                </span>
              </CardContent>
            </Card>
          </Container>
        </Fragment>
      )}
    </div>
  );
};

export default Weather;
