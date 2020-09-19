import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Authentication/Session';

import Search from '../Search'

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>

    <Search />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
