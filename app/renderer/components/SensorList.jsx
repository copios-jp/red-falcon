import * as React from 'react'
import { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Edit from './sensor/edit/'
import Sensor from './sensor/'
import styles from '../styles/'
import bind from '../helpers/bind'
// import Edit from './sensor/edit/'

export class SensorList extends Component {
  componentDidMount() {
    bind.call(this, 'on')
  }

  componentWillUnmount() {
    bind.call(this, 'off')
  }

  mainEvents = {
    onTransmitter: ['transmitter-added', 'transmitter-removed'],
  }

  stopEditing = (data) => {
    this.state.editing.setState((state) => {
      return { ...state, ...data }
    })

    this.setState((state) => {
      return { ...state, editing: undefined }
    })
  }

  editSensor = (sensor) => {
    this.setState((state) => {
      return { ...state, editing: sensor }
    })
  }

  render() {
    const { classes } = this.props
    const { transmitters, editing } = this.state
    const cols = Math.ceil(Math.sqrt(transmitters.length))
    const rows = Math.ceil(transmitters.length / cols)
    return (
      <div className={classes.root}>
        <div className={classes.grid}>
          {transmitters.map((transmitter, index) => (
            <Sensor
              cardClass={`card_${rows}_${cols}`}
              key={index}
              channel={transmitter.sensor.channel}
              sensorClass={`sensor_${transmitters.length}`}
              onClick={this.editSensor}
            />
          ))}
          {editing && <Edit sensor={editing} onDone={this.stopEditing} />}
        </div>
      </div>
    )
  }

  state = {
    transmitters: [],
    editing: undefined,
  }
}

export default withStyles(styles)(SensorList)
