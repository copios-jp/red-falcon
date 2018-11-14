import * as React from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';

import {
  PowerSettingsNew,
  Add
} from '@material-ui/icons'

import { withStyles } from '@material-ui/core/styles'
import styles from '../styles/'

const TopBar = (props) => {
  const { activated, toggle, add, classes, full } = props
  return(
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.appTitle}></Typography>
        <IconButton aria-label="Menu" onClick={toggle}>
          <PowerSettingsNew color={activated ? 'secondary' : 'inherit'} />
        </IconButton>
        {
          process.env.NODE_ENV === 'development' &&
          <IconButton color="inherit" aria-label="Menu" disabled={!activated || full} onClick={add}>
            <Add />
          </IconButton>
        }
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(TopBar)
