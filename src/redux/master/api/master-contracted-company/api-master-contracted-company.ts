import actionCreatorFactory from 'typescript-fsa';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { CallbackRequest, RequestBaseParam } from '../../../../type/api.type';
import { MasterContractedCompany } from '../../../../type/master/master-contracted-company.type';
import {
  ApiMasterContractedCompanyPostParam,
  ApiMasterContractedCompanyGetListParam,
  ApiMasterContractedCompanyGetListResponse,
} from './api-master-contracted-company.type';

export const ActionCreator = actionCreatorFactory('master/api/contracted-company');

export const apiMasterContractedCompany = {
  get: ActionCreator<CallbackRequest<{ id: number; }, MasterContractedCompany>>('get'),
  post: ActionCreator<CallbackRequest<ApiMasterContractedCompanyPostParam>>('post'),
  getList: ActionCreator<ApiMasterContractedCompanyGetListParam>('get/list'),
};

export class ApiMasterContractedCompany<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    const { id } = param;
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/master/contract/contractcompany${id ? `/${id}` : ''}`,

    });
  }
}

export class ApiMasterContractedCompanyGet
  extends ApiMasterContractedCompany<MasterContractedCompany> {
  constructor(param: {id: number}) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      id,
    });
  }
}

export class ApiMasterContractedCompanyPost extends ApiMasterContractedCompany {
  constructor(param: ApiMasterContractedCompanyPostParam) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiMasterContractedCompanyGetList
  extends ApiMasterContractedCompany<ApiMasterContractedCompanyGetListResponse> {
  constructor(param: ApiMasterContractedCompanyGetListParam) {
    super({
      httpMethod: 'GET',
      param,
    });
  }
}
