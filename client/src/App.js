import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useGlobalState } from './Context/globalContext';
import {getUser, useQuery} from './utils/reactQuery'
import {Header} from './components/header/header.component.jsx';
import {EditModal} from './components/modal/modal.edit'
import {Spinner} from './components/spinner/spinner.component.jsx';
import {createTags} from './utils/helperFns'
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { GlobalStyle } from './global.styles';
import {Container} from '@material-ui/core'

const HomePage = lazy(() => import('./pages/home/home.page.jsx'));
const EditPage = lazy(() => import('./pages/edit/edit.page.jsx'));
const CreatePage = lazy(() => import('./pages/create/create.page.jsx'));
const TestPage = lazy(() => import('./pages/test/test.page.jsx'));
const LoginPage = lazy(() => import('./pages/login/login.page.jsx'));
const TestSetupPage = lazy(() => import('./pages/testSetup/testSetup.page.jsx'));

const App = () => {

  const {state, dispatch} = useGlobalState();
  const { editCardMode, editCardIndex, userName, tags } = state;
  const { status, data: user = {}, error, isFetching } = useQuery("user", () => getUser(userName), {staleTime: Infinity});

  const shouldCreateTagsFromUser = user && user.cards && !tags.length;
  if(shouldCreateTagsFromUser){
    dispatch({type: "tags", payload: createTags(user.cards)});
  }

  return (
    <Container maxWidth="xl" style={{padding: '0px'}}>  
      <GlobalStyle />
      <Header isLoggedIn={!!userName} dispatch={dispatch}/>
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' component={() => <HomePage />} />
            <Route exact path='/login' component={() => <LoginPage />} />
            <Route exact path='/edit' component={() => <EditPage />} />
            <Route exact path='/create' component={() => <CreatePage />} />
            <Route exact path='/test' component={() => <TestPage />} />
            <Route exact path='/testSetup' component={() => <TestSetupPage />} />
            {!userName && (<Redirect to="/login" />)}
          </Suspense>
        </ErrorBoundary>
      </Switch>
      {userName && (<EditModal dispatch={dispatch} tags={state.tags} userName={userName} editCardMode={editCardMode} editCardIndex={editCardIndex}/>)}
    </Container>
  );
};

export default App;
