import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { CallbackRequest, RequestBaseParam } from '../../../../type/api.type';
import { MasterMiddleCategory } from '../../../../type/master/master-middle-category.type';
import {
  ApiMasterMiddleCategoryPostParam,
  ApiMasterMiddleCategoryGetListParam,
  ApiMasterMiddleCategoryGetListResponse,
} from './api-master-middle-category.type';

export const ActionCreator = actionCreatorFactory('master/api/middle-category');

export const apiMasterMiddleCategory = {
  get: ActionCreator<CallbackRequest<{id:number}, MasterMiddleCategory>>('get'),
  post: ActionCreator<CallbackRequest<ApiMasterMiddleCategoryPostParam>>('post'),
  getList: ActionCreator<ApiMasterMiddleCategoryGetListParam>('get/list'),
};

export class ApiMasterMiddleCategory<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/sizaikoji/subcategory${id ? `/${id}` : ''}`,

    });
  }
}

export class ApiMasterMiddleCategoryGet extends ApiMasterMiddleCategory<MasterMiddleCategory> {
  constructor(param: {id: number}) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      id,
    });
  }
}

export class ApiMasterMiddleCategoryPost extends ApiMasterMiddleCategory {
  constructor(param: ApiMasterMiddleCategoryPostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterMiddleCategoryGetList
  extends ApiMasterMiddleCategory<ApiMasterMiddleCategoryGetListResponse> {
  constructor(param: ApiMasterMiddleCategoryGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
