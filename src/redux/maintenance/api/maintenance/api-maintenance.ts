import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { RequestBaseParam, CallbackRequest } from '../../../../type/api.type';
import { MaintenanceList } from '../../../../type/maintenance/maintenance.type';
import {
  ApiMaintenanceGetParam,
  ApiMaintenanceGetResponse,
  ApiMaintenancePostParam,
  ApiMaintenanceGetListParam,
  ApiMaintenanceGetListResponse,
} from './api-maintenance.type';

export const ActionCreator = actionCreatorFactory('maintenance/api');

export const apiMaintenance = {
  get: ActionCreator<{
    param: ApiMaintenanceGetParam;
    callback?:(data:ApiMaintenanceGetResponse)=>void;
      }>('get'),
  post: ActionCreator<CallbackRequest<ApiMaintenancePostParam>>('post'),
  getList: ActionCreator<{param:ApiMaintenanceGetListParam, callback?:(v:MaintenanceList[])=>void, noLoad?: boolean}>('get/list'),
};

class ApiMaintenance<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/maintenance${param.id ? `/${param.id}` : ''}`,

    });
  }
}

export class ApiMaintenanceGet extends ApiMaintenance<ApiMaintenanceGetResponse> {
  constructor(param: ApiMaintenanceGetParam) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      id,
    });
  }
}

export class ApiMaintenancePost extends ApiMaintenance {
  constructor(param: ApiMaintenancePostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMaintenanceGetList extends ApiMaintenance<ApiMaintenanceGetListResponse> {
  constructor(param: ApiMaintenanceGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
