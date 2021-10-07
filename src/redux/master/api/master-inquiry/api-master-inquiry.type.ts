import { MasterInquiry } from '../../../../type/master/master-inquiry.type';

/* Param */
export type ApiMasterInquiryGetListParam = {
  is_muko?: 0 | 1;
  sort_by?: number;
  highlow?: number;
  offset?: number;
  limit?: number;
};

export type ApiMasterInquiryPostParam = {
  data: {
    name: string;
    is_valid: 0 | 1;
  };
  id?: number;
};

/* Response */
export type ApiMasterInquiryGetListResponse = MasterInquiry;
