import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from '../../../styles/'
import { getZone, getPercentageOfMax } from '../../../../services/analytics/'

export const Body = (props) => {
  const { classes, sensor } = props
  return (
    <svg style={{ flexGrow: 1 }} className={classes[`rate_${getZone(sensor)}`]}>
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill="lightgrey">
        {`${getPercentageOfMax(sensor)}%`}
      </text>
    </svg>
  )
}

export default withStyles(styles)(Body)
