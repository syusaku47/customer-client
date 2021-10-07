import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { CallbackRequest, RequestBaseParam } from '../../../../type/api.type';
import { MasterSignature } from '../../../../type/master/master-signature.type';
import {
  ApiMasterSignaturePostParam,
  ApiMasterSignatureGetListParam,
  ApiMasterSignatureGetListResponse,
} from './api-master-signature.type';

export const ActionCreator = actionCreatorFactory('master/api/signature');

export const apiMasterSignature = {
  get: ActionCreator<CallbackRequest<{id:number}>>('get'),
  post: ActionCreator<{param:ApiMasterSignaturePostParam, callback:()=>void}>('post'),
  getList: ActionCreator<ApiMasterSignatureGetListParam>('get/list'),
};

export class ApiMasterSignature<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/fixed/signature${id ? `/${id}` : ''}`,

    });
  }
}

export class ApiMasterSignatureGet extends ApiMasterSignature<MasterSignature> {
  constructor(param: {id: number}) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      id,
    });
  }
}

export class ApiMasterSignaturePost extends ApiMasterSignature {
  constructor(param: ApiMasterSignaturePostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterSignatureGetList
  extends ApiMasterSignature<ApiMasterSignatureGetListResponse> {
  constructor(param: ApiMasterSignatureGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
