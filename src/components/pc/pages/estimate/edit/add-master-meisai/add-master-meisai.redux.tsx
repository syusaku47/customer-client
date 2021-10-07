import actionCreatorFactory from 'typescript-fsa';
import { EstimateMeisaiSideMenu } from '../../../../../../type/estimate/estimate-meisai.type';
import { EstimateListType, EstimateSortState } from '../../../../../../type/estimate/estimate.type';

const ActionCreator = actionCreatorFactory('estimate/master/add');

export const EstimateMasterAddActions = {
  api: {
  },
  getTreeList: ActionCreator<EstimateMeisaiSideMenu | null>('set/meisai/side/menu'),
  setList: ActionCreator<EstimateListType[]>('set/list'),
  setSort: ActionCreator<EstimateSortState |null>('set/sort'),
};
