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
    this.timer.on('tick', this.update)
    this.timer.start()
  }

  componentDidUpdate = (prevProps) => {
    if (getZone(prevProps.sensor) != getZone(this.props.sensor)) {
      this.timer.reset()
    }
  }

  componentWillUnmount() {
    this.timer.stop()
  }

  getFormattedTime() {
    const { time } = this.state
    const minutes = Math.round(time / 60)
    const seconds = Math.round(time % 60)
    return `${pad(minutes)}:${pad(seconds)}`
  }

  render = () => {
    const { classes } = this.props
    const time = this.getFormattedTime()
    return <div className={classes.timer}>{time}</div>
  }

  state = {
    time: this.props.time || 0,
  }

  timer = new Timer()

  update = (time) => {
    this.setState({ ...this.state, time })
  }
}

export default withStyles(styles)(StopWatch)
