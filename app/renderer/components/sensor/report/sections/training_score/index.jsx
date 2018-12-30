import React, { Component } from 'react'
import { Typography } from '@material-ui/core'

import { Score } from '@material-ui/icons/'
import { DataGroup } from '../../'
import TrainingScoreChart from '../../charts/training_score/'

const effects = [
  'N/A',
  '有酸素能力の基礎作り・ビギナーの初期トレーニング。ウォームアップやクールダウン、回復を助ける。',
  '有酸素能力の向上・効果的な脂肪燃焼効果。基礎的な身体能力を向上させ、回復を促進、新陳代謝を増進させる。',
  'マラソントレーニングに適している・有酸素能力の更なる向上。一般的なトレーニングペースの強化。中強度の運動をより容易にし、運動効率を改善する。',
  '無酸素性能力の向上・乳酸耐性の向上。早い速度での持久力を維持する力を向上。',
  '最大酸素摂取量の向上・速度・筋力の向上・上級者向けレベル。呼吸および筋肉への最大またはそれに準ずる負荷',
]

class TrainingScoreSection extends Component {
  render() {
    const { zone, score } = this.props
    return (
      <DataGroup
        header="トレーニング効果"
        icon={<Score />}
        data={
          <div>
            <Typography variant="body1" color="inherit">{effects[zone]}</Typography>
            <TrainingScoreChart score={score} zone={zone} />
          </div>
        }
        width="49%"
      />
    )
  }
}

export default TrainingScoreSection
