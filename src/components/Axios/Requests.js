const NYTIMES = process.env.REACT_APP_NYTIMES;
const GOOGLE = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const MAPBOX = process.env.REACT_APP_MAPBOX_API_KEY;
const YELP = process.env.REACT_APP_YELP_API_KEY;
const OPEN_WEATHER = process.env.REACT_APP_WEATHER;
const UNSPLASH = process.env.REACT_APP_UNSPLASH;
const VIA_MICHELIN = process.env.REACT_APP_VIA_MICHELIN
const GUARDIAN = process.env.REACT_APP_GUARDIAN;

const travel = (destination, query) => {
  return {
    nyTravelSection: `q=${destination}&fq=news_desk:("Travel")ANDglocations:(${destination})&api-key=${NYTIMES}`,
    yelpLocation: `?location=${destination}`,
    yelpBusinessSearch: `?term=${query}&location=${destination}`,
    photos: `query=${query}&order_by=relevant&orientation=landscape`,
    cityWeather: `?q=${destination}&appid=${OPEN_WEATHER}`,
    guardian: `?section=travel&order-by=newest&show-elements=all&q=${destination}&api-key=${GUARDIAN}`,
  };
};

const coordinates = (latitude, longitude, query) => {
  
  return {
    yelpLocation: `?term=${query}&sort_by=rating&latitude=${latitude}&longitude=${longitude}`,
    weather: `?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER}`,
    michelinGuide: `center=${latitude}:${longitude}&nb=100&dist=50000&source=RESGR&filter=AGG.provider%20eq%20RESGR&charset=UTF-8&ie=UTF-8&authKey=${VIA_MICHELIN}`,
  };
}