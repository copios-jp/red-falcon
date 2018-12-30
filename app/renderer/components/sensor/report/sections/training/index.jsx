import React, { Component } from 'react'
import { formatSeconds, formatDateTime } from '../../../../../helpers/time_formatter'

import { DirectionsRun } from '@material-ui/icons'

import { TitledRow } from '../../'
import { DataGroup } from '../../'

class UserSection extends Component {
  render() {
    const {
      summary: { duration, maxRate, percentageOfMax, rate, calories },
      created,
    } = this.props

    return (
      <DataGroup
        icon={<DirectionsRun />}
        header="トレーニング"
        data={
          <div>
            <TitledRow title="開始" text={formatDateTime(created)} inline={true} />
            <TitledRow title="期間" text={formatSeconds(duration)} inline={true} />
            <TitledRow title="消費カロリー" text={Math.round(calories)} inline={true} />
            <TitledRow title="心拍数(平均/最大)" text={`${rate} / ${maxRate}`} inline={true} />
            <TitledRow title="平均心拍数MAX%" text={percentageOfMax} inline={true} />
          </div>
        }
      />
    )
  }
}

export default UserSection
