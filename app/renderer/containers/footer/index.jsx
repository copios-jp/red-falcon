import React from 'react'

import { Component } from 'react'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'
import { bind } from '../../services/ipc'

export class Footer extends Component {
  componentDidMount = () => {
    bind('on', this._ipcEvents)
  }

  componentWillUnmount = () => {
    bind('off', this._ipcEvents)
  }

  onAntEvent = (event, args) => {
    this.setState({ ...this.state, ...args })
  }

  onVersion = (event, version) => {
    this.setState({ ...this.state, version })
  }

  render = () => {
    const { classes } = this.props
    const { receivers, transmitters, version } = this.state
    return (
      <div className={classes.root}>
        <Typography className={classes.copyright} variant="caption" aria-label="copyright">
          &copy; COPIOS v{version}
        </Typography>
        <Typography className={classes.item} variant="caption" aria-label="receiver count">
          受信機数: {receivers.length}
        </Typography>
        <Typography className={classes.item} variant="caption" aria-label="transmitter count">
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

  _ipcEvents = {
    'receiver:added': this.onAntEvent,
    'receiver:removed': this.onAntEvent,
    'transmitter:removed': this.onAntEvent,
    'transmitter:added': this.onAntEvent,
    version: this.onVersion,
  }
}

export default withStyles(styles)(Footer)
