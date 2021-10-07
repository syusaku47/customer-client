import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { CsvWeddingAnniversaryListType } from '../../../../type/csv/csv.type';

/* Param */
export type ApiCsvWeddingGetListParam = Partial<{
  /* 営業担当（店舗） */
  sales_shop: number,
  /* 営業担当（担当者） */
  sales_contact: number,
  /* 顧客名 */
  name: string,
  /* 結婚記念日（開始年） */
  wedding_anniversary_start_year: string,
  /* 結婚記念日（開始月） */
  wedding_anniversary_start_month: number,
  /* 結婚記念日（終了年） */
  wedding_anniversary_end_year: string,
  /* 結婚記念日（終了月） */
  wedding_anniversary_end_month: number,
  /* オフセット */
  offset: number,
  /* 1ページ内の件数 */
  limit: number,
  /* 並替基準列 */
  sort_by: number,
  /* 並替方法 */
  highlow: number,
}>;

export type ApiCsvWeddingDownloadParam = any;

/* Response */
export type ApiCsvWeddingGetListResponse = CsvWeddingAnniversaryListType;

export const ActionCreator = actionCreatorFactory('csv/api/wedding');

export const apiCsvWedding = {
  getList: ActionCreator<ApiCsvWeddingGetListParam>('get/list'),
  download: ActionCreator<ApiCsvWeddingDownloadParam>('download'),
};

export class ApiCsvWeddingGetList extends ApiBase<
  ApiCsvWeddingGetListResponse
> {
  constructor(param: ApiCsvWeddingGetListParam) {
    super({
      httpMethod: 'GET',
      param,
      url: '/api/csv/weddinganniversary',
    });
  }
}

export class ApiCsvWeddingDownload extends ApiBase {
  constructor(param: ApiCsvWeddingDownloadParam) {
    super({
      httpMethod: 'GET',
      contents: 'BLOB',
      param,
      url: '/api/csv/weddinganniversary/download',
    });
  }
}
