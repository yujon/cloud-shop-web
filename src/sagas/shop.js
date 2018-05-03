import { put,takeLatest, call, } from 'redux-saga/effects';
import * as Request from '../utils/Request';
import {Toast} from 'antd-mobile';

import {GET_SHOP_REQUEST,GET_COMMODITY_CATE_LIST_REQUEST} from '../constants/shop'

import * as ShopActionCreators from '../actions/shop';

export function* getShop({shopId}){
  try {
    // Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/shop/get/'+shopId,'get');
    Toast.hide();
    const shopInfo = data.shopInfo;
    yield put(ShopActionCreators.getShopSuccess(shopInfo));
  } catch (error) {
     Toast.hide();
     Toast.fail('获取不到店铺信息，请重试',1);
     yield put(ShopActionCreators.getShopFail());
  }
}


export function* getCommodityCateList({shopId}){
  try {
    const {data} = yield call(Request.request, '/shop/getCommodityCateList/'+shopId,'get',{});
    const commodityCateList = data.commodityCateList;
    yield put(ShopActionCreators.getCommodityCateListSuccess(commodityCateList));
  } catch (error) {
     Toast.hide();
     Toast.fail('获取不到店铺信息，请重试',1);
     yield put(ShopActionCreators.getCommodityCateListFail());
  }
}

export function* watchShopRequest(getState) {
  yield takeLatest(GET_SHOP_REQUEST, getShop);
  yield takeLatest(GET_COMMODITY_CATE_LIST_REQUEST, getCommodityCateList);
}

