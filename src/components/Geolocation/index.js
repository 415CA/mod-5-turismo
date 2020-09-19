import React, { useState, useEffect } from 'react';

const CurrentLocation = () => {
    const [location, setLocation] = useState({});

    useEffect(() => {
      async function getLocation() {
        const position = await navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              timestamp: position.timestamp,
            });
          },
        );
        return position;
      }
      getLocation();
    }, []);
    console.log('Location', location);

    return location;
};

export default CurrentLocation;
