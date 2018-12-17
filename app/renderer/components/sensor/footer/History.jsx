import React from 'react'
import { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import styles from '../../../styles/'

export class HistoryThumb extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.length !== this.props.length
  }

  render() {
    const { classes, history } = this.props
    const data = history.slice(-30)
    return (
      <div className={classes.inlineHistory}>
        {data.map((sample, index) => {
          let value = sample.percent
          if (index > 0) {
            value = (value + data[index - 1].percent) / 2
          }
          return (
            <span
              className={classes[`zone_${sample.zone}`]}
              key={index}
              style={{ height: `${value}%`, width: '2px' }}
            />
          )
        })}
      </div>
    )
  }
}

export default withStyles(styles)(HistoryThumb)
