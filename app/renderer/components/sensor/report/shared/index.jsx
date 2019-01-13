import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from '../../../../styles'
import { Typography } from '@material-ui/core'

export const DataGroup = withStyles(styles)(({ classes, icon, header, data, width = '32%' }) => (
  <div className={classes.reportDataGroup} style={{ width: width }}>
    <div className={classes.reportDataGroupHeader}>
      {icon}
      <Typography color="inherit" variant="body1">
        {header}
      </Typography>
    </div>
    <div className={classes.reportDataGroupData}>{data}</div>
  </div>
))

export const TitledRow = withStyles(styles)(
  ({ classes, title, text, inline = false, color = 'inherit' }) => (
    <div
      className={classes.reportRow}
      style={{ textAlign: 'left', display: inline ? 'flex' : 'block' }}>
      <Typography color={color} variant="body1" className={classes.titledRowTitle}>
        {title}
      </Typography>
      <Typography color={color} variant="body1" className={classes.titledRowText}>
        {' '}
        {text}{' '}
      </Typography>
    </div>
  ),
)
