import * as React from 'react'
import { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { GridList } from '@material-ui/core'
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

  stopEditing = () => {
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
    return (
      <GridList cellHeight={'auto'} padding={0} className={classes.gridList}>
        { transmitters.map((transmitter, index) => (
          <Sensor
            key={index}
            channel={transmitter.sensor.channel}
            sensorClass={`sensor_${transmitters.length}`}
            onClick={this.editSensor}
          />
        ))}
        { editing &&
          <Edit sensor={editing} onDone={this.stopEditing} />
        }
      </GridList>)
  }

  state = {
    transmitters: [],
    editing: undefined,
  }
}

export default withStyles(styles)(SensorList)
