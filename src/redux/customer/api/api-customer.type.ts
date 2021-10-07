import { ApiCustomerFamilyGetListParam, ApiCustomerFamilyPostParam, ApiCustomerFamilyGetListResponse } from './customer-family/api-customer-family.type';
import { ApiCustomerPetGetListParam, ApiCustomerPetGetListResponse, ApiCustomerPetPostParam } from './customer-pet/api-customer-pet.type';
import {
  ApiCustomerGetParam,
  ApiCustomerGetListParam,
  ApiCustomerPostParam,
  ApiCustomerGetResponse,
  ApiCustomerListGetResponse,
} from './customer/api-customer.type';

export declare namespace ApiCustomer {
  namespace Customer {
    namespace Param {
      type Get = ApiCustomerGetParam;
      type List = ApiCustomerGetListParam;
      type Post = ApiCustomerPostParam;
    }
    namespace Response {
      type Get = ApiCustomerGetResponse;
      type List = ApiCustomerListGetResponse;
    }
  }

  namespace Pet {
    namespace Param {
      type List = ApiCustomerPetGetListParam;
      type Post = ApiCustomerPetPostParam;
    }
    namespace Response {
      type List = ApiCustomerPetGetListResponse;
    }
  }

  namespace Family {
    namespace Param {
      type List = ApiCustomerFamilyGetListParam;
      type Post = ApiCustomerFamilyPostParam;
    }
    namespace Response {
      type List = ApiCustomerFamilyGetListResponse;
    }
  }

}
