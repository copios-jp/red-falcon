import React, { Component } from 'react'
import { Typography } from '@material-ui/core'

import { Score } from '@material-ui/icons/'
import { DataGroup } from '../../shared'
import TrainingScoreChart from '../../charts/training_score/'
import { withStyles } from '@material-ui/core/styles'
import styles from '../../../../../styles'

const effects = [
  'N/A',
  'トレーニング前後のストレッチや柔軟体操効果を高め、ウォームアップやクールダウンで代謝促進や疲労回復をする。',
  '呼吸をしっかりしながらトレーニングをする事で脂肪燃焼効果が上がり、基礎体力の向上、代謝の促進でダイエット効果が上がる。',
  '血流の流れが早くなり身体全身に酸素を運びダイエット効果をさらに上げていきます。有酸素運動の効果も上がり、トレーニングレベルも向上します。',
  'トレーニング強度が上がり筋肥大、心肺機能の向上、消費カロリーも高くなり、筋肉をつけるシェイプアップ効果が上がります。',
  '心肺機能の90パーセントを超えるアスリートレベルのゾーンです。短時間で筋肉にかかる負担も強く筋肥大、筋力アップをします。',
]

class TrainingScoreSection extends Component {
  render() {
    const { zone, score, classes } = this.props
    return (
      <DataGroup
        header="トレーニング効果"
        icon={<Score />}
        data={
          <div className={classes.padded}>
            <Typography variant="body1" color="inherit">
              {effects[zone]}
            </Typography>
            <TrainingScoreChart score={score} zone={zone} />
          </div>
        }
        width="49%"
      />
    )
  }
}

export default withStyles(styles)(TrainingScoreSection)
