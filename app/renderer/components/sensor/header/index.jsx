import React from 'react'

import ActivityIndicator from '../activity_indicator'
import { withStyles } from '@material-ui/core/styles'
import styles from '../../../styles/'

export const Header = (props) => {
  const { classes, sensor } = props
  return (
    <div className={classes.cardHeader}>
      <ActivityIndicator fontSize="small" active={sensor.active} />
      <div className={classes.cardName}>{sensor.name}&nbsp;</div>
    </div>
  )
}

export default withStyles(styles)(Header)
