import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { withProps } from 'recompose';

import Auth from './Containers/AuthContainer';
import Profile from './Containers/ProfileContainer';

import authDoor from './authDoorHOC';

const NoMatch = () => (
  <section className="vh-100 bg-washed-blue baskerville">
    <header className="tc ph5 lh-copy">
        <h1 className="f1 f-headline-l code mb3 fw9 dib tracked-tight light-purple">404</h1>
        <h2 className="tc f1-l fw1">Sorry, we can't find the page you are looking for.</h2>
    </header>
  </section>
);

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} />} />
);

const RedirectToLogin = withProps({ to: '/login' })(Redirect);
const PrivateRoute = authDoor(AuthenticatedRoute, RedirectToLogin)();

const App = () => (
  <Router>
    <Switch>
      <PrivateRoute exact path="/" component={Profile}/>
      <Route exact path="/login" component={Auth}/>
      <Route exact path="/signup" component={Auth}/>
      <Route component={NoMatch}/>
    </Switch>
  </Router>
)

export default App;
