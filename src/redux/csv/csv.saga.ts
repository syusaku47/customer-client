import { takeEvery } from 'redux-saga/effects';
import { Store } from '../store';
import { getListHandle } from '../root.saga';
import { CsvActions } from './csv.action';
import { ApiCsvCustomerGetList, ApiCsvCustomerGetListResponse } from './api/customer/api-csv-customer';
import { ApiCsvBirthdayGetListResponse, ApiCsvBirthdayGetList } from './api/birhday/api-csv-birthday';
import { ApiCsvWeddingGetListResponse, ApiCsvWeddingGetList } from './api/wedding/api-csv-wedding';
import { ApiCsvProjectGetListResponse, ApiCsvProjectGetList } from './api/project/api-csv-project';
import { ApiCsvLostOrderGetListResponse, ApiCsvLostOrderGetList } from './api/lost-order/api-csv-lost-order';
import { ApiCsvNonOrderGetListResponse, ApiCsvNonOrderGetList } from './api/non-order/api-csv-non-order';
import { ApiCsvOrderGetListResponse, ApiCsvOrderGetList } from './api/order/api-csv-order';
import { ApiCsvMaintenanceGetListResponse, ApiCsvMaintenanceGetList } from './api/maintenance/api-csv-maintenance';
import { ApiCsvSupportHistoryGetListResponse, ApiCsvSupportHistoryGetList } from './api/support-history/api-csv-support-history';
import { ApiCsvCustomerRankGetListResponse, ApiCsvCustomerRankGetList } from './api/customer-rank/api-customer-rank';

function* tryCustomerGetList(action: ReturnType<typeof CsvActions.api.customer.getList>) {
  yield getListHandle<ApiCsvCustomerGetListResponse>({
    api: new ApiCsvCustomerGetList(action.payload),
    onSuccess: (res) => Store.dispatch(CsvActions.setCustomerList(res)),
  });
}
function* tryBirthdayGetList(action: ReturnType<typeof CsvActions.api.birthday.getList>) {
  yield getListHandle<ApiCsvBirthdayGetListResponse>({
    api: new ApiCsvBirthdayGetList(action.payload),
    onSuccess: (res) => Store.dispatch(CsvActions.setBirthdayList(res)),
  });
}
function* tryWeddingGetList(action: ReturnType<typeof CsvActions.api.wedding.getList>) {
  yield getListHandle<ApiCsvWeddingGetListResponse>({
    api: new ApiCsvWeddingGetList(action.payload),
    onSuccess: (res) => Store.dispatch(CsvActions.setWeddingList(res)),
  });
}
function* tryProjectGetList(action: ReturnType<typeof CsvActions.api.project.getList>) {
  yield getListHandle<ApiCsvProjectGetListResponse>({
    api: new ApiCsvProjectGetList(action.payload),
    onSuccess: (res) => Store.dispatch(CsvActions.setProjectList(res)),
  });
}
function* tryOrderGetList(action: ReturnType<typeof CsvActions.api.order.getList>) {
  yield getListHandle<ApiCsvOrderGetListResponse>({
    api: new ApiCsvOrderGetList(action.payload),
    onSuccess: (res) => Store.dispatch(CsvActions.setOrderList(res)),
  });
}
function* tryNonOrderGetList(action: ReturnType<typeof CsvActions.api.nonOrder.getList>) {
  yield getListHandle<ApiCsvNonOrderGetListResponse>({
    api: new ApiCsvNonOrderGetList(action.payload),
    onSuccess: (res) => Store.dispatch(CsvActions.setNonOrderList(res)),
  });
}
function* tryLostOrderGetList(action: ReturnType<typeof CsvActions.api.lostOrder.getList>) {
  yield getListHandle<ApiCsvLostOrderGetListResponse>({
    api: new ApiCsvLostOrderGetList(action.payload),
    onSuccess: (res) => Store.dispatch(CsvActions.setLostOrderList(res)),
  });
}
function* tryMaintenanceGetList(action: ReturnType<typeof CsvActions.api.maintenance.getList>) {
  yield getListHandle<ApiCsvMaintenanceGetListResponse>({
    api: new ApiCsvMaintenanceGetList(action.payload),
    onSuccess: (res) => Store.dispatch(CsvActions.setMaintenanceList(res)),
  });
}
function* tryCustomerRankGetList(action:
  ReturnType<typeof CsvActions.api.customerRank.getList>) {
  yield getListHandle<ApiCsvCustomerRankGetListResponse>({
    api: new ApiCsvCustomerRankGetList(action.payload),
    onSuccess: (res) => Store.dispatch(CsvActions.setCustomerRankList(res)),
  });
}
function* trySupportHistoryGetList(action:
  ReturnType<typeof CsvActions.api.supportHistory.getList>) {
  yield getListHandle<ApiCsvSupportHistoryGetListResponse>({
    api: new ApiCsvSupportHistoryGetList(action.payload),
    onSuccess: (res) => Store.dispatch(CsvActions.setSupportHistoryList(res)),
  });
}

export function* CsvSaga() {
  yield takeEvery(CsvActions.api.customer.getList, tryCustomerGetList);
  yield takeEvery(CsvActions.api.birthday.getList, tryBirthdayGetList);
  yield takeEvery(CsvActions.api.wedding.getList, tryWeddingGetList);
  yield takeEvery(CsvActions.api.project.getList, tryProjectGetList);
  yield takeEvery(CsvActions.api.order.getList, tryOrderGetList);
  yield takeEvery(CsvActions.api.nonOrder.getList, tryNonOrderGetList);
  yield takeEvery(CsvActions.api.lostOrder.getList, tryLostOrderGetList);
  yield takeEvery(CsvActions.api.maintenance.getList, tryMaintenanceGetList);
  yield takeEvery(CsvActions.api.customerRank.getList, tryCustomerRankGetList);
  yield takeEvery(CsvActions.api.supportHistory.getList, trySupportHistoryGetList);
}
