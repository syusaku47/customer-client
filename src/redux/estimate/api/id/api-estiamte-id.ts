import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { RequestBaseParam } from '../../../../type/api.type';
import { urlFormat } from '../../../../utilities/url-format';

export const ActionCreator = actionCreatorFactory('estiamte/id/api/');

export const apiEstimateId = {
  get: ActionCreator<{ project_id:number, callback:(data: { id: number; }) => void }>('get'),
  delete: ActionCreator<{project_id:number, callback?:() => void }>('post'),
};

class ApiEstimateIdBase<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & { id: number }) {
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/quote/id${urlFormat(param.id)}`,

    });
  }
}

export class ApiEstimateIdGet extends ApiEstimateIdBase<{ id:number }> {
  constructor(param:{project_id:number}) {
    super({
      httpMethod: 'GET',
      id: param.project_id,
    });
  }
}

export class ApiEstimateIdDelete extends ApiEstimateIdBase {
  constructor(param:{ project_id:number }) {
    const { project_id } = param;
    super({
      httpMethod: 'DELETE',
      id: project_id,
    });
  }
}
