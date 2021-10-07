import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { CsvLostOrderType } from '../../../../type/csv/csv.type';

/* Param */
export type ApiCsvLostOrderGetListParam = Partial<{
  /* 【簡易検索用】 */
  /* 見込みランク */
  project_rank: number,
  /* 見込みランクフィルタ */
  project_rank_filter: number,
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
  /* 失注日（開始） */
  failure_start_date: string,
  /* 失注日（終了） */
  failure_end_date: string,
  /* 失注理由 */
  failure_cause: number,
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

export type ApiCsvLostOrderDownloadParam = any;

/* Response */
export type ApiCsvLostOrderGetListResponse = CsvLostOrderType;

export const ActionCreator = actionCreatorFactory('csv/api/lost/order');

export const apiCsvLostOrder = {
  getList: ActionCreator<ApiCsvLostOrderGetListParam>('get/list'),
  download: ActionCreator<ApiCsvLostOrderDownloadParam>('download'),
};

export class ApiCsvLostOrderGetList extends ApiBase<
  ApiCsvLostOrderGetListResponse
> {
  constructor(param: ApiCsvLostOrderGetListParam) {
    super({
      httpMethod: 'GET',
      param,
      url: '/api/csv/lostorder',
    });
  }
}

export class ApiCsvLostOrderDownload extends ApiBase {
  constructor(param: ApiCsvLostOrderDownloadParam) {
    super({
      httpMethod: 'GET',
      contents: 'BLOB',
      param,
      url: '/api/csv/lostorder/download',
    });
  }
}
