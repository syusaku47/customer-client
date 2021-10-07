import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { RequestBaseParam, CallbackRequest } from '../../../../type/api.type';
import { ApiEstimate } from '../../../root.type';
import { ApiEstimateGetListParam } from './api-estimate.type';

export const ActionCreator = actionCreatorFactory('estiamte/api/');

export const apiEstimate = {
  get: ActionCreator<{
    param: ApiEstimate.Estimate.Param.Get;
    callback?:(data:ApiEstimate.Estimate.Response.Get)=>void;
      }>('get'),
  post: ActionCreator<CallbackRequest<ApiEstimate.Estimate.Param.Post>>('post'),
  getList: ActionCreator<{
    param: ApiEstimate.Estimate.Param.List,
    callback?:(data: ApiEstimate.Estimate.Response.List[]) => void,
    noLoad?: boolean,
      }>('get/list'),
};

class ApiEstimateBase<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/quote${param.id ? `/${param.id}` : ''}`,

    });
  }
}

export class ApiEstimateGet extends ApiEstimateBase<ApiEstimate.Estimate.Response.Get> {
  constructor(param: ApiEstimate.Estimate.Param.Get) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      id,
    });
  }
}

export class ApiEstimatePost extends ApiEstimateBase {
  constructor(param: ApiEstimate.Estimate.Param.Post) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiEstimateGetList extends ApiEstimateBase<ApiEstimate.Estimate.Response.List> {
  constructor(param: ApiEstimateGetListParam) {
    super({
      httpMethod: 'GET',
      param: {
        ...param,
        type: undefined,
      },
    });
  }
}
