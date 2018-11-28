import * as React from 'react'
import { Component } from 'react'
import { Paper, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import SensorList from './SensorList'
import TopBar from './top_bar/'

import styles from '../styles/'
import { ipcRenderer } from 'electron'

export class SensorsView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      receiverCount: 0,
    }
  }

  activate = () => {
    if(this.isActive) {
      return
    }
    ipcRenderer.on('receiver', this.onReceiver)
    ipcRenderer.send('activate')
    this.isActive = true
  }

  onReceiver = (event, receiver, receivers) => {
    this.setState((state) => {
      return { ...state, receiverCount: receivers.length }
    })
  }

  deactivate = () => {
    if(!this.isActive) {
      return
    }
    ipcRenderer.send('deactivate')
    this.isActive = false
  }

  toggleActivation = () => {
    const action = this.isActive ? this.deactivate : this.activate
    action()
  }
  render() {
    const { classes } = this.props
    const activated = this.isActive

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
            <Typography variant="caption">受信機数{this.state.receiverCount}</Typography>
          </div>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(SensorsView)
