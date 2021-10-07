import { takeEvery } from 'redux-saga/effects';
import * as lodash from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import { MaintenanceActions } from './maintenance.action';
import { Store } from '../store';
import { ApiMaintenanceGet, ApiMaintenanceGetList, ApiMaintenancePost } from './api/maintenance/api-maintenance';
import {
  getListHandle, postHandle, getHandle,
} from '../root.saga';
import { ApiMaintenanceGetListResponse, ApiMaintenanceGetResponse } from './api/maintenance/api-maintenance.type';
import { DialogActions } from '../dialog/dialog.action';

function* tryMaintenanceGet(action: ReturnType<typeof MaintenanceActions.api.maintenance.get>) {
  const { param, callback } = action.payload;
  const api = new ApiMaintenanceGet(param);
  yield getHandle<ApiMaintenanceGetResponse>({
    api,
    onSuccess: (res) => {
      Store.dispatch(MaintenanceActions.setMaintenance(res));
      if (callback && res) callback(lodash.cloneDeep(res));
    },
  });
}

function* tryMaintenanceGetList(
  action: ReturnType<typeof MaintenanceActions.api.maintenance.getList>,
) {
  const { param, callback, noLoad } = action.payload;
  yield getListHandle<ApiMaintenanceGetListResponse>({
    noLoad,
    api: new ApiMaintenanceGetList(param),
    onSuccess: (res) => {
      if (callback) {
        callback(cloneDeep(res));
        return;
      }
      Store.dispatch(MaintenanceActions.setList(res));
    },
  });
}

function* tryMaintenancePost(action: ReturnType<typeof MaintenanceActions.api.maintenance.post>) {
  const { param, onSuccess } = action.payload;
  yield postHandle({
    api: new ApiMaintenancePost(param),
    onSuccess: () => {
      Store.dispatch(DialogActions.pop());
      if (onSuccess) onSuccess();
    },
  });
}

export function* MaintenanceSaga() {
  yield takeEvery(MaintenanceActions.api.maintenance.get, tryMaintenanceGet);
  yield takeEvery(MaintenanceActions.api.maintenance.post, tryMaintenancePost);
  yield takeEvery(MaintenanceActions.api.maintenance.getList, tryMaintenanceGetList);
}
