import { takeEvery } from 'redux-saga/effects';
import { TagActions } from './tag.action';
import { getListHandle } from '../root.saga';
import { TagType } from '../../type/tag/tag.type';
import { Store } from '../store';
import { ApiMasterPartGetList } from '../master/api/tag/master-part/api-master-part';
import { ApiMasterPartGetListResponse } from '../master/api/tag/master-part/api-master-part.type';
import { ApiMasterRelevantTagGetList } from '../master/api/tag/master-relevant-tag/api-master-relevant-tag';
import { ApiMasterMyCarTypeGetList } from '../master/api/tag/master-my-car-type/ap-master-my-car-type';
import { ApiMasterMyCarTypeGetListResponse } from '../master/api/tag/master-my-car-type/api-master-my-car-type.type';
import { ApiMasterRelevantTagGetListResponse } from '../master/api/tag/master-relevant-tag/api-master-relevant-tag.type';

function* tryPartGetList() {
  yield getListHandle<ApiMasterPartGetListResponse>({
    api: new ApiMasterPartGetList(),
    noLoad: true,
    onSuccess: (result) => {
      const tags:TagType[] = result.map((v:any) => ({ id: v.id, label: v.name }));
      Store.dispatch(TagActions.setPartList(tags));
    },
  });
}

function* tryRelevantTagGetList() {
  yield getListHandle<ApiMasterRelevantTagGetListResponse>({
    api: new ApiMasterRelevantTagGetList(),
    noLoad: true,
    onSuccess: (result) => {
      const tags:TagType[] = result.map((v:any) => ({ id: v.id, label: v.name }));
      Store.dispatch(TagActions.setRelevantTagList(tags));
    },
  });
}

function* tryMasterMyCarTypeGetList() {
  yield getListHandle<ApiMasterMyCarTypeGetListResponse>({
    api: new ApiMasterMyCarTypeGetList(),
    noLoad: true,
    onSuccess: (result) => {
      const tags:TagType[] = result.map((v:any) => ({ id: v.id, label: v.name }));
      Store.dispatch(TagActions.setMasterMyCarTypeList(tags));
    },
  });
}

export function* TagSaga() {
  yield takeEvery(TagActions.api.part.getList, tryPartGetList);
  yield takeEvery(TagActions.api.relevantTag.getList, tryRelevantTagGetList);
  yield takeEvery(TagActions.api.masterMyCarType.getList, tryMasterMyCarTypeGetList);
}
