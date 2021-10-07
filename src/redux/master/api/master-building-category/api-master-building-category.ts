import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { CallbackRequest, RequestBaseParam } from '../../../../type/api.type';
import { MasterBuildingCategory } from '../../../../type/master/master-building-category.type';
import {
  ApiMasterBuildingCategoryPostParam,
  ApiMasterBuildingCategoryGetListParam,
  ApiMasterBuildingCategoryGetListResponse,
} from './api-master-building-category.type';

export const ActionCreator = actionCreatorFactory('master/api/building-category');

export const apiMasterBuildingCategory = {
  get: ActionCreator<CallbackRequest<{id:number}, MasterBuildingCategory>>('get'),
  post: ActionCreator<CallbackRequest<ApiMasterBuildingCategoryPostParam>>('post'),
  getList: ActionCreator<ApiMasterBuildingCategoryGetListParam>('get/list'),
};

export class ApiMasterBuildingCategory<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/kubun/building${id ? `/${id}` : ''}`,

    });
  }
}

export class ApiMasterBuildingCategoryGet
  extends ApiMasterBuildingCategory<MasterBuildingCategory> {
  constructor(param: {id: number}) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      id,
    });
  }
}

export class ApiMasterBuildingCategoryPost extends ApiMasterBuildingCategory {
  constructor(param: ApiMasterBuildingCategoryPostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterBuildingCategoryGetList
  extends ApiMasterBuildingCategory<ApiMasterBuildingCategoryGetListResponse> {
  constructor(param: ApiMasterBuildingCategoryGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
