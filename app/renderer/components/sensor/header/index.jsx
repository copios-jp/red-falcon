import React from 'react'
import { Component } from 'react'

import ActivityIndicator from '../activity_indicator'
import { withStyles } from '@material-ui/core/styles'
import styles from '../../../styles/'
import StopWatch from '../../stop_watch/'
import RecordButton from './record_button'
import HistoryButton from './history_button'
import { getZone } from '../../../../services/analytics/'
import { constrainedUpdate } from '../shared/'

export class Header extends Component {
  shouldComponentUpdate(nextProps) {
    const nextSensor = nextProps.sensor
    const { sensor } = this.props
    return constrainedUpdate(sensor, nextSensor, ['name', 'active', 'recording', getZone])
  }

  render() {
    const { classes, sensor } = this.props
    return (
      <div className={classes.cardBar}>
        <ActivityIndicator fontSize="small" active={sensor.active} />
        <div className={classes.cardName}>{sensor.name}&nbsp;</div>

        <HistoryButton {...this.props} />
        <RecordButton {...this.props} />
        <StopWatch sensor={sensor} />
      </div>
    )
  }
}

export default withStyles(styles)(Header)
