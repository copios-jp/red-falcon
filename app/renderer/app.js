import React from 'react'
import ReactDOM from 'react-dom'
import tooling from './tooling/'
import { ipcRenderer } from 'electron'

import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import SensorsView from './components/SensorsView'
import theme from './theme'

const container = document.currentScript.getAttribute('data-container')
const rootElement = document.querySelector(container)

tooling.logger = console.log

ipcRenderer.on('receiver', (event, receiver) => {
  console.log('receiver')
})
ipcRenderer.on('transmitter', (event, transmitter) => {
  console.log('transmitter')
})
ipcRenderer.on('data-transmitted', (event, transmitter) => {})

ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <SensorsView />
    </MuiThemeProvider>
  </React.Fragment>,
  rootElement,
)
