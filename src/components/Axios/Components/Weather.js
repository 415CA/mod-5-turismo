import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import dayjs from 'dayjs';
import moment from 'moment';

import {
  Typography,
  Card,
  CardHeader,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Container,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: 32,
  },
  card: {
    minWidth: 275,
    marginBottom: 16,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
  flex: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  space: {
    marginRight: 8,
  },
  daily: {
    justifyContent: 'space-between',
    display: 'flex',
    marginRight: 32,
  },
}));

const Weather = (search) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [weatherToday, setWeatherToday] = useState({});
  const [weatherDaily, setWeatherDaily] = useState({});
  const [weather, setWeather] = useState({});
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
          setWeather({
            dateTime: response.data.current.dt,
            feelsLike: response.data.current.feels_like,
            temperature: response.data.current.temp,
            windSpeed: response.data.current.wind_speed,
            sunrise: response.data.current.sunrise,
            sunset: response.data.current.sunset,
            humidity: response.data.current.humidity,
            description: response.data.current.weather[0].description,
            icon: response.data.current.weather[0].id,
            timezone: response.data.current.timezone,
            timezoneOffset: response.data.current.timezone_offset,
            windDegree: response.data.current.wind_deg,
            cloudiness: response.data.current.clouds,
            pressure: response.data.current.pressure,
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

  const iconClass = `wi wi-owm-${weather.icon}`;

  // <i className={iconClass} style={{ fontSize: '100px' }}></i>;

  const today = new Date(
    weather.dateTime * 1000 - weather.timezoneOffset * 60000,
  );
  const now = new Date();

  return (
    <div>
      <Container maxWidth="md">
        <Card outlined raised={true}>
          <CardContent>
            <Grid
              container
              spacing={5}
              direction="row"
              justify="center"
              alignItems="center"
              alignContent="center"
            >
              <Grid item>
                <CardHeader
                  title={
                    <Typography
                      type="display3"
                      variant="h2"
                      color="textPrimary"
                      component="h2"
                      style={{
                        fontFamily: 'Montserrat',
                        paddingTop: '10px',
                      }}
                    >
                      {name}
                    </Typography>
                  }
                ></CardHeader>
              </Grid>
              <Grid
                item
                spacing={1}
                direction="row"
                justify="center"
                alignItems="center"
                alignContent="center"
                wrap="nowrap"
              >
                <div className={classes.root}>
                  <div className={classes.flex}>
                    <Typography
                      type="display1"
                      className={classes.space}
                    >
                      Humidity:
                    </Typography>
                    <Typography type="display1">
                      {`${weather.humidity}%`}
                    </Typography>
                  </div>

                  <div className={classes.flex}>
                    <Typography
                      type="display1"
                      className={classes.space}
                    >
                      Wind:
                    </Typography>
                    <Typography type="display1">
                      {`${weather.windSpeed} mph ${weather.windDegree}°`}
                    </Typography>
                  </div>

                  <div className={classes.flex}>
                    <Typography
                      type="display1"
                      className={classes.space}
                    >
                      Cloudiness:
                    </Typography>
                    <Typography type="display1">
                      {`${weather.cloudiness} %`}
                    </Typography>
                  </div>
                  <div className={classes.flex}>
                    <Typography
                      type="display1"
                      className={classes.space}
                    >
                      Pressure:
                    </Typography>
                    <Typography type="display1">
                      {`${weather.pressure} hPa`}
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid item>
                <Typography
                  variant="h2"
                  color="textPrimary"
                  component="h2"
                  style={{
                    fontFamily: 'Montserrat',
                    paddingTop: '10px',
                  }}
                >
                  {Math.round(weather.temperature)}&deg;F
                </Typography>
                <Typography type="display1">
                  {weather.description}
                </Typography>
              </Grid>
              <Grid
                item
                spacing={1}
                direction="row"
                justify="center"
                alignItems="center"
                alignContent="center"
                wrap="nowrap"
              >
                <i
                  className={iconClass}
                  style={{
                    fontSize: '128px',
                    float: 'right',
                  }}
                ></i>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Weather;
