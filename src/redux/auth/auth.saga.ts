import { put, takeEvery, delay } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'axios';
import { Config } from '../../config/config';
// import { Config } from '../../config/config';
import { ResultType } from '../../type/api.type';
import { AuthActions } from './auth.action';
import { RoutingPath } from '../../routes/routing-pass';
import { SystemActions } from '../system/system.action';
import { ApiLogout } from './api/logout/logout';
import { DialogActions } from '../dialog/dialog.action';
import { ApiBase } from '../../service/api-base';
import { ApiIsLogin } from './api/is-login/is-login';
import {
  ApiPasswordMailSend, ApiPasswordCheckDate, ApiPasswordChangeIn, ApiPasswordChangeOut,
} from './api/password/api-password';
import { Store } from '../store';
import { getHandle } from '../root.saga';
import { User } from '../../type/auth/user.typs';
import { ApiUser } from './api/user/api-user';

function* tryApiLogin(action: ReturnType<typeof AuthActions.api.login>) {
  yield put(SystemActions.isLoading(true));
  const { param, onError } = action.payload;
  try {
    axios.defaults.withCredentials = true;
    yield axios.get(`${Config.host}/sanctum/csrf-cookie`).then(() => {
      console.log('cookie', document.cookie);
      axios.post(`${Config.host}/api/auth/login`, { ...param }).then((res) => {
        if (res.status === 200) {
          Store.dispatch(push({ pathname: RoutingPath.customer, state: true }));
        } else {
          onError(['IDまたはパスワードが正しくありません']);
        }
      });
    });
  } catch (e) {
    yield put(SystemActions.connectionError());
  }
  yield put(SystemActions.isLoading(false));
}

function* tryApiLogout() {
  const request = new ApiLogout();
  try {
    yield request.run();
  } catch (e) {
    yield put(DialogActions.pushMessage({
      title: 'ログアウト',
      message: ['ログアウトしました'],
      callback: () => {
        Store.dispatch(push(RoutingPath.login));
        Store.dispatch(SystemActions.allReset());
      },
      callbackClose: () => {
        Store.dispatch(push(RoutingPath.login));
        Store.dispatch(SystemActions.allReset());
      },
    }));
  } finally {
    yield put(DialogActions.pushMessage({
      title: 'ログアウト',
      message: ['ログアウトしました'],
      callback: () => {
        Store.dispatch(push(RoutingPath.login));
        Store.dispatch(SystemActions.allReset());
      },
      callbackClose: () => {
        Store.dispatch(push(RoutingPath.login));
        Store.dispatch(SystemActions.allReset());
      },
    }));
  }
}

function* tryChangePassword(
  action: ReturnType<typeof AuthActions.api.password.change>,
) {
  const request = new ApiPasswordChangeOut(action.payload);
  try {
    const result: ResultType = yield request.run();
    if (ApiBase.isSuccess(result)) {
      yield put(push(RoutingPath.changePasswordComplete));
    } else {
      yield put(SystemActions.errorHandle({ result, title: '' }));
    }
  } catch (e) {
    yield put(SystemActions.connectionError());
  }
}

function* tryDialogChangePassword(
  action: ReturnType<typeof AuthActions.api.password.dialogChange>,
) {
  const request = new ApiPasswordChangeIn(action.payload);

  try {
    const result: ResultType = yield request.run();
    if (ApiBase.isSuccess(result)) {
      yield put(DialogActions.pushMessage({
        title: '',
        message: ['変更しました'],
        callback: () => {
          Store.dispatch(DialogActions.pop());
          Store.dispatch(DialogActions.pop());
        },
      }));
    } else {
      yield put(SystemActions.errorHandle({ result, title: '' }));
    }
  } catch (error) {
    yield put(SystemActions.connectionError());
  }

  /* TODO Responseが来てから帰る */
  // yield postHandle({
  //   api,
  //   onSuccess: () => {

  //   },
  // });
}

function* tryPasswordEmailSend(
  action: ReturnType<typeof AuthActions.api.password.send>,
) {
  const { param, onSuccess } = action.payload;
  const request = new ApiPasswordMailSend(param);
  try {
    const result: ResultType = yield request.run();
    if (ApiBase.isSuccess(result)) {
      onSuccess();
      // yield put(push(RoutingPath.sendPasswordComplete));
    } else {
      yield put(SystemActions.errorHandle({ result, title: '' }));
    }
  } catch (e) {
    yield put(SystemActions.connectionError());
  }
}

function* tryCheckDate(
  action: ReturnType<typeof AuthActions.api.password.checkDate>,
) {
  const { param, onSuccess, onError } = action.payload;
  const request = new ApiPasswordCheckDate(param);
  try {
    const result: ResultType = yield request.run();
    /* TODO 後で消す */
    yield delay(1000);
    if (ApiBase.isSuccess(result)) {
      onSuccess();
    } else {
      onError();
    }
  } catch (e) {
    yield put(SystemActions.connectionError());
  }
}

function* tryIsLogin() {
  const request = new ApiIsLogin();
  try {
    const result: ResultType = yield request.run();
    if (!ApiBase.isSuccess(result)) {
      yield put(SystemActions.errorHandle({ result, title: '' }));
    }
  } catch (e) {
    yield put(SystemActions.connectionError());
  }
}

function* tryGetUser() {
  yield getHandle<User>({
    api: new ApiUser(),
    onSuccess: (result) => {
      if (result) { Store.dispatch(AuthActions.setUser(result)); }
    },
  });
}

export function* AuthSaga() {
  yield takeEvery(AuthActions.api.login, tryApiLogin);
  yield takeEvery(AuthActions.api.logout, tryApiLogout);
  yield takeEvery(AuthActions.api.password.dialogChange, tryDialogChangePassword);
  yield takeEvery(AuthActions.api.password.change, tryChangePassword);
  yield takeEvery(AuthActions.api.password.send, tryPasswordEmailSend);
  yield takeEvery(AuthActions.api.password.checkDate, tryCheckDate);
  yield takeEvery(AuthActions.api.isLogin, tryIsLogin);
  yield takeEvery(AuthActions.api.user, tryGetUser);
}
