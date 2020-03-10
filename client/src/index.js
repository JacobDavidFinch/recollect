import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { store } from './redux/store';
import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#2D4739',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#09814A',
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <PersistGate persistor={persistor}> */}
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      {/* </PersistGate> */}
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();

