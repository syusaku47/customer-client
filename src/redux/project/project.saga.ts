import lodash from 'lodash';
import { put, takeEvery } from 'redux-saga/effects';
import { ProjectActions } from './project.action';
import { ApiProjectPost, ApiProjectGetList, ApiProjectGet } from './api/project/api-project';
import { DialogActions } from '../dialog/dialog.action';
import { Store } from '../store';
import {
  deleteHandle, getHandle, getListHandle, postHandle,
} from '../root.saga';
import { ApiProject } from '../root.type';
import { ApiProjectIdDelete, ApiProjectIdGet } from './api/id/api-project-id';

function* tryProjectGet(action: ReturnType<typeof ProjectActions.api.project.get>) {
  const { param, callback, noLoad } = action.payload;
  const api = new ApiProjectGet(param);
  yield getHandle<ApiProject.Response.Get>({
    noLoad,
    api,
    onSuccess: (result) => {
      Store.dispatch(ProjectActions.setProject(result));
      if (callback && result) callback(lodash.cloneDeep(result));
    },
  });
}

function* tryProjectGetList(action: ReturnType<typeof ProjectActions.api.project.getList>) {
  yield getListHandle<ApiProject.Response.List>({
    api: new ApiProjectGetList(action.payload),
    * onSuccess(result, count) {
      yield put(ProjectActions.setList(result));
      yield put(ProjectActions.setListCount(count));
    },
  });
}

function* tryProjectGetCallbackList(action: ReturnType<
  typeof ProjectActions.api.project.getCallbackList>) {
  const { param, onSuccess, noLoad } = action.payload;
  yield getListHandle<ApiProject.Response.List>({
    api: new ApiProjectGetList(param),
    noLoad,
    onSuccess,
  });
}

function* tryProjectPost(action: ReturnType<typeof ProjectActions.api.project.post>) {
  const { param, onSuccess, onError } = action.payload;
  const api = new ApiProjectPost(param);
  yield postHandle({
    title: '案件情報',
    api,
    onSuccess: () => {
      Store.dispatch(DialogActions.pop());
      Store.dispatch(ProjectActions.api.project.getList({}));
      if (onSuccess)onSuccess();
    },
    onError: () => {
      if (onError)onError();
    },
  });
}

function* tryIdGet(action: ReturnType<typeof ProjectActions.api.id.get>) {
  const { callback, id } = action.payload;
  yield getHandle<{id: number}>({
    api: new ApiProjectIdGet({ id }),
    * onSuccess(result) {
      if (result) yield callback(result);
    },
  });
}

function* tryIdDelete(action: ReturnType<typeof ProjectActions.api.id.delete>) {
  yield deleteHandle({
    api: new ApiProjectIdDelete(action.payload),
    noMessage: true,
  });
}

export function* ProjectSaga() {
  yield takeEvery(ProjectActions.api.project.get, tryProjectGet);
  yield takeEvery(ProjectActions.api.project.post, tryProjectPost);
  yield takeEvery(ProjectActions.api.project.getList, tryProjectGetList);
  yield takeEvery(ProjectActions.api.project.getCallbackList, tryProjectGetCallbackList);
  yield takeEvery(ProjectActions.api.id.get, tryIdGet);
  yield takeEvery(ProjectActions.api.id.delete, tryIdDelete);
}
