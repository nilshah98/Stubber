import React from "react";

import { connect } from 'react-redux'

import {
  Route,
  Redirect,
} from 'react-router-dom';



const ProtectedRouter = ({component: Component, user, ...rest}) => (
    <Route {...rest} render={(props) => (
        user?<Component {...props} />:<Redirect to="/login" />
    )} />
);

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps)(ProtectedRouter);