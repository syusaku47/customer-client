import { MasterMyCarType } from '../../../../../type/master/master-my-car-type.type';

/* Param */
export type ApiMasterMyCarTypeGetListParam = {
  is_muko?: 0 | 1;
  sort_by?: number;
  highlow?: number;
  offset?: number;
  limit?: number;
};

export type ApiMasterMyCarTypePostParam = {
  data: {
    name: string;
    is_input: number;
    is_valid: number;
  };
  id?: number;
};

/* Response */
export type ApiMasterMyCarTypeGetListResponse = MasterMyCarType;
