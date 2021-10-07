/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { put, takeEvery } from 'redux-saga/effects';
import { Store } from '../store';
import { ApiMasterStoreGetList, ApiMasterStorePost } from './api/master-store/api-master-store';
import { MasterActions } from './master.action';
import { ApiBase } from '../../service/api-base';
import { ApiMasterEmployeeGetList, ApiMasterEmployeePost } from './api/master-employee/api-master-employee';
import { ApiMasterSupportHistoryGetList, ApiMasterSupportHistoryPost } from './api/master-support-history/api-master-support-history';
import { ApiMasterAreaGetList, ApiMasterAreaPost } from './api/master-area/api-master-area';
import { ApiMasterBuildingCategoryGetList, ApiMasterBuildingCategoryPost } from './api/master-building-category/api-master-building-category';
import { ApiMasterTaxGetList, ApiMasterTaxPost } from './api/master-tax/api-master-tax';
import { ApiMasterContractedCompanyGetList, ApiMasterContractedCompanyPost } from './api/master-contracted-company/api-master-contracted-company';
import { ApiMasterMeisaiGetList, ApiMasterMeisaiPost } from './api/master-meisai/api-master-meisai';
import { ApiMasterInquiryGetList, ApiMasterInquiryPost } from './api/master-inquiry/api-master-inquiry';
import { ApiMasterLargeCategoryGetList, ApiMasterLargeCategoryPost } from './api/master-large-category/api-master-large-category';
import { ApiMasterMadoriGetList, ApiMasterMadoriPost } from './api/master-madori/api-master-madori';
import { ApiMasterMiddleCategoryGetList, ApiMasterMiddleCategoryPost } from './api/master-middle-category/api-master-middle-category';
import { ApiMasterOriginGetList, ApiMasterOriginPost } from './api/master-origin/api-master-origin';
import { ApiMasterSignatureGetList, ApiMasterSignaturePost } from './api/master-signature/api-master-signature';
import { ApiMasterUnitGetList, ApiMasterUnitPost } from './api/master-unit/api-master-unit';
import { ApiMasterAfterMaintenanceGetList, ApiMasterAfterMaintenancePost } from './api/master-after-maintenance/api-master-after-maintenance';
import { ApiMasterTemplateDownload } from './api/master-template-download/api-master-template-download';
import { ApiMasterCustomerInformationImport } from './api/master-customer-information-import/api-master-customer-information-import';
import { ApiMasterMyCarTypeGetList, ApiMasterMyCarTypePost } from './api/tag/master-my-car-type/ap-master-my-car-type';
import { ApiMasterRelevantTagGetList, ApiMasterRelevantTagPost } from './api/tag/master-relevant-tag/api-master-relevant-tag';
import { getListHandle, postHandle } from '../root.saga';
import { ApiMasterProspectPartPost, ApiMasterProspectPartGetList } from './api/tag/master-prospect-part/ap-master-prospect-part';
import { ApiMasterPartGetList, ApiMasterPartPost } from './api/tag/master-part/api-master-part';
import { ApiMasterConstructionPartGetList, ApiMasterConstructionPartPost } from './api/tag/master-construction-part/ap-master-construction-part';
import { ApiMaster } from '../root.type';
import { ResFileType } from '../../type/api.type';
import { ApiMasterCustomerRankGetList } from './api/master-custoemer-rank/api-master-customer-rank';
import { ApiMasterProjectRankGetList } from './api/master-project-rank/api-master-project-rank';
import { ApiMasterLostOrderGetList, ApiMasterLostOrderPost } from './api/master-lost-order/api-master-lost-order';
import { ApiMasterQuoteFixedGetList, ApiMasterQuoteFixedPost } from './api/master-quote-fixed/api-master-quote-fixed';
import { ApiMasterCustomerExpectedRankGetList } from './api/master-customer-expected-rank/api-master-customer-expected-rank';
import { ApiMasterCustomerRankUpdateGetList } from './api/master-custoemer-rank-update/api-master-customer-rank-update';
import { SystemActions } from '../system/system.action';
import { DialogActions } from '../dialog/dialog.action';

function* postTemp(api:ApiBase, callback?:()=>void) {
  yield postHandle({
    api,
    isAllClear: true,
    onSuccess: () => {
      if (callback)callback();
    },
  });
}

