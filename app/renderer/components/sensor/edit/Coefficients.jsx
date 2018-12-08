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
    ...this.props
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps })
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
    const { coefficients, max } = this.state
    const minZoneHeartRate = Math.round(coefficients[index] * max) + 1
    const maxZoneHeartRate = Math.round((coefficients[index + 1] || 1) * max)
    return { min: minZoneHeartRate, max: maxZoneHeartRate }
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
        key={index}
        style={{ width: `${Math.round(100 * (values.max - values.min))}%` }}
        className={classes[`rate_${index}`]}>
        &nbsp;
      </span>
    )
  }

  rangeBar() {
    const { classes } = this.props
    const ranges = this.ranges()
    return (
      <div className={classes.zoneData}>
        {ranges.slice(1).map((range, index) => this.range(range, index+1))}
      </div>
    )
  }

  rangeBand(coef, values, index) {
    const { classes } = this.props
    return (
      <div
        key={index}
        className={[classes[`rate_${index}`], classes.zoneData].join(' ')}>
        <span className={classes.zoneRangeLabel}>{values.min}</span>
        <Button size="small" onClick={this.step.bind(this, -1, index)}>
          <RemoveIcon fontSize="small"/>
        </Button>
        <Typography className={classes.zonePercentageLabel}>{Math.round(coef * 100)}%</Typography>
        <Button size="small" onClick={this.step.bind(this, 1, index)}>
          <AddIcon fontSize="small"/>
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
        {coefficients.slice(1).map((coef, index) => this.rangeBand(coef, ranges[index+1], index+1))}
        <Divider />
        {this.rangeBar()}
      </div>
    )
  }
}

export default withStyles(styles)(Coefficients)
