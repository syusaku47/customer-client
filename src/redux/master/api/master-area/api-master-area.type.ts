import { MasterArea } from '../../../../type/master/master-area.type';

/* Param */
export type ApiMasterAreaGetListParam = {
  is_muko?: 0 | 1;
  sort_by?: number;
  highlow?: number;
  offset?: number;
  limit?: number;
};

export type ApiMasterAreaPostParam = {
  data: {
    store_id: number;
    area_name: string;
    is_valid: 0 | 1;
  };
  id?: number;
};

/* Response */
export type ApiMasterAreaGetListResponse = MasterArea;
