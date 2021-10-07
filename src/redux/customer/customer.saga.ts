import lodash from 'lodash';
import { takeEvery, put } from 'redux-saga/effects';
import { ApiCustomer } from '../root.type';
import { ApiCustomerGet, ApiCustomerGetList, ApiCustomerPost } from './api/customer/api-customer';
import { CustomerActions } from './customer.action';
import {
  ApiCustomerPetDelete, ApiCustomerPetGet, ApiCustomerPetPost, ApiCustomerPetGetList,
} from './api/customer-pet/api-customer-pet';
import {
  ApiCustomerFamilyGet, ApiCustomerFamilyDelete, ApiCustomerFamilyGetList, ApiCustomerFamilyPost,
} from './api/customer-family/api-customer-family';
import { ApiCustomerFamilyGetListResponse, ApiCustomerFamilyGetResponse } from './api/customer-family/api-customer-family.type';
import { ApiCustomerPetGetResponse } from './api/customer-pet/api-customer-pet.type';
import { DialogActions } from '../dialog/dialog.action';
import {
  postHandle, deleteHandle, getListHandle, getHandle,
} from '../root.saga';
import { Store } from '../store';
import { ApiCustomerIdDelete, ApiCustomerIdGet } from './api/id/api-customer-id';
import { SystemActions } from '../system/system.action';

function* tryCustomerGet(action: ReturnType<typeof CustomerActions.api.customer.get>) {
  const { param, callback, noLoad } = action.payload;
  yield getHandle<ApiCustomer.Customer.Response.Get>({
    noLoad,
    api: new ApiCustomerGet(param),
    * onSuccess(result) {
      yield put(CustomerActions.setCustomer(result));
      if (callback && result) callback(lodash.cloneDeep(result));
    },
  });
}

function* tryCustomerGetList(action: ReturnType<typeof CustomerActions.api.customer.getList>) {
  yield getListHandle<ApiCustomer.Customer.Response.List>({
    api: new ApiCustomerGetList(action.payload),
    * onSuccess(result, hitCount) {
      yield put(CustomerActions.setList(result));
      yield put(CustomerActions.setListCount(hitCount));
    },
  });
}

function* tryCustomerGetCallbackList(action: ReturnType<
  typeof CustomerActions.api.customer.getCallbackList>) {
  const { param, onSuccess } = action.payload;
  yield getListHandle<ApiCustomer.Customer.Response.List>({
    api: new ApiCustomerGetList(param),
    * onSuccess(result, hitCount) {
      yield onSuccess(result, hitCount);
    },
  });
}

function* tryFamilyGet(action: ReturnType<typeof CustomerActions.api.family.get>) {
  const { param, callback } = action.payload;
  yield getHandle<ApiCustomerFamilyGetResponse>({
    api: new ApiCustomerFamilyGet(param),
    * onSuccess(result) {
      yield;
      if (callback && result) callback(lodash.cloneDeep(result));
    },
  });
}

function* tryFamilyGetList(action: ReturnType<typeof CustomerActions.api.family.getList>) {
  yield getListHandle<ApiCustomerFamilyGetListResponse>({
    api: new ApiCustomerFamilyGetList(action.payload),
    noLoad: true,
    * onSuccess(result) {
      yield put(CustomerActions.setFamilyList(result));
    },
  });
}

function* tryPetGetList(action: ReturnType<typeof CustomerActions.api.pet.getList>) {
  yield getListHandle<ApiCustomer.Pet.Response.List>({
    api: new ApiCustomerPetGetList(action.payload),
    noLoad: true,
    * onSuccess(result) {
      yield put(CustomerActions.setPetList(result));
    },
  });
}

function* tryFamilyPost(action: ReturnType<typeof CustomerActions.api.family.post>) {
  const { param, onSuccess, onError } = action.payload;
  yield put(SystemActions.isLoading(true));
  yield postHandle({
    title: 'ご家族情報',
    api: new ApiCustomerFamilyPost(param),
    onSuccess: () => {
      Store.dispatch(DialogActions.pop());
      Store.dispatch(CustomerActions.api.family.getList({
        id: param.base.id,
      }));
      if (onSuccess)onSuccess();
    },
    onError,
  });
  yield put(SystemActions.isLoading(false));
}

