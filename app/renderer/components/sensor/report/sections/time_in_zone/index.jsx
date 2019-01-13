import React, { Component } from 'react'

import { DataGroup } from '../../shared'
import TimeInZoneChart from '../../charts/time_in_zone/'
import { Assessment } from '@material-ui/icons/'

class TimeInZoneSection extends Component {
  render() {
    const { zones } = this.props

    return (
      <DataGroup
        icon={<Assessment />}
        header="トレーニングゾーン期間"
        data={<TimeInZoneChart zones={zones} />}
        width="49%"
      />
    )
  }
}

export default TimeInZoneSection
