import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { CallbackRequest, RequestBaseParam } from '../../../../type/api.type';
import { MasterUnit } from '../../../../type/master/master-unit.type';
import {
  ApiMasterUnitPostParam,
  ApiMasterUnitGetListParam,
  ApiMasterUnitGetListResponse,
} from './api-master-unit.type';

export const ActionCreator = actionCreatorFactory('master/api/unit');

export const apiMasterUnit = {
  get: ActionCreator<CallbackRequest<{id:number}, MasterUnit>>('get'),
  post: ActionCreator<CallbackRequest<ApiMasterUnitPostParam>>('post'),
  getList: ActionCreator<ApiMasterUnitGetListParam>('get/list'),
};

export class ApiMasterUnit<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/kubun/credit${id ? `/${id}` : ''}`,

    });
  }
}

export class ApiMasterUnitGet extends ApiMasterUnit<MasterUnit> {
  constructor(param: {id: number}) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      id,
    });
  }
}

export class ApiMasterUnitPost extends ApiMasterUnit {
  constructor(param: ApiMasterUnitPostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterUnitGetList extends ApiMasterUnit<ApiMasterUnitGetListResponse> {
  constructor(param: ApiMasterUnitGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
