import { ApiBase } from '../../../../service/api-base';
import { User } from '../../../../type/auth/user.typs';

export type ApiUserResponse = User;

export class ApiUser extends ApiBase<ApiUserResponse> {
  constructor() {
    super({
      httpMethod: 'GET',
      url: '/api/auth/me',
    });
  }
}
