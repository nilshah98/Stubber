import React, { useState, useEffect } from "react";
import { get, post } from "axios";

import { Form, Modal, Table, Button, Grid } from "semantic-ui-react";

const DashboardTableRow = ({ stubble, index }) => {
  const { totalWeight, stubbleType, stubbleID } = stubble;

  const baseUrl = "http://localhost:8081";

  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    stubble_id: stubbleID,
    x: "300",
    y: "100",
    z: "200",
    end_time: "00:00",
  });

  const handleChange = (name, value) => setState({ ...state, [name]: value });

  const handleSubmit = (event) => {
    event.preventDefault();

    //Use post to add a new bid

    post(`${baseUrl}/api/bids/addBid`, state).then(() => {
      setOpen(false);
      window.location.reload();
    });
  };

  return (
    <Table.Row>
      <Table.Cell>{stubbleType}</Table.Cell>
      <Table.Cell>{totalWeight} Kg</Table.Cell>
      <Table.Cell>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={
            <Button inverted color="brown">
              Start Auction
            </Button>
          }
        >
          <Modal.Header>Add Truck and Pickup Details</Modal.Header>
          <Modal.Content>
            <Form>
              <label htmlFor="x">Amount paid to the Farmer</label>
              <input
                placeholder="300 Rs"
                type="text"
                name="x"
                value={state["x"]}
                onChange={({ target }) => handleChange("x", target.value)}
              />
              <label htmlFor="y">Transportation Cost</label>
              <input
                placeholder="100 Rs"
                type="text"
                name="y"
                value={state["y"]}
                onChange={({ target }) => handleChange("y", target.value)}
              />
              <label htmlFor="z">Convenience Charges</label>
              <input
                placeholder="200"
                type="text"
                name="z"
                value={state["z"]}
                onChange={({ target }) => handleChange("z", target.value)}
              />
              <label htmlFor="endTime">End time of the Auction</label>
              <input
                placeholder="00:00"
                type="time"
                name="end_time"
                value={state["end_time"]}
                onChange={({ target }) =>
                  handleChange("end_time", target.value)
                }
              />
              <Modal.Actions>
                <Button color="black" onClick={() => setOpen(false)}>
                  Nope
                </Button>
                <Button
                  content="Create a Bid"
                  labelPosition="right"
                  icon="checkmark"
                  onClick={handleSubmit}
                  positive
                />
              </Modal.Actions>
            </Form>
          </Modal.Content>
        </Modal>
      </Table.Cell>
    </Table.Row>
  );
};

const DashboardTable = () => {
  const [stubbles, setStubbles] = useState([]);
  const baseUrl = "http://localhost:8081";
  //Use the stubble get request

  useEffect(() => {
    get(`${baseUrl}/api/stubble/getStubbles`)
      .then((res) => {
        console.log(res);
        setStubbles(res.data);
      })
      .catch((err) => console.error("Unable to get stubble (Frontend)", err));
  }, [setStubbles]);

  return (
    <center>
      {stubbles.length === 0 ? (
        <h1>No Stubbles to bid on</h1>
      ) : (
        <Grid
          style={{ height: "100%" }}
          textAlign="center"
          verticalAlign="middle"
        >
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
                  <Table.HeaderCell>Stubble Type</Table.HeaderCell>
                  <Table.HeaderCell>Stubble Weight</Table.HeaderCell>
                  <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {stubbles.map((stubble, index) => (
                  <DashboardTableRow stubble={stubble} index={index} />
                ))}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      )}
    </center>
  );
};

const StartAuction = () => {
  return (
    <div>
      <DashboardTable />
    </div>
  );
};

export default StartAuction;
