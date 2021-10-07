import {
  CsvBirthdaySort,
  CsvCustomerRankSort,
  CsvCustomerSort,
  CsvLostOrderSort,
  CsvMaintenanceSort,
  CsvNonOrderSort,
  CsvOrderSort,
  CsvProjectSort,
  CsvSupportHistorySort,
  CsvWeddingSort,
} from '../../type/csv/csv-sort.type';

export class ExportCsvSortCollection {
  static customer = (): CsvCustomerSort => ({});

  static wedding = (): CsvWeddingSort => ({});

  static birthday = (): CsvBirthdaySort => ({});

  static project = (): CsvProjectSort => ({});

  static maintenance = (): CsvMaintenanceSort => ({});

  static lostOrder = (): CsvLostOrderSort => ({});

  static nonOrder = (): CsvNonOrderSort => ({});

  static order = (): CsvOrderSort => ({});

  static supportHistory = (): CsvSupportHistorySort => ({});

  static customerRank = (): CsvCustomerRankSort => ({});
}
