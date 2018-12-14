import React from 'react'
import { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { Stop, CameraEnhance } from '@material-ui/icons'
import styles from '../../../styles'
import bind from '../../../helpers/bind'
import { snapshot } from '../../../../services/analytics/'

export class RecordButton extends Component {
  componentDidMount() {
    bind.call(this, 'on')
  }

  componentWillUnmount() {
    bind.call(this, 'off')
  }

  mainEvents = {
    onTransmitterData: ['transmitter-data'],
  }

  onTransmitterData = (event, transmitter) => {
    const {
      sensor: { channel },
    } = transmitter

    if (channel === this.props.sensor.channel && this.state.isRecording) {
      //  We could use a timer for dense data or this for sparce data
      //  Need to do some research on storage limits
      //
      // real-time updaing graph of heart rate% last 60 data points or so?
      //
      console.log(snapshot(this.props.sensor))
    }
  }

  onClick = (e) => {
    e.stopPropagation()
    this.setState({ isRecording: !this.state.isRecording })
  }

  getIcon = () => {
    return this.state.isRecording ? <Stop /> : <CameraEnhance />
  }

  render = () => {
    const { classes } = this.props
    return (
      <Button className={classes.recordButton} onClick={this.onClick} color="primary">
        {this.getIcon()}
      </Button>
    )
  }

  state = {
    isRecording: false,
  }
}

export default withStyles(styles)(RecordButton)
