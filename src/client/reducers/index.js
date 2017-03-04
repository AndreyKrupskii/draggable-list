import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import priorities from './priorities';

export default combineReducers({
	priorities,
	routing
})
