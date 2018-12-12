import * as React from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import { PowerSettingsNew } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

import styles from '../../styles/'

const TopBar = (props) => {
  const { isActive, toggle, classes } = props
  return (
    <AppBar position="static" style={{ WebkitAppRegion: 'drag' }} color="primary">
      <Toolbar variant="dense" disableGutters={true}>
        <Typography variant="h6" className={classes.appTitle} />
        <IconButton aria-label="Menu" onClick={toggle}>
          <PowerSettingsNew color={isActive ? 'action' : 'inherit'} />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(TopBar)
