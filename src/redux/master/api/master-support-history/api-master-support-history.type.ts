import { MasterSupportHistory } from '../../../../type/master/master-support-history.type';

/* Param */
export type ApiMasterSupportHistoryGetListParam = {
  is_muko?: 0 | 1;
  sort_by?: number;
  highlow?: number;
  offset?: number;
  limit?: number;
};

export type ApiMasterSupportHistoryPostParam = {
  data: {
    supported: string;
    is_valid: 0 | 1;
  };
  id?: number;
};

/* Response */
export type ApiMasterSupportHistoryGetListResponse = MasterSupportHistory;
