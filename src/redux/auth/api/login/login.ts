import { ApiBase } from '../../../../service/api-base';

export type ApiLoginParam = {
  mail_address: string;
  password: string;
  remember: 0 | 1;
};

export type ApiLoginResponse = ApiLoginParam;

export class ApiLogin extends ApiBase<ApiLoginResponse> {
  constructor(param: ApiLoginParam) {
    // const csrfToken = getCookie('XSRF-TOKEN');

    super({
      httpMethod: 'POST',
      url: '/api/auth/login',
      param,
    });
  }
}
