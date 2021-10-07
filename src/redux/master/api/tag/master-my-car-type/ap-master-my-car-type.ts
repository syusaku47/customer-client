import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../../service/api-base';
import { RequestBaseCollection } from '../../../../../service/api.collection';
import { CallbackRequest, RequestBaseParam } from '../../../../../type/api.type';
import { MasterMyCarType } from '../../../../../type/master/master-my-car-type.type';
import {
  ApiMasterMyCarTypePostParam,
  ApiMasterMyCarTypeGetListParam,
  ApiMasterMyCarTypeGetListResponse,
} from './api-master-my-car-type.type';

export const ActionCreator = actionCreatorFactory('master/api/my-car-type');

export const apiMasterMyCarType = {
  get: ActionCreator<CallbackRequest<{id:number}, MasterMyCarType>>('get'),
  post: ActionCreator<CallbackRequest<ApiMasterMyCarTypePostParam>>('post'),
  getList: ActionCreator<ApiMasterMyCarTypeGetListParam>('get/list'),
};

export class ApiMasterMyCarType<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/relatedtag/mycartype${id ? `/${id}` : ''}`,
    });
  }
}

export class ApiMasterMyCarTypePost extends ApiMasterMyCarType {
  constructor(param: ApiMasterMyCarTypePostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterMyCarTypeGetList
  extends ApiMasterMyCarType<ApiMasterMyCarTypeGetListResponse> {
  constructor(param?: ApiMasterMyCarTypeGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
