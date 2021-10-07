import { push } from 'connected-react-router';
import {
  all, delay, put, takeEvery,
} from 'redux-saga/effects';
import { RoutingPath } from '../../routes/routing-pass';
import { DialogActions } from '../dialog/dialog.action';
import { SystemActions } from './system.action';
import { Store } from '../store';
import { CustomerActions } from '../customer/customer.action';
import { AuthActions } from '../auth/auth.action';
import { BillActions } from '../bill/bill.action';
import { CsvActions } from '../csv/csv.action';
import { CustomerDetailActions } from '../customer-detail/customer-detail.action';
import { EstimateActions } from '../estimate/estimate.action';
import { FileActions } from '../file/file.action';
import { MaintenanceActions } from '../maintenance/maintenance.action';
import { MapActions } from '../map/map.action';
import { MasterActions } from '../master/master.action';
import { OrderActions } from '../order/order.action';
import { ProjectDetailActions } from '../project-detail/project-detail.action';
import { ProjectActions } from '../project/project.action';
import { SupportHistoryActions } from '../support-history/support-history.action';
import { TagActions } from '../tag/tag.action';
import { deleteCookie } from '../../utilities/delete-cookie';

function* tryLoading(action: ReturnType<typeof SystemActions.isLoading>) {
  const isLoading = action.payload;
  if (!isLoading) {
    yield delay(500);
    yield put(SystemActions.setIsLoading(false));
    yield put(SystemActions.setIsLoadingCount(-1));
  } else {
    yield put(SystemActions.setIsLoadingCount(1));
    yield put(SystemActions.setIsLoading(true));
  }
}

function* tryAllReset() {
  deleteCookie();
  yield all([
    put(CustomerActions.resetState()),
    // put(DialogActions.resetState()),
    // put(SystemActions.resetState()),
    put(MapActions.resetState()),
    put(MasterActions.resetState()),
    put(ProjectActions.resetState()),
    put(FileActions.resetState()),
    put(TagActions.resetState()),
    put(EstimateActions.resetState()),
    put(SupportHistoryActions.resetState()),
    put(MaintenanceActions.resetState()),
    put(OrderActions.resetState()),
    put(CsvActions.resetState()),
    put(CustomerDetailActions.resetState()),
    put(ProjectDetailActions.resetState()),
    put(BillActions.resetState()),
    put(AuthActions.resetState()),
  ]);
}

function* tryAuthError(action: ReturnType<typeof SystemActions.authError>) {
  yield put(DialogActions.pushMessage({
    message: [action.payload],
    title: '',
    callback: () => {
      Store.dispatch(push(RoutingPath.login));
    },
  }));
}

export function* errorHandle(action: ReturnType<typeof SystemActions.errorHandle>) {
  const { result, title: _title } = action.payload;
  const { header } = result;

  function* runHandler(goBackLogin: boolean, title:string) {
    yield put(DialogActions.pushMessage({
      title,
      message: header.messages ?? [''],
      callback: () => {
        if (goBackLogin) {
          Store.dispatch(push(`${RoutingPath.login}`));
        }
      },
      callbackClose: () => {
        if (goBackLogin) {
          Store.dispatch(push(`${RoutingPath.login}`));
        }
      },
    }));
  }

  switch (header.status_code) {
    // case 400:
    //   yield runHandler(true);
    //   break;
    case 401:
      yield put(SystemActions.allReset());
      yield runHandler(true, '認証エラー');
      break;
    case 422:
      yield runHandler(false, _title);
      break;
    case 400:
    case 403:
    case 404:
    case 405:
    case 500:
      yield runHandler(false, '');
      break;

    default:
      yield put(DialogActions.pushMessage({
        title: '',
        message: ['失敗しました'],
        callback: () => {
          Store.dispatch(DialogActions.clear());
          Store.dispatch(push(`${RoutingPath.login}`));
        },
        callbackClose: () => {
          Store.dispatch(DialogActions.clear());
          Store.dispatch(push(`${RoutingPath.login}`));
        },
      }));
      break;
  }
}

export function* connectionError() {
  yield put(DialogActions.pushMessage({
    title: 'エラー',
    message: ['エラー'],
    callback: () => {
      Store.dispatch(DialogActions.clear());
      Store.dispatch(push(`${RoutingPath.login}`));
    },
    callbackClose: () => {
      Store.dispatch(DialogActions.clear());
      Store.dispatch(push(`${RoutingPath.login}`));
    },
  }));
}

export function* SystemSaga() {
  yield takeEvery(SystemActions.isLoading, tryLoading);
  yield takeEvery(SystemActions.authError, tryAuthError);
  yield takeEvery(SystemActions.allReset, tryAllReset);
  yield takeEvery(SystemActions.errorHandle, errorHandle);
  yield takeEvery(SystemActions.connectionError, connectionError);
}
