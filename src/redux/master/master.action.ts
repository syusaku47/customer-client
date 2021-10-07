import actionCreatorFactory from 'typescript-fsa';
import { MasterSupportHistory } from '../../type/master/master-support-history.type';
import { MasterArea } from '../../type/master/master-area.type';
import { MasterBuildingCategory } from '../../type/master/master-building-category.type';
import { MasterTax } from '../../type/master/master-tax.type';
import { MasterContractedCompany } from '../../type/master/master-contracted-company.type';
import { MasterMeisai } from '../../type/master/master-meisai.type';
import { MasterEmployee } from '../../type/master/master-employee.type';
import { MasterInquiry } from '../../type/master/master-inquiry.type';
import { MasterLargeCategory } from '../../type/master/master-large-category.type';
import { MasterMadori } from '../../type/master/master-madori.type';
import { MasterMiddleCategory } from '../../type/master/master-middle-category.type';
import { MasterMyCarType } from '../../type/master/master-my-car-type.type';
import { MasterOrigin } from '../../type/master/master-origin.type';
import { MasterRelevantTag } from '../../type/master/master-relevant-tag.type';
import { MasterSignature } from '../../type/master/master-signature.type';
import { MasterStore } from '../../type/master/master-store.type';
import { MasterUnit } from '../../type/master/master-unit.type';
import { apiMasterSupportHistory } from './api/master-support-history/api-master-support-history';
import { apiMasterArea } from './api/master-area/api-master-area';
import { apiMasterBuildingCategory } from './api/master-building-category/api-master-building-category';
import { apiMasterTax } from './api/master-tax/api-master-tax';
import { apiMasterContractedCompany } from './api/master-contracted-company/api-master-contracted-company';
import { apiMasterEmployee } from './api/master-employee/api-master-employee';
import { apiMasterInquiry } from './api/master-inquiry/api-master-inquiry';
import { apiMasterLargeCategory } from './api/master-large-category/api-master-large-category';
import { apiMasterMadori } from './api/master-madori/api-master-madori';
import { apiMasterMiddleCategory } from './api/master-middle-category/api-master-middle-category';
import { apiMasterOrigin } from './api/master-origin/api-master-origin';
import { apiMasterAfterMaintenance } from './api/master-after-maintenance/api-master-after-maintenance';
import { apiMasterSignature } from './api/master-signature/api-master-signature';
import { apiMasterStore } from './api/master-store/api-master-store';
import { apiMasterUnit } from './api/master-unit/api-master-unit';
import { apiMasterMeisai } from './api/master-meisai/api-master-meisai';
import { MasterAfterMaintenance } from '../../type/master/master-after-maintenance.type';
import { ApiMasterCustomerInformationImportParam } from './api/master-customer-information-import/api-master-customer-information-import';
import { ApiMasterCustomerRankParam } from './api/master-customer-rank/api-master-customer-rank';
import { apiMasterMyCarType } from './api/tag/master-my-car-type/ap-master-my-car-type';
import { apiMasterRelevantTag } from './api/tag/master-relevant-tag/api-master-relevant-tag';
import { apiMasterProspectPart } from './api/tag/master-prospect-part/ap-master-prospect-part';
import { apiMasterPart } from './api/tag/master-part/api-master-part';
import { apiMasterConstructionPart } from './api/tag/master-construction-part/ap-master-construction-part';
import { apiMasterCustomerRank } from './api/master-custoemer-rank/api-master-customer-rank';
import { apiMasterCustomerExpectedRank } from './api/master-customer-expected-rank/api-master-customer-expected-rank';
import { apiMasterProjectRank } from './api/master-project-rank/api-master-project-rank';
import { apiMasterLostOrder } from './api/master-lost-order/api-master-lost-order';
import { apiMasterQuoteFixed } from './api/master-quote-fixed/api-master-quote-fixed';
import { MasterQuoteFixed } from '../../type/master/master-estimate.type';
import { apiMasterCustomerRankUpdate } from './api/master-custoemer-rank-update/api-master-customer-rank-update';

const ActionCreator = actionCreatorFactory('master');

