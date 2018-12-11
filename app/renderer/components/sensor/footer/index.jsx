import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import styles from '../../../styles/'

export const Footer = (props) => {
  const { classes, sensor } = props
  return <div className={classes.cardFooter}>{sensor.rate}</div>
}

export default withStyles(styles)(Footer)
