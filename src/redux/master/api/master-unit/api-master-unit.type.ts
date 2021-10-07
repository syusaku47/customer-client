import { MasterUnit } from '../../../../type/master/master-unit.type';

/* Param */
export type ApiMasterUnitGetListParam = {
  is_muko?: 0 | 1;
  sort_by?: number;
  highlow?: number;
  offset?: number;
  limit?: number;
};

export type ApiMasterUnitPostParam = {
  data: {
    name: string;
    valid_flag: 0 | 1;
  };
  id?: number;
};

/* Response */
export type ApiMasterUnitGetListResponse = MasterUnit;
