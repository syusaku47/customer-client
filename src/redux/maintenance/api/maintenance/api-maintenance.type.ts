import {
  Maintenance,
  MaintenanceList,
} from '../../../../type/maintenance/maintenance.type';

/* Param */
export type ApiMaintenanceGetParam = {
  id: number;
};

export type ApiMaintenancePostParam = {
  data: {
    customer_id: number;
    project_id: number;
    maintenance_date?: string;
    title: string;
    detail?: string;
    supported_date?: string;
    supported_content?: string;
    is_fixed?: 0 | 1;
    is_muko?: 0 | 1;
    lat?: string;
    lng?: string;
  };
  id?: number;
};

export type ApiMaintenanceGetListParam = Partial<{
  customer_id: number;
  project_id: number;
  maintenance_date_start: string;
  maintenance_date_end: string;
  sales_shop: number;
  sales_contact: number;
  completion_date_start: string;
  completion_date_end: string;
  project_name: string;
  is_muko: number;
  supported_kubun: number;
  word: string;
  sp_word: string;
  maintenance_date: string;
  is_fixed: boolean;
  construction_date: string;
  completion_date: string;
  quote_creator: number;
  title: string;
  supported_date: string;
  filter_by: number;
  offset: number;
  limit: number;
  sort_by: number;
  highlow: number;
}>;

/* Response */
export type ApiMaintenanceGetResponse = Maintenance;

export type ApiMaintenanceGetListResponse = MaintenanceList;
