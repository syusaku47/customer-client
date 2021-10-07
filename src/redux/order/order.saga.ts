import { takeEvery } from 'redux-saga/effects';
import lodash from 'lodash';
import { Store } from '../store';
import {
  getHandle,
  postHandle,
} from '../root.saga';
import { DialogActions } from '../dialog/dialog.action';
import { OrderActions } from './order.action';
import { ApiOrderGet, ApiOrderPost } from './api/order/api-order';
import { ApiOrderGetResponse } from './api/order/api-order.type';

function* tryOrderGet(action: ReturnType<typeof OrderActions.api.order.get>) {
  const { param, callback } = action.payload;
  yield getHandle<ApiOrderGetResponse>({
    api: new ApiOrderGet(param),
    onSuccess: (result) => {
      if (result) callback(lodash.cloneDeep(result));
    },
  });
}

function* tryOrderPost(action: ReturnType<
  typeof OrderActions.api.order.post>) {
  const { param, onSuccess } = action.payload;
  const api = new ApiOrderPost(param);
  yield postHandle({
    api,
    onSuccess: () => {
      Store.dispatch(DialogActions.pop());
      if (onSuccess) onSuccess();
    },
  });
}

export function* OrderSaga() {
  yield takeEvery(OrderActions.api.order.get, tryOrderGet);
  yield takeEvery(OrderActions.api.order.post, tryOrderPost);
}