function* tryFamilyDelete(action: ReturnType<typeof CustomerActions.api.family.delete>) {
  const { param, onSuccess } = action.payload;
  yield put(SystemActions.isLoading(true));
  yield deleteHandle({
    title: 'ご家族情報',
    api: new ApiCustomerFamilyDelete(param),
    onSuccess: () => {
      Store.dispatch(CustomerActions.api.family.getList({ id: param.id }));
      if (onSuccess)onSuccess();
    },
  });
  yield put(SystemActions.isLoading(false));
}

function* tryCustomerPost(action: ReturnType<typeof CustomerActions.api.customer.post>) {
  const { param, onSuccess, onError } = action.payload;
  yield put(SystemActions.isLoading(true));
  yield postHandle({
    title: '顧客情報',
    api: new ApiCustomerPost(param),
    onSuccess: () => {
      if (onSuccess) onSuccess();
      Store.dispatch(DialogActions.pop());
    },
    onError: () => {
      if (onError)onError();
    },
  });
  yield put(SystemActions.isLoading(false));
}

function* tryPetGet(action: ReturnType<typeof CustomerActions.api.pet.get>) {
  const { param, callback } = action.payload;
  yield getHandle<ApiCustomerPetGetResponse>({
    api: new ApiCustomerPetGet(param),
    * onSuccess(result) {
      yield;
      if (callback && result) callback(lodash.cloneDeep(result));
    },
  });
}

function* tryIdGet(action: ReturnType<typeof CustomerActions.api.id.get>) {
  const { callback } = action.payload;
  yield getHandle<{id: number}>({
    api: new ApiCustomerIdGet(),
    noLoad: true,
    * onSuccess(result) {
      if (result) yield callback(result);
    },
  });
}

function* tryPetPost(action: ReturnType<typeof CustomerActions.api.pet.post>) {
  const { param, onSuccess, onError } = action.payload;
  yield postHandle({
    title: 'ペット情報',
    api: new ApiCustomerPetPost(param),
    onSuccess: () => {
      Store.dispatch(DialogActions.pop());
      Store.dispatch(CustomerActions.api.pet.getList({
        id: param.base.id,
      }));
      if (onSuccess) onSuccess();
    },
    onError,
  });
}

function* tryPetDelete(action: ReturnType<typeof CustomerActions.api.pet.delete>) {
  const { param, onSuccess } = action.payload;
  yield deleteHandle({
    title: 'ペット情報',
    api: new ApiCustomerPetDelete(param),
    onSuccess: () => {
      Store.dispatch(CustomerActions.api.pet.getList({ id: param.id }));
      if (onSuccess)onSuccess();
    },
  });
}

function* tryIdDelete(action: ReturnType<typeof CustomerActions.api.id.delete>) {
  yield deleteHandle({
    api: new ApiCustomerIdDelete(action.payload),
    noMessage: true,
    noLoad: true,
  });
}

export function* CustomerSaga() {
  yield takeEvery(CustomerActions.api.customer.get, tryCustomerGet);
  yield takeEvery(CustomerActions.api.customer.post, tryCustomerPost);
  yield takeEvery(CustomerActions.api.customer.getList, tryCustomerGetList);
  yield takeEvery(CustomerActions.api.customer.getCallbackList, tryCustomerGetCallbackList);
  yield takeEvery(CustomerActions.api.pet.getList, tryPetGetList);
  yield takeEvery(CustomerActions.api.pet.get, tryPetGet);
  yield takeEvery(CustomerActions.api.pet.post, tryPetPost);
  yield takeEvery(CustomerActions.api.pet.delete, tryPetDelete);
  yield takeEvery(CustomerActions.api.family.getList, tryFamilyGetList);
  yield takeEvery(CustomerActions.api.family.get, tryFamilyGet);
  yield takeEvery(CustomerActions.api.family.post, tryFamilyPost);
  yield takeEvery(CustomerActions.api.family.delete, tryFamilyDelete);
  yield takeEvery(CustomerActions.api.id.get, tryIdGet);
  yield takeEvery(CustomerActions.api.id.delete, tryIdDelete);
}
