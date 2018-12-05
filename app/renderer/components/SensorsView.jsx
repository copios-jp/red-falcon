import * as React from 'react'
import { Component } from 'react'
import { Paper, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import SensorList from './SensorList'
import TopBar from './top_bar/'

import styles from '../styles/'
import { ipcRenderer } from 'electron'

export class SensorsView extends Component {
  state = {
    receiverCount: 0,
    transmitterCount: 0,
    isActive: false,
  }

  componentDidMount() {
    ipcRenderer.on('receiver-added', this.onReceiver)
    ipcRenderer.on('receiver-removed', this.onReceiver)
    ipcRenderer.on('transmitter-added', this.onTransmitter)
    ipcRenderer.on('transmitter-removed', this.onTransmitter)
    ipcRenderer.on('scanner-deactivated', this.onScannerDeactivated)
    ipcRenderer.on('scanner-activated', this.onScannerActivated)
  }

  componentWillUnmount() {
    ipcRenderer.off('receiver-added', this.onReceiver)
    ipcRenderer.off('receiver-removed', this.onReceiver)
    ipcRenderer.off('transmitter-added', this.onTransmitter)
    ipcRenderer.off('transmitter-removed', this.onTransmitter)
    //ipcRenderer.send('deactivate')
  }

  activate = () => {
    ipcRenderer.send('activate')
  }

  deactivate = () => {
    ipcRenderer.send('deactivate')
  }

  onScannerDeactivated = () => {
    this.setState((state) => {
      return { ...state, isActive: false }
    })
  }

  onScannerActivated = () => {
    this.setState((state) => {
      return { ...state, isActive: true }
    })
  }

  onReceiver = (event, receiver, receivers) => {
    this.setState((state) => {
      return { ...state, receiverCount: receivers.length, isActive: receivers.length > 0 }
    })
  }

  onTransmitter = (event, transmitter, transmitters) => {
    this.setState((state) => {
      return { ...state, transmitterCount: transmitters.length }
    })
  }

  toggleActivation = () => {
    const action = this.state.isActive ? 'deactivate' : 'activate'
    this[action]()
    this.setState((state) => {
      return { ...state, isActive: !state.isActive }
    })
  }
  render() {
    const { classes } = this.props
    const activated = this.state.isActive

    const add = () => {}
    //  this.addFakeSensor ? this.addFakeSensor.bind(this) : () => {}

    return (
      <div className={classes.wrapper}>
        <TopBar activated={activated} toggle={this.toggleActivation} add={add} />
        <Paper className={classes.content}>
          <SensorList channels={[]} activated={activated} />
          <div className={classes.bottomBar}>
            <Typography variant="caption" className={classes.copyright}>
              &copy; COPIOS
            </Typography>
            <Typography className={classes.bottomBarItem} variant="caption">
              受信機数:{this.state.receiverCount}
            </Typography>
            <Typography className={classes.bottomBarItem} variant="caption">
              送信機数:{this.state.transmitterCount}
            </Typography>
          </div>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(SensorsView)
