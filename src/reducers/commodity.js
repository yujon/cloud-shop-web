import * as commodityConf from '../constants/commodity.js';

const initState = {
 
}

export default function commodityReducer(state = initState, action){
	var newState;
	if(action.type in commodityConf){
       newState = {
       	...state,
        ...(action.payload || {})
       }
	}else{
		newState = state;
	}
  return newState;
}