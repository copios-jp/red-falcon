import * as React from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import { PowerSettingsNew } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

import styles from '../../styles/'

/*
 *
 * FOR DEV ONLY
 */
import { Button } from '@material-ui/core'
import { History } from '@material-ui/icons'

import Report from '../sensor/report'
import sensor from '../../tooling/fixtures/training'
sensor.showReport = false
/*
 *
 *  END FOR DEV
 */

const TopBar = (props) => {
  const { isActive, toggle, classes } = props
  return (
    <AppBar position="static" style={{ WebkitAppRegion: 'drag' }} color="primary">
      <Toolbar variant="dense" disableGutters={true}>
        <Typography variant="h6" className={classes.appTitle} />

        {sensor.showReport && (
          <Report
            sensor={sensor}
            handleChange={() => {
              sensor.showReport = false
              toggle()
            }}
          />
        )}
        <Button
          className={classes.recordButton}
          onClick={() => {
            sensor.showReport = !sensor.showReport
            toggle()
          }}
          color="inherit">
          <History />
        </Button>
        <IconButton aria-label="Menu" onClick={toggle}>
          <PowerSettingsNew color={isActive ? 'action' : 'inherit'} />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(TopBar)
