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
  Modal,
} from "semantic-ui-react";

import farmerService from "../services/farmer";

import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
              What does Start Harvesting mean?
            </Card.Header>
            <Card.Description style={{ color: "#ddd" }}>
              The farmer is going to pluck out the grown crops
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Modal
              style={{ borderRadius: "10px" }}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              size="mini"
              trigger={
                <Button inverted color="brown" icon="cut" size="massive">
                  <Icon name="cut" />
                  {t("Start Harvest")}
                </Button>
              }
            >
              <Modal.Header style={{ color: "white", backgroundColor: "#222" }}>
                {t("Add Details")}
              </Modal.Header>
              <Modal.Content style={{ backgroundColor: "#222" }}>
                <Form>
                  <Form.Field>
                    <label style={{ color: "#ddd" }} htmlFor="phone no">
                      {t("Phone Number")}
                    </label>
                    <input
                      placeholder="Mobile"
                      type="number"
                      name="phoneno"
                      onChange={({ target }) => setPhone(target.value)}
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <label style={{ color: "#ddd" }} htmlFor="quantity">
                      {t("Quantity")}
                    </label>
                    <input
                      placeholder="Quantity"
                      type="number"
                      name="quantity"
                      onChange={({ target }) => setQuantity(target.value)}
                      required
                    />
                  </Form.Field>

                  <Modal.Actions
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Button inverted color="red" onClick={() => setOpen(false)}>
                      {t("Nope")}
                    </Button>
                    <Button
                      inverted
                      content={t("Done")}
                      onClick={handleSubmit}
                      color="green"
                    />
                  </Modal.Actions>
                </Form>
              </Modal.Content>
            </Modal>
          </Card.Content>
        </Card>
        <Card style={{ backgroundColor: "#222" }}>
          <Image src="https://cdn.ablebits.com/_img-blog/line-graph/line-graph-excel.png" />
          <Card.Content>
            <Card.Header style={{ color: "#ddd" }}>
              What does Show your History mean?
            </Card.Header>
            <Card.Description style={{ color: "#ddd" }}>
              The farmer's previous stubble collected over a period of time
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button inverted color="brown" size="massive">
              <Icon name="history" />
              {t("Show History")}
            </Button>
          </Card.Content>
        </Card>
      </Card.Group>
      {/* <ClusterDetails /> */}
    </Container>
  );
};

export default FDashboard;
