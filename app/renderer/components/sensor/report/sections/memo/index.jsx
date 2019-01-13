import React, { Component } from 'react'
import { DataGroup } from '../../shared'
import { Edit } from '@material-ui/icons/'

class MemoSection extends Component {
  render() {
    return <DataGroup icon={<Edit />} header="備考" width="32%" />
  }
}

export default MemoSection
