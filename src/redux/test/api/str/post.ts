import { ApiTestStr } from '.';

export type ApiTestStrPostResponse = {
  str: string;
};

export type ApiTestStrPostParam = {
  str: string;
};

export class ApiTestStrPost extends ApiTestStr<ApiTestStrPostResponse> {
  constructor(param:ApiTestStrPostParam) {
    super({
      httpMethod: 'POST',
      url: '/post',
      param,
    });
  }
}
