import { ApiBase } from '../../../../service/api-base';

export type ApiEstimatePrintParam = {
  id: number;
  data: {
    files: File[];
  }
}

export type ApiEstimatePrintResponse = {
  id: number;
  data: {
    files: File[];
  }
}

export class ApiEstimatePrint extends ApiBase<ApiEstimatePrintResponse> {
  constructor(param:ApiEstimatePrintParam) {
    const {
      id, data,
    } = param;
    super({
      contents: 'BLOB',
      httpMethod: 'POST',
      url: `/api/quote/${id}/print`,
      param: data,
    });
  }
}
