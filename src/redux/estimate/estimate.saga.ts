import lodash, { cloneDeep } from 'lodash';
import { all, put, takeEvery } from 'redux-saga/effects';
import { EstimateActions } from './estimate.action';
import { ApiEstimatePost, ApiEstimateGetList, ApiEstimateGet } from './api/estimate/api-estiamte';
import { DialogActions } from '../dialog/dialog.action';
import { Store } from '../store';
import {
  getHandle, getListHandle, postHandle, deleteHandle,
} from '../root.saga';
import { ApiEstimate } from '../root.type';
import { ApiEstimateMeisaiGetResponse, ApiEstimateMeisaiSideMenuListResponse } from './api/meisai/api-estimate-meisai.type';
import {
  ApiEstimateMeisaiPostList,
  ApiEstimateMeisaiPost,
  ApiEstimateMeisaiSideMenuGetList,
  ApiEstimateMeisaiGetList,
  ApiEstimateMeisaiDelete,
  ApiEstimateMeisaiPrintNamePost,
  ApiEstimateMeisaiGet,
} from './api/meisai/api-estimate-meisai';
import { ApiEstimateIdGet, ApiEstimateIdDelete } from './api/id/api-estiamte-id';
import { ApiEstimatePrint } from './api/print/api-estimate-print';
import { ResFileType } from '../../type/api.type';
import { ApiBase } from '../../service/api-base';
import { SystemActions } from '../system/system.action';
import { errorHandle } from '../system/system.saga';

function* tryEstimateGet(action: ReturnType<typeof EstimateActions.api.estimate.get>) {
  const { param, callback } = action.payload;
  const api = new ApiEstimateGet(param);
  yield getHandle<ApiEstimate.Estimate.Response.Get>({
    api,
    onSuccess: (result) => {
      if (callback && result) {
        callback(lodash.cloneDeep(result));
        return;
      }
      Store.dispatch(EstimateActions.setEstimate(result));
    },
  });
}

function* tryEstimateGetList(action: ReturnType<typeof EstimateActions.api.estimate.getList>) {
  const { param, callback, noLoad } = action.payload;
  yield getListHandle<ApiEstimate.Estimate.Response.List>({
    noLoad,
    api: new ApiEstimateGetList(param),
    onSuccess: (result) => {
      if (callback) {
        callback(cloneDeep(result));
      } else {
        Store.dispatch(EstimateActions.setList(result));
      }
    },
  });
}

function* tryEstimatePost(action: ReturnType<typeof EstimateActions.api.estimate.post>) {
  const { param, onSuccess, onError } = action.payload;
  const api = new ApiEstimatePost(param);
  yield postHandle({
    title: '見積情報',
    api,
    onSuccess: () => {
      // Store.dispatch(EstimateActions.api.estimate.getList({ param: {} }));
      if (onSuccess)onSuccess();
    },
    onError: () => {
      if (onError)onError();
    },
  });
}

