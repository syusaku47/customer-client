import { MasterAfterMaintenance } from '../../../../type/master/master-after-maintenance.type';

/* Param */
export type ApiMasterAfterMaintenanceGetListParam = {
  is_muko?: 0 | 1;
  sort_by?: number;
  highlow?: number;
  offset?: number;
  limit?: number;
};

export type ApiMasterAfterMaintenancePostParam = {
  data: {
    ins_expected_date: string;
    is_valid: 0 | 1;
  };
  id?: number;
};

/* Response */
export type ApiMasterAfterMaintenanceGetListResponse = MasterAfterMaintenance;