function* tryStoreGetList(action: ReturnType<typeof MasterActions.api.store.getList>) {
  yield getListHandle<ApiMaster.Store.Response.List>({
    api: new ApiMasterStoreGetList(action.payload),
    noLoad: true,
    * onSuccess(result) { yield put(MasterActions.setStoreList(result)); },
  });
}

function* tryStorePost(action: ReturnType<typeof MasterActions.api.store.post>) {
  const { param, onSuccess, onError } = action.payload;
  yield postHandle({
    title: '店舗 編集／追加',
    api: new ApiMasterStorePost(param),
    onSuccess: () => {
      if (onSuccess) onSuccess();
      Store.dispatch(DialogActions.pop());
    },
    onError: () => {
      if (onError)onError();
    },
  });
}

function* tryEmployeeGetList(action: ReturnType<typeof MasterActions.api.employee.getList>) {
  yield getListHandle<ApiMaster.Employee.Response.List>({
    api: new ApiMasterEmployeeGetList(action.payload),
    noLoad: true,
    * onSuccess(result) {
      yield put(MasterActions.setEmployeeList(result));
    },
  });
}

function* tryEmployeePost(action: ReturnType<typeof MasterActions.api.employee.post>) {
  const { param, onSuccess, onError } = action.payload;
  yield postHandle({
    title: '社員 編集／追加',
    api: new ApiMasterEmployeePost(param),
    onSuccess: () => {
      if (onSuccess) onSuccess();
      Store.dispatch(DialogActions.pop());
    },
    onError: () => {
      if (onError)onError();
    },
  });
}

function* tryTaxGetList(action:
  ReturnType<typeof MasterActions.api.tax.getList>) {
  yield getListHandle<ApiMaster.Tax.Response.List>({
    api: new ApiMasterTaxGetList(action.payload),
    noLoad: true,
    * onSuccess(result) {
      yield put(MasterActions.setTaxList(result));
    },
  });
}

function* tryTaxPost(action: ReturnType<typeof MasterActions.api.tax.post>) {
  const { param, onSuccess, onError } = action.payload;
  yield postHandle({
    title: '消費税 編集／追加',
    api: new ApiMasterTaxPost(param),
    onSuccess: () => {
      if (onSuccess) onSuccess();
      Store.dispatch(DialogActions.pop());
    },
    onError: () => {
      if (onError)onError();
    },
  });
}

function* tryLargeCategoryGetList(action:
  ReturnType<typeof MasterActions.api.largeCategory.getList>) {
  yield getListHandle<ApiMaster.LargeCategory.Response.List>({
    noLoad: true,
    api: new ApiMasterLargeCategoryGetList(action.payload),
    * onSuccess(result) {
      yield put(MasterActions.setLargeCategoryList(result));
    },
  });
}

function* tryLargeCategoryPost(action: ReturnType<typeof MasterActions.api.largeCategory.post>) {
  const { param, onSuccess, onError } = action.payload;
  yield postHandle({
    title: '大分類 編集／追加',
    api: new ApiMasterLargeCategoryPost(param),
    onSuccess: () => {
      if (onSuccess) onSuccess();
      Store.dispatch(DialogActions.pop());
    },
    onError: () => {
      if (onError)onError();
    },
  });
}

function* tryMiddleCategoryGetList(action:
  ReturnType<typeof MasterActions.api.middleCategory.getList>) {
  yield getListHandle<ApiMaster.MiddleCategory.Response.List>({
    api: new ApiMasterMiddleCategoryGetList(action.payload),
    noLoad: true,
    * onSuccess(result) {
      yield put(MasterActions.setMiddleCategoryList(result));
    },
  });
}

function* tryMiddleCategoryPost(action: ReturnType<typeof MasterActions.api.middleCategory.post>) {
  const { param, onSuccess, onError } = action.payload;
  yield postHandle({
    title: '中分類 編集／追加',
    api: new ApiMasterMiddleCategoryPost(param),
    onSuccess: () => {
      if (onSuccess) onSuccess();
      Store.dispatch(DialogActions.pop());
    },
    onError: () => {
      if (onError)onError();
    },
  });
}

