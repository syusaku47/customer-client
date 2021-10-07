import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../../service/api-base';
import { RequestBaseCollection } from '../../../../../service/api.collection';
import { CallbackRequest, RequestBaseParam } from '../../../../../type/api.type';
import { MasterRelevantTag } from '../../../../../type/master/master-relevant-tag.type';
import {
  ApiMasterRelevantTagPostParam,
  ApiMasterRelevantTagGetListParam,
  ApiMasterRelevantTagGetListResponse,
} from './api-master-relevant-tag.type';

export const ActionCreator = actionCreatorFactory('master/api/relevant-tag');

export const apiMasterRelevantTag = {
  get: ActionCreator<CallbackRequest<{id:number}, MasterRelevantTag>>('get'),
  post: ActionCreator<CallbackRequest<ApiMasterRelevantTagPostParam>>('post'),
  getList: ActionCreator<ApiMasterRelevantTagGetListParam>('get/list'),
};

/**
 * 関連タグ
 */
export class ApiMasterRelevantTag<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/relatedtag/relationtag${id ? `/${id}` : ''}`,

    });
  }
}

export class ApiMasterRelevantTagPost extends ApiMasterRelevantTag {
  constructor(param: ApiMasterRelevantTagPostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterRelevantTagGetList
  extends ApiMasterRelevantTag<ApiMasterRelevantTagGetListResponse> {
  constructor(param?: ApiMasterRelevantTagGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
