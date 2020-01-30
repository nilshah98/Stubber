import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Radio from "components/Radio/Radio.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import useField from "../hooks/useField";
import registerService from "../services/register";

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
  const latitude = useField("number");
  const longitude = useField("number");
  const postal_address = useField("text");
  const area = useField("number");
  const crop = useField("text");
  const userType = useField("text");
  const bankIfsc = useField("text");
  const bankAccNo = useField("text");
  const bankName = useField("text");

  const handleRegister = async event => {
    event.preventDefault();
    const data = {
      username: username.value,
      password: password.value,
      name: name.value,
      email: email.value,
      phone: phone.value,
      latitude: latitude.value,
      longitude: longitude.value,
      crop: crop.value,
      userType: userType.value
    };

    console.log(data);
    // const response = await registerService(data);
    // console.log(response);
    // if (response) {
    //   window.localStorage.setItem("stubber", JSON.stringify(response));
    // }
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
                    inputProps={{ ...email, type: 'email' }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Phone"
                    id="phone"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{ ...phone, type: 'tel' }}
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
                  />
                </GridItem>
              </GridContainer>

              {/* <GridContainer style={{ justifyContent: "center" }}>
                <GridItem xs={12} sm={12} md={12}>
                    <Radio 
                        selectedValue={userType}
                        
                    />
                </GridItem>
              </GridContainer> */}

              <GridContainer style={{ justifyContent: "center" }}>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{ ...password, type: 'password' }}
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

export default Register;