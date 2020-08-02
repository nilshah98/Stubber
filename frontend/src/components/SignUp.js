import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

import { useTranslation } from "react-i18next";

import signupService from "../services/signup";

const SignupForm = () => {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const usertype = "farmer";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState(0);
  const [crop, setCrop] = useState("");
  const [razorpay, setRazorpay] = useState("");

  const { t } = useTranslation();

  const successLocation = (pos) => {
    const crd = pos.coords;

    console.log("Your current position is:");
    // console.log(`Latitude : ${crd.latitude}`)
    setLat(crd.latitude);
    // console.log(`Longitude: ${crd.longitude}`)
    setLon(crd.longitude);
    console.log(lat);
    console.log(lon);
    // console.log(`More or less ${crd.accuracy} meters.`)
  };

  const errorLocation = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  const locationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  navigator.geolocation.getCurrentPosition(
    successLocation,
    errorLocation,
    locationOptions
  );

  const handleSignup = (event) => {
    event.preventDefault();
    const farmerDeets = {
      name,
      email,
      phone,
      latitude: lat,
      longitude: lon,
      password,
      usertype,
      area,
      crop,
      razorpay,
    };
    signupService.postFarmer(farmerDeets);
    window.alert("Details submitted");
  };

  return (
    <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
      <Grid.Column width={4}>
        <Form size="large" onSubmit={handleSignup}>
          <Segment padded stacked inverted>
            <Header as="h2" color="black" textAlign="center">
              {t("Sign-up to your account")}
            </Header>
            <Form.Input
              fluid
              placeholder={t("Name", "Name")}
              type="text"
              required
              onChange={({ target }) => setName(target.value)}
            />
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder={t("E-mail address", "E-mail")}
              type="email"
              required
              onChange={({ target }) => setEmail(target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder={t("Password", "password")}
              type="password"
              required
              onChange={({ target }) => setPassword(target.value)}
            />
            <Form.Input
              fluid
              icon="phone"
              iconPosition="left"
              placeholder={t("Phone number", "mobile")}
              type="number"
              required
              onChange={({ target }) => setPhone(target.value)}
            />
            <Form.Input
              fluid
              placeholder={t("Area", "area")}
              type="number"
              required
              onChange={({ target }) => setArea(target.value)}
            />
            <Form.Input
              fluid
              placeholder={t("Crop", "crop")}
              type="text"
              required
              onChange={({ target }) => setCrop(target.value)}
            />
            <Form.Input
              fluid
              placeholder={t("Razorpay Network ID", "Razorpay Network ID")}
              type="text"
              required
              onChange={({ target }) => setRazorpay(target.value)}
            />
            {/* <Form.Group fluid>
              Latitude: <Form.Field label={lat} disabled />
              Longitude: <Form.Field label={lon} disabled />
            </Form.Group> */}

            <Button inverted color="green" fluid size="large" type="submit">
              {t("Signup")}
            </Button>
          </Segment>
        </Form>
        {/* <Message>
				New to us? <a href='#'>Sign Up</a>
			</Message> */}
      </Grid.Column>
    </Grid>
  );
};

export default SignupForm;
