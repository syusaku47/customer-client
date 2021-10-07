import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { CsvSupportHistoryType } from '../../../../type/csv/csv.type';

/* Param */
export type ApiCsvSupportHistoryGetListParam = Partial<{
  /* 案件営業担当（店舗） */
  sales_shop: number,
  /* 案件営業担当（担当者） */
  sales_contact: number,
  /* 対応日付（開始） */
  supported_date_start: string,
  /* 対応日付（終了） */
  supported_date_end: string,
  /* カテゴリ */
  category: number,
  /* 結果 */
  result: number,
  /* オフセット */
  offset: number,
  /* 1ページ内の件数 */
  limit: number,
  /* 並替基準列 */
  sort_by: number,
  /* 並替方法 */
  highlow: number,
}>;

export type ApiCsvSupportHistoryDownloadParam = any;

/* Response */
export type ApiCsvSupportHistoryGetListResponse = CsvSupportHistoryType;

export const ActionCreator = actionCreatorFactory('csv/api/support/history');

export const apiCsvSupportHistory = {
  getList: ActionCreator<ApiCsvSupportHistoryGetListParam>('get/list'),
  download: ActionCreator<ApiCsvSupportHistoryDownloadParam>('download'),
};

export class ApiCsvSupportHistoryGetList extends ApiBase<
  ApiCsvSupportHistoryGetListResponse
> {
  constructor(param: ApiCsvSupportHistoryGetListParam) {
    super({
      httpMethod: 'GET',
      param,
      url: '/api/csv/supportedhistory',
    });
  }
}

export class ApiCsvSupportHistoryDownload extends ApiBase {
  constructor(param: ApiCsvSupportHistoryDownloadParam) {
    super({
      httpMethod: 'GET',
      contents: 'BLOB',
      param,
      url: '/api/csv/supportedhistory/download',
    });
  }
}
