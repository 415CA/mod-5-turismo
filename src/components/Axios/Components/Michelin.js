import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

const Michelin = (search) => {
  const [isLoading, setIsLoading] = useState(false);
  const [listings, setListings] = useState({});
  const query = search.destination;
  const latitude = search.latitude;
  const longitude = search.longitude;
  const VIA_MICHELIN = process.env.REACT_APP_VIA_MICHELIN;

  var config = {
    method: 'get',
    url: `https://secure-apir.viamichelin.com/apir/2/findPoi.json2/RESTAURANT/eng?center=${longitude}:${latitude}&nb=100&dist=50000&source=RESGR&filter=AGG.provider%20eq%20RESGR&charset=UTF-8&ie=UTF-8&authKey=${VIA_MICHELIN}`,
  };

  useEffect(() => {
    async function getListings() {
      setIsLoading(true);
      const request = await axios(config)
        .then((response) => {
          setListings(response);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
      return request;
    }
    getListings();
  }, []);

  return (
    <div>
      <h2>Michelin</h2>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <Fragment>
          <h3>{query}</h3>
          <div></div>
        </Fragment>
      )}
    </div>
  );
};

export default Michelin;
