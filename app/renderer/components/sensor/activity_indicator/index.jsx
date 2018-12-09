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
    if (transmitter.sensor.channel === this.props.channel) {
      this.props.handleChange({ active: true })
      this.expire()
    }
  }

  expire = _.debounce(() => this.props.handleChange({ active: false }), 1000)

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
    const { classes, active } = this.props
    return (
      <StyledBadge
        className={classes.dataIndicator}
        color="primary"
        badgeContent={' '}
        invisible={!active}>
        <span />
      </StyledBadge>
    )
  }
}

export default withStyles(styles)(ActivityIndicator)
