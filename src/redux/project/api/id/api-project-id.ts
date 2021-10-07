import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { RequestBaseParam } from '../../../../type/api.type';
import { urlFormat } from '../../../../utilities/url-format';

export const ActionCreator = actionCreatorFactory('project/id/api/');

export const apiProjectId = {
  get: ActionCreator<{id: number, callback:(data: { id: number; }) => void }>('get'),
  delete: ActionCreator<{id:number}>('post'),
};

class ApiProjectIdBase<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & { id?: number }) {
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/project/id${urlFormat(param.id)}`,
    });
  }
}

export class ApiProjectIdGet extends ApiProjectIdBase<{ id:number }> {
  constructor(param:{ id:number }) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      id,
    });
  }
}

export class ApiProjectIdDelete extends ApiProjectIdBase {
  constructor(param:{ id:number }) {
    const { id } = param;
    super({
      httpMethod: 'DELETE',
      id,
    });
  }
}