function* tryMeisaiGetList(action: ReturnType<typeof MasterActions.api.meisai.getList>) {
  yield getListHandle<ApiMaster.Meisai.Response.List>({
    api: new ApiMasterMeisaiGetList(action.payload),
    noLoad: true,
    * onSuccess(result) {
      yield put(MasterActions.setMeisaiList(result));
    },
  });
}

function* tryMeisaiPost(action: ReturnType<typeof MasterActions.api.meisai.post>) {
  const { param, onSuccess, onError } = action.payload;
  yield postHandle({
    title: '明細 編集／追加',
    api: new ApiMasterMeisaiPost(param),
    onSuccess: () => {
      if (onSuccess) onSuccess();
      Store.dispatch(DialogActions.pop());
    },
    onError: () => {
      if (onError)onError();
    },
  });
}

function* tryUnitGetList(action: ReturnType<typeof MasterActions.api.unit.getList>) {
  yield getListHandle<ApiMaster.Unit.Response.List>({
    api: new ApiMasterUnitGetList(action.payload),
    noLoad: true,
    * onSuccess(result) {
      yield put(MasterActions.setUnitList(result));
    },
  });
}

function* tryUnitPost(action: ReturnType<typeof MasterActions.api.unit.post>) {
  const { param, onSuccess, onError } = action.payload;
  yield postHandle({
    title: '単位 編集／追加',
    api: new ApiMasterUnitPost(param),
    onSuccess: () => {
      if (onSuccess) onSuccess();
      Store.dispatch(DialogActions.pop());
    },
    onError: () => {
      if (onError)onError();
    },
  });
}

function* tryOriginGetList(action: ReturnType<typeof MasterActions.api.origin.getList>) {
  yield getListHandle<ApiMaster.Origin.Response.List>({
    noLoad: true,
    api: new ApiMasterOriginGetList(action.payload),
    * onSuccess(result) {
      yield put(MasterActions.setOriginList(
        result,
      ));
    },
  });
}

function* tryOriginPost(action: ReturnType<typeof MasterActions.api.origin.post>) {
  const { param, onSuccess, onError } = action.payload;
  yield postHandle({
    title: '発生源 編集／追加',
    api: new ApiMasterOriginPost(param),
    onSuccess: () => {
      if (onSuccess) onSuccess();
      Store.dispatch(DialogActions.pop());
    },
    onError: () => {
      if (onError)onError();
    },
  });
}

function* tryBuildingCategoryGetList(action:
  ReturnType<typeof MasterActions.api.buildingCategory.getList>) {
  yield getListHandle<ApiMaster.BuildingCategory.Response.List>({
    api: new ApiMasterBuildingCategoryGetList(action.payload),
    noLoad: true,
    * onSuccess(result) {
      yield put(MasterActions.setBuildingCategoryList(
        result,
      ));
    },
  });
}

function* tryBuildingCategoryPost(
  action: ReturnType<typeof MasterActions.api.buildingCategory.post>,
) {
  const { param, onSuccess, onError } = action.payload;
  yield postHandle({
    title: '建物分類 編集／追加',
    api: new ApiMasterBuildingCategoryPost(param),
    onSuccess: () => {
      if (onSuccess) onSuccess();
      Store.dispatch(DialogActions.pop());
    },
    onError: () => {
      if (onError)onError();
    },
  });
}

function* tryAreaGetList(action: ReturnType<typeof MasterActions.api.area.getList>) {
  yield getListHandle<ApiMaster.Area.Response.List>({
    api: new ApiMasterAreaGetList(action.payload),
    noLoad: true,
    * onSuccess(result) {
      yield put(MasterActions.setAreaList(
        result,
      ));
    },
  });
}

function* tryAreaPost(action: ReturnType<typeof MasterActions.api.area.post>) {
  const { param, onSuccess, onError } = action.payload;
  yield postHandle({
    title: 'エリア 編集／追加',
    api: new ApiMasterAreaPost(param),
    onSuccess: () => {
      if (onSuccess) onSuccess();
      Store.dispatch(DialogActions.pop());
    },
    onError: () => {
      if (onError)onError();
    },
  });
}

