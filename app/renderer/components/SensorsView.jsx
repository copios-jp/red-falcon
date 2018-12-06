import * as React from 'react'
import { Component } from 'react'
import { Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import SensorList from './SensorList'
import TopBar from './top_bar/'
import StatusBar from './status_bar/'
import styles from '../styles/'
import bind from '../helpers/bind'
import { ipcRenderer } from 'electron'

export class SensorsView extends Component {
  activate = () => {
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
    onReceiver: ['receiver-added', 'receiver-removed'],
    onTransmitter: ['transmitter-added', 'transmitter-removed'],
  }

  onReceiver = (event, receiver, receivers) => {
    this.setState((state) => {
      return { ...state, receivers }
    })
  }

  onTransmitter = (event, transmitter, transmitters) => {
    this.setState((state) => {
      return { ...state, transmitters }
    })
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.wrapper}>
        <TopBar {...this.state} toggle={this.toggleActivation} />
        <Paper className={classes.content}>
          <SensorList />
          <StatusBar {...this.state} />
        </Paper>
      </div>
    )
  }

  state = {
    receivers: [],
    transmitters: [],
    isActive: false,
  }

  toggleActivation = () => {
    const action = this.state.receivers.length ? 'deactivate' : 'activate'
    this[action]()
  }
}

export default withStyles(styles)(SensorsView)
