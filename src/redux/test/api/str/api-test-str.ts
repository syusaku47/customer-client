import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { RequestBaseParam } from '../../../../type/api.type';

export class ApiTestStr<T = {}> extends ApiBase<T> {
  constructor(param: RequestBaseParam & { url: string; }) {
    super({
      ...RequestBaseCollection(),
      ...param,
      host: 'https://httpbin.org',
    });
  }
}
