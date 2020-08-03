import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  Modal,
} from "semantic-ui-react";

import farmerService from "../services/farmer";

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

const CDashboard = () => {
  const imgStyle = {
    backgroundSize: "cover",
    backgroundImage:
      "url(" +
      "https://images.unsplash.com/photo-1554973653-c9071bd14011?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=961&q=80" +
      ")",
  };

  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [phone, setPhone] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(phone, quantity);
    farmerService.startHarvesting(phone, quantity);
    setPhone(0);
    setQuantity(0);
  };

  return (
    <Container>
      <Card.Group
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
        inverted
        centered
      >
        <Card style={{ backgroundColor: "#222" }}>
          <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Agriculture_in_Volgograd_Oblast_002.JPG" />
          <Card.Content style={{ color: "#ddd" }}>
            <Card.Header style={{ color: "#ddd" }}>
              What does Start Bidding mean?
            </Card.Header>
            <Card.Description style={{ color: "#ddd" }}>
              The consumer can bid for the stubble using a greater amount
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Link to="/bidding">
              <Button inverted color="brown" icon="cut" size="massive">
                <Icon name="rupee" />
                Start Bidding
              </Button>
            </Link>
          </Card.Content>
        </Card>
        <Card style={{ backgroundColor: "#222" }}>
          <Image src="https://cdn.ablebits.com/_img-blog/line-graph/line-graph-excel.png" />
          <Card.Content>
            <Card.Header style={{ color: "#ddd" }}>
              What does Show your History mean?
            </Card.Header>
            <Card.Description style={{ color: "#ddd" }}>
              The consumer's previous bidding data over a period of time
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button inverted color="brown" size="massive">
              <Icon name="history" />
              Show History
            </Button>
          </Card.Content>
        </Card>
      </Card.Group>
      {/* <ClusterDetails /> */}
    </Container>
  );
};

export default CDashboard;
