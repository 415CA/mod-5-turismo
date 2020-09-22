import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
// import { GoogleMap, Marker } from 'react-google-maps';

const GoogleMap = (search) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const query = search.destination;
  const GOOGLE = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  return (
    <Fragment>
      <div id="map"></div>
      <iframe
        width="450"
        height="600"
        frameborder="0"
        src={`https://www.google.com/maps/embed/v1/search?key=${GOOGLE}&q=${query}`}
        allowfullscreen
      ></iframe>
    </Fragment>
  );
};

export default GoogleMap;
