import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useGlobalState } from './Context/globalContext';
import {getUser, useQuery, prefetchUser} from './utils/reactQuery'
import {Header} from './components/header/header.component.jsx';
import {EditModal} from './components/modal/modal.edit'
import {Spinner} from './components/spinner/spinner.component.jsx';
import {tags} from './utils/helperFns'
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { GlobalStyle } from './global.styles';
import {Container} from '@material-ui/core'

const HomePage = lazy(() => import('./pages/home/home.page.jsx'));
const EditPage = lazy(() => import('./pages/edit/edit.page.jsx'));
const CreatePage = lazy(() => import('./pages/create/create.page.jsx'));
const TestPage = lazy(() => import('./pages/test/test.page.jsx'));
const TestSetupPage = lazy(() => import('./pages/testSetup/testSetup.page.jsx'));

const App = ({ fetchUser }) => {

  const {state, dispatch} = useGlobalState();
  const { editCardMode, editCardIndex, userName } = state;
  console.log([state, dispatch])
  console.log(state.tags)

  // const { status, data = {}, error, isFetching } = useQuery("user", () => getUser(userName), {stateTime: 120000});
  // console.log([status, data, error, isFetching]);
  // const { tests = [], userStatus = "", cards = [] } = data;

  prefetchUser(userName, state.tags, (cards) =>  dispatch({type: "tags", payload: tags(cards)}))
 
  return (
    <Container maxWidth="xl" style={{padding: '0px'}}>  
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' component={() => <HomePage />} />
            <Route exact path='/edit' component={() => <EditPage />} />
            <Route exact path='/create' component={() => <CreatePage />} />
            <Route exact path='/test' component={() => <TestPage />} />
            <Route exact path='/testSetup' component={() => <TestSetupPage />} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
      <EditModal dispatch={dispatch} tags={state.tags} editCardMode={editCardMode} editCardIndex={editCardIndex}/>
    </Container>
  );
};

export default App;