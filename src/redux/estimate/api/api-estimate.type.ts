import {
  ApiEstimateMeisaiSideMenuListResponse,
  ApiEstimateMeisaiDeleteParam,
  ApiEstimateMeisaiGetListParam,
  ApiEstimateMeisaiGetParam,
  ApiEstimateMeisaiGetResponse,
  ApiEstimateMeisaiListGetResponse,
  ApiEstimateMeisaiPostParam,
  ApiEstimateMeisaiSideMenuListParam,
  ApiEstimateMeisaiPrintNamePostParam,
} from './meisai/api-estimate-meisai.type';
import {
  ApiEstimateGetParam,
  ApiEstimateGetListParam,
  ApiEstimatePostParam,
  ApiEstimateGetResponse,
  ApiEstimateListGetResponse,
} from './estimate/api-estimate.type';

export declare namespace ApiEstimate {
  namespace Estimate{
    namespace Param {
      type Get = ApiEstimateGetParam;
      type List = ApiEstimateGetListParam;
      type Post = ApiEstimatePostParam;
    }
    namespace Response {
      type Get = ApiEstimateGetResponse;
      type List = ApiEstimateListGetResponse;
    }
  }
  namespace Meisai {
    namespace Param {
      type Get = ApiEstimateMeisaiGetParam;
      type Post = ApiEstimateMeisaiPostParam;
      type Delete = ApiEstimateMeisaiDeleteParam;
      type List = ApiEstimateMeisaiGetListParam;
      type SideMenuList = ApiEstimateMeisaiSideMenuListParam;
      type PrintName = ApiEstimateMeisaiPrintNamePostParam;
    }
    namespace Response {
      type Get = ApiEstimateMeisaiGetResponse;
      type List = ApiEstimateMeisaiListGetResponse;
      type SideMenuList = ApiEstimateMeisaiSideMenuListResponse;
    }
  }
}
