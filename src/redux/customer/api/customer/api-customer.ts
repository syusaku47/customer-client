import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { RequestBaseParam, CallbackRequest } from '../../../../type/api.type';
// import { CustomerListDummy } from '../../../../collection/dummy/customer/customer-list.dummy';
import {
  ApiCustomerListGetResponse,
  ApiCustomerGetListParam,
  ApiCustomerGetParam,
  ApiCustomerGetResponse,
  ApiCustomerPostParam,
} from './api-customer.type';
// import { CustomerDummy } from '../../../../collection/dummy/customer/customer.dummy';
import { CustomerListType } from '../../../../type/customer/customer.type';

export const ActionCreator = actionCreatorFactory('customer/api/');

export const apiCustomer = {
  get: ActionCreator<{
    noLoad?: boolean;
    param: ApiCustomerGetParam;
    callback?:(data:ApiCustomerGetResponse)=>void;
      }>('get'),
  post: ActionCreator<CallbackRequest<ApiCustomerPostParam>>('post'),
  getList: ActionCreator<ApiCustomerGetListParam>('get/list'),
  getCallbackList: ActionCreator<{
    param: ApiCustomerGetListParam,
    onSuccess:(data:CustomerListType[], hitCount:number) => void;
      }>('get/callback/list'),
};

class ApiCustomer<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/customer${param.id ? `/${param.id}` : ''}`,

    });
  }
}

export class ApiCustomerGet extends ApiCustomer<ApiCustomerGetResponse> {
  constructor(param: ApiCustomerGetParam) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      id,
    });
    // this.dummyData = CustomerDummy;
  }
}

export class ApiCustomerPost extends ApiCustomer {
  constructor(param: ApiCustomerPostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiCustomerGetList extends ApiCustomer<ApiCustomerListGetResponse> {
  constructor(param: ApiCustomerGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
    // this.dummyData = CustomerListDummy;
  }
}
