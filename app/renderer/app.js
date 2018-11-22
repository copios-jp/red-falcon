import React from 'react'
import ReactDOM from 'react-dom'
import tooling from './tooling/'

import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import SensorsView from './components/SensorsView'
import theme from './theme'

const container = document.currentScript.getAttribute('data-container')
const rootElement = document.querySelector(container)

tooling.apply()

ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <SensorsView />
    </MuiThemeProvider>
  </React.Fragment>,
  rootElement,
)
