import React from "react";
import {
    Card,
    Container,
    Image,
    Icon,
    CardDescription,
    Button,
} from "semantic-ui-react";

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
        backgroundImage:
            "url(" +
            "https://www.commondreams.org/sites/default/files/styles/cd_large/public/views-article/farms.jpeg?itok=cTmtRuzF" +
            ")",
    };

<<<<<<< HEAD
  return (
    <Card.Group centered>
      <Card>
        <Card.Content>
          <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Agriculture_in_Volgograd_Oblast_002.JPG" />
          <Card.Header>What does Start Harvesting mean?</Card.Header>
          <Card.Description>
            Steve wants to add you to the group <strong>best friends</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button basic color="red">
            Decline
          </Button>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Image src="https://images.edrawmax.com/images/knowledge/line-graph-1-what-is.jpg" />
          <Card.Header>What does Show your History mean?</Card.Header>
          <Card.Description>
            Molly wants to add you to the group <strong>musicians</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button basic color="green">
            Approve
          </Button>
        </Card.Content>
      </Card>
    </Card.Group>
  );
=======
    return (

        <Card.Group centered>

            <Card>
                <Card.Content>
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Agriculture_in_Volgograd_Oblast_002.JPG"
                    />
                    <Card.Header>What does Start Harvesting mean?</Card.Header>
                    <Card.Description>
                        Steve wants to add you to the group <strong>best friends</strong>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button primary icon="cut" size="massive">
                        <Icon name="cut" />
                    Start Harvest
                </Button>
                </Card.Content>
            </Card>
            <Card>
                <Card.Content>
                    <Image
                        src="https://images.edrawmax.com/images/knowledge/line-graph-1-what-is.jpg"
                    />
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
    );
>>>>>>> b8089e4d01e02cfb63c3cadc506a99ebbb15ee1d
};

export default FDashboard;
