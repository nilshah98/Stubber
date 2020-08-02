import React from "react";

import { useTranslation } from "react-i18next";

import {
  Grid,
  Segment,
  List,
  Header,
  Container,
  Icon,
} from "semantic-ui-react";

const Footer = () => {
  const footerStyle = {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "35px",
    padding: "5em 0em",
  };

  const { t } = useTranslation();

  return (
    <Segment inverted vertical>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4">
                {t("about")}
              </Header>
              <List link inverted>
                <List.Item as="a">{t("contact")}</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Made with <3" />
              <List link inverted>
                <Icon name="github" link="https://github.com/nilshah98">
                  {" "}
                </Icon>
                <Icon name="github" link="https://github.com/nilshah98">
                  {" "}
                </Icon>
                <Icon name="github" link="https://github.com/nilshah98">
                  {" "}
                </Icon>
                <Icon name="github" link="https://github.com/nilshah98">
                  {" "}
                </Icon>
                <Icon name="github" link="https://github.com/nilshah98">
                  {" "}
                </Icon>
                <Icon name="github" link="https://github.com/nilshah98">
                  {" "}
                </Icon>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as="h4" inverted>
                Smart India Hackathon 2020
              </Header>
              <p>AWS problem statement AN316</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};

export default Footer;
