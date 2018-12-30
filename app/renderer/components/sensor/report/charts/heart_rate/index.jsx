import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import { formatSeconds } from '../../../../../helpers/time_formatter'
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  VerticalBarSeries,
  HorizontalGridLines,
} from 'react-vis'

import styles from '../../../../../styles/'

const colors = ['#000', '#0d47a1', '#1b5e20', '#f57f17', '#e65100', '#b71c1c']

function seriesData({ history = [] }) {
  const start = new Date(history[0].created)
  return history.map((item) => ({
    x: Math.round((new Date(item.created) - start) / 1000),
    y: item.percent,
    color: colors[item.zone],
  }))
}

class HeartRateChart extends Component {
  render() {
    const { history, max, classes } = this.props
    return (
      <FlexibleWidthXYPlot
        className={classes.heartRateChart}
        margin={{ right: 30, left: 50, bottom: 35 }}
        yDomain={[20, 110]}
        height={350}
        colorType="literal">
        <HorizontalGridLines />
        <YAxis title="心拍数MAX%" tickFormat={(t) => `${t}%`} />
        <YAxis
          orientation="right"
          title="心拍数"
          tickFormat={(t) => Math.round((t / 100) * max)}
        />
        <XAxis tickFormat={(v) => formatSeconds(v, 14, 5)} title="mm:ss" tickLabelAngle={-45} />
        <VerticalBarSeries data={seriesData({ history })} />
      </FlexibleWidthXYPlot>
    )
  }
}

export default withStyles(styles)(HeartRateChart)
