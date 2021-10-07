import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { CallbackRequest, RequestBaseParam } from '../../../../type/api.type';
import {
  ApiBillGetParam,
  ApiBillGetResponse,
  ApiBillPostParam,
  ApiBillGetListParam,
  ApiBillGetListResponse,
} from './api-bill.type';

export const ActionCreator = actionCreatorFactory('bill/api');

export const apiBill = {
  get: ActionCreator<{
    param: ApiBillGetParam;
    callback?:(data:ApiBillGetResponse)=>void;
      }>('get'),
  post: ActionCreator<CallbackRequest<ApiBillPostParam>>('post'),
  delete: ActionCreator<{ param: {id:number}; callback:() => void;}>('delete'),
  getList: ActionCreator<CallbackRequest<ApiBillGetListParam> & { noLoad?: boolean }>('get/list'),
};

class ApiBill<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/bill${param.id ? `/${param.id}` : ''}`,

    });
  }
}

export class ApiBillGet extends ApiBill<ApiBillGetResponse> {
  constructor(param: ApiBillGetParam) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      id,
    });
  }
}

export class ApiBillPost extends ApiBill {
  constructor(param: ApiBillPostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiBillDelete extends ApiBill {
  constructor(param: {id:number}) {
    const { id } = param;
    super({
      httpMethod: 'DELETE',
      id,
    });
  }
}

export class ApiBillGetList extends ApiBill<ApiBillGetListResponse> {
  constructor(param: ApiBillGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
