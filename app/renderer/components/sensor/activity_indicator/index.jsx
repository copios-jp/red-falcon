import React from 'react'
import { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Badge } from '@material-ui/core'
import styles from '../../../styles'
import badgeStyles from './styles'
import _ from 'underscore'
import bind from '../../../helpers/bind'

const StyledBadge = withStyles(badgeStyles)(Badge)

export class ActivityIndicator extends Component {
  blink = (event, transmitter) => {
    if (transmitter.sensor.channel === this.state.channel) {
      this.setState((state) => {
        return { ...state, active: true }
      })
      this.expire()
    }
  }

  expire = _.debounce(() => {
    this.setState((state) => {
      return { ...state, active: false }
    })
  }, 1000)

  componentDidMount() {
    bind.call(this, 'on')
  }

  componentWillUnmount() {
    this.expire.cancel()
    bind.call(this, 'off')
  }

  mainEvents = {
    blink: ['transmitter-data'],
  }

  render() {
    const { classes } = this.props
    return (
      <StyledBadge
        className={classes.dataIndicator}
        color="primary"
        badgeContent={' '}
        invisible={!this.state.active}>
        <span>{this.state.chanel}</span>
      </StyledBadge>
    )
  }

  state = {
    active: false,
    channel: this.props.channel,
  }
}

export default withStyles(styles)(ActivityIndicator)
