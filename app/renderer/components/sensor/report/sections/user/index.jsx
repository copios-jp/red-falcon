import React, { Component } from 'react'
import { getBMI } from '../../../../../../services/analytics/'

import { AccountCircle } from '@material-ui/icons'

import { TitledRow } from '../../'
import { DataGroup } from '../../'

class UserSection extends Component {
  render() {
    const { name, age, weight, height = 175, method, max } = this.props
    const BMI = getBMI({ weight, height })
    return (
      <DataGroup
        icon={<AccountCircle />}
        header={name}
        data={
          <div>
            <TitledRow title="年齢" text={age} inline={true} />
            <TitledRow title="身長" text={height} inline={true} />
            <TitledRow title="体重" text={weight} inline={true} />
            <TitledRow title="BMI" text={BMI} inline={true} />
            <TitledRow title="最大心拍数" text={`${max} (${method})`} inline={true} />
          </div>
        }
      />
    )
  }
}

export default UserSection
