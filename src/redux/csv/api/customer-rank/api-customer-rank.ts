import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { CsvCustomerRankType } from '../../../../type/csv/csv.type';

/* Param */

export type ApiCsvCustomerRankGetListParam = Partial<{
  /* 更新日（開始） */
  updated_start_date: string,
  /* 更新日（終了） */
  updated_end_date: string,
  /* オフセット */
  offset: number,
  /* 1ページ内の件数 */
  limit: number,
  /* 並替基準列 */
  sort_by: number,
  /* 並替方法 */
  highlow: number,
}>;

export type ApiCsvCustomerRankDownloadParam = any;

/* Response */
export type ApiCsvCustomerRankGetListResponse = CsvCustomerRankType;

export const ActionCreator = actionCreatorFactory('csv/api/customer/rank');

export const apiCsvCustomerRank = {
  getList: ActionCreator<ApiCsvCustomerRankGetListParam>('get/list'),
  download: ActionCreator<ApiCsvCustomerRankDownloadParam>('download'),
};

export class ApiCsvCustomerRankGetList extends ApiBase<
  ApiCsvCustomerRankGetListResponse
> {
  constructor(param: ApiCsvCustomerRankGetListParam) {
    super({
      httpMethod: 'GET',
      param,
      url: '/api/csv/custrankupdlog',
    });
  }
}

export class ApiCsvCustomerRankDownload extends ApiBase {
  constructor(param: ApiCsvCustomerRankDownloadParam) {
    super({
      httpMethod: 'GET',
      contents: 'BLOB',
      param,
      url: '/api/csv/custrankupdlog/download',
    });
  }
}
