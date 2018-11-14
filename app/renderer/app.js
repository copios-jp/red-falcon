import React from 'react';
import ReactDOM from 'react-dom';
import SensorsView from './components/SensorsView';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

const theme = createMuiTheme({
  palette: {
    primary: { main: '#ff8f00'},
    // primary: { main: '#0277bd'},
    // secondary: { main: '#90caf9' },
    type: 'dark'
  },
  typography: {
    useNextVariants: true,
  },
})


ReactDOM.render(
  <React.Fragment>
    <CssBaseline/>
    <MuiThemeProvider theme={theme}>
      <SensorsView/>
    </MuiThemeProvider>
  </React.Fragment>,
  rootElement,
);
