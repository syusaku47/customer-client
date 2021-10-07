import {
  ApiSupportHistoryGetParam,
  ApiSupportHistoryGetListParam,
  ApiSupportHistoryPostParam,
  ApiSupportHistoryGetResponse,
  ApiSupportHistoryGetListResponse,
} from './api-support-history/api-support-history.type';

export declare namespace ApiSupportHistory {

  namespace SupportHistory {
    namespace Param {
      type Get = ApiSupportHistoryGetParam;
      type List = ApiSupportHistoryGetListParam;
      type Post = ApiSupportHistoryPostParam;
    }
    namespace Response {
      type Get = ApiSupportHistoryGetResponse;
      type List = ApiSupportHistoryGetListResponse;
    }
  }
}
