import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Authentication/Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../Authentication/SignUp';
import SignInPage from '../Authentication/SignIn';
import PasswordForgetPage from '../Authentication/PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Authentication/Account';
import AdminPage from '../Authentication/Admin';
import Destinations from '../Destinations';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Authentication/Session';
import Search from '../Axios/Components/Search';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route exact
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route exact path={ROUTES.ADMIN} component={AdminPage} />
      <Route exact path={ROUTES.SEARCH} component={Search} />
      <Route
        exact
        path={ROUTES.DESTINATION_DETAILS}
        component={Destinations}
      />
    </div>
  </Router>
);

export default withAuthentication(App);
