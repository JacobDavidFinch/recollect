import React from 'react'
import { render } from '@testing-library/react'
import { GlobalProvider } from './Context/globalContext';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

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

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
        <GlobalProvider>
            {children}
        </GlobalProvider>
  </ThemeProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }