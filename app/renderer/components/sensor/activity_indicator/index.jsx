import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Badge } from '@material-ui/core'
import styles from '../../../styles'
import badgeStyles from './styles'

const StyledBadge = withStyles(badgeStyles)(Badge)

export const ActivityIndicator = (props) => {
  const { classes, active } = props
  return (
    <StyledBadge
      className={classes.activityIndicator}
      color="primary"
      badgeContent={' '}
      invisible={!active}>
      <span />
    </StyledBadge>
  )
}

export default withStyles(styles)(ActivityIndicator)
