import actionCreatorFactory from 'typescript-fsa';
import { Estimate, EstimateListType, EstimateSortState } from '../../type/estimate/estimate.type';
import { apiEstimate } from './api/estimate/api-estiamte';
import { apiEstimateMeisai } from './api/meisai/api-estimate-meisai';
import { EstimateMeisai, EstimateMeisaiListType, EstimateMeisaiSideMenu } from '../../type/estimate/estimate-meisai.type';
import { apiEstimateId } from './api/id/api-estiamte-id';
import { ApiEstimatePrintParam } from './api/print/api-estimate-print';

const ActionCreator = actionCreatorFactory('estimate');

export const EstimateActions = {
  api: {
    estimate: apiEstimate,
    meisai: apiEstimateMeisai,
    id: apiEstimateId,
    print: ActionCreator<ApiEstimatePrintParam>('print/api'),
  },
  setEstimate: ActionCreator<Estimate | null>('set/estimate'),
  setMeisaiSideMenu: ActionCreator<EstimateMeisaiSideMenu | null>('set/meisai/side/menu'),
  setList: ActionCreator<EstimateListType[]>('set/list'),
  setMeisai: ActionCreator<EstimateMeisai | null>('set/meisai'),
  setMeisaiList: ActionCreator<EstimateMeisaiListType[]>('set/meisai/list'),
  setSort: ActionCreator<EstimateSortState |null>('set/sort'),
  setEstimateSearchSort: ActionCreator<EstimateSortState |null>('set/estimate/search/sort'),
  resetState: ActionCreator('reset/state'),
};
