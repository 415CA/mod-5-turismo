import React, { useEffect, useState } from 'react'
import axios from 'axios';
import 'react-open-weather/lib/css/ReactWeather.css';
// import ReactWeather from 'react-open-weather';
// import CurrentLocation from '../Geolocation';

const Weather = () => {
  const API_KEY = process.env.REACT_APP_WEATHER;
    // const [location, setLocation] = useState({});
  const [ weather, setWeather ] = useState({});

    // useEffect(() => {
    //   async function getLocation() {
    //     const position = await navigator.geolocation.getCurrentPosition(
    //       (position) => {
    //         setLocation({
    //           latitude: position.coords.latitude,
    //           longitude: position.coords.longitude,
    //           timestamp: position.timestamp,
    //         });
    //       },
    //     );
    //     return position;
    //   }
    //   getLocation();
    // }, []);

  useEffect(() => {
    async function getWeather() {
      const request = await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${'Brooklyn'},${'NY'}&appid=${API_KEY}`,
        )
        .then((display) => {
          setWeather(display.data);
          console.log('Weather', display.data);
        });
      return request;
    }
    getWeather();
  }, []);



  return (
    <div></div>
  )

};

export default Weather; 
