import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { CallbackRequest, RequestBaseParam } from '../../../../type/api.type';
import { MasterEmployee } from '../../../../type/master/master-employee.type';
import {
  ApiMasterEmployeePostParam,
  ApiMasterEmployeeGetListParam,
  ApiMasterEmployeeGetListResponse,
} from './api-master-employee.type';

export const ActionCreator = actionCreatorFactory('master/api/employee');

export const apiMasterEmployee = {
  get: ActionCreator<CallbackRequest<{id:number}, MasterEmployee>>('get'),
  post: ActionCreator<CallbackRequest<ApiMasterEmployeePostParam>>('post'),
  getList: ActionCreator<ApiMasterEmployeeGetListParam>('get/list'),
};

export class ApiMasterEmployee<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/company/employee${id ? `/${id}` : ''}`,

    });
  }
}

export class ApiMasterEmployeeGet extends ApiMasterEmployee<MasterEmployee> {
  constructor(param: {id: number}) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      id,
    });
  }
}

export class ApiMasterEmployeePost extends ApiMasterEmployee {
  constructor(param: ApiMasterEmployeePostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterEmployeeGetList extends ApiMasterEmployee<ApiMasterEmployeeGetListResponse> {
  constructor(param: ApiMasterEmployeeGetListParam) {
    const { data } = param;
    super({
      httpMethod: 'GET',
      param: data,
    });
  }
}
