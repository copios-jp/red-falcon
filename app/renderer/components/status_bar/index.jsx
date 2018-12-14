import React from 'react'
import { Component } from 'react'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import bind from '../../helpers/bind'
import styles from '../../styles/'

export class StatusBar extends Component {
  componentDidMount() {
    bind.call(this, 'on')
  }

  componentWillUnmount() {
    bind.call(this, 'off')
  }

  mainEvents = {
    onTransmitter: ['transmitter-added', 'transmitter-removed'],
    onReceiver: ['receiver-added', 'receiver-removed'],
    onVersion: ['version'],
  }

  onVersion = (event, version) => {
    this.setState({ ...this.state, version })
  }

  render = () => {
    const { classes } = this.props
    const { receivers, transmitters, version } = this.state
    return (
      <div className={classes.statusBar}>
        <Typography variant="caption" className={classes.copyright}>
          &copy; COPIOS v{version}
        </Typography>
        <Typography className={classes.bottomBarItem} variant="caption">
          受信機数: {receivers.length}
        </Typography>
        <Typography className={classes.bottomBarItem} variant="caption">
          送信機数: {transmitters.length}
        </Typography>
      </div>
    )
  }

  state = {
    receivers: [],
    transmitters: [],
    version: '-',
  }
}

export default withStyles(styles)(StatusBar)
