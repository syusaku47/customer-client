import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { CallbackRequest, RequestBaseParam } from '../../../../type/api.type';
import { MasterQuoteFixed } from '../../../../type/master/master-estimate.type';
import { ApiMasterQuoteFixedGetListParam, ApiMasterQuoteFixedGetListResponse, ApiMasterQuoteFixedPostParam } from './api-master-quote-fixed.type';

export const ActionCreator = actionCreatorFactory('master/api/estimate');

export const apiMasterQuoteFixed = {
  get: ActionCreator<CallbackRequest<{id:number}>>('get'),
  post: ActionCreator<{param:ApiMasterQuoteFixedPostParam, callback:()=>void}>('post'),
  getList: ActionCreator<ApiMasterQuoteFixedGetListParam>('get/list'),
};

export class ApiMasterQuoteFixed<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/fixed/quotefixed${id ? `/${id}` : ''}`,

    });
  }
}

export class ApiMasterQuoteFixedGet extends ApiMasterQuoteFixed<MasterQuoteFixed> {
  constructor(param: {id: number}) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      id,
    });
  }
}

export class ApiMasterQuoteFixedPost extends ApiMasterQuoteFixed {
  constructor(param: ApiMasterQuoteFixedPostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterQuoteFixedGetList
  extends ApiMasterQuoteFixed<ApiMasterQuoteFixedGetListResponse> {
  constructor(param: ApiMasterQuoteFixedGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
