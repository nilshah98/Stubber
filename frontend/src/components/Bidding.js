import _ from "lodash";
import React from "react";
import { Table, Button, Modal, Input, Label, Grid } from "semantic-ui-react";

const tableData = [
  {
    bidId: Math.random(),
    crop: "Wheat",
    quantity: 15,
    currentBid: 9254,
    endTime: Date.now(),
  },
  {
    bidId: Math.random(),
    crop: "Wheat",
    quantity: 35,
    currentBid: 1257,
    endTime: Date.now(),
  },
  {
    bidId: Math.random(),
    crop: "Bajra",
    quantity: 40,
    currentBid: 4751,
    endTime: Date.now(),
  },
  {
    bidId: Math.random(),
    crop: "Rice",
    quantity: 25,
    currentBid: 2571,
    endTime: Date.now(),
  },
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
        ...state,
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
    <Grid style={{ height: "100%" }} textAlign="center" verticalAlign="middle">
      <Grid.Column width={8}>
        <Table
          sortable
          celled
          inverted
          selectable
          textAlign="center"
          verticalAlign="middle"
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === "crop" ? direction : null}
                onClick={() =>
                  dispatch({ type: "CHANGE_SORT", column: "crop" })
                }
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
              <Table.HeaderCell
                sorted={column === "currentBid" ? direction : null}
                onClick={() =>
                  dispatch({ type: "CHANGE_SORT", column: "currentBid" })
                }
              >
                Current Bid
              </Table.HeaderCell>
              <Table.HeaderCell>Place Bid</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(({ bidId, crop, quantity, endTime, currentBid }) => (
              <Table.Row key={bidId}>
                <Table.Cell>{crop}</Table.Cell>
                <Table.Cell>{quantity}</Table.Cell>
                <Table.Cell>
                  {new Date(endTime + 99999999).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                  })}
                </Table.Cell>
                <Table.Cell>₹{currentBid}</Table.Cell>
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
          style={{ borderRadius: "10px" }}
          size={size}
          dimmer={dimmer}
          open={open}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
        >
          <Modal.Header style={{ color: "white", backgroundColor: "#222" }}>
            Enter your bid amount
          </Modal.Header>
          <Modal.Content style={{ backgroundColor: "#222" }}>
            <Input labelPosition="right" type="text" placeholder="Amount">
              <Label style={{ backgroundColor: "#555" }} basic>
                ₹
              </Label>
              <input
                type="number"
                onChange={(event) =>
                  dispatch({ type: "CHANGE_BID", payload: event.target.value })
                }
              />
              <Label style={{ backgroundColor: "#555" }}>.00</Label>
            </Input>
          </Modal.Content>
          <Modal.Actions
            style={{
              backgroundColor: "#222",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button
              inverted
              color="red"
              onClick={() => dispatch({ type: "CLOSE_MODAL" })}
            >
              Cancel
            </Button>
            <Button
              inverted
              color="green"
              onClick={() => {
                // instead of console.log axios request
                console.log(
                  `Bid registerd f1or ${currBidId} of amount ${currBid}`
                );
                dispatch({ type: "CLOSE_MODAL" });
              }}
            >
              Bid
            </Button>
          </Modal.Actions>
        </Modal>
      </Grid.Column>
    </Grid>
  );
}

export default TableExampleSortable;
