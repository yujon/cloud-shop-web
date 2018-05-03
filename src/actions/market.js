import * as marketConf from '../constants/market';

export function getSwiperImgList(pid){
	return {
		type:marketConf.GET_SWIPER_IMAGE_LIST_REQUEST,
		payload:{
			getSwiperImgListStatus:'doing'
		}
	}
}

export function getSwiperImgListSuccess(swiperImgList){
	return {
		type:marketConf.GET_SWIPER_IMAGE_LIST_SUCCESS,
		payload:{
			getSwiperImgListStatus:'success',
			swiperImgList:swiperImgList
		}
	}
}

export function getSwiperImgListFail(){
	return {
		type:marketConf.GET_SWIPER_IMAGE_LIST_FAIL,
		payload:{
			getSwiperImgListStatus:'fail'
		}
	}
}

export function getHotCaseList(pid){
	return {
		type:marketConf.GET_HOTCASE_LIST_REQUEST,
		payload:{
			getHotCaseListStatus:'doing'
		}
	}
}

export function getHotCaseListSuccess(hotCaseList){
	return {
		type:marketConf.GET_HOTCASE_LIST_SUCCESS,
		payload:{
			getHotCaseListStatus:'success',
			hotCaseList:hotCaseList
		}
	}
}

export function getHotCaseListFail(){
	return {
		type:marketConf.GET_HOTCASE_LIST_FAIL,
		payload:{
			getHotCaseListStatus:'fail'
		}
	}
}

export function getSpecialActivityList(pid){
	return {
		type:marketConf.GET_SPECIAL_ACTIVITY_LIST_REQUEST,
		payload:{
			getSpecialActivityListStatus:'doing'
		}
	}
}

export function getSpecialActivityListSuccess(specialActivityList){
	return {
		type:marketConf.GET_SPECIAL_ACTIVITY_LIST_SUCCESS,
		payload:{
			getSpecialActivityListStatus:'success',
			specialActivityList:specialActivityList
		}
	}
}

export function getSpecialActivityListFail(){
	return {
		type:marketConf.GET_SPECIAL_ACTIVITY_LIST_FAIL,
		payload:{
			getSpecialActivityListStatus:'fail'
		}
	}
}





