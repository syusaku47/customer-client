import { put, takeEvery } from 'redux-saga/effects';
import { TestActions } from './test.action';
import { ResType } from '../../type/api.type';
import {
  ApiTestStrGet, ApiTestStrGetResponse, ApiTestStrPost, ApiTestStrPostResponse, ApiTestStrDelete,
} from './api/str';

const { str } = TestActions.api;

function* tryTestAlert(action: ReturnType<typeof TestActions.testAlert>) {
  // eslint-disable-next-line no-alert
  yield alert(action.payload);
  yield put(TestActions.setTestStr('Redux アラートのテスト'));
}

function* tryStrApiGet(action: ReturnType<typeof str.get>) {
  const request = new ApiTestStrGet({ str: action.payload });
  try {
    const result: ResType<ApiTestStrGetResponse> = yield request.run();
    // eslint-disable-next-line no-alert
    yield alert(result.args.str);
  } catch (e) {
    window.console.log(e);
  }
}

function* tryStrApiPost(action: ReturnType<typeof str.post>) {
  const request = new ApiTestStrPost({ str: action.payload });
  try {
    const result:ResType<ApiTestStrPostResponse> = yield request.run();
    // eslint-disable-next-line no-alert
    yield alert(result.json.str);
  } catch (e) {
    window.console.log(e);
  }
}

function* tryStrApiDelete() {
  const request = new ApiTestStrDelete();
  try {
    const result:{} = yield request.run();
    window.console.log(result);
    // eslint-disable-next-line no-alert
    yield alert('デリート成功');
  } catch (e) {
    window.console.log(e);
  }
}

export function* TestSaga() {
  yield takeEvery(str.get, tryStrApiGet);
  yield takeEvery(str.post, tryStrApiPost);
  yield takeEvery(str.delete, tryStrApiDelete);

  yield takeEvery(TestActions.testAlert, tryTestAlert);
}
