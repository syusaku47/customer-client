import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { CsvOrderListType } from '../../../../type/csv/csv.type';

/* Param */
export type ApiCsvOrderGetListParam = Partial<{
  /* 【簡易検索用】 */
  /* 完工日（開始年） */
  completion_start_year: number,
  /* 完工日（開始月） */
  completion_start_month: number,
  /* 完工日（終了年） */
  completion_end_year: number,
  /* 完工日（終了月） */
  completion_end_month: number,
  /* 受注金額（最小値） */
  order_price_min: number,
  /* 受注金額（最大値） */
  order_price_max: number,
  /* 粗利 */
  gross_profit_rate: string,
  /* 粗利フィルタ */
  gross_profit_rate_filter: number,
  /* 部位 */
  parts: number[],
  /* 入金 */
  payment: number,

  /* 【詳細検索用】 */
  /* 営業担当（店舗） */
  sales_shop: number,
  /* 営業担当（担当者） */
  sales_contact: number,
  /* 顧客名 */
  customer_name: string,
  /* 案件名 */
  project_name: string,
  /* 現場名称 */
  field_name: string,
  /* 現場電話番号 */
  field_tel_no: string,

  /* 【共通項目】 */
  /* オフセット */
  offset: number,
  /* 1ページ内の件数 */
  limit: number,
  /* 並替基準列 */
  sort_by: number,
  /* 並替方法 */
  highlow: number,
}>;

export type ApiCsvOrderDownloadParam = any;

/* Response */
export type ApiCsvOrderGetListResponse = CsvOrderListType;

export const ActionCreator = actionCreatorFactory('csv/api/order');

export const apiCsvOrder = {
  getList: ActionCreator<ApiCsvOrderGetListParam>('get/list'),
  download: ActionCreator<ApiCsvOrderDownloadParam>('download'),
};

export class ApiCsvOrderGetList extends ApiBase<ApiCsvOrderGetListResponse> {
  constructor(param: ApiCsvOrderGetListParam) {
    super({
      httpMethod: 'GET',
      param,
      url: '/api/csv/order',
    });
  }
}

export class ApiCsvOrderDownload extends ApiBase {
  constructor(param: ApiCsvOrderDownloadParam) {
    super({
      httpMethod: 'GET',
      contents: 'BLOB',
      param,
      url: '/api/csv/order/download',
    });
  }
}
