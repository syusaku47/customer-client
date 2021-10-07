import { ApiBase } from '../../../../service/api-base';

export class ApiIsLogin extends ApiBase {
  constructor() {
    super({
      httpMethod: 'POST',
      url: '/api/auth/islogin',
    });
  }
}
