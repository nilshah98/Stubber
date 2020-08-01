import _ from 'lodash'
import React from 'react'
import { Table } from 'semantic-ui-react'

const tableData = [
  { crop: 'John', quantity: 15, endTime: Date.now() },
  { crop: 'Amber', quantity: 40, endTime: Date.now() },
  { crop: 'Leslie', quantity: 25, endTime: Date.now() },
]

function exampleReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.reverse(),
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        }
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: 'ascending',
      }
    default:
      throw new Error()
  }
}

function TableExampleSortable() {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: tableData,
    direction: null,
  })
  const { column, data, direction } = state

  return (
    <Table sortable celled fixed>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={column === 'crop' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'crop' })}
          >
            Crop
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'quantity' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'quantity' })}
          >
            Quantity
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'endTime' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'endTime' })}
          >
            End Time
          </Table.HeaderCell>
          
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(({ crop, quantity, endTime }) => (
          <Table.Row key={crop}>
            <Table.Cell>{crop}</Table.Cell>
            <Table.Cell>{quantity}</Table.Cell>
            <Table.Cell>{endTime}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default TableExampleSortable