import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { RequestBaseParam } from '../../../../type/api.type';
import {
  ApiMasterProjectRankGetListParam,
  ApiMasterProjectRankGetListResponse,
  ApiMasterProjectRankPostParam,
} from './api-master-project-rank.type';

export const ActionCreator = actionCreatorFactory('master/api/project-rank');

export const apiMasterProjectRank = {
  post: ActionCreator<{param:ApiMasterProjectRankPostParam, callback:()=>void}>('post'),
  getList: ActionCreator<ApiMasterProjectRankGetListParam>('get/list'),
};

export class ApiMasterProjectRank<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/rank/project${id ? `/${id}` : ''}`,

    });
  }
}

export class ApiMasterProjectRankPost extends ApiMasterProjectRank {
  constructor(param: ApiMasterProjectRankPostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterProjectRankGetList
  extends ApiMasterProjectRank<ApiMasterProjectRankGetListResponse> {
  constructor(param: ApiMasterProjectRankGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
