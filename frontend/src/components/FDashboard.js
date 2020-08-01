import React from "react";
import {
  Card,
  Container,
  Image,
  Icon,
  CardDescription,
  Button,
  Step,
  Divider,
} from "semantic-ui-react";

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

  return (
    <Container style={{ margin: 10 }}>
      <Card.Group centered>
        <Card>
          <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Agriculture_in_Volgograd_Oblast_002.JPG" />
          <Card.Content>
            <Card.Header>What does Start Harvesting mean?</Card.Header>
            <Card.Description>
              The farmer starts to pick and gather the crops.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button color="brown" icon="cut" size="massive">
              <Icon name="cut" />
              Start Harvest
            </Button>
          </Card.Content>
        </Card>
        <Card>
          <Image src="https://cdn.ablebits.com/_img-blog/line-graph/line-graph-excel.png" />
          <Card.Content>
            <Card.Header>What does Show your History mean?</Card.Header>
            <Card.Description>
              It shows the farmer's previous stubble collected till date.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button secondary size="massive">
              <Icon name="history" />
              Show History
            </Button>
          </Card.Content>
        </Card>
      </Card.Group>
      <ClusterDetails />
    </Container>
  );
};

export default FDashboard;
