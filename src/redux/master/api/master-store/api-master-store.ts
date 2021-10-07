import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { RequestBaseParam, CallbackRequest } from '../../../../type/api.type';
import { MasterStore } from '../../../../type/master/master-store.type';
import {
  ApiMasterStorePostParam,
  ApiMasterStoreGetListParam,
  ApiMasterStoreGetListResponse,
} from './api-master-store.type';

export const ActionCreator = actionCreatorFactory('master/api/store');

export const apiMasterStore = {
  get: ActionCreator<CallbackRequest<{ id: number; }, MasterStore>>('get'),
  post: ActionCreator<CallbackRequest<ApiMasterStorePostParam>>('post'),
  getList: ActionCreator<ApiMasterStoreGetListParam>('get/list'),
};

export class ApiMasterStore<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/company/store${id ? `/${id}` : ''}`,

    });
  }
}

export class ApiMasterStoreGet extends ApiMasterStore<MasterStore> {
  constructor(param: {id: number}) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      id,
    });
  }
}

export class ApiMasterStorePost extends ApiMasterStore {
  constructor(param: ApiMasterStorePostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterStoreGetList extends ApiMasterStore<ApiMasterStoreGetListResponse> {
  constructor(param: ApiMasterStoreGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
