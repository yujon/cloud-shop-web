import { put,takeLatest, call } from 'redux-saga/effects';
import * as Request from '../utils/Request';
import {Toast} from 'antd-mobile';

import {GET_SETTING_REQUEST} from '../constants/setting'

import * as SettingActionCreators from '../actions/setting';


export function* getSetting(){
  try {
    // Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/setting/get','get',{});
    Toast.hide();
    const settingInfo = data.settingInfo;
    yield put(SettingActionCreators.getSettingSuccess(settingInfo));
  } catch (error) {
    Toast.hide();
    Toast.fail('操作失败，请重试',2);
    yield put(SettingActionCreators.getSettingFail());
  }
}




export function* watchSettingRequest(getState) {

  yield takeLatest(GET_SETTING_REQUEST, getSetting);

}