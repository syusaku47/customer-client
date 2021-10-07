import { ApiBase } from '../../../../service/api-base';

export type ApiFileDownloadParam = {
  file_id:number
}

export class ApiFileDownload extends ApiBase<File> {
  constructor(param: ApiFileDownloadParam) {
    super({
      httpMethod: 'GET',
      contents: 'BLOB',
      url: `/api/file/${param.file_id}/download`,

    });
  }
}
