import React, { Component } from 'react'
import { getBMI } from '../../../../../../services/analytics/'
import { AccountCircle } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

import { TitledRow } from '../../'
import { DataGroup } from '../../'
import styles from '../../../../../styles'

class UserSection extends Component {
  render() {
    const { name, age, weight, height = 175, method, max, classes } = this.props
    const BMI = getBMI({ weight, height })
    return (
      <DataGroup
        icon={<AccountCircle />}
        header={name}
        data={
          <div className={classes.padded}>
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

export default withStyles(styles)(UserSection)
