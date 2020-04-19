import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useGlobalState } from './Context/globalContext';
import {getUser, useQuery} from './utils/reactQuery'
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
  console.log([state, dispatch])
  console.log(state.tags)
  const { status, data = {}, error, isFetching } = useQuery(["user", state.userName], getUser, {stateTime: 120000});
  console.log([status, data, error, isFetching]);
  const { tests = [], userName = "", userStatus = "", cards = [] } = data;
  const { editCardMode, editCardIndex } = state;

  if(cards.length && !state.tags.length){
    dispatch({type: "tags", payload: tags(cards)});
  }
  
  return (
    <Container maxWidth="xl" style={{padding: '0px'}}>  
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' component={() => <HomePage user={data} status={status} />} />
            <Route exact path='/edit' component={() => <EditPage cards={cards} status={status}/>} />
            <Route exact path='/create' component={() => <CreatePage userName={userName} status={status} />} />
            <Route exact path='/test' component={() => <TestPage />} />
            <Route exact path='/testSetup' component={() => <TestSetupPage userName={userName} tests={tests} tags={state.tags} status={status}/>} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
      <EditModal user={data} tags={state.tags} dispatch={dispatch} editCardMode={editCardMode} editCardIndex={editCardIndex}/>
    </Container>
  );
};

// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser
// });

// const mapDispatchToProps = dispatch => ({
//   fetchUser: (user) => dispatch(fetchUser(user))
// });

export default App;