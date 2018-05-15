import { put,takeLatest, call } from 'redux-saga/effects';
import * as Request from '../utils/Request';
import {Toast} from 'antd-mobile';

import {
  LOGIN_IN_REQUEST,LOGIN_OUT_REQUEST,LOGIN_UP_REQUEST,
  UPDATE_USER_REQUEST,GET_USER_REQUEST,REMOVE_USER_REQUEST,
  ADD_COLLECTION_REQUEST,REMOVE_COLLECTION_REQUEST,GET_COLLECTION_LIST_REQUEST,
  UPDATE_ADDRESS_REQUEST,ADD_ADDRESS_REQUEST,REMOVE_ADDRESS_REQUEST,GET_ADDRESS_LIST_REQUEST,
  ADD_COMMODITY_TO_SHOP_CAR_REQUEST,GET_SHOP_CAR_COMMODITY_LIST_REQUEST,REMOVE_COMMODITY_FROM_SHOP_CAR_REQUEST,
  REMOVE_COMMODITY_LIST_FROM_SHOP_CAR_REQUEST
  } from '../constants/user'

import * as UserActionCreators from '../actions/user';

export function* loginUp({phoneCode,phoneNumber,password,callback}){
  try {
    const jsonStr = JSON.stringify({
      phoneCode:phoneCode,
      phoneNumber:phoneNumber,
      password:password
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/user/loginUp','post',{},jsonStr);
    Toast.hide();
    Toast.success('注册成功',2);
    yield put(UserActionCreators.loginUpSuccess());
    callback && callback()
  } catch (error) {
    Toast.hide();
    Toast.fail('注册失败，请重试',2);
    yield put(UserActionCreators.loginUpFail());
  }
}

export function* loginIn({phoneCode,phoneNumber,password,callback}){
  try {
    const jsonStr = JSON.stringify({
      phoneCode:phoneCode,
      phoneNumber:phoneNumber,
      password:password
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/user/loginIn','post',{},jsonStr);
    Toast.hide();
    const userInfo = data.userInfo;
    try {
      yield localStorage.setItem('userId',userInfo._id);
      Toast.success('登录成功',2);
      yield put(UserActionCreators.loginInSuccess(userInfo));
      callback && callback();
    }catch(error){
      yield put(UserActionCreators.loginInFail());
      Toast.fail('登录失败',2);
    }
  } catch (error) {
    Toast.hide();
    Toast.fail('手机号或密码错误，请重试',2);
    yield put(UserActionCreators.loginInFail());
  }
}

export function* loginOut(callback){
  try {
    const login = yield localStorage.getItem('login');
    const jsonStr = JSON.stringify({
      userId:login.userId
    });
    Toast.loading('Loading...',0);
    yield call(Request.request, '/user/loginOut','post',{},jsonStr);
    Toast.hide();
    try {
      yield localStorage.removeItem('userId');
      Toast.success('成功退出登录',2);
      callback && callback()

    }catch(error){
      Toast.fail('操作失败，请重试',2);
    }
  } catch (error) {
    Toast.hide();
    Toast.fail('操作失败，请重试',2);
  }
}

export function* getUser({userId}){
  try {
    // Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, `/user/get/${userId}`,'get',{});
    Toast.hide();
    const userInfo = data.userInfo;
    yield put(UserActionCreators.getUserSuccess(userInfo));

  } catch (error) {
    Toast.hide();
    Toast.fail('操作失败，请重试',2);
    yield put(UserActionCreators.getUserFail());
  }
}


export function* updateUser({userId,userInfo,successNav,callback}){
  try {
    const jsonStr = JSON.stringify({
      userId,
      ...userInfo
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, "/user/update",'post',{},jsonStr);
    Toast.hide()
    yield put(UserActionCreators.updateUserSuccess(userInfo));
    callback && callback()
   
  } catch (error) {
    Toast.hide();
    Toast.fail('获取用户信息失败，请重试',2);
    yield put(UserActionCreators.updateUserFail());
  }
}

// 收藏
export function* addCollection({userId,opType,shopId,commodityId,callback}){
  try {
    const jsonStr = JSON.stringify({
      userId,
      type:opType,
      shopId,
      commodityId
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/user/addCollection','post',{},jsonStr);
    Toast.hide();
    Toast.success('收藏成功',2);
    callback && callback()
    yield put(UserActionCreators.addCollectionSuccess(data.collectionList));

  } catch (error) {
    Toast.hide();
    Toast.fail('操作失败，请重试',2);
    yield put(UserActionCreators.addCollectionFail());
  }
}


export function* removeCollection({userId,opType,shopId,commodityId,callback}){
  try {
    const jsonStr = JSON.stringify({
      userId,
      type:opType,
      shopId,
      commodityId
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/user/removeCollection','post',{},jsonStr);
    Toast.hide();
    Toast.success('成功取消收藏',2);
     callback && callback()
    yield put(UserActionCreators.removeCollectionSuccess(data.collectionList));
  
  } catch (error) {
    Toast.hide();
    Toast.fail('操作失败，请重试',2);
    yield put(UserActionCreators.removeCollectionFail());
  }
}

export function* getCollectionList({userId,opType}){
  try {
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, `/user/getCollectionList/${userId}/${opType}`,'get',{});
    Toast.hide();
    yield put(UserActionCreators.getCollectionListSuccess(data.collectionList));
  } catch (error) {
    Toast.hide();
    Toast.fail('操作失败，请重试',2);
    yield put(UserActionCreators.getCollectionListFail());
  }
}


// 地址
export function* addAddress({userId,addressInfo}){
  try {
    const jsonStr = JSON.stringify({
      userId,
      addressInfo
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/user/addAddress','post',{},jsonStr);
    Toast.hide();
    Toast.success('添加成功',2);
    yield put(UserActionCreators.addAddressSuccess(data.addressList));

  } catch (error) {
    Toast.hide();
    Toast.fail('操作失败，请重试',2);
    yield put(UserActionCreators.addAddressFail());
  }
}

export function* getAddressList({userId}){
  try {
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/user/getAddressList/'+userId,'get',{});
    Toast.hide();
    yield put(UserActionCreators.getAddressListSuccess(data.addressList));
  } catch (error) {
    Toast.hide();
    Toast.fail('操作失败，请重试',2);
    yield put(UserActionCreators.getAddressListFail());
  }
}

export function* updateAddress({userId,addressId,addressInfo}){
  try {
    const jsonStr = JSON.stringify({
      userId,
      addressId,
      addressInfo
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/user/updateAddress','post',{},jsonStr);
    Toast.hide();
    Toast.success('修改成功',2);
    yield put(UserActionCreators.updateAddressSuccess(data.addressList));
    
  } catch (error) {
    Toast.hide();
    Toast.fail('操作失败，请重试',2);
    yield put(UserActionCreators.updateAddressFail());
  }
}

export function* removeAddress({userId,addressId}){
  try {
    const jsonStr = JSON.stringify({
      userId,
      addressId
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/user/removeAddress','post',{},jsonStr);
    Toast.hide();
    Toast.success('删除成功',2);
    yield put(UserActionCreators.removeAddressSuccess(data.addressList));
  
  } catch (error) {
    Toast.hide();
    Toast.fail('操作失败，请重试',2);
    yield put(UserActionCreators.removeAddressFail());
  }
}


// 购物车
export function* addCommodityToShopCar({userId,shopId,commodityId,modelId,buySum,callback}){
  try {
    const jsonStr = JSON.stringify({
      userId,
      shopId,commodityId,modelId,buySum
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/user/addCommodityToShopCar','post',{},jsonStr);
    Toast.hide();
    Toast.success('添加成功',2);
    callback && callback();
    yield put(UserActionCreators.addCommodityToShopCarSuccess(data.shopCarCommodityList));

  } catch (error) {
    Toast.hide();
    Toast.fail('操作失败，请重试',2);
    yield put(UserActionCreators.addCommodityToShopCarFail());
  }
}

export function* getShopCarCommodityList({userId}){
  try {
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/user/getShopCarCommodityList/'+userId,'get',{});
    Toast.hide();
    yield put(UserActionCreators.getShopCarCommodityListSuccess(data.shopCarCommodityList));
  } catch (error) {
    Toast.hide();
    Toast.fail('获取失败，请重试',2);
    yield put(UserActionCreators.getShopCarCommodityListFail());
  }
}


export function* removeCommodityFromShopCar({userId,shopCarItemId}){
  try {
    const jsonStr = JSON.stringify({
      userId,
      shopCarItemId
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/user/removeCommodityFromShopCar','post',{},jsonStr);
    Toast.hide();
    yield put(UserActionCreators.removeCommodityFromShopCarSuccess(data.shopCarCommodityList));
  
  } catch (error) {
    Toast.hide();
    Toast.fail('移除失败，请重试',2);
    yield put(UserActionCreators.removeCommodityFromShopCarFail());
  }
}

export function* removeCommodityListFromShopCar({userId,shopCarItemIdList}){
  try {
    const jsonStr = JSON.stringify({
      userId,
      shopCarItemIdList
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/user/removeCommodityListFromShopCar','post',{},jsonStr);
    Toast.hide();
    yield put(UserActionCreators.removeCommodityFromShopCarSuccess(data.shopCarCommodityList));
  
  } catch (error) {
    Toast.hide();
    Toast.fail('移除失败，请重试',2);
    yield put(UserActionCreators.removeCommodityFromShopCarFail());
  }
}





export function* watchUserRequest(getState) {
  yield takeLatest(LOGIN_UP_REQUEST, loginUp);
  yield takeLatest(LOGIN_IN_REQUEST, loginIn);
  yield takeLatest(LOGIN_OUT_REQUEST, loginOut);
  
  yield takeLatest(GET_USER_REQUEST, getUser);
  yield takeLatest(UPDATE_USER_REQUEST, updateUser);

   yield takeLatest(ADD_COLLECTION_REQUEST, addCollection);
  yield takeLatest(GET_COLLECTION_LIST_REQUEST, getCollectionList);
  yield takeLatest(REMOVE_COLLECTION_REQUEST, removeCollection);

  yield takeLatest(ADD_ADDRESS_REQUEST, addAddress);
  yield takeLatest(GET_ADDRESS_LIST_REQUEST, getAddressList);
  yield takeLatest(UPDATE_ADDRESS_REQUEST, updateAddress);
  yield takeLatest(REMOVE_ADDRESS_REQUEST, removeAddress);

  yield takeLatest(ADD_COMMODITY_TO_SHOP_CAR_REQUEST, addCommodityToShopCar);
  yield takeLatest(GET_SHOP_CAR_COMMODITY_LIST_REQUEST, getShopCarCommodityList);
  yield takeLatest(REMOVE_COMMODITY_FROM_SHOP_CAR_REQUEST, removeCommodityFromShopCar);
  yield takeLatest(REMOVE_COMMODITY_LIST_FROM_SHOP_CAR_REQUEST, removeCommodityListFromShopCar);

}