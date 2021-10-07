import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { RequestBaseParam } from '../../../../type/api.type';
import { urlFormat } from '../../../../utilities/url-format';

export const ActionCreator = actionCreatorFactory('customer/id/api/');

export const apiCustomerId = {
  get: ActionCreator<{ callback:(data: { id: number; }) => void }>('get'),
  delete: ActionCreator<{id:number }>('post'),
};

class ApiCustomerIdBase<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & { id?: number }) {
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/customer/id${urlFormat(param.id)}`,

    });
  }
}

export class ApiCustomerIdGet extends ApiCustomerIdBase<{ id:number }> {
  constructor() {
    super({ httpMethod: 'GET' });
  }
}

export class ApiCustomerIdDelete extends ApiCustomerIdBase {
  constructor(param:{ id:number }) {
    const { id } = param;
    super({
      httpMethod: 'DELETE',
      id,
    });
  }
}
