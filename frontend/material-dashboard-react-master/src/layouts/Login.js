import React, { Suspense, useEffect } from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from 'react-i18next'

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";

import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import useField from '../hooks/useField'
import loginService from '../services/login'
import { setUser } from '../reducers/userReducer'
import { changeLanguage } from '../reducers/languageReducer'

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
	const { t, i18n } = useTranslation()
	
	console.log(props.language)

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
		console.log(response)
		if( response ) {
			window.localStorage.setItem('stubber', JSON.stringify(response))
			props.setUser(response)
			props.history.push(`/${response.usertype}/dashboard`)
			if( response.language ) {
				props.changeLanguage(response.language)
			}
			props.changeLanguage('en')
		}
	}

  return (
		// <Suspense fallback = "loading" >
			<div>
				<GridContainer style={{ justifyContent: "center", alignContent: "center", height: "100vh" }}>
					<GridItem xs={12} sm={12} md={8}>
					<Card>
						<CardHeader color="primary">
						<h4 className={classes.cardTitleWhite}>{t('button')}</h4>
						<p className={classes.cardCategoryWhite}>
							Enter your credentials
						</p>
						</CardHeader>
						<CardBody>
						<GridContainer style={{ justifyContent: "center" }}>
							<GridItem xs={12} sm={12} md={6}>
							<CustomInput
								labelText={t('username')}
								// labelText="Username"
								id="username"
								formControlProps={{
								fullWidth: true
								}}
								inputProps={{ ...username, onClick: () => i18n.changeLanguage(props.language) }}
								
							/>
							</GridItem>
						</GridContainer>
						<GridContainer style={{ justifyContent: "center" }}>
							<GridItem xs={12} sm={12} md={6}>
							<CustomInput
								labelText={t('password')}
								id="password"
								formControlProps={{
								fullWidth: true
								}}
								inputProps={{ ...password, type: 'password', onClick: () => i18n.changeLanguage(props.language) }}
							/>
							</GridItem>
						</GridContainer>
						</CardBody>
						<CardFooter style={{ justifyContent: "center" }}>
						<Button onClick={handleLogin} color="primary">
							{t('button')}
						</Button>
						</CardFooter>
					</Card>
					</GridItem>
					</GridContainer>
				</div>
		// </Suspense>
	)
}

const mapStateToProps = (state) => {
	return {
		language: state.language,
		user: state.user
	}
}

const mapDispatchToProps = {
	setUser,
	changeLanguage
}

const LoginDiv = connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))

const Login1 = (props) => {
	return (
		<Suspense fallback="loading" >
			<LoginDiv />
		</Suspense>
	)
}

export default Login1