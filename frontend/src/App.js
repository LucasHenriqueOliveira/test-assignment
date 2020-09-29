import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Login from './pages/Login';
import User from './pages/User';
import Admin from './pages/Admin';
import PrivateRoute from './PrivateRoute';
import { SnackbarProvider } from 'notistack';

function App() {
	return (
		<div>
			<SnackbarProvider maxSnack={3}>
				<Switch>
					<Route path='/login' exact={true} component={Login} />
					<Route path='/user' exact={true} component={User} />
					<PrivateRoute path='/main' exact={true} component={Admin} />
					<Redirect exact from="/" to="/user"/> 
				</Switch>
			</SnackbarProvider>
		</div>
	);
}

export default App;
