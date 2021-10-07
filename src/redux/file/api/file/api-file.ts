import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { CallbackRequest, RequestBaseParam } from '../../../../type/api.type';
import {
  ApiFileGetParam,
  ApiFileGetResponse,
  ApiFilePostParam,
  ApiFileGetListParam,
  ApiFileGetListResponse,
} from './api-file.type';

export const ActionCreator = actionCreatorFactory('file/api');

export const apiFile = {
  get: ActionCreator<{
    param: ApiFileGetParam;
    callback?:(data:ApiFileGetResponse)=>void;
      }>('get'),
  post: ActionCreator<CallbackRequest<ApiFilePostParam>>('post'),
  delete: ActionCreator<{ param: {id:number}; callback:() => void;}>('delete'),
  getList: ActionCreator<CallbackRequest<ApiFileGetListParam> & { noLoad?: boolean }>('get/list'),
};

class ApiFile<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/file${param.id ? `/${param.id}` : ''}`,

    });
  }
}

export class ApiFileGet extends ApiFile<ApiFileGetResponse> {
  constructor(param: ApiFileGetParam) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      id,
    });
  }
}

export class ApiFilePost extends ApiFile {
  constructor(param: ApiFilePostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiFileDelete extends ApiFile {
  constructor(param: {id:number}) {
    const { id } = param;
    super({
      httpMethod: 'DELETE',
      id,
    });
  }
}

export class ApiFileGetList extends ApiFile<ApiFileGetListResponse> {
  constructor(param: ApiFileGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