function* tryMadoriGetList(action: ReturnType<typeof MasterActions.api.madori.getList>) {
  yield getListHandle<ApiMaster.Madori.Response.List>({
    api: new ApiMasterMadoriGetList(action.payload),
    noLoad: true,
    * onSuccess(result) {
      yield put(MasterActions.setMadoriList(
        result,
      ));
    },
  });
}

function* tryMadoriPost(action: ReturnType<typeof MasterActions.api.madori.post>) {
  const { param, onSuccess, onError } = action.payload;
  yield postHandle({
    title: '間取り 編集／追加',
    api: new ApiMasterMadoriPost(param),
    onSuccess: () => {
      if (onSuccess) onSuccess();
      Store.dispatch(DialogActions.pop());
    },
    onError: () => {
      if (onError)onError();
    },
  });
}

function* tryInquiryGetList(action: ReturnType<typeof MasterActions.api.inquiry.getList>) {
  yield getListHandle<ApiMaster.Inquiry.Response.List>({
    api: new ApiMasterInquiryGetList(action.payload),
    noLoad: true,
    * onSuccess(result) {
      yield put(MasterActions.setInquiryList(result));
    },
  });
}

function* tryInquiryPost(action: ReturnType<typeof MasterActions.api.inquiry.post>) {
  const { param, onSuccess, onError } = action.payload;
  yield postHandle({
    title: '問合せ 編集／追加',
    api: new ApiMasterInquiryPost(param),
    onSuccess: () => {
      if (onSuccess) onSuccess();
      Store.dispatch(DialogActions.pop());
    },
    onError: () => {
      if (onError)onError();
    },
  });
}

function* tryLostOrderGetList(action:
  ReturnType<typeof MasterActions.api.lostOrder.getList>) {
  yield getListHandle<ApiMaster.LostOrder.Response.List>({
    api: new ApiMasterLostOrderGetList(action.payload),
    noLoad: true,
    * onSuccess(result) {
      yield put(MasterActions.setLostOrderList(
        result,
      ));
    },
  });
}

function* tryLostOrderPost(action: ReturnType<typeof MasterActions.api.lostOrder.post>) {
  const { param, onSuccess, onError } = action.payload;
  yield postHandle({
    title: '失注理由 編集／追加',
    api: new ApiMasterLostOrderPost(param),
    onSuccess: () => {
      if (onSuccess) onSuccess();
      Store.dispatch(DialogActions.pop());
    },
    onError: () => {
      if (onError)onError();
    },
  });
}

function* trySupportHistoryGetList(action:
  ReturnType<typeof MasterActions.api.supportHistory.getList>) {
  yield getListHandle<ApiMaster.SupportHistory.Response.List>({
    api: new ApiMasterSupportHistoryGetList(action.payload),
    noLoad: true,
    * onSuccess(result) {
      yield put(MasterActions.setSupportHistoryList(result));
    },
  });
}

function* trySupportHistoryPost(action: ReturnType<typeof MasterActions.api.supportHistory.post>) {
  const { param, onSuccess, onError } = action.payload;
  yield postHandle({
    title: '対応履歴 編集／追加',
    api: new ApiMasterSupportHistoryPost(param),
    onSuccess: () => {
      if (onSuccess) onSuccess();
      Store.dispatch(DialogActions.pop());
    },
    onError: () => {
      if (onError)onError();
    },
  });
}

function* tryAfterMaintenanceGetList(action:
  ReturnType<typeof MasterActions.api.afterMaintenance.getList>) {
  yield getListHandle<ApiMaster.AfterMaintenance.Response.List>({
    api: new ApiMasterAfterMaintenanceGetList(action.payload),
    noLoad: true,
    * onSuccess(result) {
      yield put(MasterActions.setAfterMaintenanceList(result));
    },
  });
}

function* tryAfterMaintenancePost(
  action: ReturnType<typeof MasterActions.api.afterMaintenance.post>,
) {
  const { param, onSuccess, onError } = action.payload;
  yield postHandle({
    title: 'アフターメンテナンス 編集／追加',
    api: new ApiMasterAfterMaintenancePost(param),
    onSuccess: () => {
      if (onSuccess) onSuccess();
      Store.dispatch(DialogActions.pop());
    },
    onError: () => {
      if (onError)onError();
    },
  });
}

