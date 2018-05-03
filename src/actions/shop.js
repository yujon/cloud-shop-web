import * as shopConf from '../constants/shop';

// 获取
export function getShop(shopId){
	return {
		type:shopConf.GET_SHOP_REQUEST,
		shopId,
		payload:{
		}
	}
}

export function getShopSuccess(shopInfo){
	return {
		type:shopConf.GET_SHOP_SUCCESS,
		payload:{
			shopInfo
		}
	}
}


export function getShopFail(shopInfo){
	return {
		type:shopConf.GET_SHOP_FAIL,
		payload:{
		}
	}
}


//获取商品种类
export function getCommodityCateList(shopId){
    return {
		type:shopConf.GET_COMMODITY_CATE_LIST_REQUEST,
		shopId,
		payload:{
			getCommodityCateStatus:'doing',
		}
	}
}
export function getCommodityCateListSuccess(commodityCateList){
	return {
		type:shopConf.GET_COMMODITY_CATE_LIST_SUCCESS,
		payload:{
			getCommodityCateStatus:'success',
			commodityCateList:commodityCateList
		}
	}
}
export function getCommodityCateListFail(){
	return {
		type:shopConf.GET_COMMODITY_CATE_LIST_FAIL,
		payload:{
			getCommodityCateStatus:'fail',
		}
	}
}






