import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import { useTranslation } from "react-i18next";

import SignUp from "./components/SignUp";
import FDashboard from "./components/FDashboard";
import CDashboard from "./components/CDashboard";
import Footer from "./components/Footer";
import ADashboard from "./components/ADashboard";
import TableExampleSortable from "./components/Bidding";

import { Container, Menu, Segment, Button } from "semantic-ui-react";

const App = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
  };

  const [toEnglish, setToEnglish] = useState(true);

  const translate = () => {
    toEnglish === true ? changeLanguage("hi") : changeLanguage("en");
    setToEnglish(!toEnglish);
  };

  const imgStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundSize: "cover",
    backgroundImage:
      "url(" +
      "https://images.unsplash.com/photo-1554973653-c9071bd14011?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=961&q=80" +
      ")",
  };

  const rootLayout = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div className="App" style={rootLayout}>
      <Router>
        <Segment inverted textAlign="center" vertical>
          <Menu size="large" inverted>
            <Container textAlign="center">
              <Menu.Item as="li" inverted="true">
                Stubber
              </Menu.Item>
              <Menu.Item as="li">
                <Link to="/farmer">{t("Farmer")}</Link>
              </Menu.Item>
              <Menu.Item as="li">
                <Link to="/consumer">{t("Consumer")}</Link>
              </Menu.Item>
              <Menu.Item as="li">
                <Link to="/admin">{t("Admin", "Admin")}</Link>
              </Menu.Item>
              <Menu.Item as="li">
                <Link to="/bidding">{t("Bidding", "Bidding")}</Link>
              </Menu.Item>
              <Menu.Item as="li">
                <Link to="/schedule">{t("Schedule", "Schedule")}</Link>
              </Menu.Item>
              <Menu.Item as="li">
                <Link to="/signup">{t("Signup")}</Link>
              </Menu.Item>
              <Menu.Item position="right">
                <Button as="a" onClick={() => translate()}>
                  {toEnglish === true ? "हि" : "EN"}
                </Button>
              </Menu.Item>
            </Container>
          </Menu>
        </Segment>
        <div
          style={{ flexGrow: "1", display: "flex", flexDirection: "column" }}
        >
          <Switch>
            <Route path="/farmer">
              <div style={imgStyle}>
                <FDashboard />
              </div>
              {/* <TableExampleSortable /> */}
            </Route>
            <Route path="/consumer">
              <CDashboard />
            </Route>
            <Route path="/admin">
              <ADashboard />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/bidding">
              <TableExampleSortable />
            </Route>
            <Route path="/schedule">{/* <TableExampleSortable /> */}</Route>
            <Route path="/">
              <Redirect to="/farmer" />
            </Route>
          </Switch>
        </div>
      </Router>

      <Footer />
    </div>
  );
};

export default App;
