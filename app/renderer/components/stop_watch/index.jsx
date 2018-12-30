import React from 'react'
import { Component } from 'react'
import Timer from '../../../services/timer/'
import { withStyles } from '@material-ui/core/styles'
import styles from '../../styles/'
import { getZone } from '../../../services/analytics/'

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

  render = () => {
    const { classes } = this.props
    const time = new Date(this.state.time * 1000).toISOString().substr(14, 5)
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
