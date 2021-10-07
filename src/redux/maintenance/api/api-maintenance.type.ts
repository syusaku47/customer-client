import {
  ApiMaintenanceGetParam,
  ApiMaintenanceGetListParam,
  ApiMaintenancePostParam,
  ApiMaintenanceGetResponse,
  ApiMaintenanceGetListResponse,
} from './maintenance/api-maintenance.type';

export declare namespace ApiMaintenance {
  namespace Param {
    type Get = ApiMaintenanceGetParam;
    type List = ApiMaintenanceGetListParam;
    type Post = ApiMaintenancePostParam;
  }
  namespace Response {
    type Get = ApiMaintenanceGetResponse;
    type List = ApiMaintenanceGetListResponse;
  }
}
