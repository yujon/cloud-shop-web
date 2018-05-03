import * as marketConf from '../constants/market.js';

const initState = {

}

export default function marketReducer(state = initState, action){
	var newState;
	if(action.type in marketConf){
       newState = {
       	...state,
        ...(action.payload || {})
       }
	}else{
		newState = state;
	}
  return newState;
}