import { MasterQuoteFixed } from '../../../../type/master/master-estimate.type';

/* Param */
export type ApiMasterQuoteFixedGetListParam = {
};

export type ApiMasterQuoteFixedPostParam = {
  data: {
    item: string;
    name: string;
    estimate: string;
    cost: string;
  };
  id: number;
};

/* Response */
export type ApiMasterQuoteFixedGetListResponse = MasterQuoteFixed;
