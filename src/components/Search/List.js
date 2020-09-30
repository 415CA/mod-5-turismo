import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MediaGrid } from '../Cards';

const List = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const setQuery = props.setQuery

  var config = {
    method: 'get',
    url: 'http://localhost:3000/destinations',
  };

  useEffect(() => {
    async function getCities() {
      setIsLoading(true);
      const request = await axios(config)
        .then((response) => {
          setCities(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
      return request;
    }
    getCities();
  }, []);

  return <MediaGrid destinations={cities} setQuery={setQuery}/>;
};

export default List;
