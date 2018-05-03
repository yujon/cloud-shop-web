import { combineReducers } from 'redux';

import userReducer from './user';
import commodityReducer from './commodity';
import orderReducer from './order';
import settingReducer from './setting';
import shopReducer from './shop';
import marketReducer from './market'

const rootReducer = combineReducers({
	user: 	 userReducer,
    commodity: 	 commodityReducer,
    order: 	 orderReducer,
    setting:  settingReducer,
    shop : shopReducer,
    market :marketReducer
});

export default rootReducer