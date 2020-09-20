import axios from 'axios';

const NYTimes = axios.create({
  baseURL:
    'https://api.nytimes.com/svc/movies/v2/reviews/search.json',
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
});

const yelp = axios.create({
  baseURL: `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search`,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
  },
});

const unsplash = axios.create({
  baseURL: 'https://api.unsplash.com/search/photos',
  headers: {
    'Accept-Version': 'v1',
    Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH}`,
    Cookie: 'ugid=0db111d9aeb22811183146d919757acc5335152',
  },
});

const openWeather = axios.create({
  baseURL: 'api.openweathermap.org/data/2.5/weather'
})

const guardian = axios.create({
  baseURL: 'https://content.guardianapis.com/search',
  headers: {
    Cookie: process.env.REACT_APP_GUARDIAN_COOKIE,
  },
});

const michelinGuide = axios.create({
  baseURL:'https://secure-apir.viamichelin.com/apir/2/findPoi.json2/RESTAURANT/eng',
});


export { NYTimes, yelp, unsplash, openWeather, guardian };
