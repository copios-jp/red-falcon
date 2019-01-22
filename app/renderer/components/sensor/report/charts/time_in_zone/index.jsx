import React, { Component } from 'react'
import { FlexibleXYPlot, XAxis, YAxis, VerticalBarSeries, LabelSeries } from 'react-vis'
import { withStyles } from '@material-ui/core/styles'

import { formatSeconds } from '../../../../../helpers/time_formatter'
import styles from '../../../../../styles/'

export const colors = ['#000', '#0d47a1', '#1b5e20', '#f57f17', '#e65100', '#b71c1c']
export const labels = ['休憩', '回復', '脂肪燃焼', '持久力向上', '筋肉向上', '瞬発力向上']

export const seriesData = ({ zones = [] }) => {
  return zones.map((zone, index) => {
    return {
      x: labels[index],
      y: zone,
      color: colors[index],
    }
  })
}

export const labelData = ({ zones = [] }) => {
  return zones.map((zone, index) => ({
    x: labels[index],
    y: zone,
    style: { fill: '#6b6b76' },
    yOffset: -2,
    label: zone ? formatSeconds(zone, 14, 5) : '',
  }))
}

class TimeInZoneChart extends Component {
  render() {
    const { zones, classes } = this.props
    return (
      <div className={classes.timeInZoneChartWrapper}>
        <FlexibleXYPlot
          xType="ordinal"
          yDomain={[0, Math.max.apply(null, zones) + 60]}
          margin={{ top: 35, bottom: 65, left: 45 }}
          className={classes.timeInZoneChart}
          colorType="literal">
          <YAxis tickFormat={(t) => formatSeconds(t, 14, 5)} />
          <XAxis tickLabelAngle={-45} />
          <VerticalBarSeries data={seriesData(this.props)} />
          <LabelSeries
            labelAnchorX="middle"
            labelAnchorY="before-edge"
            data={labelData(this.props)}
          />
        </FlexibleXYPlot>
      </div>
    )
  }
}

export default withStyles(styles)(TimeInZoneChart)
