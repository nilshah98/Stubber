import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Radio from "components/Radio/Radio.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";

import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import useField from "../hooks/useField";
import registerService from "../services/register";
import {
  withRouter
} from 'react-router-dom'


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

const Register = props => {
  const classes = useStyles();
  const username = useField("text");
  const password = useField("text");
  const name = useField("text");
  const email = useField("text");
  const phone = useField("number");
  const postal_address = useField("text");
  const area = useField("number");
  const bankIfsc = useField("text");
  const bankAccNo = useField("text");
  const bankName = useField("text");

  const [userType, setUserType] = useState("");
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  const handleRegister = async event => {
    event.preventDefault();
    const data = {
      username: username.value,
      password: password.value,
      name: name.value,
      email: email.value,
      phone: phone.value,
      latitude: latitude,
      longitude: longitude,
      usertype: userType,
      postal_address: postal_address.value,
      area: area.value,
      bank_ifsc: bankIfsc.value,
      bank_accno: bankAccNo.value,
      bank_name: bankName.value
    };

    console.log(data);
    const response = await registerService(data);
    if (response.status === 200) {
      // Successful login and redirect
      props.history.push("/login");
    }
  };

  return (
    <div>
      <GridContainer
        style={{
          justifyContent: "center",
          alignContent: "center",
          height: "100vh"
        }}
      >
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Register User</h4>
              <p className={classes.cardCategoryWhite}>
                Enter your credentials
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer style={{ justifyContent: "center" }}>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{ ...username }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Name"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{ ...name }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer style={{ justifyContent: "center" }}>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Email"
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{ ...email, type: "email" }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Phone"
                    id="phone"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{ ...phone, type: "tel" }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer style={{ justifyContent: "center" }}>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Latitude"
                    id="latitude"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{ ...latitude }}
                    onChange={event => setLatitude(event.target.value)}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Longitude"
                    id="longitude"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{ ...longitude }}
                    onChange={event => setLongitude(event.target.value)}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer style={{ justifyContent: "center" }}>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Postal Address"
                    id="postal_address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{ ...postal_address }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Area"
                    id="area"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{ ...area }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer style={{ justifyContent: "space-around" }}>
                <GridItem>
                  <Radio
                    selectedValue={userType}
                    value="farmer"
                    name="Type"
                    onClick={() => {
                      setUserType("farmer");
                      // console.log(userType);
                    }}
                  />
                </GridItem>
                <GridItem>
                  <Radio
                    selectedValue={userType}
                    value="consumer"
                    name="Type"
                    onClick={() => {
                      setUserType("consumer");
                      // console.log(userType);
                    }}
                  />
                </GridItem>
                <GridItem>
                  <Radio
                    selectedValue={userType}
                    value="admin"
                    name="Type"
                    onClick={() => {
                      setUserType("admin");
                      // console.log(userType);
                    }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer style={{ justifyContent: "center" }}>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Bank IFSC"
                    id="bank_ifsc"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{ ...bankIfsc }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Bank Acc Number"
                    id="bank_acc_number"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{ ...bankAccNo }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Bank Name"
                    id="bank_name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{ ...bankName }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer style={{ justifyContent: "center" }}>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{ ...password, type: "password" }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter style={{ justifyContent: "center" }}>
              <Button onClick={handleRegister} color="primary">
                Register
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default withRouter(Register);
