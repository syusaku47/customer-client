import { put, takeEvery } from 'redux-saga/effects';
import { Store } from '../store';
import { DialogActions } from './dialog.action';
import { MapActions } from '../map/map.action';

function* tryPushMessage(action: ReturnType<typeof DialogActions.pushMessage>) {
  const {
    option, message, callback, isCancel, label, title, callbackClose, cancelLabel,
  } = action.payload;

  if (option?.beforeClear) {
    yield put(DialogActions.clear());
  }

  const okBtn = {
    label: label ?? 'OK',
    callback: () => {
      Store.dispatch(DialogActions.pop());
      if (callback)callback();
    },
  };

  const cancelBtn = {
    label: cancelLabel ?? 'キャンセル',
    isCancel,
    callback: () => {
      Store.dispatch(DialogActions.pop());
    },
  };

  yield put(
    DialogActions.push({
      title,
      onCloseClick: callbackClose,
      messageType: {
        messages: message,
        btnProps: option?.btnProps || isCancel ? [cancelBtn, okBtn] : [okBtn],
      },
    }),
  );
}

function* tryPushReady() {
  yield put(
    DialogActions.pushMessage({
      title: '',
      message: [' - 準備中 - '],
    }),
  );
}
function* tryPush() {
  yield put(MapActions.setGpsStatus('out'));
}

export function* DialogSaga() {
  yield takeEvery(DialogActions.pushMessage, tryPushMessage);
  yield takeEvery(DialogActions.pushReady, tryPushReady);
  yield takeEvery(DialogActions.push, tryPush);
}
