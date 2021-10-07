import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { CallbackRequest, RequestBaseParam } from '../../../../type/api.type';
import { MasterInquiry } from '../../../../type/master/master-inquiry.type';
import {
  ApiMasterInquiryPostParam,
  ApiMasterInquiryGetListParam,
  ApiMasterInquiryGetListResponse,
} from './api-master-inquiry.type';

export const ActionCreator = actionCreatorFactory('master/api/inquiry');

export const apiMasterInquiry = {
  get: ActionCreator<CallbackRequest<{id:number}, MasterInquiry>>('get'),
  post: ActionCreator<CallbackRequest<ApiMasterInquiryPostParam>>('post'),
  getList: ActionCreator<ApiMasterInquiryGetListParam>('get/list'),
};

export class ApiMasterInquiry<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/kubun/inquiry${id ? `/${id}` : ''}`,

    });
  }
}

export class ApiMasterInquiryGet extends ApiMasterInquiry<MasterInquiry> {
  constructor(param: {id: number}) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      id,
    });
  }
}

export class ApiMasterInquiryPost extends ApiMasterInquiry {
  constructor(param: ApiMasterInquiryPostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterInquiryGetList extends ApiMasterInquiry<ApiMasterInquiryGetListResponse> {
  constructor(param: ApiMasterInquiryGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
