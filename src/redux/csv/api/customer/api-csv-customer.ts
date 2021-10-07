import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { CsvCustomerListType } from '../../../../type/csv/csv.type';

/* Param */
export type ApiCsvCustomerGetListParam = Partial<{
  /* 営業担当（店舗） */
  sales_shop: number,
  /* 営業担当（担当者） */
  sales_contact: number,
  /* 顧客名 */
  name: string,
  /* 顧客電話番号 */
  tel_no: string,
  /* エリア */
  area: number,
  /* 顧客ランク */
  rank: number,
  /* 顧客ランクフィルタ */
  rank_filter: number,
  /* 顧客見込みランク */
  estimated_rank: number,
  /* 顧客見込みランクフィルタ */
  estimated_rank_filter: number,
  /* 顧客分類 */
  customer_classification: number,
  /* 工事状況 */
  construction_status: number[],
  /* 顧客名フリガナ */
  furigana: string,
  /* メールアドレス */
  mail_address: string,
  /* 郵便番号 */
  post_no: string,
  /* 都道府県 */
  prefecture: number,
  /* 顧客住所 */
  address: string,
  /* 建物分類 */
  building_category: number,
  /* 間取り */
  madori: number,
  /* 築年数 */
  building_age: number,
  /* 築年数フィルタ */
  building_age_filter: number,
  /* 最終完工時期（開始年） */
  last_completion_start_year: string,
  /* 最終完工時期（開始月） */
  last_completion_start_month: string,
  /* 最終完工時期（終了年） */
  last_completion_end_year: string,
  /* 最終完工時期（終了月） */
  last_completion_end_month: string,
  /* 総工事金額（最小値） */
  total_work_price_min: string,
  /* 総工事金額（最大値） */
  total_work_price_max: string,
  /* 工事回数（最小値） */
  work_times_min: number,
  /* 工事回数（最大値） */
  work_times_max: number,
  /* 関連タグ */
  tags: number[],
  /* 部位 */
  parts: number[],
  /* 不備情報のみ */
  is_deficiency: number,
  /* 備考 */
  remarks: string,
  /* オフセット */
  offset: number,
  /* 1ページ内の件数 */
  limit: number,
  /* 並替基準列 */
  sort_by: number,
  /* 並替方法 */
  highlow: number,
}>;

export type ApiCsvCustomerDownloadParam = any;

/* Response */
export type ApiCsvCustomerGetListResponse = CsvCustomerListType;

export const ActionCreator = actionCreatorFactory('csv/api/customer');

export const apiCsvCustomer = {
  getList: ActionCreator<ApiCsvCustomerGetListParam>('get/list'),
  download: ActionCreator<ApiCsvCustomerDownloadParam>('download'),
};

export class ApiCsvCustomerGetList extends ApiBase<ApiCsvCustomerGetListResponse> {
  constructor(param: ApiCsvCustomerGetListParam) {
    super({
      httpMethod: 'GET',
      param,
      url: '/api/csv/customer',
    });
  }
}

export class ApiCsvCustomerDownload extends ApiBase {
  constructor(param: ApiCsvCustomerDownloadParam) {
    super({
      httpMethod: 'GET',
      contents: 'BLOB',
      param,
      url: '/api/csv/customer/download',
    });
  }
}
