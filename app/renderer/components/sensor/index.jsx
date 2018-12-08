// import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { GridListTile, GridListTileBar, Paper, Typography } from '@material-ui/core'
import classNames from 'classnames'

import ActivityIndicator from './activity_indicator/'
import { analyticsFor } from '../../services/analytics'
import bind from '../../helpers/bind'

import styles from '../../styles/'

class Sensor extends Component {
  componentDidMount() {
    bind.call(this, 'on')
  }

  componentWillUnmount() {
    bind.call(this, 'off')
  }

  mainEvents = {
    onTransmitterData: ['transmitter-data'],
  }

  onTransmitterData = (event, transmitter, transmitters) => {
    const update = { transmitters }
    if (transmitter.sensor.channel === this.state.channel) {
      update.analytics = { ...this.state.analytics, rate: transmitter.ComputedHeartRate }
    }
    this.setState((state) => {
      return { ...state, ...update }
    })
  }

  onClick = () => {
    this.props.onClick(this)
  }

  render() {
    const { classes } = this.props
    const { analytics, channel } = this.state
    const zoneClass = `rate_${analytics.getZone()}`

    return (
      <Paper
        onClick={this.onClick}
        elevation={4}
        className={classNames(
          classes.gridListItem,
          classes.sensor,
          classes[this.props.sensorClass],
        )}>
        <GridListTile>
          <GridListTileBar
            className={classes.gridTileBar}
            title={`${analytics.getPercentage()}%`}
          />
          <ActivityIndicator channel={channel} />
          <Typography className={classes.userName}>{analytics.name}&nbsp;</Typography>
          <div className={classNames(classes[this.props.sensorClass], classes[zoneClass])}>
            {analytics.rate}
          </div>
        </GridListTile>
      </Paper>
    )
  }

  state = {
    channel: this.props.channel,
    analytics: analyticsFor({method: 'fox'}),
  }
}

export default withStyles(styles)(Sensor)
