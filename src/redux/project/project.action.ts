import actionCreatorFactory from 'typescript-fsa';
import { Project, ProjectListType, ProjectSortState } from '../../type/project/project.type';
import { apiProjectId } from './api/id/api-project-id';
import { apiProject } from './api/project/api-project';

const ActionCreator = actionCreatorFactory('project');

export const ProjectActions = {
  api: {
    project: apiProject,
    id: apiProjectId,
  },
  setProject: ActionCreator<Project | null>('set/project'),
  setList: ActionCreator<ProjectListType[]>('set/list'),
  setListCount: ActionCreator<number>('set/list/count'),
  setSort: ActionCreator<ProjectSortState |null>('set/sort'),
  setDetailSort: ActionCreator<ProjectSortState |null>('set/detail/sort'),
  resetState: ActionCreator('reset/state'),
};
