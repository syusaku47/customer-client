import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { CsvProjectListType } from '../../../../type/csv/csv.type';

/* Param */
export type ApiCsvProjectGetListParam = Partial<{
  /* 営業担当（店舗） */
  sales_shop :number,
  /* 営業担当（担当者） */
  sales_contact :number,
  /* 契約日（開始） */
  contract_start_date :string,
  /* 契約日（終了） */
  contract_end_date :string,
  /* 完工日（開始） */
  completion_start_date :string,
  /* 完工日（終了） */
  completion_end_date :string,
  /* 顧客名 */
  customer_name :string,
  /* 案件名 */
  project_name :string,
  /* 現場名称 */
  field_name :string,
  /* 現場電話番号 */
  field_tel_no: string,
  /* 工事状況 */
  construction_status: number[],
  /* オフセット */
  offset :number,
  /* 1ページ内の件数 */
  limit :number,
  /* 並替基準列 */
  sort_by :number,
  /* 並替方法 */
  highlow:number,
}>;

export type ApiCsvProjectDownloadParam = any;

/* Response */
export type ApiCsvProjectGetListResponse = CsvProjectListType;

export const ActionCreator = actionCreatorFactory('csv/api/project');

export const apiCsvProject = {
  getList: ActionCreator<ApiCsvProjectGetListParam>('get/list'),
  download: ActionCreator<ApiCsvProjectDownloadParam>('download'),
};

export class ApiCsvProjectGetList extends ApiBase<
  ApiCsvProjectGetListResponse
> {
  constructor(param: ApiCsvProjectGetListParam) {
    super({
      httpMethod: 'GET',
      param,
      url: '/api/csv/project',
    });
  }
}

export class ApiCsvProjectDownload extends ApiBase {
  constructor(param: ApiCsvProjectDownloadParam) {
    super({
      httpMethod: 'GET',
      contents: 'BLOB',
      param,
      url: '/api/csv/project/download',
    });
  }
}
