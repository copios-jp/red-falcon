import React from 'react'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import styles from '../../styles/'

export const StatusBar = (props) => {
  const { classes, receivers, transmitters } = props
  return (
    <div className={classes.statusBar}>
      <Typography variant="caption" className={classes.copyright}>
        &copy; COPIOS
      </Typography>
      <Typography className={classes.bottomBarItem} variant="caption">
        受信機数:{receivers.length}
      </Typography>
      <Typography className={classes.bottomBarItem} variant="caption">
        送信機数:{transmitters.length}
      </Typography>
    </div>
  )
}

export default withStyles(styles)(StatusBar)
