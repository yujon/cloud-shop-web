import * as shopConf from '../constants/shop.js';

const initState = {
}
export default function shopReducer(state = initState, action){
	var newState;
	if(action.type in shopConf){
       newState = {
       	...state,
        ...(action.payload || {})
       }
	}else{
		newState = state;
	}
  return newState;
}