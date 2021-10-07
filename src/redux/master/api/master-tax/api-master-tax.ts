import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { CallbackRequest, RequestBaseParam } from '../../../../type/api.type';
import { MasterTax } from '../../../../type/master/master-tax.type';
import {
  ApiMasterTaxPostParam,
  ApiMasterTaxGetListParam,
  ApiMasterTaxGetListResponse,
} from './api-master-tax.type';

export const ActionCreator = actionCreatorFactory('master/api/consumption-tax');

export const apiMasterTax = {
  get: ActionCreator<CallbackRequest<{id:number}, MasterTax>>('get'),
  post: ActionCreator<CallbackRequest<ApiMasterTaxPostParam>>('post'),
  getList: ActionCreator<ApiMasterTaxGetListParam>('get/list'),
};

export class ApiMasterTax<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/company/tax${id ? `/${id}` : ''}`,

    });
  }
}

export class ApiMasterTaxGet extends ApiMasterTax<MasterTax> {
  constructor(param: {id: number}) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      id,
    });
  }
}

export class ApiMasterTaxPost extends ApiMasterTax {
  constructor(param: ApiMasterTaxPostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterTaxGetList
  extends ApiMasterTax<ApiMasterTaxGetListResponse> {
  constructor(param: ApiMasterTaxGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}

export const GetTax = async (quoteDate: Date | string) => {
  const date = typeof quoteDate === 'string' ? new Date(quoteDate) : quoteDate;
  // FIXME : レスポンスの型が実レスポンスと合わなかったため any キャストを仕様
  const response = await new ApiMasterTaxGetList({}).run() as any;
  const taxList = response.body.data
    .filter((v: any) => v.valid_flag)
    .sort((a: any, b: any) => {
      const dateA = new Date(a.start_date);
      const dateB = new Date(b.start_date);
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return 0;
    }) as any[];
  const tax = date ? (
    [...taxList].reverse().find((v) => {
      const startDate = new Date(v.start_date);
      const [y, m, d] = [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
      ];
      const transformedQuoteDate = new Date(`${y}/${m}/${d}`);
      return !(transformedQuoteDate < startDate);
    })
  ) : (
    taxList[taxList.length - 1]
  );
  console.log('tax', tax ? tax.tax_rate : taxList[0].tax_rate);
  return tax ? tax.tax_rate : taxList[0].tax_rate;
};