function* tryMeisaiPost(action: ReturnType<typeof EstimateActions.api.meisai.post>) {
  const { param, onSuccess, onError } = action.payload;
  const api = new ApiEstimateMeisaiPost(param);
  yield postHandle({
    title: '見積明細情報',
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

function* tryMeisaiPostList(action: ReturnType<typeof EstimateActions.api.meisai.postList>) {
  const { param, onSuccess } = action.payload;
  const api = new ApiEstimateMeisaiPostList(param);
  yield postHandle({
    noLoad: true,
    api,
    onSuccess: () => {
      // Store.dispatch(DialogActions.pop());
      if (onSuccess)onSuccess();
    },
    noMessage: true,
  });
}

function* tryMeisaiSideMenuGetList(
  action: ReturnType<typeof EstimateActions.api.meisai.getSideMenuList>,
) {
  const { param, onSuccess } = action.payload;
  const api = new ApiEstimateMeisaiSideMenuGetList(param);
  yield put(SystemActions.isLoading(true));
  try {
    const result: {body:ApiEstimateMeisaiSideMenuListResponse} = yield api.run();
    if (ApiBase.isSuccess(result)) {
      if (onSuccess) {
        onSuccess(cloneDeep(result.body));
        return;
      }
      yield put(EstimateActions.setMeisaiSideMenu(result.body));
    } else {
      yield errorHandle(result as any);
    }
  } catch (e) {
    yield put(SystemActions.connectionError());
  } finally {
    yield put(SystemActions.isLoading(false));
  }
}

function* tryMeisaiGet(
  action: ReturnType<typeof EstimateActions.api.meisai.get>,
) {
  const { param, callback } = action.payload;
  yield getHandle<ApiEstimateMeisaiGetResponse>({
    api: new ApiEstimateMeisaiGet(param),
    onSuccess: (res) => {
      if (callback && res) {
        callback(cloneDeep(res));
      } else {
        Store.dispatch(EstimateActions.setMeisai(res));
      }
    },
  });
}

function* tryMeisaiGetList(
  action: ReturnType<typeof EstimateActions.api.meisai.getList>,
) {
  const { param, callback } = action.payload;
  yield getListHandle<ApiEstimate.Meisai.Response.List>({
    api: new ApiEstimateMeisaiGetList(param),
    noLoad: true,
    onSuccess: (res) => {
      if (callback) {
        callback(cloneDeep(res));
      } else {
        Store.dispatch(EstimateActions.setMeisaiList(res));
      }
    },
  });
}

function* tryEstimateMeisaiDelete(action: ReturnType<typeof EstimateActions.api.meisai.delete>) {
  const { param, onSuccess } = action.payload;
  Store.dispatch(SystemActions.isLoading(true));
  try {
    yield all(param.map((v) => new ApiEstimateMeisaiDelete({
      id: v.id,
      meisai_id: v.meisai_id,
    }).run()));
    if (onSuccess) onSuccess();
    Store.dispatch(SystemActions.isLoading(false));
  } catch (error) {
    Store.dispatch(SystemActions.isLoading(false));
    console.log('失敗');
    console.log(error);
  }
}

function* tryMeisaiPrintName(action: ReturnType<typeof EstimateActions.api.meisai.printName>) {
  const { param, onSuccess } = action.payload;
  const api = new ApiEstimateMeisaiPrintNamePost(param);
  yield postHandle({
    title: '　',
    api,
    onSuccess: () => {
      Store.dispatch(DialogActions.pop());
      if (onSuccess)onSuccess();
    },
  });
}

function* tryIdGet(
  action: ReturnType<typeof EstimateActions.api.id.get>,
) {
  const { project_id, callback } = action.payload;
  yield getHandle<{ id: number }>({
    api: new ApiEstimateIdGet({ project_id }),
    onSuccess: (res) => {
      if (res)callback(cloneDeep(res));
    },
    noLoad: true,
  });
}

function* tryIdDelete(action: ReturnType<typeof EstimateActions.api.id.delete>) {
  const { project_id, callback } = action.payload;
  const api = new ApiEstimateIdDelete({ project_id });
  yield deleteHandle({
    api,
    noMessage: true,
    onSuccess: () => {
      if (callback) callback();
    },
    noLoad: true,
  });
}

function* tryPrint(action: ReturnType<typeof EstimateActions.api.print>) {
  yield put(SystemActions.isLoading(true));
  const api = new ApiEstimatePrint(action.payload);
  try {
    const result: ResFileType = yield api.run();
    if (ApiBase.isSuccess(result)) {
      const filePath = encodeURIComponent(URL.createObjectURL(result.file));
      // const filePath = encodeURIComponent('http://www.africau.edu/images/default/sample.pdf');
      // const filePath = '../../src/collection/dummy/estimate/00000110.pdf';
      const width = 1000;
      const height = 1000;
      window.open(
        `./pdf-viewer/viewer.html?file=${filePath}`,
        'modal',
        `width=${width},height=${height}`,
      );
    }
  } catch (e) {
    yield put(SystemActions.connectionError());
  }
  yield put(SystemActions.isLoading(false));
}

export function* EstimateSaga() {
  yield takeEvery(EstimateActions.api.estimate.get, tryEstimateGet);
  yield takeEvery(EstimateActions.api.estimate.post, tryEstimatePost);
  yield takeEvery(EstimateActions.api.estimate.getList, tryEstimateGetList);
  yield takeEvery(EstimateActions.api.print, tryPrint);
  yield takeEvery(EstimateActions.api.meisai.getSideMenuList, tryMeisaiSideMenuGetList);
  yield takeEvery(EstimateActions.api.meisai.getList, tryMeisaiGetList);
  yield takeEvery(EstimateActions.api.meisai.post, tryMeisaiPost);
  yield takeEvery(EstimateActions.api.meisai.get, tryMeisaiGet);
  yield takeEvery(EstimateActions.api.meisai.delete, tryEstimateMeisaiDelete);
  yield takeEvery(EstimateActions.api.meisai.printName, tryMeisaiPrintName);
  yield takeEvery(EstimateActions.api.meisai.postList, tryMeisaiPostList);
  yield takeEvery(EstimateActions.api.id.get, tryIdGet);
  yield takeEvery(EstimateActions.api.id.delete, tryIdDelete);
}
