import { ipcRenderer } from 'electron'
import * as React from 'react'
import { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import TopBar from './top_bar/'
import SensorList from './SensorList'
import StatusBar from './status_bar/'

import styles from '../styles/'
import bind from '../helpers/bind'

export class SensorsView extends Component {
  activate = () => {
    ipcRenderer.send('deactivate')
    ipcRenderer.send('activate')
  }

  componentDidMount() {
    bind.call(this, 'on')
  }

  componentWillUnmount() {
    bind.call(this, 'off')
  }

  deactivate = () => {
    ipcRenderer.send('deactivate')
  }

  mainEvents = {
    updateActive: ['receiver-added', 'receiver-removed'],
  }

  render() {
    const { classes } = this.props
    const { isActive } = this.state
    return (
      <div className={classes.wrapper}>
        <TopBar isActive={isActive} toggle={this.toggleActivation} />
        <SensorList />
        <StatusBar />
      </div>
    )
  }

  state = {
    isActive: false,
  }

  toggleActivation = () => {
    const { isActive } = this.state
    return isActive ? this.deactivate() : this.activate()
  }

  updateActive = (event, receiver, receivers) =>
    this.setState((state) => ({ ...state, isActive: receivers.length > 0 }))
}

export default withStyles(styles)(SensorsView)
