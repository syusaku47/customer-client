import { MasterRelevantTag } from '../../../../../type/master/master-relevant-tag.type';

/* Param */
export type ApiMasterRelevantTagGetListParam = {
  is_muko?: 0 | 1;
  sort_by?: number;
  highlow?: number;
  offset?: number;
  limit?: number;
};

export type ApiMasterRelevantTagPostParam = {
  data: {
    name: string;
    is_input: number;
    is_valid: number;
  };
  id?: number;
};

/* Response */
export type ApiMasterRelevantTagGetListResponse = MasterRelevantTag;
