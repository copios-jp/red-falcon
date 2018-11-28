// import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Component } from 'react'
import Edit from './edit/'
import { withStyles } from '@material-ui/core/styles'
import { GridListTile } from '@material-ui/core'
import { GridListTileBar } from '@material-ui/core'
import { Paper } from '@material-ui/core'

import classNames from 'classnames'

const ages = []
import styles from '../../styles/'
ages[5329145] = 37
ages[5329182] = 44

function getZoneFor(sensor) {
  if (!sensor.age && sensor.SerialNumber) {
    sensor.age = ages[sensor.SerialNumber]
  }

  const rate = sensor.ComputedHeartRate
  const max = 220 - sensor.age || 44

  let index = 0
  let zone = 'rest'

  const labels = ['recovery', 'aerobic', 'anaerobic', 'max']
  const zones = [max * 0.6, max * 0.7, max * 0.8, max * 0.9]

  while (rate > zones[index]) {
    zone = labels[index]
    index++
  }

  return zone
}

class Sensor extends Component {
  constructor(props) {
    super(props)
    const { channel } = props
    this.state = {
      channel,
      isEditing: false,
    }
  }

  componentDidMount() {
    const sensor = this.state.channel.sensor
    sensor.on('hbData', this.handleDataUpdate)
  }

  edit = () => {
    this.state.channel.sensor.removeAllListeners('hbData')
    this.setState({ ...this.state, isEditing: true })
  }

  handleDataUpdate = (data) => {
    const channel = this.state.channel
    channel.data = { ...channel.data, ...data }
    console.log(channel.data)
    this.setState(this.state)
  }

  finishEdit = () => {
    this.setState({ ...this.state, isEditing: false })
    this.state.channel.sensor.on('hbData', this.handleDataUpdate)
  }

  channelId() {
    return this.state.channel.id
  }

  zoneClass() {
    const zone = getZoneFor(this.state.channel.data)
    return `rate_${zone}`
  }

  render() {
    const { classes, sensorClass } = this.props

    return (
      <Paper className={classNames(classes.gridListItem, classes.sensor, classes[sensorClass])}>
        {this.state.isEditing && (
          <Edit
            channel={this.state.channel}
            onClose={this.finishEdit}
            isOpen={this.state.isEditing}
          />
        )}
        <GridListTile onClick={this.edit}>
          <GridListTileBar
            className={classes.gridTileBar}
            title={`受信機番号:${this.channelId()}`}
          />
          <div className={classNames(classes[sensorClass], classes[this.zoneClass()])}>
            {this.state.channel.data.ComputedHeartRate}
          </div>
        </GridListTile>
      </Paper>
    )
  }
}

export default withStyles(styles)(Sensor)
