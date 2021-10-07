import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../../service/api-base';
import { RequestBaseCollection } from '../../../../../service/api.collection';
import { RequestBaseParam } from '../../../../../type/api.type';
import { ApiMasterConstructionPartGetListParam, ApiMasterConstructionPartGetListResponse, ApiMasterConstructionPartPostParam } from './api-master-construction-part.type';

export const ActionCreator = actionCreatorFactory('master/api/construction-construction-part');

export const apiMasterConstructionPart = {
  post: ActionCreator<{param:ApiMasterConstructionPartPostParam, callback:()=>void}>('post'),
  getList: ActionCreator<ApiMasterConstructionPartGetListParam>('get/list'),
};

export class ApiMasterConstructionPart<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/relatedtag/construction-part${id ? `/${id}` : ''}`,

    });
  }
}

export class ApiMasterConstructionPartPost extends ApiMasterConstructionPart {
  constructor(param: ApiMasterConstructionPartPostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterConstructionPartGetList
  extends ApiMasterConstructionPart<ApiMasterConstructionPartGetListResponse> {
  constructor(param: ApiMasterConstructionPartGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
