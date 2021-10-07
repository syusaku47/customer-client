import { all, fork, put } from 'redux-saga/effects';
import * as lodash from 'lodash';
import { ApiBase } from '../service/api-base';
import { ResFileType, ResultType } from '../type/api.type';
import { AuthSaga } from './auth/auth.saga';
import { CustomerSaga } from './customer/customer.saga';
import { DialogSaga } from './dialog/dialog.saga';
import { MapSaga } from './map/map.saga';
import { MasterSaga } from './master/master.saga';
import { ProjectSaga } from './project/project.saga';
import { SystemActions } from './system/system.action';
import { SystemSaga } from './system/system.saga';
import { TestSaga } from './test/test.saga';
import { TagSaga } from './tag/tag.saga';
import { Store } from './store';
import { DialogActions } from './dialog/dialog.action';
import { FileSaga } from './file/file.saga';
import { EstimateSaga } from './estimate/estimate.saga';
import { SupportHistorySaga } from './support-history/support-history.saga';
import { MaintenanceSaga } from './maintenance/maintenance.saga';
import { OrderSaga } from './order/order.saga';
import { CsvSaga } from './csv/csv.saga';
import { BillSaga } from './bill/bill.saga';

export type GetParam<T = any> = {
  noLoad?: boolean;
  api: ApiBase;
  onSuccess: (result: T | null) => void;
}

/**
 * getList用共通処理
 * @param param
 */
export function* getHandle<T = any>(param:GetParam<T>) {
  const { api, onSuccess, noLoad } = param;
  if (!noLoad) {
    yield put(SystemActions.isLoading(true));
  }
  try {
    const result: ResultType<T> = yield api.run();
    if (ApiBase.isSuccess(result)) {
      yield onSuccess(lodash.cloneDeep(result.body.data ? result.body.data[0] : null));
    } else {
      yield put(SystemActions.errorHandle({ result, title: '' }));
    }
  } catch (e) {
    yield put(SystemActions.connectionError());
  }
  if (!noLoad) {
    yield put(SystemActions.isLoading(false));
  }
}

export type Param<T = any> = {
  noLoad?: boolean;
  api: ApiBase;
  onSuccess: (result: T[], hit_count: number) => void;
}

/**
 * getList用共通処理
 * @param param
 */
export function* getListHandle<T = any>(param:Param<T>) {
  const { api, onSuccess, noLoad } = param;
  if (!noLoad) {
    yield put(SystemActions.isLoading(true));
  }
  try {
    const result: ResultType<T> = yield api.run();
    if (ApiBase.isSuccess(result)) {
      yield onSuccess(lodash.cloneDeep(result.body.data || []), result.body.hit_count || 0);
    } else {
      yield put(SystemActions.errorHandle({ result, title: '' }));
    }
  } catch (e) {
    yield put(SystemActions.connectionError());
  }
  if (!noLoad) {
    yield put(SystemActions.isLoading(false));
  }
}

export type PostParam = {
  isAllClear?: boolean;
  api: ApiBase;
  onSuccess?: (message:string[] | null | undefined) => void
  onError?: () => void;
  noMessage?: boolean;
  title?: string;
  noLoad?: boolean;
}
/**
 * Post用共通処理
 * @param param
 */
export function* postHandle(param:PostParam) {
  const {
    api, onSuccess, isAllClear, /* onError, */ noMessage, title, noLoad,
  } = param;
  if (!noLoad) {
    yield put(SystemActions.isLoading(true));
  }
  try {
    const result: ResultType = yield api.run();
    if (ApiBase.isSuccess(result)) {
      if (noMessage) {
        if (isAllClear) yield put(DialogActions.clear());
        if (onSuccess) yield onSuccess(['']);
        return;
      }
      yield put(DialogActions.pushMessage({
        /* TODO API接続後変更 */
        title: title ? `${title}登録完了` : '',
        message: ['登録が完了しました。'],
        callback: () => {
          if (isAllClear) Store.dispatch(DialogActions.clear());
          if (onSuccess) onSuccess(['']);
          // if (onSuccess) onSuccess(result.header.messages);
        },
        callbackClose: () => {
          if (isAllClear) Store.dispatch(DialogActions.clear());
          if (onSuccess) onSuccess(['']);
        },
      }));
    } else {
      yield put(SystemActions.errorHandle({ result, title: title ? `${title}登録失敗` : '' }));
    }
  } catch (e) {
    yield put(SystemActions.connectionError());
  }
  if (!noLoad) { yield put(SystemActions.isLoading(false)); }
}

/**
 * Delete用共通処理
 * @param param
 */
export function* deleteHandle(param:PostParam) {
  const {
    api, onSuccess, isAllClear, onError, noMessage, title, noLoad,
  } = param;
  if (!noLoad) {
    yield put(SystemActions.isLoading(true));
  }
  try {
    const result: ResultType = yield api.run();
    if (result) {
      if (noMessage) {
        if (isAllClear) yield put(DialogActions.clear());
        if (onSuccess) yield onSuccess(['']);
        return;
      }
      yield put(DialogActions.pushMessage({
        /* TODO API接続後変更 */
        title: title ? `${title}削除完了` : '',
        message: ['削除が完了しました。'],
        callback: () => {
          if (isAllClear) Store.dispatch(DialogActions.clear());
          if (onSuccess) onSuccess(['']);
          // if (onSuccess) onSuccess(result.header.messages);
        },
        callbackClose: () => {
          if (isAllClear) Store.dispatch(DialogActions.clear());
          if (onSuccess) onSuccess(['']);
          // if (onSuccess) onSuccess(result.header.messages);
        },
      }));
    } else {
      yield put(DialogActions.pushMessage({
        /* TODO API接続後変更 */
        title: title ? `${title}削除失敗` : '',
        message: ['削除に失敗しました'],
        callback: () => {
          if (onError) onError();
        },
        callbackClose: () => {
          if (onError) onError();
        },
      }));
    }
  } catch (e) {
    yield put(SystemActions.connectionError());
  }
  if (!noLoad) {
    yield put(SystemActions.isLoading(false));
  }
}

export type DownloadParam = {
  api: ApiBase;
};

/**
 * Download用共通処理
 * @param param
 */
export function* downloadHandle(param:DownloadParam) {
  const { api } = param;
  yield put(SystemActions.isLoading(true));
  try {
    const result: ResFileType = yield api.run();
    if (ApiBase.isSuccess(result)) {
      const url = URL.createObjectURL(result.file);
      const a: HTMLAnchorElement = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.setAttribute('download', result.file.name);
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } else {
      yield put(DialogActions.pushMessage({
        title: '',
        // message: [result.header.messages],
        message: ['ダウンロードに失敗しました'],
      }));
      // yield errorHandle(result);
    }
  } catch (e) {
    yield put(SystemActions.connectionError());
  }
  yield put(SystemActions.isLoading(false));
}

export const RootSaga = function* root() {
  yield all([
    fork(TestSaga),
    fork(AuthSaga),
    fork(DialogSaga),
    fork(SystemSaga),
    fork(MapSaga),
    fork(CustomerSaga),
    fork(SupportHistorySaga),
    fork(MasterSaga),
    fork(ProjectSaga),
    fork(TagSaga),
    fork(FileSaga),
    fork(EstimateSaga),
    fork(MaintenanceSaga),
    fork(OrderSaga),
    fork(CsvSaga),
    fork(BillSaga),
  ]);
};
