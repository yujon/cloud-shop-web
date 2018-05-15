import { put,takeLatest, call } from 'redux-saga/effects';
import * as Request from '../utils/Request';
import {Toast} from 'antd-mobile';

import {
  ADD_ORDER_LIST_REQUEST,GET_ORDER_LIST_BY_USERID_REQUEST,GET_ORDER_LIST_BY_USERID_AND_STATUS_REQUEST,REMOVE_ORDER_REQUEST,
  PAY_REQUEST,HAVE_RECEIVE_COMMODITY_REQUEST,ADD_COMMENT_REQUEST,GET_COMMENT_LIST_REQUEST
  } from '../constants/order'

import * as OrderctionCreators from '../actions/order';

export function* getOrderListByUserId({userId}){
  try {
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/order/getListByUserId/'+userId,'get',{});
    Toast.hide();
    yield put(OrderctionCreators.getOrderListByUserIdSuccess(data.orderList));
  } catch (error) {
    Toast.hide();
    Toast.fail('获取失败，请重试',2);
    yield put(OrderctionCreators.getOrderListByUserIdFail());
  }
}

export function* getOrderListByUserIdAndStatus({userId,status}){
  try {
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, `/order/getListByUserIdAndStatus/${userId}/${status}`,'get',{});
    Toast.hide();
    yield put(OrderctionCreators.getOrderListByUserIdAndStatusSuccess(data.orderList));
  } catch (error) {
    Toast.hide();
    Toast.fail('获取失败，请重试',2);
    yield put(OrderctionCreators.getOrderListByUserIdAndStatusFail());
  }
}

// 批量添加订单
export function* addOrderList({orderList,callback}){
  try {
    const jsonStr = JSON.stringify({
      orderList
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/order/addList','post',{},jsonStr);
    Toast.hide();
    Toast.success('创建成功',2);
    callback && callback(data.toPaidOrderList);
    yield put(OrderctionCreators.addOrderListSuccess());

  } catch (error) {
    Toast.hide();
    Toast.fail('创建失败，请重试',2);
    yield put(OrderctionCreators.addOrderListFail());
  }
}

export function* removeOrder({orderId}){
  try {
    const jsonStr = JSON.stringify({
      orderId,
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/order/remove','post',{},jsonStr);
    Toast.hide();
    Toast.success('删除成功',2);
    const orderList = data.orderList;
    yield put(OrderctionCreators.removeOrderSuccess(orderList));
  
  } catch (error) {
    Toast.hide();
    Toast.fail('删除失败，请重试',2);
    yield put(OrderctionCreators.removeOrderFail());
  }
}

export function* pay({payList,callback}){
  try {
    const jsonStr = JSON.stringify({
      payList,
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/order/pay','post',{},jsonStr);
    Toast.hide();
    Toast.success('支付成功',2);
    callback && callback();
    yield put(OrderctionCreators.paySuccess());
  
  } catch (error) {
    Toast.hide();
    Toast.fail('支付失败，请重试',2);
    yield put(OrderctionCreators.payFail());
  }
}

export function* haveReceiveCommodity({orderId}){
  try {
    const jsonStr = JSON.stringify({
      orderId,
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/order/hadReceivedCommodity','post',{},jsonStr);
    Toast.hide();
    yield put(OrderctionCreators.haveReceiveCommoditySuccess(data.orderList));
  } catch (error) {
    Toast.hide();
    Toast.fail('确认收货失败，请重试',2);
    yield put(OrderctionCreators.haveReceiveCommodityFail());
  }
}

export function* addComment({orderId,commentContent,commentGrade}){
  try {
    const jsonStr = JSON.stringify({
      orderId,
      commentContent,
      commentGrade
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/order/addComment','post',{},jsonStr);
    Toast.hide();
    Toast.success('添加成功',2);
    yield put(OrderctionCreators.addCommentSuccess(data.orderList));
  
  } catch (error) {
    Toast.hide();
    Toast.fail('添加评论失败，请重试',2);
    yield put(OrderctionCreators.addCommentFail());
  }
}

export function* getCommentList({commodityId}){
  try {
    // Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, `/order/getCommentList/${commodityId}`,'get',{});
    Toast.hide();
    yield put(OrderctionCreators.getCommentListSuccess(data.commentList));
  
  } catch (error) {
    Toast.hide();
    Toast.fail('获取评论列表失败，请重试',2);
    yield put(OrderctionCreators.getCommentListFail());
  }
}


export function* watchOrderRequest(getState) {

  yield takeLatest(ADD_ORDER_LIST_REQUEST, addOrderList);
  yield takeLatest(REMOVE_ORDER_REQUEST, removeOrder);
  yield takeLatest(GET_ORDER_LIST_BY_USERID_REQUEST, getOrderListByUserId);
  yield takeLatest(GET_ORDER_LIST_BY_USERID_AND_STATUS_REQUEST, getOrderListByUserIdAndStatus);
  yield takeLatest(PAY_REQUEST, pay);
  yield takeLatest(HAVE_RECEIVE_COMMODITY_REQUEST, haveReceiveCommodity);
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
  yield takeLatest(GET_COMMENT_LIST_REQUEST, getCommentList);

}