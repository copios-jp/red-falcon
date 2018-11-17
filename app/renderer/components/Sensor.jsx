// import * as PropTypes from 'prop-types'
import * as React from 'react';
import { Component } from 'react'
import EditSensor from './EditSensor'
import { withStyles } from '@material-ui/core/styles'
import { GridListTile } from '@material-ui/core';
import { GridListTileBar } from '@material-ui/core';
import { Paper } from '@material-ui/core';

import classNames from 'classnames';

const ages = []
import styles from '../styles/'
ages[5329145] = 37
ages[5329182] = 44

function getZoneFor(sensor) {
  if(!sensor.age && sensor.SerialNumber) {
    sensor.age = ages[sensor.SerialNumber]
  }

  const rate = sensor.ComputedHeartRate
  const max = 220 - sensor.age || 44

  let index = 0
  let zone = 'rest'

  const labels = ['recovery', 'aerobic', 'anaerobic', 'max']
  const zones =[max * 0.6, max * 0.7, max * 0.8, max * 0.9]

  while(rate > zones[index]) {
    zone = labels[index]
    index++
  }

  return zone
}

class Sensor extends Component {

  constructor(props) {
    super(props)
    const { channel  } = props
    this.state = {
      channel,
      isEditing: false,
    }
  }

  componentDidMount() {
    const sensor = this.state.channel.sensor
    sensor.on('hbData', this.handleDataUpdate.bind(this))
  }

  edit() {
    this.setState({...this.state, isEditing: true})
    this.state.channel.sensor.removeAllListeners('hbData')
  }

  handleDataUpdate(data) {
    const channel = this.state.channel
    channel.data = {...channel.data, ...data}
    this.setState(this.state)
  }

  finishEdit() {
    const sensor = this.state.channel.sensor
    sensor.on('hbData', this.handleDataUpdate.bind(this))
    this.setState({...this.state, isEditing: false})
  }

  heartRate() {
    return this.state.channel.data.ComputedHeartRate
  }

  channelId() {
    return this.state.channel.channelId
  }

  zoneClass() {
    const zone = getZoneFor(this.state.channel.data)
    return `rate_${zone}`
  }

  render() {
    const { classes, sensorClass } = this.props
    return (
      <Paper
        className={
          classNames(classes.gridListItem, classes.sensor, classes[sensorClass])
        } >
        { this.state.isEditing &&
          <EditSensor classes={classes} channel={this.state.channel} done={this.finishEdit.bind(this)}/>
        }

        <GridListTile onClick={this.edit.bind(this)}>
          <GridListTileBar
            className={classes.gridTileBar}
            title={`受信機番号:${this.channelId()}`}
          />
          <div className={classNames(classes[sensorClass], classes[this.zoneClass()])}>
          { this.heartRate() }
          </div>
        </GridListTile>

      </Paper>
    )
  }
}

export default withStyles(styles)(Sensor)
