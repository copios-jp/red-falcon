import React from 'react'
import { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { History } from '@material-ui/icons'
import styles from '../../../styles'
import { getReport } from '../../../../services/analytics'
export class HistoryButton extends Component {
  onClick = (e) => {
    e.stopPropagation()
    console.log(getReport(this.props.sensor.history))
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

export default withStyles(styles)(HistoryButton)
