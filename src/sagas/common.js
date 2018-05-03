import { put,takeLatest, call } from 'redux-saga/effects';
import {Toast} from 'antd-mobile';
import * as Request from '../utils/Request';

import {UPLOAD_FILE_REQUEST} from '../constants/common'
import * as CommonActionCreators from '../actions/common';

export function* uploadFile({file,fileName,callback}){
  try {
    let json = new FormData();
    json.append('myfile', {
        uri: file,
        name: fileName,
        type: 'image/jpeg'
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/upload/uploadFile','post',{'Content-Type':'multipart/form-data'},json);
    Toast.hide();
    yield put(CommonActionCreators.uploadFileSuccess());
    callback && callback(data.tmpImg);
    
  } catch (error) {
    Toast.hide();
    Toast.fail('上传失败，请重试',2);
    yield put(CommonActionCreators.uploadFileFail());
  }
}


export function* watchCommonRequest(getState) {
  yield takeLatest(UPLOAD_FILE_REQUEST, uploadFile);
}