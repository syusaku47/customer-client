import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { CallbackRequest, RequestBaseParam } from '../../../../type/api.type';
import { MasterAfterMaintenance } from '../../../../type/master/master-after-maintenance.type';
import {
  ApiMasterAfterMaintenancePostParam,
  ApiMasterAfterMaintenanceGetListParam,
  ApiMasterAfterMaintenanceGetListResponse,
} from './api-master-after-maintenance.type';

export const ActionCreator = actionCreatorFactory('master/api/after-maintenance');

export const apiMasterAfterMaintenance = {
  get: ActionCreator<CallbackRequest<{id:number}, MasterAfterMaintenance>>('get'),
  post: ActionCreator<CallbackRequest<ApiMasterAfterMaintenancePostParam>>('post'),
  getList: ActionCreator<ApiMasterAfterMaintenanceGetListParam>('get/list'),
};

class ApiMasterAfterMaintenance<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/maintenance/aftermaintenance${id ? `/${id}` : ''}`,

    });
  }
}

export class ApiMasterAfterMaintenanceGet
  extends ApiMasterAfterMaintenance<MasterAfterMaintenance> {
  constructor(param: {id: number}) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      id,
    });
  }
}

export class ApiMasterAfterMaintenancePost extends ApiMasterAfterMaintenance {
  constructor(param: ApiMasterAfterMaintenancePostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterAfterMaintenanceGetList
  extends ApiMasterAfterMaintenance<ApiMasterAfterMaintenanceGetListResponse> {
  constructor(param: ApiMasterAfterMaintenanceGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
