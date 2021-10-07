import { MasterMadori } from '../../../../type/master/master-madori.type';

/* Param */
export type ApiMasterMadoriGetListParam = {
  is_muko?: 0 | 1;
  sort_by?: number;
  highlow?: number;
  offset?: number;
  limit?: number;
};

export type ApiMasterMadoriPostParam = {
  data: {
    name: string;
    is_valid: 0 | 1;
  };
  id?: number;
};

/* Response */
export type ApiMasterMadoriGetListResponse = MasterMadori;
