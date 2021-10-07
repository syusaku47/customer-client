import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../../service/api-base';
import { RequestBaseCollection } from '../../../../../service/api.collection';
import { RequestBaseParam } from '../../../../../type/api.type';
import { ApiMasterProspectPartPostParam, ApiMasterProspectPartGetListParam, ApiMasterProspectPartGetListResponse } from './api-master-prospect-part.type';

export const ActionCreator = actionCreatorFactory('master/api/prospect-prospect-part');

export const apiMasterProspectPart = {
  post: ActionCreator<{param:ApiMasterProspectPartPostParam, callback:()=>void}>('post'),
  getList: ActionCreator<ApiMasterProspectPartGetListParam>('get/list'),
};

export class ApiMasterProspectPart<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/relatedtag/prospectPart${id ? `/${id}` : ''}`,

    });
  }
}

export class ApiMasterProspectPartPost extends ApiMasterProspectPart {
  constructor(param: ApiMasterProspectPartPostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterProspectPartGetList
  extends ApiMasterProspectPart<ApiMasterProspectPartGetListResponse> {
  constructor(param?: ApiMasterProspectPartGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
