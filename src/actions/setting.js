import * as settingConf from '../constants/setting';
export function getSetting(){
	return {
		type:settingConf.GET_SETTING_REQUEST,
	}
}

export function getSettingSuccess(settingInfo){
	return {
		type:settingConf.GET_SETTING_SUCCESS,
		payload:{
			settingInfo
		}
	}
}

export function getSettingFail(){
	return {
		type:settingConf.GET_SETTING_FAIL,
	}
}