import * as userConf from '../constants/user.js';

const initState = {
}

export default function userReducer(state = initState, action){
	var newState;
	if(action.type in userConf){
       newState = {
       	...state,
        ...(action.payload || {})
       }
	}else{
		newState = state;
	}
  return newState;
}