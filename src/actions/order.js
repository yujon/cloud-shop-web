import * as orderConf from '../constants/order';

export function setLocalOrderInfo(info,isFromShopCar=false,toRemovedShopCarItemIdList=[]){
	return {
		type:orderConf.INIT_ORDER_REQUEST,
		payload:{
			localOrderInfo:info,
			isFromShopCar,
			toRemovedShopCarItemIdList
		}
	}
}


export function setLocalOrderPayList(payList){
	return {
		type:orderConf.INIT_ORDER_PAY_LIST_REQUEST,
		payload:{
			payList
		}
	}
}

export function addOrderList(orderList,callback){
	return {
		type:orderConf.ADD_ORDER_LIST_REQUEST,
		orderList,
		callback,
		payload:{
			addOrderListStatus:'doing'
		}
	}
}

export function addOrderListSuccess(){
	return {
		type:orderConf.ADD_ORDER_LIST_SUCCESS,
		payload:{
			addOrderListStatus:'success'
		}
	}
}

export function addOrderListFail(){
	return {
		type:orderConf.ADD_ORDER_LIST_FAIL,
		payload:{
			addOrderListStatus:'fail'
		}
	}
}

// 移除订单
export function removeOrder(orderId){
	return {
		type:orderConf.REMOVE_ORDER_REQUEST,
		orderId,
		payload:{
			removeOrderStatus:'doing'
		}
	}
}

export function removeOrderSuccess(){
	return {
		type:orderConf.REMOVE_ORDER_SUCCESS,
		payload:{
			removeOrderStatus:'success',
		}
	}
}

export function removeOrderFail(){
	return {
		type:orderConf.REMOVE_ORDER_FAIL,
		payload:{
			removeOrderStatus:'fail'
		}
	}
}

// 获取订单列表
export function getOrderListByUserId(userId){
	return {
		type:orderConf.GET_ORDER_LIST_BY_USERID_REQUEST,
		userId,
		payload:{
			getOrderListByUserIdStatus:'doing'
		}
	}
}

export function getOrderListByUserIdSuccess(orderList){
	return {
		type:orderConf.GET_ORDER_LIST_BY_USERID_SUCCESS,
		payload:{
			getOrderListByUserIdStatus:'success',
			orderList
		}
	}
}

export function getOrderListByUserIdFail(){
	return {
		type:orderConf.GET_ORDER_LIST_BY_USERID_FAIL,
		payload:{
			getOrderListByUserIdStatus:'fail'
		}
	}
}


// 获取订单列表
export function getOrderListByUserIdAndStatus(userId,status){
	return {
		type:orderConf.GET_ORDER_LIST_BY_USERID_AND_STATUS_REQUEST,
		userId,
		status,
		payload:{
			getOrderListByUserIdAndStatusStatus:'doing'
		}
	}
}

export function getOrderListByUserIdAndStatusSuccess(orderList){
	return {
		type:orderConf.GET_ORDER_LIST_BY_USERID_AND_STATUS_SUCCESS,
		payload:{
			getOrderListByUserIdAndStatusStatus:'success',
			orderList
		}
	}
}

export function getOrderListByUserIdAndStatusFail(){
	return {
		type:orderConf.GET_ORDER_LIST_BY_USERID_AND_STATUS_FAIL,
		payload:{
			getOrderListByUserIdAndStatusStatus:'fail'
		}
	}
}

//获取订单详情
export function getOrder(orderId){
	return {
		type:orderConf.GET_ORDER_REQUEST,
		orderId,
		payload:{
			getOrderStatus:'doing'
		}
	}
}

export function getOrderSuccess(orderInfo){
	return {
		type:orderConf.GET_ORDER_SUCCESS,
		payload:{
			getOrderStatus:'success',
			orderInfo
		}
	}
}


export function getOrderFail(){
	return {
		type:orderConf.GET_ORDER_FAIL,
		payload:{
			getOrderStatus:'fail'
		}
	}
}


// 支付
export function pay(payList,callback){
	return {
		type:orderConf.PAY_REQUEST,
		payList,
		callback,
		payload:{
			payStatus:'doing'
		}
	}
}

export function paySuccess(){
	return {
		type:orderConf.PAY_SUCCESS,
		payload:{
			payStatus:'success',
		}
	}
}


export function payFail(){
	return {
		type:orderConf.PAY_FAIL,
		payload:{
			payStatus:'fail'
		}
	}
}

// 确认收货
export function haveReceiveCommodity(orderId){
	return {
		type:orderConf.HAVE_RECEIVE_COMMODITY_REQUEST,
		orderId,
		payload:{
			haveReceiveCommodityStatus:'doing'
		}
	}
}

export function haveReceiveCommoditySuccess(orderList){
	return {
		type:orderConf.HAVE_RECEIVE_COMMODITY_SUCCESS,
		payload:{
			haveReceiveCommodityStatus:'success',
			orderList
		}
	}
}


export function haveReceiveCommodityFail(){
	return {
		type:orderConf.HAVE_RECEIVE_COMMODITY_FAIL,
		payload:{
			haveReceiveCommodityStatus:'fail'
		}
	}
}


// 添加评论
export function addComment(orderId,commentContent,commentGrade){
	return {
		type:orderConf.ADD_COMMENT_REQUEST,
		orderId,
		commentContent,
		commentGrade,
		payload:{
			addCommentStatus:'doing'
		}
	}
}

export function addCommentSuccess(orderList){
	return {
		type:orderConf.ADD_COMMENT_SUCCESS,
		payload:{
			addCommentStatus:'success',
			orderList
		}
	}
}


export function addCommentFail(){
	return {
		type:orderConf.ADD_COMMENT_FAIL,
		payload:{
			addCommentStatus:'fail'
		}
	}
}

// 添加评论
export function getCommentList(commodityId){
	return {
		type:orderConf.GET_COMMENT_LIST_REQUEST,
		commodityId,
		payload:{
			getCommentListStatus:'doing'
		}
	}
}

export function getCommentListSuccess(commentList){
	return {
		type:orderConf.GET_COMMENT_LIST_SUCCESS,
		payload:{
			getCommentListStatus:'success',
			commentList
		}
	}
}


export function getCommentListFail(){
	return {
		type:orderConf.GET_COMMENT_LIST_FAIL,
		payload:{
			getCommentListStatus:'fail'
		}
	}
}