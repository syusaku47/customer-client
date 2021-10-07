import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { RequestBaseParam } from '../../../../type/api.type';
import { ApiMasterCustomerRankGetListParam, ApiMasterCustomerRankGetListResponse, ApiMasterCustomerRankPostParam } from './api-master-customer-rank.type';

export const ActionCreator = actionCreatorFactory('master/api/customer-rank');

export const apiMasterCustomerRank = {
  post: ActionCreator<{param:ApiMasterCustomerRankPostParam, callback:()=>void}>('post'),
  getList: ActionCreator<ApiMasterCustomerRankGetListParam>('get/list'),
};

export class ApiMasterCustomerRank<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/rank/customer${id ? `/${id}` : ''}`,

    });
  }
}

export class ApiMasterCustomerRankPost extends ApiMasterCustomerRank {
  constructor(param: ApiMasterCustomerRankPostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterCustomerRankGetList
  extends ApiMasterCustomerRank<ApiMasterCustomerRankGetListResponse> {
  constructor(param: ApiMasterCustomerRankGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
