import React from 'react'
import { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { Stop, CameraEnhance } from '@material-ui/icons'
import styles from '../../../../styles'
import Timer from '../../../../../services/timer'

export class RecordButton extends Component {
  timer = new Timer('1s')

  startRecording = () => {
    this.props.handleChange({ history: [] })
    this.timer.on('tick', this.props.recordSnapshot)
    this.timer.start()
  }

  stopRecording = () => {
    this.timer.stop()
  }

  toggleRecording = () => {
    const {
      sensor: { recording },
    } = this.props

    if (recording) {
      this.stopRecording()
    } else {
      this.startRecording()
    }

    this.props.handleChange({ recording: !recording })
  }

  onClick = (e) => {
    e.stopPropagation()
    this.toggleRecording()
  }

  getIcon = () => {
    return this.props.sensor.recording ? <Stop /> : <CameraEnhance />
  }

  canRecord = () => {
    const required = ['name', 'age', 'weight', 'sex']
    for (let i = 0, l = required.length; i < l; i++) {
      const field = required[i]
      if (!this.props.sensor[field]) return false
    }
    return true
  }

  render = () => {
    const { classes } = this.props
    return (
      <Button
        className={classes.recordButton}
        onClick={this.onClick}
        color="inherit"
        disabled={!this.canRecord()}>
        {this.getIcon()}
      </Button>
    )
  }
}

export default withStyles(styles)(RecordButton)
