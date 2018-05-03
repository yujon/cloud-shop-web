import { all, fork } from 'redux-saga/effects';
import { watchCommonRequest } from './common';
import { watchUserRequest } from './user';
import { watchShopRequest } from './shop';
import { watchCommodityRequest } from './commodity';
import { watchMarketRequest } from './market';
import { watchSettingRequest } from './setting';
import { watchOrderRequest } from './order';

export default function* rootSaga() {
  yield all([
  	fork(watchCommonRequest),
  	fork(watchUserRequest),
  	fork(watchCommodityRequest),
  	fork(watchMarketRequest),
  	fork(watchSettingRequest),
  	fork(watchShopRequest),
  	fork(watchOrderRequest)
  ]);
}