function* trySignatureGetList(action: ReturnType<typeof MasterActions.api.signature.getList>) {
  yield getListHandle<ApiMaster.Signature.Response.List>({
    api: new ApiMasterSignatureGetList(action.payload),
    noLoad: true,
    * onSuccess(result) {
      yield put(MasterActions.setSignatureList(result));
    },
  });
}

function* trySignaturePost(action: ReturnType<typeof MasterActions.api.signature.post>) {
  yield postTemp(new ApiMasterSignaturePost(action.payload.param), action.payload.callback);
}

function* tryQuoteFixedGetList(action:
  ReturnType<typeof MasterActions.api.quoteFixed.getList>) {
  yield getListHandle<ApiMaster.QuoteFixed.Response.List>({
    api: new ApiMasterQuoteFixedGetList(action.payload),
    noLoad: true,
    * onSuccess(result) {
      yield put(MasterActions.setQuoteFixedList(result));
    },
  });
}

function* tryQuoteFixedPost(action: ReturnType<typeof MasterActions.api.quoteFixed.post>) {
  yield postTemp(new ApiMasterQuoteFixedPost(action.payload.param), action.payload.callback);
}

function* tryCustomerRankGetList(action:
ReturnType<typeof MasterActions.api.customerRank.getList>) {
  yield getListHandle<any>({
    api: new ApiMasterCustomerRankGetList(action.payload),
    noLoad: true,
    * onSuccess(result) {
      yield put(MasterActions.setCustomerRankList(result));
    },
  });
}
function* tryProjectRankGetList(action:
ReturnType<typeof MasterActions.api.projectRank.getList>) {
  yield getListHandle<any>({
    api: new ApiMasterProjectRankGetList(action.payload),
    noLoad: true,
    * onSuccess(result) {
      yield put(MasterActions.setProjectRankList(result));
    },
  });
}
function* tryCustomerExpectedRankGetList(action:
ReturnType<typeof MasterActions.api.customerExpectedRank.getList>) {
  yield getListHandle<any>({
    api: new ApiMasterCustomerExpectedRankGetList(action.payload),
    noLoad: true,
    * onSuccess(result) {
      yield put(MasterActions.setCustomerExpectedRankList(
        result,
      ));
    },
  });
}

function* tryCustomerRankUpdateGetList(action:
ReturnType<typeof MasterActions.api.customerRankUpdate.getList>) {
  yield getListHandle<any>({
    api: new ApiMasterCustomerRankUpdateGetList(action.payload),
    noLoad: true,
    * onSuccess(result) {
      yield put(MasterActions.setCustomerRankUpdateList(result));
    },
  });
}

function* tryCustomerInformationImport(action:
  ReturnType<typeof MasterActions.api.customerInformationImport>) {
  yield postTemp(
    new ApiMasterCustomerInformationImport(action.payload.param), action.payload.callback,
  );
}

function* tryRelevantTagGetList(action: ReturnType<typeof MasterActions.api.relevantTag.getList>) {
  yield getListHandle<ApiMaster.RelevantTag.Response.List>({
    api: new ApiMasterRelevantTagGetList(action.payload),
    noLoad: true,
    * onSuccess(result) {
      yield put(MasterActions.setRelevantTagList(result));
    },
  });
}

function* tryRelevantTagPost(action: ReturnType<typeof MasterActions.api.relevantTag.post>) {
  const { param, onSuccess, onError } = action.payload;
  yield postHandle({
    title: '関連タグ 編集／追加',
    api: new ApiMasterRelevantTagPost(param),
    onSuccess: () => {
      if (onSuccess) onSuccess();
      Store.dispatch(DialogActions.pop());
    },
    onError: () => {
      if (onError)onError();
    },
  });
}

function* tryPartGetList(action:
  ReturnType<typeof MasterActions.api.part.getList>) {
  yield getListHandle<ApiMaster.Part.Response.List>({
    api: new ApiMasterPartGetList(action.payload),
    noLoad: true,
    * onSuccess(result) {
      yield put(MasterActions.setPartList(result));
    },
  });
}

