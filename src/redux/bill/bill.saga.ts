import { takeEvery } from 'redux-saga/effects';
import { cloneDeep } from 'lodash';
import { BillActions } from './bill.action';
import { Store } from '../store';
import {
  ApiBillPost, ApiBillGet, ApiBillGetList,
} from './api/bill/api-bill';
import {
  getListHandle, postHandle, getHandle,
} from '../root.saga';
import { DialogActions } from '../dialog/dialog.action';
import { ApiBillGetResponse, ApiBillGetListResponse } from './api/bill/api-bill.type';

function* tryBillGet(action: ReturnType<typeof BillActions.api.bill.get>) {
  const { param, callback } = action.payload;
  const api = new ApiBillGet(param);
  yield getHandle<ApiBillGetResponse>({
    api,
    onSuccess: (res) => {
      if (res && callback) {
        callback(cloneDeep(res));
      } else {
        Store.dispatch(BillActions.setBill(res));
      }
    },
  });
}

function* tryBillGetList(action: ReturnType<typeof BillActions.api.bill.getList>) {
  const { param, onSuccess, noLoad } = action.payload;
  yield getListHandle<ApiBillGetListResponse>({
    api: new ApiBillGetList(param),
    noLoad,
    onSuccess: (res) => {
      if (onSuccess) {
        onSuccess(cloneDeep(res));
        return;
      }
      Store.dispatch(BillActions.setList(res));
    },
  });
}

function* tryBillPost(action: ReturnType<typeof BillActions.api.bill.post>) {
  const { param, onSuccess, onError } = action.payload;
  const api = new ApiBillPost(param);
  yield postHandle({
    api,
    onSuccess: () => {
      Store.dispatch(DialogActions.pop());
      if (onSuccess)onSuccess();
    },
    onError: () => {
      if (onError)onError();
    },
  });
}

export function* BillSaga() {
  yield takeEvery(BillActions.api.bill.get, tryBillGet);
  yield takeEvery(BillActions.api.bill.post, tryBillPost);
  yield takeEvery(BillActions.api.bill.getList, tryBillGetList);
}
