import axios from 'axios';

const NYTIMES = process.env.REACT_APP_NYTIMES;
// const GOOGLE = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
// const MAPBOX = process.env.REACT_APP_MAPBOX_API_KEY;
// const YELP = process.env.REACT_APP_YELP_API_KEY;
const OPEN_WEATHER = process.env.REACT_APP_WEATHER;
const UNSPLASH = process.env.REACT_APP_UNSPLASH;
const VIA_MICHELIN = process.env.REACT_APP_VIA_MICHELIN;
const GUARDIAN = process.env.REACT_APP_GUARDIAN;

const nyTimes = axios.create({
  baseURL: 'http://api.nytimes.com/svc/search/v2/articlesearch.json',
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
});

const yelp = axios.create({
  baseURL: `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search`,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
  },
});

const unsplash = axios.create({
  baseURL: 'https://api.unsplash.com/search/photos',
  headers: {
    'Accept-Version': 'v1',
    Authorization: `Client-ID ${UNSPLASH}`,
    Cookie: 'ugid=0db111d9aeb22811183146d919757acc5335152',
  },
});

const openWeather = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
});

const guardian = axios.create({
  baseURL: 'https://content.guardianapis.com/search',
  headers: {
    Cookie: process.env.REACT_APP_GUARDIAN_COOKIE,
  },
});

const michelin = axios.create({
  baseURL:
    'https://secure-apir.viamichelin.com/apir/2/findPoi.json2/RESTAURANT/eng',
});

export {
  axios,
  nyTimes,
  yelp,
  unsplash,
  openWeather,
  guardian,
  michelin,
};
