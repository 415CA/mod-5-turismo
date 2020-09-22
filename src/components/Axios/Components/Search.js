import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Guardian from './Guardian';
import Weather from './Weather';
import Unsplash from './Unsplash';
import Yelp from './Yelp';
import Michelin from './Michelin'
import NYTimes from './NYTimes';
import GoogleMap from './GoogleMap'

const Search = () => {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const GOOGLE = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const result = await axios(url)
      setData(result.data);
      setLatitude(result.data.results[0].geometry.location.lat);
      setLongitude(result.data.results[0].geometry.location.lng);
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return (
    <Fragment>
      <form
        onSubmit={(event) => {
          setUrl(
            `https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE}&address=${query}&inputtype=textquery&language=en`,
          );
          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <Fragment>
          <GoogleMap
            destination={query}
            latitude={latitude}
            longitude={longitude}
          />
          <Yelp destination={query} />
          <Unsplash destination={query} />
          <Guardian destination={query} />
          <Weather
            destination={query}
            latitude={latitude}
            longitude={longitude}
          />
          <Michelin
            destination={query}
            longitude={longitude}
            latitude={latitude}
          />
          <NYTimes destination={query} />
        </Fragment>
      )}
    </Fragment>
  );
}

export default Search;
