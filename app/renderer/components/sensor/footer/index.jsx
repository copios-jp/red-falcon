import React from 'react'

import { Favorite } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
import styles from '../../../styles/'

export const Footer = (props) => {
  const { classes, sensor } = props
  return (
    <div className={classes.cardFooter}>
      <Favorite fontSize="small" />
      <span className={classes.cardRate}>{sensor.rate}</span>
    </div>
  )
}

export default withStyles(styles)(Footer)
