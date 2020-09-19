import axios from 'axios';

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

var config = {
  method: 'get',
  url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${GOOGLE_API_KEY}&input=${search}&inputtype=textquery&language=en&locationbias=circle:500@${longitude},${latitude}&fields=name,icon,photos,geometry,place_id,opening_hours,price_level,rating,formatted_address`,
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

const googleMap = axios.create({
  baseURL: 
})
