import { ApiTestStr } from '.';

export type ApiTestStrGetResponse = {
  str: string;
};

export type ApiTestStrGetParam = {
  str: string;
};

export class ApiTestStrGet extends ApiTestStr<ApiTestStrGetResponse> {
  constructor(param:ApiTestStrGetParam) {
    super({
      httpMethod: 'GET',
      url: '/get',
      param,
    });
  }
}
