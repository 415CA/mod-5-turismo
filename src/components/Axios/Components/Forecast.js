import React, { Fragment, useEffect, useState } from 'react';

const Forecast = (props) => {
  const weather = props.weather;
  const [icon, setIcon] = useState({});

  const icons = {
    Thunderstorm: 'wi-thunderstorm',
    Drizzle: 'wi-sleet',
    Rain: 'wi-storm-showers',
    Snow: 'wi-snow',
    Atmosphere: 'wi-fog',
    Clear: 'wi-day-sunny',
    Clouds: 'wi-day-fog',
  };

  const weatherIcon = (icons, rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        setIcon({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        setIcon({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        setIcon({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        setIcon({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        setIcon({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        setIcon({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        setIcon({ icon: icons.Clouds });
        break;
      default:
        setIcon({ icon: icons.Clouds });
    }
  };

  console.log('Forecast_Props', props);
  return (
    <Fragment>
      <h2>Forecast</h2>
      {/* <div>{weather.timezone}</div>
      <div>{weather.current.sunrise}</div>
      <div>{weather.current.sunset}</div>
      <div>{weather.current.temp}</div>
      <div>{weather.current.feels_like}</div>
      <div>{weather.current.humidity}</div>
      <div>{weather.current.wind_speed}</div>
      <div>{weather.current.weather.id}</div>
      <div>{weather.current.weather.main}</div>
      <div>{weather.current.weather.description}</div> */}
    </Fragment>
  );
};

export default Forecast;
