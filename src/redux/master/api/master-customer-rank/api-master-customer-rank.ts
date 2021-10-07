import { ApiBase } from '../../../../service/api-base';

export type ApiMasterCustomerRankParam = {
  data: {
    customer_rank: string,
  };
  id: number;
};

export class ApiMasterCustomerRank extends ApiBase {
  constructor(param: ApiMasterCustomerRankParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      url: `/api/master/custrankupdate/${id}`,
    });
  }
}
