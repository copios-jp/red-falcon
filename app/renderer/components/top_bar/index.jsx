import React, { Component } from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import { PowerSettingsNew } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

import styles from '../../styles/'

import { Button } from '@material-ui/core'
import { History } from '@material-ui/icons'

import Report from '../sensor/report'
import sensor from '../../tooling/fixtures/training'
sensor.showReport = false

class TopBar extends Component {
  buttons() {
    const { isActive, classes, toggle } = this.props
    return (
      <React.Fragment>
        {!isActive && (
          <Button className={classes.recordButton} onClick={this.toggleDemo} color="inherit">
            <History />
          </Button>
        )}
        <IconButton aria-label="Menu" onClick={toggle}>
          <PowerSettingsNew color={isActive ? 'action' : 'inherit'} />
        </IconButton>
      </React.Fragment>
    )
  }

  toggleDemo = () => {
    const { toggle } = this.props
    sensor.showReport = !sensor.showReport
    toggle()
  }

  render() {
    const { classes } = this.props
    return (
      <AppBar position="static" style={{ WebkitAppRegion: 'drag' }} color="primary">
        <Toolbar variant="dense" disableGutters={true}>
          <Typography variant="h6" className={classes.appTitle} />

          {sensor.showReport && <Report sensor={sensor} handleChange={this.toggleDemo} />}
          {this.buttons()}
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(TopBar)
