import React from 'react'

import ActivityIndicator from '../activity_indicator'
import { withStyles } from '@material-ui/core/styles'
import styles from '../../../styles/'

export const Header = (props) => {
  const { classes, sensor } = props
  return (
    <div className={classes.cardHeader}>
      {sensor.name}
      <ActivityIndicator active={sensor.active} />
    </div>
  )
}

export default withStyles(styles)(Header)
