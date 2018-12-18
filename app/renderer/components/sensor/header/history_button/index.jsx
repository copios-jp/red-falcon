import React from 'react'
import { Component } from 'react'
import { Button } from '@material-ui/core'
import { History } from '@material-ui/icons'

export class HistoryButton extends Component {
  onClick = (e) => {
    e.stopPropagation()
    this.props.handleChange({ showReport: true })
  }

  render = () => {
    const { classes, sensor } = this.props
    return (
      <Button
        className={classes.recordButton}
        onClick={this.onClick}
        color="inherit"
        disabled={!sensor.history.length || sensor.recording}>
        <History />
      </Button>
    )
  }
}

export default HistoryButton
