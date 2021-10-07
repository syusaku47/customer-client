import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { CallbackRequest, RequestBaseParam } from '../../../../type/api.type';
import { MasterArea } from '../../../../type/master/master-area.type';
import {
  ApiMasterAreaPostParam,
  ApiMasterAreaGetListParam,
  ApiMasterAreaGetListResponse,
} from './api-master-area.type';

export const ActionCreator = actionCreatorFactory('master/api/area');

export const apiMasterArea = {
  get: ActionCreator<CallbackRequest<{id:number}, MasterArea>>('get'),
  post: ActionCreator<CallbackRequest<ApiMasterAreaPostParam>>('post'),
  getList: ActionCreator<ApiMasterAreaGetListParam>('get/list'),
};

export class ApiMasterArea<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/kubun/area${id ? `/${id}` : ''}`,

    });
  }
}

export class ApiMasterAreaGet extends ApiMasterArea<MasterArea> {
  constructor(param: {id: number}) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      id,
    });
  }
}

export class ApiMasterAreaPost extends ApiMasterArea {
  constructor(param: ApiMasterAreaPostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterAreaGetList extends ApiMasterArea<ApiMasterAreaGetListResponse> {
  constructor(param: ApiMasterAreaGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
