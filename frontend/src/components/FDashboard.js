import React, { useState } from "react";
import {
  Card,
  Container,
  Image,
  Icon,
  CardDescription,
  Button,
  Step,
  Divider,
  Form,
  Modal
} from "semantic-ui-react";

import farmerService from '../services/farmer'

const ClusterDetails = () => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <Step.Group>
      <Step completed>
        <Icon />
        <Step.Content>
          <Step.Title>Order Confirmed</Step.Title>
        </Step.Content>
      </Step>

      <Step active>
        <Icon name="truck" />
        <Step.Content>
          <Step.Title>Out for Collection</Step.Title>
        </Step.Content>
      </Step>

      <Step disabled>
        <Icon name="paper plane" />
        <Step.Content>
          <Step.Title>Order Finished</Step.Title>
        </Step.Content>
      </Step>
    </Step.Group>
  </div>
);

const FDashboard = () => {
  const imgStyle = {
    backgroundSize: "cover",
    backgroundImage:
      "url(" +
      "https://images.unsplash.com/photo-1554973653-c9071bd14011?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=961&q=80" +
      ")",
  };

  const [open, setOpen] = useState(false)
  const [quantity, setQuantity] = useState(0)
  const [phone, setPhone] = useState(0)

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(phone, quantity)
    farmerService.startHarvesting(phone, quantity)
    setPhone(0)
    setQuantity(0)
  }

  return (
    <Container>
      <Card.Group centered>
        <Card>
          <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Agriculture_in_Volgograd_Oblast_002.JPG" />
          <Card.Content>
            <Card.Header>What does Start Harvesting mean?</Card.Header>
            <Card.Description>
              Steve wants to add you to the group <strong>best friends</strong>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Modal
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              trigger={<Button color="brown" icon="cut" size="massive">
                <Icon name="cut" />
                Start Harvest
                </Button>
              }
            >
              <Modal.Header>Add Details</Modal.Header>
              <Modal.Content>
                <Form>
                  <Form.Field>
                    <label htmlFor="phone no">Phone Number</label>
                    <input
                      placeholder="Mobile"
                      type="number"
                      name="phoneno"
                      onChange={({ target }) => setPhone(target.value)}
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <label htmlFor="quantity">Quantity</label>
                    <input
                      placeholder="Quantity"
                      type="number"
                      name="quantity"
                      onChange={({ target }) => setQuantity(target.value)}
                      required
                    />
                  </Form.Field>

                  <Modal.Actions>
                    <Button color="black" onClick={() => setOpen(false)}>
                      Nope
                      </Button>
                    <Button
                      content="Done"
                      labelPosition="right"
                      icon="checkmark"
                      onClick={handleSubmit}
                      positive
                    />
                  </Modal.Actions>
                </Form>
              </Modal.Content>
            </Modal>
          </Card.Content>
        </Card>
        <Card>
          <Image src="https://cdn.ablebits.com/_img-blog/line-graph/line-graph-excel.png" />
          <Card.Content>
            <Card.Header>What does Show your History mean?</Card.Header>
            <Card.Description>
              Molly wants to add you to the group <strong>musicians</strong>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button secondary size="massive">
              <Icon name="history" />
              Show History
            </Button>
          </Card.Content>
        </Card>
      </Card.Group >
      <ClusterDetails />
    </Container >
  );
};

export default FDashboard;
