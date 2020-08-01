import _ from "lodash";
import React from "react";
import { Table, Button, Modal, Input, Label } from "semantic-ui-react";

const tableData = [
  { bidId: Math.random(), crop: "Wheat", quantity: 15, endTime: Date.now() },
  { bidId: Math.random(), crop: "Bajra", quantity: 40, endTime: Date.now() },
  { bidId: Math.random(), crop: "Rice", quantity: 25, endTime: Date.now() },
];

function tableReducer(state, action) {
  switch (action.type) {
    case "CHANGE_SORT":
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.reverse(),
          direction:
            state.direction === "ascending" ? "descending" : "ascending",
        };
      }
      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: "ascending",
      };
    case "OPEN_MODAL":
      return {
        ...state,
        currBidId: action.currBidId,
        open: true,
        dimmer: action.dimmer,
      };
    case "CLOSE_MODAL":
      return { ...state, currBidId: undefined, open: false };
    case "CHANGE_BID":
      return { ...state, currBid: action.payload };
    default:
      throw new Error();
  }
}

function TableExampleSortable() {
  const [state, dispatch] = React.useReducer(tableReducer, {
    size: "mini",
    column: null,
    data: tableData,
    direction: null,
    open: false,
    dimmer: undefined,
    currBidId: undefined,
    currBid: 0,
  });
  const {
    currBid,
    currBidId,
    size,
    column,
    data,
    direction,
    open,
    dimmer,
  } = state;

  return (
    <div>
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === "crop" ? direction : null}
              onClick={() => dispatch({ type: "CHANGE_SORT", column: "crop" })}
            >
              Crop
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "quantity" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "quantity" })
              }
            >
              Quantity
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "endTime" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "endTime" })
              }
            >
              End Time
            </Table.HeaderCell>
            <Table.HeaderCell>Place Bid</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(({ bidId, crop, quantity, endTime }) => (
            <Table.Row key={crop}>
              <Table.Cell>{crop}</Table.Cell>
              <Table.Cell>{quantity}</Table.Cell>
              <Table.Cell>{endTime}</Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color="brown"
                  onClick={() => {
                    dispatch({
                      currBidId: bidId,
                      type: "OPEN_MODAL",
                      dimmer: "blurring",
                    });
                  }}
                >
                  Bid
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Modal
        size={size}
        dimmer={dimmer}
        open={open}
        onClose={() => dispatch({ type: "CLOSE_MODAL" })}
      >
        <Modal.Header>Enter your bid amount</Modal.Header>
        <Modal.Content>
          <Input labelPosition="right" type="text" placeholder="Amount">
            <Label basic>$</Label>
            <input
              type="number"
              onChange={(event) =>
                dispatch({ type: "CHANGE_BID", payload: event.target.value })
              }
            />
            <Label>.00</Label>
          </Input>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
            Cancel
          </Button>
          <Button
            positive
            onClick={() => {
              // instead of console.log axios request
              console.log(
                `Bid registerd for ${currBidId} of amount ${currBid}`
              );
              dispatch({ type: "CLOSE_MODAL" });
            }}
          >
            Bid
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default TableExampleSortable;
