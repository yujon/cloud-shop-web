import * as userConf from '../constants/user';
export function changePhoneNumber(phoneNumber){
	return {
		type:userConf.CHANGE_PHONE_NUMBER,
		payload:{
			phoneNumber
		}
	}
}
// 注册
export function loginUp(phoneCode,phoneNumber,password){
	return {
		type:userConf.LOGIN_UP_REQUEST,
		phoneCode,
		phoneNumber,
		password,
		payload:{
			loginUpStatus:'doing'
		}
	}
}

export function loginUpSuccess(){
	return {
		type:userConf.LOGIN_UP_SUCCESS,
		payload:{
			loginUpStatus:'success'
		}
	}
}

export function loginUpFail(){
	return {
		type:userConf.LOGIN_UP_FAIL,
		payload:{
			loginUpStatus:'fail'
		}
	}
}


// 登录
export function loginIn(phoneCode,phoneNumber,password,callback){
	return {
		type:userConf.LOGIN_IN_REQUEST,
		phoneCode,
		phoneNumber,
		password,
		callback,
		payload:{
			loginInStatus:'doing'
		}
	}
}

export function loginInSuccess(userInfo){
	return {
		type:userConf.LOGIN_IN_SUCCESS,
		payload:{
			loginInStatus:'success',
			userInfo
		}
	}
}

export function loginInFail(){
	return {
		type:userConf.LOGIN_IN_FAIL,
		payload:{
			loginInStatus:'fail'
		}
	}
}


// 退出登录
export function loginOut(){
	return {
		type:userConf.LOGIN_OUT_REQUEST
	}
}

//获取信息
export function getUser(userId){
	return {
		type:userConf.GET_USER_REQUEST,
		userId,
	}
}

export function getUserSuccess(userInfo){
	return {
		type:userConf.GET_USER_SUCCESS,
		payload:{
			userInfo
		}
	}
}

export function getUserFail(){
	return {
		type:userConf.GET_USER_FAIL,
	}
}

//修改信息
export function updateUser(userId,userInfo){
    return {
		type:userConf.UPDATE_USER_REQUEST,
		userId,
		userInfo,
		payload:{
			updateUserStatus:'doing',
		}
	}
}
export function updateUserSuccess(userInfo){
	return {
		type:userConf.UPDATE_USER_SUCCESS,
		payload:{
			updateUserStatus:'success',
			userInfo
		}
	}
}
export function updateUserFail(){
	return {
		type:userConf.UPDATE_USER_FAIL,
		payload:{
			updateUserStatus:'fail',
		}
	}
}

//添加收藏
export function addCollection(userId,opType,shopId,commodityId,callback){
    return {
		type:userConf.ADD_COLLECTION_REQUEST,
		userId,
		opType,
		shopId,
		commodityId,
		callback,
		payload:{
			addCollectionStatus:'doing',
		}
	}
}
export function addCollectionSuccess(collectionList){
	return {
		type:userConf.ADD_COLLECTION_SUCCESS,
		payload:{
			addCollectionStatus:'success',
			collectionList
		}
	}
}
export function addCollectionFail(){
	return {
		type:userConf.ADD_COLLECTION_FAIL,
		payload:{
			addCollectionStatus:'fail',
		}
	}
}

//移除收藏
export function removeCollection(userId,opType,shopId,commodityId,callback){
    return {
		type:userConf.REMOVE_COLLECTION_REQUEST,
		userId,
		opType,
		shopId,
		commodityId,
		callback,
		payload:{
			removeCollectionStatus:'doing',
		}
	}
}
export function removeCollectionSuccess(collectionList){
	return {
		type:userConf.REMOVE_COLLECTION_SUCCESS,
		payload:{
			removeCollectionStatus:'success',
			collectionList
		}
	}
}
export function removeCollectionFail(){
	return {
		type:userConf.REMOVE_COLLECTION_FAIL,
		payload:{
			removeCollectionStatus:'fail',
		}
	}
}


//获取收藏列表
export function getCollectionList(userId,opType){
    return {
		type:userConf.GET_COLLECTION_LIST_REQUEST,
		userId,
		opType,
		payload:{
			getCollectionListStatus:'doing',
		}
	}
}
export function getCollectionListSuccess(collectionList){
	return {
		type:userConf.GET_COLLECTION_LIST_SUCCESS,
		payload:{
			getCollectionListStatus:'success',
			collectionList
		}
	}
}
export function getCollectionListFail(){
	return {
		type:userConf.GET_COLLECTION_LIST_FAIL,
		payload:{
			getCollectionListStatus:'fail',
		}
	}
}

//添加地址
export function addAddress(userId,addressInfo){
    return {
		type:userConf.ADD_ADDRESS_REQUEST,
		userId,
		addressInfo,
		payload:{
			addAddressStatus:'doing',
		}
	}
}
export function addAddressSuccess(addressList){
	return {
		type:userConf.ADD_ADDRESS_SUCCESS,
		payload:{
			addAddressStatus:'success',
			addressList
		}
	}
}
export function addAddressFail(){
	return {
		type:userConf.ADD_ADDRESS_FAIL,
		payload:{
			addAddressStatus:'fail',
		}
	}
}

