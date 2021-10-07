import actionCreatorFactory from 'typescript-fsa';
// import { ProjectListDummy } from '../../../../collection/dummy/project/project-list.dummy';
// import { ProjectDummy } from '../../../../collection/dummy/project/project.dummy';
import { ApiBase } from '../../../../service/api-base';
import { RequestBaseCollection } from '../../../../service/api.collection';
import { RequestBaseParam, CallbackRequest } from '../../../../type/api.type';
import { ProjectListType } from '../../../../type/project/project.type';
import { ApiProject } from '../../../root.type';

export const ActionCreator = actionCreatorFactory('project/api/');

export const apiProject = {
  get: ActionCreator<{
    noLoad?: boolean;
    param: ApiProject.Param.Get;
    callback?:(data:ApiProject.Response.Get)=>void;
      }>('get'),
  post: ActionCreator<CallbackRequest<ApiProject.Param.Post>>('post'),
  getList: ActionCreator<ApiProject.Param.List>('get/list'),
  getCallbackList: ActionCreator<{
    noLoad?:boolean,
    param: ApiProject.Param.List,
    onSuccess:(data:ProjectListType[], hitCount:number) => void;
      }>('get/callback/list'),
};

class ApiProjectBase<T = any> extends ApiBase<T> {
  constructor(param: RequestBaseParam & {id?: number}) {
    super({
      ...RequestBaseCollection(),
      ...param,
      url: `/api/project${param.id ? `/${param.id}` : ''}`,

    });
  }
}

export class ApiProjectGet extends ApiProjectBase<ApiProject.Response.Get> {
  constructor(param: ApiProject.Param.Get) {
    const { id } = param;
    super({
      httpMethod: 'GET',
      id,
    });
    // this.dummyData = ProjectDummy;
  }
}

export class ApiProjectPost extends ApiProjectBase {
  constructor(param: ApiProject.Param.Post) {
    const { data, id } = param;
    super({
      httpMethod: 'POST',
      param: data,
      id,
    });
  }
}

export class ApiProjectGetList extends ApiProjectBase<ApiProject.Response.List> {
  constructor(param: ApiProject.Param.List) {
    super({
      httpMethod: 'GET',
      param,
    });
    // this.dummyData = ProjectListDummy;
  }
}
