import React from 'react';
import { Switch, Route } from 'react-router';
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
					<Route path='/login' component={Login} />
					<Route path='/user' component={User} />
					<PrivateRoute path='*' component={Admin} />
				</Switch>
			</SnackbarProvider>
		</div>
	);
}

export default App;
