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
  //   const items = [
  //     {
  //       header: "What does Start Harvesting mean?",
  //       description:
  //         "Leverage agile frameworks to provide a robust synopsis for high level overviews.",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/b/b0/Agriculture_in_Volgograd_Oblast_002.JPG",
  //       //   meta: "ROI: 30%",
  //     },
  //     {
  //       header: "What does Show your History mean?",
  //       description:
  //         "Bring to the table win-win survival strategies to ensure proactive domination.",
  //       image:
  //         "https://images.edrawmax.com/images/knowledge/line-graph-1-what-is.jpg",
  //       //   meta: "ROI: 34%",
  //     },
  //   ];

  //   const CardExampleGroupCentered = () => <Card.Group centered items={items} />;
  const imgStyle = {
    backgroundSize: "cover",
    backgroundImage:
      "url(" +
      "https://images.unsplash.com/photo-1554973653-c9071bd14011?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=961&q=80" +
      ")",
  };

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
      </Card.Group>
      <ClusterDetails />
    </Container>
  );
};

export default FDashboard;
