import * as commodityCofConf from '../constants/commodity';

export function setCommodityListByCommodityCate(commodityListByCommodityCate){
	return {
		type:commodityCofConf.SET_COMMODITY_LIST_BY_COMMODITY_CATE,
		payload:{
			commodityListByCommodityCate
		}
	}
}
// 获取商品列表
export function getCommodityList(shopId){
	return {
		type:commodityCofConf.GET_COMMODITY_LIST_REQUEST,
		shopId,
		payload:{
			getCommodityListStatus:'doing'
		}
	}
}

export function getCommodityListSuccess(commodityList){
	return {
		type:commodityCofConf.GET_COMMODITY_LIST_SUCCESS,
		payload:{
			getCommodityListStatus:'success',
			commodityList:commodityList
		}
	}
}

export function getCommodityListFail(){
	return {
		type:commodityCofConf.GET_COMMODITY_LIST_FAIL,
		payload:{
			getCommodityListStatus:'fail'
		}
	}
}


export function getCommodity(shopId,commodityId){
	return {
		type:commodityCofConf.GET_COMMODITY_REQUEST,
		shopId,
		commodityId,
		payload:{
			getCommodityStatus:'doing'
		}
	}
}

export function getCommoditySuccess(commodityInfo){
	return {
		type:commodityCofConf.GET_COMMODITY_SUCCESS,
		payload:{
			getCommodityStatus:'success',
			commodityInfo:commodityInfo
		}
	}
}


export function getCommodityFail(){
	return {
		type:commodityCofConf.GET_COMMODITY_FAIL,
		payload:{
			getCommodityStatus:'fail'
		}
	}
}

