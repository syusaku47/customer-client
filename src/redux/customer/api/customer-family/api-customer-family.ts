import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { RequestBaseParam, CallbackRequest } from '../../../../type/api.type';
import {
  ApiCustomerFamilyDeleteParam,
  ApiCustomerFamilyGetListParam,
  ApiCustomerFamilyGetListResponse,
  ApiCustomerFamilyGetParam,
  ApiCustomerFamilyGetResponse,
  ApiCustomerFamilyParam, ApiCustomerFamilyPostParam,
} from './api-customer-family.type';

export const ActionCreator = actionCreatorFactory('customer/api/family');

export const apiCustomerFamily = {
  post: ActionCreator<CallbackRequest<ApiCustomerFamilyPostParam>>('post'),
  delete: ActionCreator<CallbackRequest<ApiCustomerFamilyDeleteParam>>('delete'),
  getList: ActionCreator<ApiCustomerFamilyGetListParam>('get/list'),
  get: ActionCreator<{
    param: ApiCustomerFamilyGetParam;
    callback:(data: ApiCustomerFamilyGetResponse) => void;
      }>('get'),
};

export class ApiCustomerFamily<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & ApiCustomerFamilyParam) {
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/customer/${param.id}/family${param.family_id ? `/${param.family_id}` : ''}`,

    });
  }
}

export class ApiCustomerFamilyGet extends ApiCustomerFamily<ApiCustomerFamilyGetListResponse> {
  constructor(param: ApiCustomerFamilyGetParam) {
    super({
      httpMethod: 'GET',
      id: param.id,
      family_id: param.family_id,
    });
  }
}

export class ApiCustomerFamilyGetList extends ApiCustomerFamily<ApiCustomerFamilyGetListResponse> {
  constructor(param: ApiCustomerFamilyGetListParam) {
    super({
      httpMethod: 'GET',
      id: param.id,
    });
  }
}

export class ApiCustomerFamilyPost extends ApiCustomerFamily {
  constructor(param: ApiCustomerFamilyPostParam) {
    const { data, base } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id: base.id,
      family_id: base.family_id,
    });
  }
}

export class ApiCustomerFamilyDelete extends ApiCustomerFamily {
  constructor(param: ApiCustomerFamilyDeleteParam) {
    const { id, family_id } = param;
    super({
      httpMethod: 'DELETE',
      id,
      family_id,
    });
  }
}