function* tryPartPost(action: ReturnType<typeof MasterActions.api.part.post>) {
  const { param, onSuccess, onError } = action.payload;
  yield postHandle({
    title: '部位 編集／追加',
    api: new ApiMasterPartPost(param),
    onSuccess: () => {
      if (onSuccess) onSuccess();
      Store.dispatch(DialogActions.pop());
    },
    onError: () => {
      if (onError)onError();
    },
  });
}

function* tryMyCarTypeGetList(action: ReturnType<typeof MasterActions.api.myCarType.getList>) {
  yield getListHandle<ApiMaster.MyCarType.Response.List>({
    api: new ApiMasterMyCarTypeGetList(action.payload),
    noLoad: true,
    * onSuccess(result) {
      yield put(MasterActions.setMyCarTypeList(result));
    },
  });
}

function* tryMyCarTypePost(action: ReturnType<typeof MasterActions.api.myCarType.post>) {
  const { param, onSuccess, onError } = action.payload;
  yield postHandle({
    title: 'マイカー種別 編集／追加',
    api: new ApiMasterMyCarTypePost(param),
    onSuccess: () => {
      if (onSuccess) onSuccess();
      Store.dispatch(DialogActions.pop());
    },
    onError: () => {
      if (onError)onError();
    },
  });
}

function* tryContractedCompanyGetList(action:
  ReturnType<typeof MasterActions.api.contractedCompany.getList>) {
  yield getListHandle<ApiMaster.ContractedCompany.Response.List>({
    api: new ApiMasterContractedCompanyGetList(action.payload),
    noLoad: true,
    * onSuccess(result) {
      yield put(MasterActions.setContractedCompanyList(result));
    },
  });
}

function* tryContractedCompanyPost(
  action: ReturnType<typeof MasterActions.api.contractedCompany.post>,
) {
  const { param, onSuccess, onError } = action.payload;
  yield postHandle({
    title: '契約会社 編集／追加',
    api: new ApiMasterContractedCompanyPost(param),
    onSuccess: () => {
      if (onSuccess) onSuccess();
      Store.dispatch(DialogActions.pop());
    },
    onError: () => {
      if (onError)onError();
    },
  });
}

function* tryProspectPartGetList(action:
  ReturnType<typeof MasterActions.api.prospectPart.getList>) {
  yield getListHandle<ApiMaster.ProspectPart.Response.List>({
    api: new ApiMasterProspectPartGetList(action.payload),
    noLoad: true,
    * onSuccess(result) {
      yield put(MasterActions.setProspectPartList(result));
    },
  });
}

function* tryProspectPartPost(action:ReturnType<typeof MasterActions.api.prospectPart.post>) {
  yield postTemp(new ApiMasterProspectPartPost(action.payload.param), action.payload.callback);
}

function* tryConstructionPartGetList(action:
  ReturnType<typeof MasterActions.api.constructionPart.getList>) {
  yield getListHandle<ApiMaster.ConstructionPart.Response.List>({
    noLoad: true,
    api: new ApiMasterConstructionPartGetList(action.payload),
    * onSuccess(result) {
      yield put(MasterActions.setConstructionPartList(result));
    },
  });
}

function* tryConstructionPartPost(
  action: ReturnType<typeof MasterActions.api.constructionPart.post>,
) {
  yield postTemp(new ApiMasterConstructionPartPost(action.payload.param), action.payload.callback);
}

function* tryTemplateDownload() {
  const request = new ApiMasterTemplateDownload();
  try {
    const result: ResFileType = yield request.run();
    if (ApiBase.isSuccess(result)) {
      const url = URL.createObjectURL(result.file);
      const a: HTMLAnchorElement = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.setAttribute('download', result.file.name);
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } else {
      throw new Error();
    }
  } catch (e) {
    window.console.error(e);
  }
}

