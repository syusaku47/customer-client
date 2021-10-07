import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { RequestBaseParam } from '../../../../type/api.type';
import { ApiMasterCustomerRankUpdateGetListParam, ApiMasterCustomerRankUpdateGetListResponse, ApiMasterCustomerRankUpdatePostParam } from './api-master-customer-rank-update.type';

export const ActionCreator = actionCreatorFactory('master/api/customer-rank');

export const apiMasterCustomerRankUpdate = {
  post: ActionCreator<{param:ApiMasterCustomerRankUpdatePostParam, callback:()=>void}>('post'),
  getList: ActionCreator<ApiMasterCustomerRankUpdateGetListParam>('get/list'),
};

export class ApiMasterCustomerRankUpdate<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/rank/customer${id ? `/${id}` : ''}`,

    });
  }
}

export class ApiMasterCustomerRankUpdatePost extends ApiMasterCustomerRankUpdate {
  constructor(param: ApiMasterCustomerRankUpdatePostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterCustomerRankUpdateGetList
  extends ApiMasterCustomerRankUpdate<ApiMasterCustomerRankUpdateGetListResponse> {
  constructor(param: ApiMasterCustomerRankUpdateGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
