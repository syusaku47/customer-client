import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { CallbackRequest, RequestBaseParam } from '../../../../type/api.type';
import { MasterLostOrder } from '../../../../type/master/master-lost-order.type';
import {
  ApiMasterLostOrderGetListParam,
  ApiMasterLostOrderGetListResponse,
  ApiMasterLostOrderPostParam,
} from './api-master-lost-order.type';

export const ActionCreator = actionCreatorFactory('master/api/lost-order');

export const apiMasterLostOrder = {
  get: ActionCreator<CallbackRequest<{id:number}, MasterLostOrder>>('get'),
  post: ActionCreator<CallbackRequest<ApiMasterLostOrderPostParam>>('post'),
  getList: ActionCreator<ApiMasterLostOrderGetListParam>('get/list'),
};

export class ApiMasterLostOrder<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/kubun/lostorder${id ? `/${id}` : ''}`,

    });
  }
}

export class ApiMasterLostOrderGet extends ApiMasterLostOrder<MasterLostOrder> {
  constructor(param: {id: number}) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      id,
    });
  }
}

export class ApiMasterLostOrderPost extends ApiMasterLostOrder {
  constructor(param: ApiMasterLostOrderPostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterLostOrderGetList
  extends ApiMasterLostOrder<ApiMasterLostOrderGetListResponse> {
  constructor(param: ApiMasterLostOrderGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
