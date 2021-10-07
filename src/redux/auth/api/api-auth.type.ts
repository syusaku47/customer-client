import { ApiLoginParam, ApiLoginResponse } from './login/login';
import { ApiPasswordChangeParamIn, ApiPasswordCheckDateParam, ApiPasswordMailSendParam } from './password/api-password.type';

export declare namespace ApiAuth {
  namespace Login {
    type Param =ApiLoginParam
    type Response = ApiLoginResponse
  }

  namespace Password {
    namespace Change{
      type Param = ApiPasswordChangeParamIn
    }
    namespace SendMail{
      type Param = ApiPasswordMailSendParam
    }
    namespace CheckDate{
      type Param = ApiPasswordCheckDateParam
    }
  }
}
