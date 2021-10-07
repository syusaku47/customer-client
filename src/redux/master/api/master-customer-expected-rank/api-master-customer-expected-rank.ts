import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { RequestBaseParam } from '../../../../type/api.type';
import {
  ApiMasterCustomerEstimatedRankGetListParam,
  ApiMasterCustomerEstimatedRankGetListResponse,
  ApiMasterCustomerExpectedRankPostParam,
} from './api-master-customer-expected-rank.type';

export const ActionCreator = actionCreatorFactory('master/api/customer-rank-estimated');

export const apiMasterCustomerExpectedRank = {
  post: ActionCreator<{param:ApiMasterCustomerExpectedRankPostParam, callback:()=>void}>('post'),
  getList: ActionCreator<ApiMasterCustomerEstimatedRankGetListParam>('get/list'),
};

export class ApiMasterCustomerExpectedRank<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/rank/customerestimated${id ? `/${id}` : ''}`,

    });
  }
}

export class ApiMasterCustomerExpectedRankPost extends ApiMasterCustomerExpectedRank {
  constructor(param: ApiMasterCustomerExpectedRankPostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterCustomerExpectedRankGetList
  extends ApiMasterCustomerExpectedRank<ApiMasterCustomerEstimatedRankGetListResponse> {
  constructor(param: ApiMasterCustomerEstimatedRankGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
