import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { CallbackRequest, RequestBaseParam } from '../../../../type/api.type';
import { urlFormat } from '../../../../utilities/url-format';
import { ApiEstimate } from '../../../root.type';
import { UrlParam, ApiEstimateMeisaiPrintNamePostParam, ApiEstimateMeisaiPostListParam } from './api-estimate-meisai.type';

export const ActionCreator = actionCreatorFactory('estiamte/meisai/api/');

export const apiEstimateMeisai = {
  get: ActionCreator<{
    param: ApiEstimate.Meisai.Param.Get;
    callback?:(data: ApiEstimate.Meisai.Response.Get) => void;
      }>('get'),
  post: ActionCreator<CallbackRequest<ApiEstimate.Meisai.Param.Post>>('post'),
  delete: ActionCreator<CallbackRequest<ApiEstimate.Meisai.Param.Delete[]>>('delete'),
  getList: ActionCreator<{
    noLoad?: boolean;
    param: ApiEstimate.Meisai.Param.List,
    callback?:(data:ApiEstimate.Meisai.Response.List[]) => void;
      }>('get/list'),
  getSideMenuList: ActionCreator<CallbackRequest<
    ApiEstimate.Meisai.Param.SideMenuList
  >>('get/side/menu/list'),
  printName: ActionCreator<CallbackRequest<ApiEstimateMeisaiPrintNamePostParam>>('print/name'),
  postList: ActionCreator<CallbackRequest<ApiEstimateMeisaiPostListParam> & {noLoad?:boolean}>('post/list'),
};

class ApiEstimateMeisaiBase<T = any> extends ApiBase<T> {
  constructor(
    param: RequestBaseParam & Partial<UrlParam> &{url?:string},
  ) {
    const {
      id, meisai_id, url,
    } = param;

    super({
      ...RequestBaseCollection(),
      ...param,
      url: url || `/api/quote/${id}/detail${urlFormat(meisai_id)}`,

    });
  }
}

export class ApiEstimateMeisaiGet extends ApiEstimateMeisaiBase<
  ApiEstimate.Meisai.Response.Get
> {
  constructor(param: ApiEstimate.Meisai.Param.Get) {
    const {
      id, meisai_id,
    } = param;
    super({
      httpMethod: 'GET',
      id,
      meisai_id,
    });
  }
}

export class ApiEstimateMeisaiPost extends ApiEstimateMeisaiBase {
  constructor(param: ApiEstimate.Meisai.Param.Post) {
    const {
      data, estimate_id, meisai_id,
    } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id: estimate_id,
      meisai_id,
    });
  }
}

export class ApiEstimateMeisaiDelete extends ApiEstimateMeisaiBase {
  constructor(param: ApiEstimate.Meisai.Param.Delete) {
    const {
      id, meisai_id,
    } = param;
    super({
      httpMethod: 'DELETE',
      id,
      meisai_id,
    });
  }
}

export class ApiEstimateMeisaiGetList extends ApiEstimateMeisaiBase<
  ApiEstimate.Meisai.Response.List
> {
  constructor(param: ApiEstimate.Meisai.Param.List) {
    const { id, data } = param;
    super({
      httpMethod: 'GET',
      id,
      param: data,
    });
  }
}

export class ApiEstimateMeisaiSideMenuGetList extends ApiEstimateMeisaiBase<
  ApiEstimate.Meisai.Response.SideMenuList
> {
  constructor(param: ApiEstimate.Meisai.Param.SideMenuList) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      // param,
      id,
      url: `/api/quote/${id}/detailtree`,
    });
    // this.dummyData = EstimateMeisaiSideMenuDummy();
  }
}
export class ApiEstimateMeisaiPrintNamePost extends ApiBase<
  ApiEstimate.Meisai.Response.SideMenuList
> {
  constructor(param: ApiEstimate.Meisai.Param.PrintName) {
    const { id, data, meisai_id } = param;
    super({
      httpMethod: 'POST',
      url: `/api/quote/${id}/detail/${meisai_id}/updname`,
      param: data,

    });
  }
}
export class ApiEstimateMeisaiPrintNameTreePost extends ApiBase<
  ApiEstimate.Meisai.Response.SideMenuList
> {
  constructor(param: ApiEstimate.Meisai.Param.PrintName) {
    const { id, data, meisai_id } = param;
    super({
      httpMethod: 'POST',
      url: `/api/quote/${id}/detail/${meisai_id}/updname`,
      param: data,

    });
  }
}
export class ApiEstimateMeisaiPostList extends ApiBase {
  constructor(param: ApiEstimateMeisaiPostListParam) {
    const {
      id, detail_id, from_quote_id, to_quote_id,
    } = param;
    super({
      httpMethod: 'POST',
      url: `/api/quote/${id}/listdetail`,
      param: {
        detail_id,
        from_quote_id,
        to_quote_id,
      },

    });
  }
}
