import { ApiBase } from '../../../../service/api-base';

export type ApiMasterCustomerInformationImportParam = {
  fileData: File;
  name: string;
};

export class ApiMasterCustomerInformationImport extends ApiBase {
  constructor(param: ApiMasterCustomerInformationImportParam) {
    super({
      httpMethod: 'POST',
      param,
      url: '/api/master/customer/upload/csv',
    });
  }
}
