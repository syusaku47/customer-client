import { MasterOrigin } from '../../../../type/master/master-origin.type';

/* Param */
export type ApiMasterOriginGetListParam = {
  is_muko?: 0 | 1;
  sort_by?: number;
  highlow?: number;
  offset?: number;
  limit?: number;
};

export type ApiMasterOriginPostParam = {
  data: {
    name: string;
    valid_flag: 0 | 1;
  };
  id?: number;
};

/* Response */
export type ApiMasterOriginGetListResponse = MasterOrigin;
