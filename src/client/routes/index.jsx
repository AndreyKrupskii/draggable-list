import React from 'react';
import { Router, Route, browserHistory } from 'react-router'; 

import { syncHistoryWithStore } from 'react-router-redux';

import store from './../store';

import App from './../app';

const history = syncHistoryWithStore(browserHistory, store);

export default (
	<Router history={history}>
		<Route path='/' component={App}>
			
		</Route>
	</Router>
)