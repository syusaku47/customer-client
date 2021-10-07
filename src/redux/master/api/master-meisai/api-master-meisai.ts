import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { CallbackRequest, RequestBaseParam } from '../../../../type/api.type';
import { MasterMeisai } from '../../../../type/master/master-meisai.type';
import {
  ApiMasterMeisaiPostParam,
  ApiMasterMeisaiGetListParam,
  ApiMasterMeisaiGetListResponse,
} from './api-master-meisai.type';

export const ActionCreator = actionCreatorFactory('master/api/meisai');

export const apiMasterMeisai = {
  get: ActionCreator<CallbackRequest<{id:number}, MasterMeisai>>('get'),
  post: ActionCreator<CallbackRequest<ApiMasterMeisaiPostParam>>('post'),
  getList: ActionCreator<ApiMasterMeisaiGetListParam>('get/list'),
};

export class ApiMasterMeisai<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/sizaikoji/detail${id ? `/${id}` : ''}`,

    });
  }
}

export class ApiMasterMeisaiGet extends ApiMasterMeisai<MasterMeisai> {
  constructor(param: {id: number}) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      id,
    });
  }
}

export class ApiMasterMeisaiPost extends ApiMasterMeisai {
  constructor(param: ApiMasterMeisaiPostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterMeisaiGetList extends ApiMasterMeisai<ApiMasterMeisaiGetListResponse> {
  constructor(param: ApiMasterMeisaiGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
