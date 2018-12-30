import React, { Component } from 'react'

import { DataGroup } from '../../'
import HeartRateChart from '../../charts/heart_rate/'
import { Timeline } from '@material-ui/icons/'
class HeartRateSection extends Component {
  render() {
    return (
      <DataGroup
        icon={<Timeline />}
        header="トレーニング心拍数"
        data={<HeartRateChart {...this.props} />}
        width="100%"
      />
    )
  }
}

export default HeartRateSection
