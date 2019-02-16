import React, { Component } from 'react'

import { AppBar as Bar, IconButton } from '@material-ui/core'
import { PowerSettingsNew } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

import { Activate, Deactivate } from '../../services/ipc'

import styles from './styles'

export class AppBar extends Component {
  render() {
    const { classes } = this.props
    const { isActivated } = this.state
    const powerButtonClass = isActivated ? 'powerButtonOn' : 'powerButtonOff'

    return (
      <Bar position="static" className={classes.root} color="primary">
        <div className={classes.buttonBar}>
          <div>TOOD: Sensor Grid Edit</div>
          <IconButton aria-label="Activate" onClick={this._onPowerButtonClicked}>
            <PowerSettingsNew className={classes[powerButtonClass]} />
          </IconButton>
        </div>
      </Bar>
    )
  }

  state = {
    isActivated: false,
  }

  toggleActivation = () => {
    const state = { ...this.state }
    const { isActivated } = state
    const nextState = { ...state, isActivated: !isActivated }
    const ipcCommand = isActivated ? Deactivate : Activate
    this.setState(nextState, ipcCommand)
  }

  _onPowerButtonClicked = () => {
    this.toggleActivation()
  }
}

export default withStyles(styles)(AppBar)
