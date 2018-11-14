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
  const lazy = max * 0.6
  const recovery = max * 0.7
  const aerobic = max * 0.8
  const anaerobic = max * 0.9

  if(rate < lazy) {
    return 'rest'
  }
  if(rate < recovery) {
    return 'recovery'
  }
  if(rate < aerobic) {
    return 'aerobic'
  }
  if(rate < anaerobic) {
    return 'anaerobic'
  }

  return 'max'
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


  render() {
    const { data, channelId } = this.state.channel
    const { ComputedHeartRate } = data
    const { classes, sensorClass } = this.props

    const zoneClass = `rate_${getZoneFor(data)}`
    const title = `受信機番号:${channelId}`
    const edit = this.edit.bind(this)
    const finishEdit = this.finishEdit.bind(this)
    return (
      <Paper
        className={
          classNames(
            classes.gridListItem, classes.sensor, classes[sensorClass]
          )
        } >
        { this.state.isEditing &&
          <EditSensor classes={classes} channel={this.state.channel} done={finishEdit}/>
        }
        <GridListTile onClick={edit}>
          <GridListTileBar
            className={classes.gridTileBar}
            title={title}
          />
          <div className={classes[sensorClass], classes[zoneClass]}>
          { ComputedHeartRate }
          </div>
        </GridListTile>
      </Paper>
    )
  }
}

export default withStyles(styles)(Sensor)
