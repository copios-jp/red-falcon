import React from 'react'
import { Component } from 'react'
import { Favorite } from '@material-ui/icons'

import { withStyles } from '@material-ui/core/styles'
import styles from '../../../styles/'

export class Rate extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.rate !== this.props.rate
  }

  render() {
    const { classes, rate } = this.props
    return (
      <span className={classes.cardRate}>
        <Favorite fontSize="small" className={classes.cardRateIcon} />
        {rate}
      </span>
    )
  }
}

export default withStyles(styles)(Rate)
