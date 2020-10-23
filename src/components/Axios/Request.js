const NYTIMES = process.env.REACT_APP_NYTIMES;
// const GOOGLE = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
// const MAPBOX = process.env.REACT_APP_MAPBOX_API_KEY;
// const YELP = process.env.REACT_APP_YELP_API_KEY;
const OPEN_WEATHER = process.env.REACT_APP_WEATHER;
// const UNSPLASH = process.env.REACT_APP_UNSPLASH;
const VIA_MICHELIN = process.env.REACT_APP_VIA_MICHELIN;
const GUARDIAN = process.env.REACT_APP_GUARDIAN;

const articles = (destination) => {
  console.log('articles', destination);
  return `?q=${destination}&fq=news_desk:("Travel")ANDglocations:(${destination})&api-key=${NYTIMES}`;
};

const section = (destination) => {
  return `?section=travel&order-by=newest&show-elements=all&q=${destination}&api-key=${GUARDIAN}`;
};
const yelpCity = (destination) => {
  return `?location=${destination}`;
};
const yelpSearch = (destination, query = '') => {
  return `?term=${query}&location=${destination}`;
};
const photos = (destination) => {
  return `query=${destination}&order_by=relevant&orientation=landscape`;
};
const weather = (destination) => {
  return `?q=${destination}&appid=${OPEN_WEATHER}`;
};

const yelp = (latitude, longitude, query = '') => {
  return `?term=${query}&sort_by=rating&latitude=${latitude}&longitude=${longitude}`;
};
const forecast = (latitude, longitude) => {
  return `?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER}`;
};
const guide = (latitude, longitude) => {
  return `center=${latitude}:${longitude}&nb=100&dist=50000&source=RESGR&filter=AGG.provider%20eq%20RESGR&charset=UTF-8&ie=UTF-8&authKey=${VIA_MICHELIN}`;
};

const travel = (destination) => {
  return {
    articles: articles(destination),
    section: section(destination),
    yelpCity: yelpCity(destination),
    yelpSearch: yelpSearch(destination),
    photos: photos(destination),
    forecast: forecast(destination),
  };
};

const geolocation = (latitude, longitude, query = '') => {
  return {
    yelp: yelp(latitude, longitude, query),
    forecast: forecast(latitude, longitude),
    guide: guide(latitude, longitude),
  };
};

export { travel, geolocation, photos };