export function* MasterSaga() {
  yield takeEvery(MasterActions.api.store.getList, tryStoreGetList);
  yield takeEvery(MasterActions.api.store.post, tryStorePost);
  yield takeEvery(MasterActions.api.employee.getList, tryEmployeeGetList);
  yield takeEvery(MasterActions.api.employee.post, tryEmployeePost);
  yield takeEvery(MasterActions.api.tax.getList, tryTaxGetList);
  yield takeEvery(MasterActions.api.tax.post, tryTaxPost);
  yield takeEvery(MasterActions.api.largeCategory.getList, tryLargeCategoryGetList);
  yield takeEvery(MasterActions.api.largeCategory.post, tryLargeCategoryPost);
  yield takeEvery(MasterActions.api.middleCategory.getList, tryMiddleCategoryGetList);
  yield takeEvery(MasterActions.api.middleCategory.post, tryMiddleCategoryPost);
  yield takeEvery(MasterActions.api.meisai.getList, tryMeisaiGetList);
  yield takeEvery(MasterActions.api.meisai.post, tryMeisaiPost);
  yield takeEvery(MasterActions.api.unit.getList, tryUnitGetList);
  yield takeEvery(MasterActions.api.unit.post, tryUnitPost);
  yield takeEvery(MasterActions.api.origin.getList, tryOriginGetList);
  yield takeEvery(MasterActions.api.origin.post, tryOriginPost);
  yield takeEvery(MasterActions.api.buildingCategory.getList, tryBuildingCategoryGetList);
  yield takeEvery(MasterActions.api.buildingCategory.post, tryBuildingCategoryPost);
  yield takeEvery(MasterActions.api.area.getList, tryAreaGetList);
  yield takeEvery(MasterActions.api.area.post, tryAreaPost);
  yield takeEvery(MasterActions.api.lostOrder.getList, tryLostOrderGetList);
  yield takeEvery(MasterActions.api.lostOrder.post, tryLostOrderPost);
  yield takeEvery(MasterActions.api.madori.getList, tryMadoriGetList);
  yield takeEvery(MasterActions.api.madori.post, tryMadoriPost);
  yield takeEvery(MasterActions.api.inquiry.getList, tryInquiryGetList);
  yield takeEvery(MasterActions.api.inquiry.post, tryInquiryPost);
  yield takeEvery(MasterActions.api.supportHistory.getList, trySupportHistoryGetList);
  yield takeEvery(MasterActions.api.supportHistory.post, trySupportHistoryPost);
  yield takeEvery(MasterActions.api.afterMaintenance.getList, tryAfterMaintenanceGetList);
  yield takeEvery(MasterActions.api.afterMaintenance.post, tryAfterMaintenancePost);
  yield takeEvery(MasterActions.api.signature.getList, trySignatureGetList);
  yield takeEvery(MasterActions.api.signature.post, trySignaturePost);
  yield takeEvery(MasterActions.api.quoteFixed.getList, tryQuoteFixedGetList);
  yield takeEvery(MasterActions.api.quoteFixed.post, tryQuoteFixedPost);
  yield takeEvery(MasterActions.api.customerRank.getList, tryCustomerRankGetList);
  yield takeEvery(MasterActions.api.customerRankUpdate.getList, tryCustomerRankUpdateGetList);
  yield takeEvery(MasterActions.api.projectRank.getList, tryProjectRankGetList);
  yield takeEvery(MasterActions.api.customerExpectedRank.getList, tryCustomerExpectedRankGetList);
  yield takeEvery(MasterActions.api.customerInformationImport, tryCustomerInformationImport);
  yield takeEvery(MasterActions.api.relevantTag.getList, tryRelevantTagGetList);
  yield takeEvery(MasterActions.api.relevantTag.post, tryRelevantTagPost);
  yield takeEvery(MasterActions.api.myCarType.getList, tryMyCarTypeGetList);
  yield takeEvery(MasterActions.api.myCarType.post, tryMyCarTypePost);
  yield takeEvery(MasterActions.api.contractedCompany.getList, tryContractedCompanyGetList);
  yield takeEvery(MasterActions.api.contractedCompany.post, tryContractedCompanyPost);
  yield takeEvery(MasterActions.api.templateDownload, tryTemplateDownload);
  yield takeEvery(MasterActions.api.prospectPart.getList, tryProspectPartGetList);
  yield takeEvery(MasterActions.api.prospectPart.post, tryProspectPartPost);
  yield takeEvery(MasterActions.api.part.getList, tryPartGetList);
  yield takeEvery(MasterActions.api.part.post, tryPartPost);
  yield takeEvery(MasterActions.api.constructionPart.getList, tryConstructionPartGetList);
  yield takeEvery(MasterActions.api.constructionPart.post, tryConstructionPartPost);
}
