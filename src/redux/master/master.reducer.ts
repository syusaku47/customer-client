import lodash from 'lodash';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { MasterSupportHistory } from '../../type/master/master-support-history.type';
import { MasterArea } from '../../type/master/master-area.type';
import { MasterBuildingCategory } from '../../type/master/master-building-category.type';
import { MasterTax } from '../../type/master/master-tax.type';
import { MasterContractedCompany } from '../../type/master/master-contracted-company.type';
import { MasterMeisai } from '../../type/master/master-meisai.type';
import { MasterEmployee } from '../../type/master/master-employee.type';
import { MasterInquiry } from '../../type/master/master-inquiry.type';
import { MasterLargeCategory } from '../../type/master/master-large-category.type';
import { MasterMiddleCategory } from '../../type/master/master-middle-category.type';
import { MasterMyCarType } from '../../type/master/master-my-car-type.type';
import { MasterOrigin } from '../../type/master/master-origin.type';
import { MasterRelevantTag } from '../../type/master/master-relevant-tag.type';
import { MasterSignature } from '../../type/master/master-signature.type';
import { MasterStore } from '../../type/master/master-store.type';
import { MasterUnit } from '../../type/master/master-unit.type';
import { MasterActions } from './master.action';
import { MasterMadori } from '../../type/master/master-madori.type';
import { MasterAfterMaintenance } from '../../type/master/master-after-maintenance.type';
import { MasterQuoteFixed } from '../../type/master/master-estimate.type';
import { MasterPart } from '../../type/master/master-part-tag.type';

export type MasterState = {
  /** 店舗 */
  storeList: MasterStore[];
  /** 社員 */
  employeeList: MasterEmployee[];
  /** 消費税 */
  taxList: MasterTax[];
  /** 大分類 */
  largeCategoryList: MasterLargeCategory[];
  /** 中分類 */
  middleCategoryList: MasterMiddleCategory[];
  /** 明細 */
  meisaiList: MasterMeisai[];
  /** 単位 */
  unitList: MasterUnit[];
  /** 発生源 */
  originList: MasterOrigin[];
  /** 建物分類 */
  buildingCategoryList: MasterBuildingCategory[];
  /** エリア */
  areaList: MasterArea[];
  /** 間取り */
  madoriList: MasterMadori[];
  /** 問合せ */
  inquiryList: MasterInquiry[];
  /** 対応履歴 */
  supportHistoryList: MasterSupportHistory[];
  /** アフターメンテナンス */
  afterMaintenanceList: MasterAfterMaintenance[];
  /** 署名 */
  signatureList: MasterSignature[];
  /** 見積定型 */
  quoteFixedList: MasterQuoteFixed[];
  /** 関連タグ */
  relevantTagList: MasterRelevantTag[];
  /** マイカー種別 */
  myCarTypeList: MasterMyCarType[];
  /** 契約会社 */
  contractedCompanyList: MasterContractedCompany[];
  /** @deprecated 見込みランク */
  prospectPartList: any[];
  /** 部位 */
  partList: MasterPart[];
  /** @deprecated 建設部位 */
  constructionPartList: any[];
  /** 顧客見込みランク */
  customerEstimatedRankList: any[];
  /** 顧客ランク */
  customerRankList: any[];
  /** 案件ランク */
  projectRankList: any[];
  /** 顧客ランク更新 */
  customerRankUpdateList: any[];
  /** 失注理由 */
  lostOrderList: any[];
};

const initialState: MasterState = {
  storeList: [],
  employeeList: [],
  taxList: [],
  largeCategoryList: [],
  middleCategoryList: [],
  meisaiList: [],
  unitList: [],
  originList: [],
  buildingCategoryList: [],
  areaList: [],
  madoriList: [],
  inquiryList: [],
  supportHistoryList: [],
  afterMaintenanceList: [],
  signatureList: [],
  quoteFixedList: [],
  relevantTagList: [],
  myCarTypeList: [],
  contractedCompanyList: [],
  prospectPartList: [],
  partList: [],
  constructionPartList: [],
  customerRankList: [],
  customerRankUpdateList: [],
  customerEstimatedRankList: [],
  projectRankList: [],
  lostOrderList: [],
};

export const MasterReducer = reducerWithInitialState<MasterState>(initialState)
  .case(MasterActions.setStoreList, (state, payload) => ({
    ...state,
    storeList: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.setEmployeeList, (state, payload) => ({
    ...state,
    employeeList: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.setTaxList, (state, payload) => ({
    ...state,
    taxList: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.setLostOrderList, (state, payload) => ({
    ...state,
    lostOrderList: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.setLargeCategoryList, (state, payload) => ({
    ...state,
    largeCategoryList: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.setMiddleCategoryList, (state, payload) => ({
    ...state,
    middleCategoryList: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.setMeisaiList, (state, payload) => ({
    ...state,
    meisaiList: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.setUnitList, (state, payload) => ({
    ...state,
    unitList: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.setOriginList, (state, payload) => ({
    ...state,
    originList: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.setProjectRankList, (state, payload) => ({
    ...state,
    projectRankList: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.setBuildingCategoryList, (state, payload) => ({
    ...state,
    buildingCategoryList: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.setAreaList, (state, payload) => ({
    ...state,
    areaList: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.setMadoriList, (state, payload) => ({
    ...state,
    madoriList: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.setInquiryList, (state, payload) => ({
    ...state,
    inquiryList: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.setCustomerRankList, (state, payload) => ({
    ...state,
    customerRankList: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.setCustomerExpectedRankList, (state, payload) => ({
    ...state,
    customerEstimatedRankList: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.setCustomerRankUpdateList, (state, payload) => ({
    ...state,
    customerRankListUpdate: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.setSupportHistoryList, (state, payload) => ({
    ...state,
    supportHistoryList: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.setAfterMaintenanceList, (state, payload) => ({
    ...state,
    afterMaintenanceList: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.setSignatureList, (state, payload) => ({
    ...state,
    signatureList: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.setQuoteFixedList, (state, payload) => ({
    ...state,
    quoteFixedList: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.setRelevantTagList, (state, payload) => ({
    ...state,
    relevantTagList: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.setMyCarTypeList, (state, payload) => ({
    ...state,
    myCarTypeList: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.setContractedCompanyList, (state, payload) => ({
    ...state,
    contractedCompanyList: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.setConstructionPartList, (state, payload) => ({
    ...state,
    constructionPartList: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.setPartList, (state, payload) => ({
    ...state,
    partList: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.setConstructionPartList, (state, payload) => ({
    ...state,
    constructionPartList: lodash.cloneDeep(payload),
  }))
  .case(MasterActions.resetState, () => initialState)
  .default((state) => state);
