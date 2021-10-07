import { ApiTestStr } from '.';

export class ApiTestStrDelete extends ApiTestStr {
  constructor() {
    super({
      httpMethod: 'DELETE',
      url: '/delete',
    });
  }
}
