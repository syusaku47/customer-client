import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { CsvMaintenanceType } from '../../../../type/csv/csv.type';

/* Param */
export type ApiCsvMaintenanceGetListParam = Partial<{
  /* メンテナンス日（開始） */
  maintenance_date_start: string,
  /* メンテナンス日（終了） */
  maintenance_date_end: string,
  /* 案件営業担当店舗 */
  sales_shop: number,
  /* 案件営業担当担当者 */
  sales_contact: number,
  /* 完工日（開始） */
  completion_start_date: string,
  /* 完工日（終了） */
  completion_end_date: string,
  /* 案件名 */
  project_name: string,
  /* 無効情報も含む */
  has_muko: number,
  /* 対応区分 */
  supported_kubun: number,
  /* 文字列検索 */
  word: string,
  /* オフセット */
  offset: number,
  /* 1ページ内の件数 */
  limit: number,
  /* 並替基準列 */
  sort_by: number,
  /* 並替方法 */
  highlow: number,
}>;

export type ApiCsvMaintenanceDownloadParam = any;

/* Response */
export type ApiCsvMaintenanceGetListResponse = CsvMaintenanceType;

export const ActionCreator = actionCreatorFactory('csv/api/maintenance');

export const apiCsvMaintenance = {
  getList: ActionCreator<ApiCsvMaintenanceGetListParam>('get/list'),
  download: ActionCreator<ApiCsvMaintenanceDownloadParam>('download'),
};

export class ApiCsvMaintenanceGetList extends ApiBase<
  ApiCsvMaintenanceGetListResponse
> {
  constructor(param: ApiCsvMaintenanceGetListParam) {
    super({
      httpMethod: 'GET',
      param,
      url: '/api/csv/maintenance',
    });
  }
}

export class ApiCsvMaintenanceDownload extends ApiBase {
  constructor(param: ApiCsvMaintenanceDownloadParam) {
    super({
      httpMethod: 'GET',
      contents: 'BLOB',
      param,
      url: '/api/csv/maintenance/download',
    });
  }
}
