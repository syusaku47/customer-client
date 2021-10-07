import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { RequestBaseParam, CallbackRequest } from '../../../../type/api.type';
import {
  ApiCustomerPetGetResponse,
  ApiCustomerPetPostParam,
  ApiCustomerPetDeleteParam,
  ApiCustomerPetGetListParam,
  ApiCustomerPetGetListResponse,
  ApiCustomerPetParam,
  ApiCustomerPetGetParam,
} from './api-customer-pet.type';

export const ActionCreator = actionCreatorFactory('customer/api/pet');

export const apiCustomerPet = {
  post: ActionCreator<CallbackRequest<ApiCustomerPetPostParam>>('post'),
  delete: ActionCreator<CallbackRequest<ApiCustomerPetDeleteParam>>('delete'),
  getList: ActionCreator<ApiCustomerPetGetListParam>('get/list'),
  get: ActionCreator<{
    param: ApiCustomerPetGetParam;
    callback:(data: ApiCustomerPetGetResponse) => void;
      }>('get'),
};

export class ApiCustomerPet<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & ApiCustomerPetParam) {
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/customer/${param.id}/pet${param.pet_id ? `/${param.pet_id}` : ''}`,

    });
  }
}

export class ApiCustomerPetGet extends ApiCustomerPet<ApiCustomerPetGetListResponse> {
  constructor(param: ApiCustomerPetGetParam) {
    super({
      httpMethod: 'GET',
      id: param.id,
      pet_id: param.pet_id,
    });

    /* TODO DummyData */
  }
}

export class ApiCustomerPetGetList extends ApiCustomerPet<ApiCustomerPetGetListResponse> {
  constructor(param: ApiCustomerPetGetListParam) {
    super({
      httpMethod: 'GET',
      id: param.id,
    });

    /* TODO DummyData */
  }
}

export class ApiCustomerPetPost extends ApiCustomerPet {
  constructor(param: ApiCustomerPetPostParam) {
    const { data, base } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id: base.id,
      pet_id: base.pet_id,
    });
  }
}

export class ApiCustomerPetDelete extends ApiCustomerPet {
  constructor(param: ApiCustomerPetDeleteParam) {
    const { id, pet_id } = param;
    super({
      httpMethod: 'DELETE',
      id,
      pet_id,
    });
  }
}
