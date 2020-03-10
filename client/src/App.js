import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {Header} from './components/header/header.component.jsx';
import {Spinner} from './components/spinner/spinner.component.jsx';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { GlobalStyle } from './global.styles';
import {Container} from '@material-ui/core'

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

const HomePage = lazy(() => import('./pages/home/home.page.jsx'));
const EditPage = lazy(() => import('./pages/edit/edit.page.jsx'));
const CreatePage = lazy(() => import('./pages/create/create.page.jsx'));
const TestPage = lazy(() => import('./pages/test/test.page.jsx'));
const TestSetupPage = lazy(() => import('./pages/testSetup/testSetup.page.jsx'));

const App = ({ checkUserSession, currentUser }) => {

  return (
    <Container maxWidth="xl">
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/edit' component={EditPage} />
            <Route exact path='/create' component={CreatePage} />
            <Route exact path='/test' component={TestPage} />
            <Route exact path='/testSetup' component={TestSetupPage} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

{/* <Route exact path='/' component={HomePage} />
<Route path='/shop' component={ShopPage} />
<Route exact path='/checkout' component={CheckoutPage} />
<Route
  exact
  path='/signin'
  render={() =>
    currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />
  }
/> */}