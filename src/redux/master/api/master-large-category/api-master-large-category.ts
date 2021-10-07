import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { CallbackRequest, RequestBaseParam } from '../../../../type/api.type';
import { MasterLargeCategory } from '../../../../type/master/master-large-category.type';
import {
  ApiMasterLargeCategoryPostParam,
  ApiMasterLargeCategoryGetListParam,
  ApiMasterLargeCategoryGetListResponse,
} from './api-master-large-category.type';

export const ActionCreator = actionCreatorFactory('master/api/large-category');

export const apiMasterLargeCategory = {
  get: ActionCreator<CallbackRequest<{id:number}, MasterLargeCategory>>('get'),
  post: ActionCreator<CallbackRequest<ApiMasterLargeCategoryPostParam>>('post'),
  getList: ActionCreator<ApiMasterLargeCategoryGetListParam>('get/list'),
};

export class ApiMasterLargeCategory<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/sizaikoji/category${id ? `/${id}` : ''}`,

    });
  }
}

export class ApiMasterLargeCategoryGet extends ApiMasterLargeCategory<MasterLargeCategory> {
  constructor(param: {id: number}) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      id,
    });
  }
}

export class ApiMasterLargeCategoryPost extends ApiMasterLargeCategory {
  constructor(param: ApiMasterLargeCategoryPostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterLargeCategoryGetList
  extends ApiMasterLargeCategory<ApiMasterLargeCategoryGetListResponse> {
  constructor(param: ApiMasterLargeCategoryGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
