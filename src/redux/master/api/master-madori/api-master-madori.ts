import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { CallbackRequest, RequestBaseParam } from '../../../../type/api.type';
import { MasterMadori } from '../../../../type/master/master-madori.type';
import { ApiMasterMadoriPostParam, ApiMasterMadoriGetListParam, ApiMasterMadoriGetListResponse } from './api-master-madori.type';

export const ActionCreator = actionCreatorFactory('master/api/madori');

export const apiMasterMadori = {
  get: ActionCreator<CallbackRequest<{id:number}, MasterMadori>>('get'),
  post: ActionCreator<CallbackRequest<ApiMasterMadoriPostParam>>('post'),
  getList: ActionCreator<ApiMasterMadoriGetListParam>('get/list'),
};

export class ApiMasterMadori<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/kubun/madori${id ? `/${id}` : ''}`,

    });
  }
}

export class ApiMasterMadoriGet extends ApiMasterMadori<MasterMadori> {
  constructor(param: {id: number}) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      id,
    });
  }
}

export class ApiMasterMadoriPost extends ApiMasterMadori {
  constructor(param: ApiMasterMadoriPostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterMadoriGetList extends ApiMasterMadori<ApiMasterMadoriGetListResponse> {
  constructor(param: ApiMasterMadoriGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
