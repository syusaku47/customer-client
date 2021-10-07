import { takeEvery } from 'redux-saga/effects';
import * as lodash from 'lodash';
import { cloneDeep } from 'lodash';
import { SupportHistoryActions } from './support-history.action';
import { Store } from '../store';
import {
  getListHandle, postHandle, getHandle,
} from '../root.saga';
import {
  ApiSupportHistoryGet, ApiSupportHistoryGetList, ApiSupportHistoryPost,
} from './api/api-support-history/api-support-history';
import { ApiSupportHistory } from '../root.type';
import { DialogActions } from '../dialog/dialog.action';

function* trySupportHistoryGet(action: ReturnType<
  typeof SupportHistoryActions.api.supportHistory.get>) {
  const { param, callback } = action.payload;
  yield getHandle<ApiSupportHistory.SupportHistory.Response.Get>({
    api: new ApiSupportHistoryGet(param),
    onSuccess: (res) => {
      if (res) {
        // if (res.image) {
        //   const byteString = atob(res.image as string);
        //   const content = new Uint8Array(byteString.length);
        //   for (let i = 0, l = byteString.length; i < l; i += 1) {
        //     content[i] = byteString.charCodeAt(i);
        //   }
        //   const file = new File([content], res.image_name);
        //   res.image = file;
        // }
        if (callback) {
          callback(lodash.cloneDeep(res));
          return;
        }
        Store.dispatch(SupportHistoryActions.setSupportHistory(res));
      }
    },
  });
}

function* trySupportHistoryGetList(action: ReturnType<
  typeof SupportHistoryActions.api.supportHistory.getList>) {
  const { param, onSuccess, noLoad } = action.payload;
  yield getListHandle<ApiSupportHistory.SupportHistory.Response.List>({
    api: new ApiSupportHistoryGetList(param),
    noLoad,
    onSuccess: (res) => {
      if (onSuccess) {
        onSuccess(cloneDeep(res));
        return;
      }
      Store.dispatch(SupportHistoryActions.setList(res));
    },
  });
}

function* trySupportHistoryPost(action: ReturnType<
  typeof SupportHistoryActions.api.supportHistory.post>) {
  const { param, onSuccess } = action.payload;
  const api = new ApiSupportHistoryPost(param);
  yield postHandle({
    api,
    onSuccess: () => {
      Store.dispatch(DialogActions.pop());
      if (onSuccess)onSuccess();
    },
  });
}

// function* trySupportHistoryDelete(action: ReturnType<
//   typeof SupportHistoryActions.api.supportHistory.delete>) {
//   const api = new ApiSupportHistoryDelete(action.payload);
//   yield postHandle({
//     api,
//     onSuccess: () => {
//       Store.dispatch(SupportHistoryActions.api.supportHistory.getList({}));
//     },
//   });
// }

export function* SupportHistorySaga() {
  yield takeEvery(SupportHistoryActions.api.supportHistory.get, trySupportHistoryGet);
  yield takeEvery(SupportHistoryActions.api.supportHistory.post, trySupportHistoryPost);
  yield takeEvery(SupportHistoryActions.api.supportHistory.getList, trySupportHistoryGetList);
  // yield takeEvery(SupportHistoryActions.api.supportHistory.delete, trySupportHistoryDelete);
}
