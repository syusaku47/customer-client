import { ApiFileDownloadParam } from './download/api-file-download';
import {
  ApiFileGetParam,
  ApiFileGetListParam,
  ApiFilePostParam,
  ApiFileGetResponse,
  ApiFileGetListResponse,
} from './file/api-file.type';

export declare namespace ApiFile {
  namespace Param {
    type Get = ApiFileGetParam;
    type List = ApiFileGetListParam;
    type Post = ApiFilePostParam;
    type Download = ApiFileDownloadParam;
  }
  namespace Response {
    type Get = ApiFileGetResponse;
    type List = ApiFileGetListResponse;
    type Download = File;
  }
}
