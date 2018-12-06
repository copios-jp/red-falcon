// import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Component } from 'react'
import Edit from './edit/'
import { withStyles } from '@material-ui/core/styles'
import { GridListTile } from '@material-ui/core'
import { GridListTileBar } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { ipcRenderer } from 'electron'
import classNames from 'classnames'
import _ from 'underscore'
import ActivityIndicator from './activity_indicator/'
import { heartZoneFor } from '../../services/analytics'
import styles from '../../styles/'

import { DEFAULT_ZONE_COEFFICIENTS } from '../../../constants'

import bind from '../../helpers/bind'

const ages = []
ages[5329145] = 37
ages[5329182] = 44

class Sensor extends Component {

  blink = _.debounce(() => {
    this.setState((state) => {
      return { ...state, invisible: true }
    })
  }, 1000)

  componentDidMount() {
    bind.call(this, 'on')
  }

  componentWillUnmount() {
    this.blink.cancel()
    bind.call(this, 'off')
  }

  edit = () => {
    ipcRenderer.off('transmitter-data', this.onTransmitter)
    this.setState((state) => {
      return { ...state, isEditing: true }
    })
  }

  finishEdit = (newState) => {
    ipcRenderer.on('transmitter-data', this.onTransmitter)
    this.setState((state) => {
      return { ...state, ...newState, isEditing: false }
    })
  }

  mainEvents = {
    onTransmitter: ['transmitter-data'],
  }

  onCancel = () => {
    this.finishEdit(this.state)
  }

  onSave = (state) => {
    this.finishEdit(state)
  }

  onTransmitter = (event, transmitter) => {
    if (transmitter.channel === this.state.transmitter.channel) {
      this.setState((state) => {
        return { ...state, transmitter, invisible: false }
      })
      this.blink()
    }
  }

  render() {
    const { classes, sensorClass } = this.props
    const { isEditing, transmitter, invisible } = this.state
    const { ComputedHeartRate } = transmitter
    const zoneClass = `rate_${this.zoneLabel()}`
    return (
      <Paper
        elevation={4}
        className={classNames(classes.gridListItem, classes.sensor, classes[sensorClass])}>
        {isEditing && (
          <Edit
            sensor={{ ...this.state }}
            onSave={this.onSave}
            onCancel={this.onCancel}
            isOpen={isEditing}
          />
        )}
        <GridListTile onClick={this.edit}>
          <GridListTileBar
            className={classes.gridTileBar}
            title={`${Math.round((ComputedHeartRate / (220 - this.state.age)) * 100)}%`}
          />
          <ActivityIndicator
            className={classes.dataIndicator}
            color="primary"
            badgeContent={''}
            invisible={invisible}>
            <span />
          </ActivityIndicator>
          <Typography className={classes.userName}>{this.state.name}&nbsp;</Typography>
          <div className={classNames(classes[sensorClass], classes[zoneClass])}>
            {ComputedHeartRate}
          </div>
        </GridListTile>
      </Paper>
    )
  }

  state = {
    transmitter: this.props.transmitter,
    isEditing: false,
    invisible: true,
    age: 0,
    zoneCoefficients: [...DEFAULT_ZONE_COEFFICIENTS],
    name: '',
  }

  zoneLabel() {
    const { transmitter, zoneCoefficients, age } = this.state
    const { ComputedHeartRate } = transmitter
    return heartZoneFor(age, zoneCoefficients, ComputedHeartRate)
  }
}

export default withStyles(styles)(Sensor)
