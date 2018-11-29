// import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Component } from 'react'
import Edit from './edit/'
import { withStyles } from '@material-ui/core/styles'
import { GridListTile, Badge } from '@material-ui/core'
import { GridListTileBar } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import { ipcRenderer } from 'electron'
import classNames from 'classnames'
import _ from 'underscore'

const ages = []
import styles from '../../styles/'
ages[5329145] = 37
ages[5329182] = 44

const ReceiveBadge = withStyles((theme) => ({
  badge: {
    background: 'green',
    backgroundImage: 'radial-gradient(lime, transparent)',
    borderRadius: '50%',
    boxShadow:'0 0 0px #111 inset, 0 0 40px lime',
    animation: '13s green infinite',
    width: theme.spacing.unit * 2,
    height: theme.spacing.unit * 2,
  },
}))(Badge)

const ZONE_LABELS = ['recovery', 'aerobic', 'anaerobic', 'max']

class Sensor extends Component {
  state = {
    transmitter: this.props.transmitter,
    isEditing: false,
    invisible: true,
    age: 0,
    zoneCoefficients: [0.6, 0.7, 0.8, 0.9],
  }

  componentDidMount() {
    ipcRenderer.on('transmitter-data', this.onTransmitter)
  }

  zone() {
    const {transmitter, zoneCoefficients } = this.state
    const { ComputedHeartRate } = transmitter
    let index = 0
    let zoneName
    while (ComputedHeartRate > zoneCoefficients[index] * ComputedHeartRate) {
      zoneName = ZONE_LABELS[index]
      index++
    }
    return zoneName
  }

  componentWillUnmount() {
    this.blink.cancel()
    ipcRenderer.off('transmitter-data', this.onTransmitter)
  }

  blink = _.debounce(() => {
    this.setState((state) => {
      return { ...state, invisible: true }
    })
  }, 1000)

  onTransmitter = (event, transmitter) => {
    if (transmitter.channel === this.state.transmitter.channel) {
      this.setState((state) => {
        return { ...state, transmitter, invisible: false }
      })
      this.blink()
    }
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

  onSave = (state)  => {
    this.finishEdit(state)
  }

  onCancel = () => {
    this.finishEdit(this.state)
  }

  zoneClass() {
    return `rate_${this.zone()}`
  }

  render() {
    const { classes, sensorClass } = this.props
    const { isEditing, transmitter, invisible } = this.state
    const { ComputedHeartRate } = transmitter
    return (
      <Paper className={classNames(classes.gridListItem, classes.sensor, classes[sensorClass])}>
        {isEditing && (
          <Edit sensor={{...this.state}} onSave={this.onSave} onCancel={this.onCancel} isOpen={isEditing} />
        )}
        <GridListTile onClick={this.edit}>
          <GridListTileBar
            className={classes.gridTileBar}
            title={`受信機番号:${this.state.transmitter.channel}`}
          />
          <ReceiveBadge
            className={classes.dataIndicator}
            color="primary"
            badgeContent={''}
            invisible={invisible}>
            <div />
          </ReceiveBadge>

          <div className={classNames(classes[sensorClass], classes[this.zoneClass()])}>
            {ComputedHeartRate}
          </div>
        </GridListTile>
      </Paper>
    )
  }
}

export default withStyles(styles)(Sensor)
