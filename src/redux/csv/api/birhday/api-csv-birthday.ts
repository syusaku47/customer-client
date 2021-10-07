import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { CsvBirthdayListType } from '../../../../type/csv/csv.type';

/* Param */
export type ApiCsvBirthdayGetListParam = Partial<{
  /* 営業担当（店舗） */
  sales_shop: number,
  /* 営業担当（担当者） */
  sales_contact: number,
  /* 顧客登録名 */
  name: string,
  /* 家族お名前 */
  family_name: string,
  /* 続柄 */
  relationship: string,
  /* 携帯番号 */
  mobile_phone: string,
  /* 生年月（開始） */
  birth_month_start: string,
  /* 生年日（開始） */
  birth_day_start: string,
  /* 生年月（終了） */
  birth_month_end: string,
  /* 生年日（終了） */
  birth_day_end: string,
  /* オフセット */
  offset: number,
  /* 1ページ内の件数 */
  limit: number,
  /* 並替基準列 */
  sort_by: number,
  /* 並替方法 */
  highlow: number,
}>;

export type ApiCsvBirthdayDownloadParam = any;

/* Response */
export type ApiCsvBirthdayGetListResponse = CsvBirthdayListType;

export const ActionCreator = actionCreatorFactory('csv/api/birthday');

export const apiCsvBirthday = {
  getList: ActionCreator<ApiCsvBirthdayGetListParam>('get/list'),
  download: ActionCreator<ApiCsvBirthdayDownloadParam>('download'),
};

export class ApiCsvBirthdayGetList extends ApiBase<
  ApiCsvBirthdayGetListResponse
> {
  constructor(param: ApiCsvBirthdayGetListParam) {
    super({
      httpMethod: 'GET',
      param,
      url: '/api/csv/birthday',
    });
  }
}

export class ApiCsvBirthdayDownload extends ApiBase {
  constructor(param: ApiCsvBirthdayDownloadParam) {
    super({
      httpMethod: 'GET',
      contents: 'BLOB',
      param,
      url: '/api/csv/birthday/download',
    });
  }
}