export const MasterActions = {
  api: {
    /** 店舗 */
    store: apiMasterStore,
    /** 従業員 */
    employee: apiMasterEmployee,
    /** 消費税 */
    tax: apiMasterTax,
    /** 大分類 */
    largeCategory: apiMasterLargeCategory,
    /** 中分類 */
    middleCategory: apiMasterMiddleCategory,
    /** 明細 */
    meisai: apiMasterMeisai,
    /** 単位 */
    unit: apiMasterUnit,
    /** 発生源 */
    origin: apiMasterOrigin,
    /** 建物分類 */
    buildingCategory: apiMasterBuildingCategory,
    /** エリア */
    area: apiMasterArea,
    /** 間取り */
    madori: apiMasterMadori,
    /** 問合せ */
    inquiry: apiMasterInquiry,
    /** 対応履歴 */
    supportHistory: apiMasterSupportHistory,
    /** アフターメンテナンス */
    afterMaintenance: apiMasterAfterMaintenance,
    /** 署名 */
    signature: apiMasterSignature,
    /** 見積定型 */
    quoteFixed: apiMasterQuoteFixed,
    /** 関連タグ */
    relevantTag: apiMasterRelevantTag,
    /** マイカー種別 */
    myCarType: apiMasterMyCarType,
    /** 契約会社 */
    contractedCompany: apiMasterContractedCompany,
    /** @deprecated 見込み部位 */
    prospectPart: apiMasterProspectPart,
    /** 部位 */
    part: apiMasterPart,
    /** @deprecated 建設部位 */
    constructionPart: apiMasterConstructionPart,
    /** 顧客ランク */
    customerRank: apiMasterCustomerRank,
    /* 案件ランク */
    projectRank: apiMasterProjectRank,
    /** 失注 */
    lostOrder: apiMasterLostOrder,
    /** 顧客見込みランク */
    customerExpectedRank: apiMasterCustomerExpectedRank,
    /** 顧客ランク更新 */
    customerRankUpdate: apiMasterCustomerRankUpdate,
    /** テンプレートダウンロード */
    templateDownload: ActionCreator('template/download'),
    /** 顧客ランク */
    customerRan: ActionCreator<{param: ApiMasterCustomerRankParam, callback?:()=>void}>('customer/rank'),
    /** 顧客情報インポート */
    customerInformationImport: ActionCreator<{param:ApiMasterCustomerInformationImportParam, callback?:()=>void}>('customer/information/import'),
  },
  setStoreList: ActionCreator<MasterStore[]>('set/store/list'),
  setEmployeeList: ActionCreator<MasterEmployee[]>('set/employee/list'),
  setTaxList: ActionCreator<MasterTax[]>('set/tax/list'),
  setLostOrderList: ActionCreator<any[]>('set/lost/order/list'),
  setLargeCategoryList: ActionCreator<MasterLargeCategory[]>('set/large/category/list'),
  setMiddleCategoryList: ActionCreator<MasterMiddleCategory[]>('set/middle/category/list'),
  setMeisaiList: ActionCreator<MasterMeisai[]>('set/meisai/list'),
  setUnitList: ActionCreator<MasterUnit[]>('set/unit/list'),
  setOriginList: ActionCreator<MasterOrigin[]>('set/origin/list'),
  setBuildingCategoryList: ActionCreator<MasterBuildingCategory[]>('set/building/category/list'),
  setAreaList: ActionCreator<MasterArea[]>('set/area/list'),
  setMadoriList: ActionCreator<MasterMadori[]>('set/madori/list'),
  setInquiryList: ActionCreator<MasterInquiry[]>('set/inquiry/list'),
  setSupportHistoryList: ActionCreator<MasterSupportHistory[]>('set/support/history/list'),
  setAfterMaintenanceList: ActionCreator<MasterAfterMaintenance[]>('set/after/maintenance/list'),
  setSignatureList: ActionCreator<MasterSignature[]>('set/signature/list'),
  setQuoteFixedList: ActionCreator<MasterQuoteFixed[]>('set/quote-fixed/list'),
  setCustomerInformationImportList: ActionCreator('set/customer/information/import/list'),
  setRelevantTagList: ActionCreator<MasterRelevantTag[]>('set/relevant/tag/list'),
  setMyCarTypeList: ActionCreator<MasterMyCarType[]>('set/my/car/type/list'),
  setContractedCompanyList: ActionCreator<MasterContractedCompany[]>('set/contracted/company/list'),
  setProspectPartList: ActionCreator<any[]>('set/prospect/part/list'),
  setPartList: ActionCreator<any[]>('set/part/list'),
  setConstructionPartList: ActionCreator<any[]>('set/construction/part/list'),
  setCustomerRankList: ActionCreator<any[]>('set/customer/rank/list'),
  setProjectRankList: ActionCreator<any[]>('set/project/rank/list'),
  setCustomerExpectedRankList: ActionCreator<any[]>('set/customer/rank/estimated/list'),
  setCustomerRankUpdateList: ActionCreator<any[]>('set/customer/update/list'),
  resetState: ActionCreator('reset/state'),
};
