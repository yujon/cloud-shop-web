import * as settingConf from '../constants/setting.js';

const initState = {
}
export default function settingReducer(state = initState, action){
	var newState;
	if(action.type in settingConf){
       newState = {
       	...state,
        ...(action.payload || {})
       }
	}else{
		newState = state;
	}
  return newState;
}