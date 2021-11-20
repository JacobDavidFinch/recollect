import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query-devtools'
import { GlobalProvider } from './Context/globalContext';
// import { PersistGate } from 'redux-persist/integration/react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
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
      main: '#472d3b',
    },
  },
});

ReactDOM.render(
  <BrowserRouter>
  <ReactQueryDevtools initialIsOpen={false} />
      {/* <PersistGate persistor={persistor}> */}
        <ThemeProvider theme={theme}>
          <GlobalProvider>
            <App />
          </GlobalProvider>
        </ThemeProvider>
      {/* </PersistGate> */}
    </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.register();

