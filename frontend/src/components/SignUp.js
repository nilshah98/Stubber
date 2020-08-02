import React, { useState } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

import signupService from '../services/signup'

const SignupForm = () => {
	const [lat, setLat] = useState(0)
	const [lon, setLon] = useState(0)
	const usertype = 'farmer'
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [phone, setPhone] = useState('')
	const [area, setArea] = useState(0)
	const [crop, setCrop] = useState('')
	const [razorpay, setRazorpay] = useState('')

	const successLocation = (pos) => {
		const crd = pos.coords

		console.log('Your current position is:')
		// console.log(`Latitude : ${crd.latitude}`)
		setLat(crd.latitude)
		// console.log(`Longitude: ${crd.longitude}`)
		setLon(crd.longitude)
		console.log(lat)
		console.log(lon)
		// console.log(`More or less ${crd.accuracy} meters.`)
	}

	const errorLocation = (err) => {
		console.warn(`ERROR(${err.code}): ${err.message}`)
	}

	const locationOptions = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	}

	navigator.geolocation.getCurrentPosition( successLocation, errorLocation, locationOptions)

	const handleSignup = (event) => {
		event.preventDefault()
		window.alert('Submit form?')
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
			razorpay
		}
		signupService.postFarmer(farmerDeets)
	}

	return (
		<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
			<Grid.Column style={{ maxWidth: 450 }}>
			<Header as='h2' color='black' textAlign='center'>
				Sign-up to your account
			</Header>
			<Form size='large' onSubmit = {handleSignup}>
				<Segment stacked>
				<Form.Input 
					fluid placeholder='Name' type='text' required onChange={({ target }) => setName(target.value)}
				/>
				<Form.Input 
					fluid icon='user' iconPosition='left' placeholder='E-mail address' type="email" required onChange={({ target }) => setEmail(target.value)}
				/>
				<Form.Input
					fluid icon='lock' iconPosition='left' placeholder='Password' type='password' required onChange={({ target }) => setPassword(target.value)}
				/>
				<Form.Input 
					fluid icon='phone' iconPosition='left' placeholder='Phone number' type='number' required onChange={({ target }) => setPhone(target.value)}
				/>
				<Form.Input 
					fluid placeholder='Area' type='number' required onChange={({ target }) => setArea(target.value)}
				/>
				<Form.Input 
					fluid placeholder='Crop' type='text' required onChange={({ target }) => setCrop(target.value)}
				/>
				<Form.Input 
					fluid placeholder='Razorpay Network ID' type='text' required onChange={({ target }) => setRazorpay(target.value)}
				/>
				<Form.Group fluid>
					Latitude: <Form.Field
						label={lat}
						disabled
					/>
					Longitude: <Form.Field
						label={lon}
						disabled
					/>
				</Form.Group>

				<Button color='black' fluid size='large' type='submit'>
					Sign Up
				</Button>
				</Segment>
			</Form>
			{/* <Message>
				New to us? <a href='#'>Sign Up</a>
			</Message> */}
			</Grid.Column>
		</Grid>
	)
}

export default SignupForm