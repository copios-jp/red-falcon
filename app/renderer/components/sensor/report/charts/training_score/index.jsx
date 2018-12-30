import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import { XYPlot, ArcSeries, LabelSeries } from 'react-vis'

import styles from '../../../../../styles/'

const colors = ['#000', '#0d47a1', '#1b5e20', '#f57f17', '#e65100', '#b71c1c']

const degreeToRadianCoef = Math.PI / 180
const segmentDegree = 60
const segmentRadian = segmentDegree * degreeToRadianCoef

const offsetDegree = 180 // start chart from 06:00
const offsetRadian = offsetDegree * degreeToRadianCoef

function segments({ opacity = 1, offset = offsetRadian, limit }) {
  const segment = {
    opacity,
    radius0: 1.5,
    radius: 2,
  }
  const segmentCount = limit ? limit + 1 : colors.length
  const data = colors.slice(0, segmentCount).map((color, index) => {
    const angle0 = segmentRadian * index - offset
    let angle = angle0 + segmentRadian

    if (limit && index === Math.floor(limit)) {
      angle -= segmentRadian - (limit % 1) * segmentRadian
    }
    return { ...segment, angle0, angle, color }
  })

  return <ArcSeries padAngle={0.1} colorType="literal" data={data} radiusDomain={[0, 2]} />
}

function label({ color = '#000', label = '' }) {
  return (
    <LabelSeries
      labelAnchorX="middle"
      labelAnchorY="middle"
      data={[{ x: 0, y: 0, style: { fill: color, fontSize: '3rem' }, label }]}
    />
  )
}

class TrainingScoreChart extends Component {
  render() {
    const { classes, score, zone } = this.props
    return (
      <XYPlot width={200} height={200} className={classes.trainingScoreChart} colorType="literal">
        {segments({ opacity: 0.1 })}
        {segments({ limit: score })}
        {label({ color: colors[zone], label: score.toString() })}
      </XYPlot>
    )
  }
}

export default withStyles(styles)(TrainingScoreChart)