//获取地址列表
export function getAddressList(userId){
    return {
		type:userConf.GET_ADDRESS_LIST_REQUEST,
		userId,
		payload:{
			getAddressListStatus:'doing',
		}
	}
}
export function getAddressListSuccess(addressList){
	return {
		type:userConf.GET_ADDRESS_LIST_SUCCESS,
		payload:{
			getAddressListStatus:'success',
			addressList
		}
	}
}
export function getAddressListFail(){
	return {
		type:userConf.GET_ADDRESS_LIST_FAIL,
		payload:{
			getAddressListStatus:'fail',
		}
	}
}

//更新地址
export function updateAddress(userId,addressId,addressInfo){
    return {
		type:userConf.UPDATE_ADDRESS_REQUEST,
		userId,
		addressId,
		addressInfo,
		payload:{
			updateAddressStatus:'doing',
		}
	}
}
export function updateAddressSuccess(addressList){
	return {
		type:userConf.UPDATE_ADDRESS_SUCCESS,
		payload:{
			updateAddressStatus:'success',
			addressList
		}
	}
}
export function updateAddressFail(){
	return {
		type:userConf.UPDATE_ADDRESS_FAIL,
		payload:{
			updateAddressStatus:'fail',
		}
	}
}

//删除地址
export function removeAddress(userId,addressId){
    return {
		type:userConf.REMOVE_ADDRESS_REQUEST,
		userId,
		addressId,
		payload:{
			removeAddressStatus:'doing',
		}
	}
}
export function removeAddressSuccess(addressList){
	return {
		type:userConf.REMOVE_ADDRESS_SUCCESS,
		payload:{
			removeAddressStatus:'success',
			addressList
		}
	}
}
export function removeAddressFail(){
	return {
		type:userConf.REMOVE_ADDRESS_FAIL,
		payload:{
			removeAddressStatus:'fail',
		}
	}
}

//添加商品到购物车
export function addCommodityToShopCar(userId,shopId,commodityId,modelId,buySum,callback){
    return {
		type:userConf.ADD_COMMODITY_TO_SHOP_CAR_REQUEST,
		userId,
		shopId,
		commodityId,
		modelId,
		buySum,
		callback,
		payload:{
			addCommodityToShopCarStatus:'doing',
		}
	}
}
export function addCommodityToShopCarSuccess(shopCarCommodityList){
	return {
		type:userConf.ADD_COMMODITY_TO_SHOP_CAR_SUCCESS,
		payload:{
			addCommodityToShopCarStatus:'success',
			shopCarCommodityList
		}
	}
}
export function addCommodityToShopCarFail(){
	return {
		type:userConf.ADD_COMMODITY_TO_SHOP_CAR_FAIL,
		payload:{
			addCommodityToShopCarStatus:'fail',
		}
	}
}

//从购物车中移除商品
export function removeCommodityFromShopCar(userId,shopCarItemId){
    return {
		type:userConf.REMOVE_COMMODITY_FROM_SHOP_CAR_REQUEST,
		userId,
		shopCarItemId,
		payload:{
			removeCommodityFromShopCarStatus:'doing',
		}
	}
}
export function removeCommodityFromShopCarSuccess(shopCarCommodityList){
	return {
		type:userConf.REMOVE_COMMODITY_FROM_SHOP_CAR_SUCCESS,
		payload:{
			removeCommodityFromShopCarStatus:'success',
			shopCarCommodityList
		}
	}
}
export function removeCommodityFromShopCarFail(){
	return {
		type:userConf.REMOVE_COMMODITY_FROM_SHOP_CAR_FAIL,
		payload:{
			removeCommodityFromShopCarStatus:'fail',
		}
	}
}

//从购物车中批量移除商品
export function removeCommodityListFromShopCar(userId,shopCarItemIdList){
    return {
		type:userConf.REMOVE_COMMODITY_LIST_FROM_SHOP_CAR_REQUEST,
		userId,
		shopCarItemIdList,
		payload:{
			removeCommodityListFromShopCarStatus:'doing',
		}
	}
}
export function removeCommodityListFromShopCarSuccess(shopCarCommodityList){
	return {
		type:userConf.REMOVE_COMMODITY_LIST_FROM_SHOP_CAR_SUCCESS,
		payload:{
			removeCommodityListFromShopCarStatus:'success',
			shopCarCommodityList
		}
	}
}
export function removeCommodityListFromShopCarFail(){
	return {
		type:userConf.REMOVE_COMMODITY_LIST_FROM_SHOP_CAR_FAIL,
		payload:{
			removeCommodityListFromShopCarStatus:'fail',
		}
	}
}

//获取购物车商品列表
export function getShopCarCommodityList(userId){
    return {
		type:userConf.GET_SHOP_CAR_COMMODITY_LIST_REQUEST,
		userId,
		payload:{
			getShopCarCommodityListStatus:'doing',
		}
	}
}
export function getShopCarCommodityListSuccess(shopCarCommodityList){
	return {
		type:userConf.GET_SHOP_CAR_COMMODITY_LIST_SUCCESS,
		payload:{
			getShopCarCommodityListStatus:'success',
			shopCarCommodityList
		}
	}
}
export function getShopCarCommodityListFail(){
	return {
		type:userConf.GET_SHOP_CAR_COMMODITY_LIST_FAIL,
		payload:{
			getShopCarCommodityListStatus:'fail',
		}
	}
}








