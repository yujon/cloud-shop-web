import * as orderConf from '../constants/order.js';

const initState = {

}

export default function orderReducer(state = initState, action){
	var newState;
	if(action.type in orderConf){
       newState = {
       	...state,
        ...(action.payload || {})
       }
	}else{
		newState = state;
	}
  return newState;
}