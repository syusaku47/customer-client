import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { CsvNotOrderType } from '../../../../type/csv/csv.type';

/* Param */
export type ApiCsvNonOrderGetListParam = Partial<{
  /* 【簡易検索用】 */
  /* 最終見積作成日（開始） */
  last_quote_start_date: string,
  /* 最終見積作成日（終了） */
  last_quote_end_date: string,
  /* 最終見積金額（最小値） */
  last_quote_price_min: number,
  /* 最終見積金額（最大値） */
  last_quote_price_max: number,
  /* 粗利 */
  gross_profit_rate: string,
  /* 粗利フィルタ */
  gross_profit_rate_filter: number,
  /* 部位 */
  parts: number[],

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

export type ApiCsvNonOrderDownloadParam = any;

/* Response */
export type ApiCsvNonOrderGetListResponse = CsvNotOrderType;

export const ActionCreator = actionCreatorFactory('csv/api/non/order');

export const apiCsvNonOrder = {
  getList: ActionCreator<ApiCsvNonOrderGetListParam>('get/list'),
  download: ActionCreator<ApiCsvNonOrderDownloadParam>('download'),
};

export class ApiCsvNonOrderGetList extends ApiBase<
  ApiCsvNonOrderGetListResponse
> {
  constructor(param: ApiCsvNonOrderGetListParam) {
    super({
      httpMethod: 'GET',
      param,
      url: '/api/csv/nonorder',
    });
  }
}

export class ApiCsvNonOrderDownload extends ApiBase {
  constructor(param: ApiCsvNonOrderDownloadParam) {
    super({
      httpMethod: 'GET',
      contents: 'BLOB',
      param,
      url: '/api/csv/nonorder/download',
    });
  }
}
