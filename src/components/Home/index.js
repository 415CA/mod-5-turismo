import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Authentication/Session';
import Search from '../Axios/Components/Search'
import { MediaGrid } from '../Cards';
import Destinations from '../Destinations'


const HomePage = () => {

  return (
    <div>
      <Search />
    </div>
  );
};

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
