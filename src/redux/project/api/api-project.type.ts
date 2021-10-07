import {
  ApiProjectGetListParam,
  ApiProjectGetParam,
  ApiProjectGetResponse,
  ApiProjectListGetResponse,
  ApiProjectPostParam,
} from './project/api-project.type';

export declare namespace ApiProject {
  namespace Param {
    type Get = ApiProjectGetParam;
    type List = ApiProjectGetListParam;
    type Post = ApiProjectPostParam;
  }
  namespace Response {
    type Get = ApiProjectGetResponse;
    type List = ApiProjectListGetResponse;
  }
}
