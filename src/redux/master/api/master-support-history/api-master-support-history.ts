import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { CallbackRequest, RequestBaseParam } from '../../../../type/api.type';
import { MasterSupportHistory } from '../../../../type/master/master-support-history.type';
import {
  ApiMasterSupportHistoryPostParam,
  ApiMasterSupportHistoryGetListParam,
  ApiMasterSupportHistoryGetListResponse,
} from './api-master-support-history.type';

export const ActionCreator = actionCreatorFactory('master/api/support-history');

export const apiMasterSupportHistory = {
  get: ActionCreator<CallbackRequest<{ id: number; }, MasterSupportHistory>>('get'),
  post: ActionCreator<CallbackRequest<ApiMasterSupportHistoryPostParam>>('post'),
  getList: ActionCreator<ApiMasterSupportHistoryGetListParam>('get/list'),
};

export class ApiMasterSupportHistory<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/kubun/supported${id ? `/${id}` : ''}`,

    });
  }
}

export class ApiMasterSupportHistoryGet extends ApiMasterSupportHistory<MasterSupportHistory> {
  constructor(param: {id: number}) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      id,
    });
  }
}

export class ApiMasterSupportHistoryPost extends ApiMasterSupportHistory {
  constructor(param: ApiMasterSupportHistoryPostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterSupportHistoryGetList
  extends ApiMasterSupportHistory<ApiMasterSupportHistoryGetListResponse> {
  constructor(param: ApiMasterSupportHistoryGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
