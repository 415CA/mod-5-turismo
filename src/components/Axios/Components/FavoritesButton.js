import React, { useState } from 'react';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import firebase from 'firebase';

const FavoritesButton = (destination) => {
  const [click, setClick] = useState(false);
  const [id, setId] = useState(0);
  const name = destination.name;
  const latitude = destination.latitude;
  const longitude = destination.longitude;

  const deleteRequest = () => {
    axios
      .delete(`/destinations/${id}`)
      .then((response) => console.log('Delete', response));
    setClick(false);
  };

  const postRequest = () => {
    axios
      .post('http://localhost:3000/destinations', {
        name: name,
        latitude: latitude,
        longitude: longitude,
      })
      .then((response) => {
        setId(response.data.id);
        console.log('Post', response.data);
      });
    setClick(true);
  };

  const changeColor = (destination) => {
    return click ? (
      <IconButton
        name="add"
        circular
        onClick={() => deleteRequest(destination)}
      >
        <BookmarkIcon />
      </IconButton>
    ) : (
      <IconButton
        name="add"
        type="submit"
        circular
        onClick={() => postRequest(destination)}
      >
        <BookmarkBorderOutlinedIcon />
      </IconButton>
    );
  };

  return <div>{changeColor(destination)}</div>;
};

export default FavoritesButton;
