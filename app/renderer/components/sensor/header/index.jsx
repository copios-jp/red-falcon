import React from 'react'

import ActivityIndicator from '../activity_indicator'
import { withStyles } from '@material-ui/core/styles'
import styles from '../../../styles/'
import StopWatch from '../../stop_watch/'

export const Header = (props) => {
  const { classes, sensor } = props
  return (
    <div className={classes.cardHeader}>
      <ActivityIndicator fontSize="small" active={sensor.active} />
      <div className={classes.cardName}>{sensor.name}&nbsp;</div>
      <StopWatch sensor={sensor} />
    </div>
  )
}

export default withStyles(styles)(Header)
