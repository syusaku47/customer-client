import { MasterLostOrder } from '../../../../type/master/master-lost-order.type';

/* Param */
export type ApiMasterLostOrderGetListParam = {
  is_muko?: 0 | 1;
  sort_by?: number;
  highlow?: number;
  offset?: number;
  limit?: number;
};

export type ApiMasterLostOrderPostParam = {
  data: {
    lost_reason: string;
    is_valid: 0 | 1;
  };
  id?: number;
};

/* Response */
export type ApiMasterLostOrderGetListResponse = MasterLostOrder;
