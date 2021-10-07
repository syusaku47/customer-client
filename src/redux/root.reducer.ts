import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { MasterReducer, MasterState } from './master/master.reducer';
import { TestState, TestReducer } from './test/test.reducer';
import { SystemState, SystemReducer } from './system/system.reducer';
import { DialogReducer, DialogState } from './dialog/dialog.reducer';
import { MapReducer, MapState } from './map/map.reducer';
import { CustomerState, CustomerReducer } from './customer/customer.reducer';
import { ProjectReducer, ProjectState } from './project/project.reducer';
import { TagReducer, TagState } from './tag/tag.reducer';
import { FileReducer, FileState } from './file/file.reducer';
import { EstimateReducer, EstimateState } from './estimate/estimate.reducer';
import { SupportHistoryReducer, SupportHistoryState } from './support-history/support-history.reducer';
import { MaintenanceReducer, MaintenanceState } from './maintenance/maintenance.reducer';
import { OrderReducer, OrderState } from './order/order.reducer';
import { CsvState, CsvReducer } from './csv/csv.reducer';
import { CustomerDetailReducer, CustomerDetailState } from './customer-detail/customer-detail.reducer';
import { ProjectDetailReducer, ProjectDetailState } from './project-detail/project-detail.reducer';
import { BillReducer, BillState } from './bill/bill.reducer';
import { AuthState, AuthReducer } from './auth/auth.reducer';

export type State = {
  router: RouterState;
  test: TestState;
  dialog: DialogState;
  customer: CustomerState;
  system: SystemState;
  map: MapState;
  master: MasterState;
  project: ProjectState;
  file: FileState;
  tag: TagState;
  estimate: EstimateState;
  supportHistory: SupportHistoryState;
  maintenance: MaintenanceState;
  order: OrderState;
  csv: CsvState;
  bill: BillState;
  customerDetail: CustomerDetailState;
  projectDetail: ProjectDetailState;
  auth: AuthState;
};

export const RootReducer = (history: History) => combineReducers<State>({
  router: connectRouter(history),
  test: TestReducer,
  customer: CustomerReducer,
  dialog: DialogReducer,
  system: SystemReducer,
  map: MapReducer,
  master: MasterReducer,
  project: ProjectReducer,
  file: FileReducer,
  tag: TagReducer,
  estimate: EstimateReducer,
  supportHistory: SupportHistoryReducer,
  maintenance: MaintenanceReducer,
  order: OrderReducer,
  csv: CsvReducer,
  customerDetail: CustomerDetailReducer,
  projectDetail: ProjectDetailReducer,
  bill: BillReducer,
  auth: AuthReducer,
});
