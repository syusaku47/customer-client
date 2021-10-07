import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import {
  ApiPasswordChangeParamIn,
  ApiPasswordChangeParamOut,
  ApiPasswordCheckDateParam,
  ApiPasswordMailSendParam,
} from './api-password.type';

export const ActionCreator = actionCreatorFactory('auth/api/password');

export const apiPassword = {
  dialogChange: ActionCreator<ApiPasswordChangeParamIn>('dialog/change'),
  change: ActionCreator<ApiPasswordChangeParamOut>('change'),
  send: ActionCreator<{param:ApiPasswordMailSendParam, onSuccess:()=>void}>('send'),
  checkDate: ActionCreator<{
    param: ApiPasswordCheckDateParam,
    onSuccess:() => void;
    onError: () => void;
      }>('check/date'),
};

/* ページ内 */
export class ApiPasswordChangeIn extends ApiBase {
  constructor(param: ApiPasswordChangeParamIn) {
    super({
      httpMethod: 'POST',
      url: '/api/common/chgpassword',
      param,
    });
  }
}

/* ページ内 */
export class ApiPasswordChangeOut extends ApiBase {
  constructor(param: ApiPasswordChangeParamOut) {
    super({
      httpMethod: 'POST',
      url: '/api/chgpassword',
      param,
    });
  }
}

/* 有効期限確認 */
export class ApiPasswordCheckDate extends ApiBase {
  constructor(param: ApiPasswordCheckDateParam) {
    super({
      httpMethod: 'POST',
      url: '/api/check_expiry_token',
      param,
    });
  }
}

/* パスワード再設定メール送信 */
export class ApiPasswordMailSend extends ApiBase {
  constructor(param: ApiPasswordMailSendParam) {
    super({
      httpMethod: 'POST',
      url: '/api/mail/reset_password',
      param,
    });
  }
}
