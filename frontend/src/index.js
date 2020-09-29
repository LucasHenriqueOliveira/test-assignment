import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router } from 'react-router';
import * as serviceWorker from './serviceWorker';
import history from './history';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import muiTheme from './theme/muiTheme';

ReactDOM.render(
	<Router history={history}>
		<MuiThemeProvider theme={muiTheme}>
			<App />
		</MuiThemeProvider>
	</Router>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
