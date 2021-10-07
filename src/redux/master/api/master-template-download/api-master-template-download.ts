import { ApiBase } from '../../../../service/api-base';

export class ApiMasterTemplateDownload extends ApiBase {
  constructor() {
    super({
      httpMethod: 'GET',
      contents: 'BLOB',
      url: '/api/master/customer/template/download',
    });
  }
}
