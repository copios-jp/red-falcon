import React, { Component } from 'react'

import { DataGroup } from '../../'

import { Menu } from '@material-ui/icons/'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { TextField } from '@material-ui/core/'

const cell = (border) => (
  <TableCell style={{ color: 'black', padding: '2px', ...border }}>
    <TextField
      fullWidth={true}
      inputProps={{ style: { color: 'black', fontSize: '1rem' } }}
      style={{ color: 'black' }}
    />
  </TableCell>
)

const row = () => {
  const border = '1px solid rgba(81, 81, 81, 1)'
  return (
    <TableRow style={{ height: '16px' }}>
      {cell()}
      {cell({ borderLeft: border, borderRight: border })}
      {cell()}
    </TableRow>
  )
}
class ProgrammingSection extends Component {
  render() {
    return (
      <DataGroup
        icon={<Menu />}
        header="プログラミング"
        data={
          <Table padding="none">
            <TableBody>
              {row()}
              {row()}
              {row()}
              {row()}
            </TableBody>
          </Table>
        }
        width="100%"
      />
    )
  }
}

export default ProgrammingSection
