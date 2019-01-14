import React from 'react'
import { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import styles from '../../../styles/'
import { getZone, getPercentageOfMax } from '../../../../services/analytics/'
import { constrainedUpdate } from '../shared/'

export class Body extends Component {
  shouldComponentUpdate(nextProps) {
    const nextSensor = nextProps.sensor
    const { sensor } = this.props
    return constrainedUpdate(sensor, nextSensor, ['max', 'method', 'rate'])
  }

  render() {
    const { classes, sensor } = this.props
    return (
      <svg style={{ flexGrow: 1 }} className={classes[`zone_${getZone(sensor)}`]}>
        <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill="lightgrey">
          {`${getPercentageOfMax(sensor)}%`}
        </text>
      </svg>
    )
  }
}

export default withStyles(styles)(Body)
