import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { RequestBaseParam, CallbackRequest } from '../../../../type/api.type';
import {
  ApiSupportHistoryGetParam,
  ApiSupportHistoryGetResponse,
  ApiSupportHistoryPostParam,
  ApiSupportHistoryGetListParam,
  ApiSupportHistoryGetListResponse,
} from './api-support-history.type';

export const ActionCreator = actionCreatorFactory('history/support/api');

export const apiSupportHistory = {
  get: ActionCreator<{
    param: ApiSupportHistoryGetParam;
    callback?:(data:ApiSupportHistoryGetResponse)=>void;
      }>('get'),
  post: ActionCreator<CallbackRequest< ApiSupportHistoryPostParam> >('post'),
  delete: ActionCreator< ApiSupportHistoryPostParam>('delete'),
  getList: ActionCreator<CallbackRequest<ApiSupportHistoryGetListParam> &{noLoad?:boolean}>('get/list'),
};

class ApiSupportHistory<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/supported${param.id ? `/${param.id}` : ''}`,

    });
  }
}

export class ApiSupportHistoryGet extends ApiSupportHistory<ApiSupportHistoryGetResponse> {
  constructor(param: ApiSupportHistoryGetParam) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      id,
    });
  }
}

export class ApiSupportHistoryPost extends ApiSupportHistory {
  constructor(param: ApiSupportHistoryPostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiSupportHistoryDelete extends ApiSupportHistory {
  constructor(param: {id:number}) {
    const { id } = param;
    super({
      httpMethod: 'DELETE',
      id,
    });
  }
}

export class ApiSupportHistoryGetList extends ApiSupportHistory<ApiSupportHistoryGetListResponse> {
  constructor(param: ApiSupportHistoryGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
