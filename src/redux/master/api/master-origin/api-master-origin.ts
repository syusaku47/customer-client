import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { CallbackRequest, RequestBaseParam } from '../../../../type/api.type';
import { MasterOrigin } from '../../../../type/master/master-origin.type';
import {
  ApiMasterOriginPostParam,
  ApiMasterOriginGetListParam,
  ApiMasterOriginGetListResponse,
} from './api-master-origin.type';

export const ActionCreator = actionCreatorFactory('master/api/origin');

export const apiMasterOrigin = {
  get: ActionCreator<CallbackRequest<{id:number}, MasterOrigin>>('get'),
  post: ActionCreator<CallbackRequest<ApiMasterOriginPostParam>>('post'),
  getList: ActionCreator<ApiMasterOriginGetListParam>('get/list'),
};

/**
 * 発生源
 */
export class ApiMasterOrigin<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/kubun/source${id ? `/${id}` : ''}`,

    });
  }
}

export class ApiMasterOriginGet extends ApiMasterOrigin<MasterOrigin> {
  constructor(param: {id: number}) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      id,
    });
  }
}

export class ApiMasterOriginPost extends ApiMasterOrigin {
  constructor(param: ApiMasterOriginPostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterOriginGetList extends ApiMasterOrigin<ApiMasterOriginGetListResponse> {
  constructor(param: ApiMasterOriginGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
