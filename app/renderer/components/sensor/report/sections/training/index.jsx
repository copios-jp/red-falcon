import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { DirectionsRun } from '@material-ui/icons'

import { TitledRow } from '../../'
import { DataGroup } from '../../'
import { formatSeconds, formatDateTime } from '../../../../../helpers/time_formatter'
import styles from '../../../../../styles'

class TrainingSection extends Component {
  render() {
    const {
      summary: { duration, maxRate, percentageOfMax, rate, calories },
      created,
      classes,
    } = this.props

    return (
      <DataGroup
        icon={<DirectionsRun />}
        header="トレーニング"
        data={
          <div className={classes.padded}>
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

export default withStyles(styles)(TrainingSection)
