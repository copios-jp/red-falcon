import React from 'react'
import { Component } from 'react'
import Timer from '../../../services/timer/'
import { withStyles } from '@material-ui/core/styles'
import styles from '../../styles/'

import { getZone } from '../../../services/analytics/'

const pad = (integer) => {
  return integer < 10 ? `0${integer}` : integer.toString()
}

class StopWatch extends Component {
  componentDidMount() {
    this.timer.on('tick', () => this.forceUpdate())
    this.timer.start()
  }

  componentWillUnmount() {
    this.timer.stop()
  }

  timer = new Timer()

  getFormattedTime() {
    const timerValue = this.timer.value
    const minutes = Math.round(timerValue / 60)
    const seconds = Math.round(timerValue % 60)
    return `${pad(minutes)}:${pad(seconds)}`
  }

  componentDidUpdate(prevProps) {
    if (getZone(prevProps.sensor) != getZone(this.props.sensor)) {
      this.timer.reset()
    }
  }

  render = () => {
    const { classes } = this.props
    return <div className={classes.timer}>{this.getFormattedTime()}</div>
  }
}

export default withStyles(styles)(StopWatch)
