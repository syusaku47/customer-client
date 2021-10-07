import { ApiBase } from '../../../../service/api-base';

export class ApiLogout extends ApiBase {
  constructor() {
    super({
      httpMethod: 'POST',
      url: '/api/auth/logout',

    });
  }
}
