import { put,takeLatest, call } from 'redux-saga/effects';
import * as Request from '../utils/Request';
import {Toast} from 'antd-mobile';

import {GET_COMMODITY_REQUEST,GET_COMMODITY_LIST_REQUEST} from '../constants/commodity'
import * as CommodityrActionCreators from '../actions/commodity';


export function* getCommodityList({shopId}){
  try {
    // Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/commodity/getUpCarriageListByShopId/'+ shopId,'get',{});
    Toast.hide();
    const commodityList = data.commodityList;
    yield put(CommodityrActionCreators.getCommodityListSuccess(commodityList));
  } catch (error) {
    Toast.hide();
    Toast.fail('获取商品列表失败',2);
    yield put(CommodityrActionCreators.getCommodityListFail());
  }
}


export function* getCommodity({shopId,commodityId}){
  try {
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, `/commodity/get/${shopId}/${commodityId}`,'get',{});
    Toast.hide();
    const commodityInfo = data.commodityInfo;
    yield put(CommodityrActionCreators.getCommoditySuccess(commodityInfo));
  } catch (error) {
    Toast.hide();
    Toast.fail('获取商品信息失败',2);
    yield put(CommodityrActionCreators.getCommodityFail());
  }
}


export function* watchCommodityRequest(getState) {
  yield takeLatest(GET_COMMODITY_LIST_REQUEST, getCommodityList);
  yield takeLatest(GET_COMMODITY_REQUEST, getCommodity);
}