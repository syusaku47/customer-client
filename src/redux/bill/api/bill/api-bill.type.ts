import { Bill, BillListType } from '../../../../type/bill/bill.type';

/* Param */
export type ApiBillGetParam = any;

export type ApiBillPostParam = {
  data: any;
  id?: number;
};

export type ApiBillGetListParam = Partial<any>;

/* Response */
export type ApiBillGetResponse = Bill;

export type ApiBillGetListResponse = BillListType;
