import * as React from 'react'
import { Component } from 'react'
import { MAX_HR, ZONE_LABELS } from '../../../../constants'
import { Button, Typography, Divider } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

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


  rangeBar() {
    const { classes } = this.props
    const ranges = this.ranges()
    return (
      <div className={classes.zoneData}>
        <span style={{width: `${Math.round(100 * (ranges[0].max - ranges[0].min))}%`}} className={classes[`rate_${ZONE_LABELS[0]}`]}>&nbsp;</span>
        <span style={{width: `${Math.round(100 * (ranges[1].max - ranges[1].min))}%`}} className={classes[`rate_${ZONE_LABELS[1]}`]}>&nbsp;</span>
        <span style={{width: `${Math.round(100 * (ranges[2].max - ranges[2].min))}%`}} className={classes[`rate_${ZONE_LABELS[2]}`]}>&nbsp;</span>
        <span style={{width: `${Math.round(100 * (ranges[3].max - ranges[3].min))}%`}} className={classes[`rate_${ZONE_LABELS[3]}`]}>&nbsp;</span>
        <span style={{width: `${Math.round(100 * (ranges[4].max - ranges[4].min))}%`}} className={classes[`rate_${ZONE_LABELS[4]}`]}>&nbsp;</span>
      </div>
    )
  }

  render() {
    const { coefficients } = this.state
    const { classes } = this.props
    const ranges = this.ranges()
    return (
      <div className={classes.coefficients}>
        <Typography variant="body1" className={classes.coefficientsTitle}>心拍ゾーン</Typography>
        {coefficients.map((coef, index) => (
          <div key={index} className={[classes[`rate_${ZONE_LABELS[index]}`], classes.zoneData].join(' ' )}>
            <span className={classes.zoneRangeLabel}>{ranges[index].min}</span>
              <Button variant="outlined" onClick={this.step.bind(this, -1, index)}>
                <RemoveIcon />
              </Button>

            <Typography className={classes.zonePercentageLabel}>{Math.round(coef * 100)}%</Typography>

            <Button variant="outlined" onClick={this.step.bind(this, 1, index)}>
              <AddIcon />
            </Button>
            <span className={classes.zoneRangeLabel}>{ranges[index].max}</span>
          </div>
        ))}
        <Divider/>
        { this.rangeBar() }
      </div>
    )
  }
}

export default withStyles(styles)(Coefficients)
