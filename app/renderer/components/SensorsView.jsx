import * as React from 'react'
import { Component } from 'react'
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
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.wrapper}>
        <TopBar {...this.state} toggle={this.toggleActivation} />
        <SensorList />
        <StatusBar {...this.state} />
      </div>
    )
  }

  state = {
    receivers: [],
    isActive: false,
  }

  toggleActivation = () => {
    const action = this.state.receivers.length ? 'deactivate' : 'activate'
    this[action]()
  }
}

export default withStyles(styles)(SensorsView)
