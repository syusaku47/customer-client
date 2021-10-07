import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { ApiOrderGetParam, ApiOrderGetResponse, ApiOrderPostParam } from './api-order.type';
import { CallbackRequest } from '../../../../type/api.type';

export const ActionCreator = actionCreatorFactory('order/api');

export const apiOrder = {
  get: ActionCreator<{
    param: ApiOrderGetParam;
    callback:(data: ApiOrderGetResponse)=>void;
      }>('get'),
  post: ActionCreator<CallbackRequest<ApiOrderPostParam>>('post'),
};

export class ApiOrderGet extends ApiBase<ApiOrderGetResponse> {
  constructor(param: ApiOrderGetParam) {
    const { project_id } = param;
    super({
      httpMethod: 'GET',
      url: `/api/project/${project_id}/order`,

    });
  }
}

export class ApiOrderPost extends ApiBase {
  constructor(param: ApiOrderPostParam) {
    super({
      httpMethod: 'POST',
      param,
      url: '/api/order',

    });
  }
}
