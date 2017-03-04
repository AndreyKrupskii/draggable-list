import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';



export default function configStore() {
	const middlewareForRouter = routerMiddleware(browserHistory);
	const logger = createLogger();

	const	store = createStore(
		rootReducer, 
		applyMiddleware(thunk, logger, middlewareForRouter)
	);

	return store;
}
