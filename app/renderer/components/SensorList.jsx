import * as React from 'react'
import { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import Edit from './sensor/edit/'
import Sensor from './sensor/'

import styles from '../styles/'
import bind from '../helpers/bind'

export class SensorList extends Component {
  componentDidMount() {
    bind.call(this, 'on')
  }

  componentWillUnmount() {
    bind.call(this, 'off')
  }

  editSensor = (sensor) => {
    if(!sensor.state.isRecording) {
      this.setState((state) => ({ ...state, editing: sensor }))
    }
  }

  mainEvents = {
    onTransmitter: ['transmitter-added', 'transmitter-removed'],
  }

  render() {
    const { classes } = this.props
    const { transmitters, editing } = this.state
    const shape = this.shape()

    return (
      <div className={classes.root}>
        <div className={classes.grid}>
          {transmitters.map((transmitter, index) => (
            <Sensor
              cardClass={`card_${shape.rows}_${shape.cols}`}
              key={index}
              channel={transmitter.sensor.channel}
              onClick={this.editSensor}
            />
          ))}
          {editing && <Edit sensor={editing} onDone={this.stopEditing} />}
        </div>
      </div>
    )
  }

  shape = () => {
    const { transmitters } = this.state
    const cols = Math.ceil(Math.sqrt(transmitters.length))
    const rows = Math.ceil(transmitters.length / cols)

    return {
      rows,
      cols,
    }
  }

  state = {
    transmitters: [],
    editing: undefined,
  }

  stopEditing = (data) => {
    this.state.editing.handleChange(data)

    this.setState((state) => {
      return { ...state, editing: undefined }
    })
  }
}

export default withStyles(styles)(SensorList)
