import { takeEvery } from 'redux-saga/effects';
import * as lodash from 'lodash';
import { cloneDeep } from 'lodash';
import { FileActions } from './file.action';
import { Store } from '../store';
import {
  ApiFilePost, ApiFileDelete, ApiFileGet, ApiFileGetList,
} from './api/file/api-file';
import {
  downloadHandle, getListHandle, postHandle, getHandle, deleteHandle,
} from '../root.saga';
import { ApiFileDownload } from './api/download/api-file-download';
import { ApiFile } from '../root.type';
import { DialogActions } from '../dialog/dialog.action';

function* tryFileGet(action: ReturnType<typeof FileActions.api.file.get>) {
  const { param, callback } = action.payload;
  const api = new ApiFileGet(param);
  yield getHandle<ApiFile.Response.Get>({
    api,
    onSuccess: (res) => {
      if (!res) return;
      if (res.file) {
        const byteString = atob(res.file as string);
        const content = new Uint8Array(byteString.length);
        for (let i = 0, l = byteString.length; i < l; i += 1) {
          content[i] = byteString.charCodeAt(i);
        }
        const file = new File([content], res.file_name, { type: res.format });
        res.file = file;
      }
      if (callback) {
        callback(lodash.cloneDeep(res));
        return;
      }
      Store.dispatch(FileActions.setFile(res));
    },
  });
}

function* tryFileGetList(action: ReturnType<typeof FileActions.api.file.getList>) {
  const { param, onSuccess, noLoad } = action.payload;
  yield getListHandle<ApiFile.Response.List>({
    api: new ApiFileGetList(param),
    noLoad,
    onSuccess: (res) => {
      if (onSuccess) {
        onSuccess(cloneDeep(res));
        return;
      }
      Store.dispatch(FileActions.setList(res));
    },
  });
}

function* tryFilePost(action: ReturnType<typeof FileActions.api.file.post>) {
  const { param, onSuccess, onError } = action.payload;
  const api = new ApiFilePost(param);
  // yield postHandle({ api, onSuccess: callback });
  yield postHandle({
    title: 'ファイル情報',
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

function* tryFileDownload(action: ReturnType<typeof FileActions.api.file.download>) {
  yield downloadHandle({ api: new ApiFileDownload(action.payload) });
}

function* tryFileDelete(action: ReturnType<typeof FileActions.api.file.delete>) {
  const { param, callback } = action.payload;
  const api = new ApiFileDelete(param);
  yield deleteHandle({
    api,
    onSuccess: () => {
      callback();
      Store.dispatch(DialogActions.pop());
    },
  });
}

export function* FileSaga() {
  yield takeEvery(FileActions.api.file.get, tryFileGet);
  yield takeEvery(FileActions.api.file.post, tryFilePost);
  yield takeEvery(FileActions.api.file.getList, tryFileGetList);
  yield takeEvery(FileActions.api.file.download, tryFileDownload);
  yield takeEvery(FileActions.api.file.delete, tryFileDelete);
}
