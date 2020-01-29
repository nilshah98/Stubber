import React from "react";
import { connect } from 'react-redux'

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import useField from '../hooks/useField'
import loginService from '../services/login'
import { setUserType } from '../reducers/userTypeReducer'

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

const Login = (props) => {
	const classes = useStyles()
	const username = useField('text')
	const password = useField('text')

	const handleLogin = async (event) => {
		event.preventDefault()
		const data = {
			username: username.value,
			password: password.value
		}
		const response = await loginService(data)
		// console.log(response)
		if( response ) {
			window.localStorage.setItem('stubber', JSON.stringify(response))
			setUserType(response.usertype)
			console.log('Logged In')
		}
	}

  return (
	<div>
	  <GridContainer style={{ justifyContent: "center", alignContent: "center", height: "100vh" }}>
		<GridItem xs={12} sm={12} md={8}>
		  <Card>
			<CardHeader color="primary">
			  <h4 className={classes.cardTitleWhite}>Login User</h4>
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
			  </GridContainer>
			  <GridContainer style={{ justifyContent: "center" }}>
				<GridItem xs={12} sm={12} md={6}>
				  <CustomInput
					labelText="Password"
					id="password"
					formControlProps={{
					  fullWidth: true
					}}
					inputProps={{ ...password }}
				  />
				</GridItem>
			  </GridContainer>
			</CardBody>
			<CardFooter style={{ justifyContent: "center" }}>
			  <Button onClick={handleLogin} color="primary">
				Login
			  </Button>
			</CardFooter>
		  </Card>
		</GridItem>
		</GridContainer>    
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		language: state.language,
		userType: state.userType
	}
}

export default connect(mapStateToProps, { setUserType })(Login)