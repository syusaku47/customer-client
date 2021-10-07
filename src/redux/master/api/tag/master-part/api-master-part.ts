import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../../service/api-base';
import { RequestBaseCollection } from '../../../../../service/api.collection';
import { CallbackRequest, RequestBaseParam } from '../../../../../type/api.type';
import { MasterPart } from '../../../../../type/master/master-part-tag.type';
import {
  ApiMasterPartPostParam,
  ApiMasterPartGetListParam,
  ApiMasterPartGetListResponse,
} from './api-master-part.type';

export const ActionCreator = actionCreatorFactory('master/api/part');

export const apiMasterPart = {
  get: ActionCreator<CallbackRequest<{id:number}, MasterPart>>('get'),
  post: ActionCreator<CallbackRequest<ApiMasterPartPostParam>>('post'),
  getList: ActionCreator<ApiMasterPartGetListParam>('get/list'),
};

export class ApiMasterPart<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/relatedtag/part${id ? `/${id}` : ''}`,

    });
  }
}

export class ApiMasterPartPost extends ApiMasterPart {
  constructor(param: ApiMasterPartPostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterPartGetList
  extends ApiMasterPart<ApiMasterPartGetListResponse> {
  constructor(param?: ApiMasterPartGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
