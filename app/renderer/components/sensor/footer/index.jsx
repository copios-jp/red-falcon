import React from 'react'
import { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import styles from '../../../styles/'
import Rate from './rate'

export class Footer extends Component {
  shouldComponentUpdate(nextProps) {
    const nextSensor = nextProps.sensor
    const { sensor } = this.props
    return nextSensor.rate !== sensor.rate || nextSensor.recording
  }

  render() {
    const { classes, sensor } = this.props
    return (
      <div className={classes.cardBar}>
        <Rate rate={sensor.rate} />
      </div>
    )
  }
}

export default withStyles(styles)(Footer)
