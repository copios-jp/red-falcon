import * as React from 'react'
import { Component } from 'react'
import { MAX_HR, ZONE_LABELS } from '../../../../constants'
import { Button, Typography, Divider } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

import { withStyles } from '@material-ui/core/styles'
import styles from '../../../styles/'

const STEP = 0.02

class Coefficients extends Component {
  state = {
    coefficients: this.props.coefficients,
  }

  step(direction, index) {
    const { coefficients } = this.state
    const current = coefficients[index]
    const nextValue = current + direction * STEP
    const valid =
      direction === 1
        ? nextValue < (coefficients[index + 1] || 1.0)
        : nextValue > (coefficients[index - 1] || 0.0)

    if (valid) {
      coefficients[index] = nextValue
    }

    this.setState((state) => {
      return { ...state, coefficients }
    })
  }

  hrRange(index) {
    const { coefficients } = this.state
    const { age } = this.props
    const maxHeartRate = MAX_HR - age
    const min = Math.round(coefficients[index] * maxHeartRate) + 1
    const max = Math.round((coefficients[index + 1] || 1) * maxHeartRate)
    return { min, max }
  }

  ranges() {
    const { coefficients } = this.state
    return coefficients.map((coefficient, index) => {
      return this.hrRange(index)
    })
  }

  range(values, index) {
    const { classes } = this.props
    return (
      <span
        style={{ width: `${Math.round(100 * (values.max - values.min))}%` }}
        className={classes[`rate_${ZONE_LABELS[index]}`]}>
        &nbsp;
      </span>
    )
  }

  rangeBar() {
    const { classes } = this.props
    const ranges = this.ranges()
    return (
      <div className={classes.zoneData}>
        {ranges.map((range, index) => this.range(range, index))}
      </div>
    )
  }

  rangeBand(coef, values, index) {
    const { classes } = this.props
    return (
      <div
        key={index}
        className={[classes[`rate_${ZONE_LABELS[index]}`], classes.zoneData].join(' ')}>
        <span className={classes.zoneRangeLabel}>{values.min}</span>
        <Button variant="outlined" onClick={this.step.bind(this, -1, index)}>
          <RemoveIcon />
        </Button>
        <Typography className={classes.zonePercentageLabel}>{Math.round(coef * 100)}%</Typography>
        <Button variant="outlined" onClick={this.step.bind(this, 1, index)}>
          <AddIcon />
        </Button>
        <span className={classes.zoneRangeLabel}>{values.max}</span>
      </div>
    )
  }

  render() {
    const { coefficients } = this.state
    const { classes } = this.props
    const ranges = this.ranges()
    return (
      <div className={classes.coefficients}>
        <Typography variant="body1" className={classes.coefficientsTitle}>
          心拍ゾーン
        </Typography>
        {coefficients.map((coef, index) => this.rangeBand(coef, ranges[index], index))}
        <Divider />
        {this.rangeBar()}
      </div>
    )
  }
}

export default withStyles(styles)(Coefficients)
