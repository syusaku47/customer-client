import { MasterPart } from '../../../../../type/master/master-part-tag.type';
/* Param */
export type ApiMasterPartGetListParam = {
  is_muko?: 0 | 1;
  sort_by?: number;
  highlow?: number;
  offset?: number;
  limit?: number;
};

export type ApiMasterPartPostParam = {
  data: {
    name: string;
    is_input: number;
    is_valid: number;
  };
  id?: number;
};

/* Response */
export type ApiMasterPartGetListResponse = MasterPart;
