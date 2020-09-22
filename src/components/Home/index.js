import React, { useEffect } from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Authentication/Session';
import Search from '../Axios/Components/Search'

const HomePage = () => {

  return (
    <div>
      <h1>Home Page</h1>
      <p>The Home Page is accessible by every signed in user.</p>
      <Search />
    </div>
  );
};

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
