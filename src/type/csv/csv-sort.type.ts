import { TagModel } from '../../model/tag/tag';
import { ApiCsvBirthdayGetListParam } from '../../redux/csv/api/birhday/api-csv-birthday';
import { ApiCsvCustomerRankGetListParam } from '../../redux/csv/api/customer-rank/api-customer-rank';
import { ApiCsvCustomerGetListParam } from '../../redux/csv/api/customer/api-csv-customer';
import { ApiCsvLostOrderGetListParam } from '../../redux/csv/api/lost-order/api-csv-lost-order';
import { ApiCsvMaintenanceGetListParam } from '../../redux/csv/api/maintenance/api-csv-maintenance';
import { ApiCsvNonOrderGetListParam } from '../../redux/csv/api/non-order/api-csv-non-order';
import { ApiCsvOrderGetListParam } from '../../redux/csv/api/order/api-csv-order';
import { ApiCsvProjectGetListParam } from '../../redux/csv/api/project/api-csv-project';
import { ApiCsvSupportHistoryGetListParam } from '../../redux/csv/api/support-history/api-csv-support-history';
import { ApiCsvWeddingGetListParam } from '../../redux/csv/api/wedding/api-csv-wedding';
import { ChangeType } from '../api.type';

export type CsvCustomerSort = Partial<ChangeType<
  ApiCsvCustomerGetListParam,
  {
    construction_status: TagModel | null;
    tags: TagModel | null;
    parts: TagModel | null;
    post_no1: string;
    post_no2: string;
  }
>>;

export type CsvBirthdaySort = ApiCsvBirthdayGetListParam;

export type CsvWeddingSort = ApiCsvWeddingGetListParam;

export type CsvProjectSort = Partial<ChangeType<
ApiCsvProjectGetListParam,
{
  contract_start_date: Date | null,
  contract_end_date: Date | null,
  completion_start_date: Date | null,
  completion_end_date: Date | null,
  construction_status: TagModel | null;
}
>>;

export type CsvOrderSort = Partial<ChangeType<
ApiCsvOrderGetListParam,
{
  parts: TagModel | null;
}
>>;

export type CsvNonOrderSort = Partial<ChangeType<
ApiCsvNonOrderGetListParam,
{
  last_quote_start_date: Date | null,
  last_quote_end_date: Date | null,
  parts: TagModel | null;
}
>>;

export type CsvLostOrderSort = Partial<ChangeType<
ApiCsvLostOrderGetListParam,
{
  parts: TagModel | null;
  failure_start_date: Date | null,
  failure_end_date: Date | null,
}
>>;

export type CsvMaintenanceSort = Partial<ChangeType<
ApiCsvMaintenanceGetListParam,
{
  maintenance_date_start: Date | null,
  maintenance_date_end: Date | null,
  completion_start_date: Date | null,
  completion_end_date: Date | null,
}
>>;

export type CsvCustomerRankSort = Partial<ChangeType<
ApiCsvCustomerRankGetListParam,
{
  updated_start_date: Date | null,
  updated_end_date: Date | null,
}
>>;

export type CsvSupportHistorySort = Partial<ChangeType<
ApiCsvSupportHistoryGetListParam,
{
  supported_date_start: Date | null,
  supported_date_end: Date | null,
}
>>;
