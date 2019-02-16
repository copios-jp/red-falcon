import React from 'react'
import ReactDOM from 'react-dom'

import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import { App } from './containers'

const container = document.currentScript.getAttribute('data-container')
const rootElement = document.querySelector(container)

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <App/>
  </MuiThemeProvider>,
  rootElement,
)
