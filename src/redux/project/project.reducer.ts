import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as lodash from 'lodash';
import { ProjectActions } from './project.action';
import { Project, ProjectListType, ProjectSortState } from '../../type/project/project.type';
import { ProjectCollection } from '../../collection/project/project.collection';

export type ProjectState = {
  project: Project | null;
  list: ProjectListType[];
  listHitCount: number;
  sort: ProjectSortState ;
  detailSort: ProjectSortState ;
};

const initialState: ProjectState = {
  project: null,
  list: [],
  listHitCount: 0,
  sort: ProjectCollection.initialSortState(),
  detailSort: ProjectCollection.initialSortState(),
};

export const ProjectReducer = reducerWithInitialState<ProjectState>(initialState)
  .case(ProjectActions.setProject, (state, payload) => ({
    ...state,
    project: lodash.cloneDeep(payload),
  }))
  .case(ProjectActions.setList, (state, payload) => ({
    ...state,
    list: lodash.cloneDeep(payload),
  }))
  .case(ProjectActions.setListCount, (state, payload) => ({
    ...state,
    listHitCount: lodash.cloneDeep(payload),
  }))
  .case(ProjectActions.setSort, (state, payload) => ({
    ...state,
    sort: payload ? lodash.cloneDeep({
      ...state.sort,
      ...payload,
    }) : ProjectCollection.initialSortState(),
  }))
  .case(ProjectActions.setDetailSort, (state, payload) => ({
    ...state,
    detailSort: payload ? lodash.cloneDeep(payload) : ProjectCollection.initialSortState(),
  }))
  .case(ProjectActions.resetState, () => initialState)
  .default((state) => state);
