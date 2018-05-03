import { put,takeLatest, call } from 'redux-saga/effects';
import * as Request from '../utils/Request';
import {Toast} from 'antd-mobile';

import {GET_SWIPER_IMAGE_LIST_REQUEST,GET_HOTCASE_LIST_REQUEST,GET_SPECIAL_ACTIVITY_LIST_REQUEST} from '../constants/market';
import * as MarketActionCreators from '../actions/market';


export function* getSwiperImgList({}){
  try {
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/market/getSwiperImgList',{});
    Toast.hide();
    yield put(MarketActionCreators.getSwiperImgListSuccess(data.swiperImgList));
  } catch (error) {
    Toast.hide();
    Toast.fail('操作失败，请重试',2);
    yield put(MarketActionCreators.getSwiperImgListFail());
  }
}

export function* getHotCaseList({}){
  try {
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/market/getHotCaseList',{});
    Toast.hide();
    yield put(MarketActionCreators.getHotCaseListSuccess(data.hotCaseList));
  } catch (error) {
    Toast.hide();
    Toast.fail('操作失败，请重试',2);
    yield put(MarketActionCreators.getHotCaseListFail());
  }
}

export function* getSpecialActivityList({}){
  try {
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/market/getSpecialActivityList',{});
    Toast.hide();
    yield put(MarketActionCreators.getSpecialActivityListSuccess(data.specialActivityList));
  } catch (error) {
    Toast.hide();
    Toast.fail('操作失败，请重试',2);
    yield put(MarketActionCreators.getSpecialActivityListFail());
  }
}

export function* watchMarketRequest(getState) {
  yield takeLatest(GET_SWIPER_IMAGE_LIST_REQUEST, getSwiperImgList);
  yield takeLatest(GET_HOTCASE_LIST_REQUEST, getHotCaseList);
  yield takeLatest(GET_SPECIAL_ACTIVITY_LIST_REQUEST, getSpecialActivityList);
}