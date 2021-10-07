import { Redirect, Route, Switch } from 'react-router-dom';
import { RoutingPath } from './routing-pass';
import { TestDetailSP } from '../components/sp/pages/test-detail/test-detail.sp';
import { LoginSP } from '../components/sp/pages/login/login.sp';
import { CustomerSP } from '../components/sp/pages/customer/customer.sp';
import { CustomerDetailSP } from '../components/sp/pages/customer-detail/customer-detail.sp';
import { EstimateSP } from '../components/sp/pages/estimate/estimate.sp';
import { EstimateDetailSP } from '../components/sp/pages/estimate-detail/estimate-detail.sp';
import { OrderSP } from '../components/sp/layout/order/order.sp';
import { MaintenanceSP } from '../components/sp/pages/maintenance/maintenance.sp';
import { MaintenanceDetailSP } from '../components/sp/pages/maintenance-detail/maintenance-detail.sp';
import { FileSP } from '../components/sp/pages/file/file.sp';
import { SupportHistorySP } from '../components/sp/pages/support-history/support-history.sp';
import { TestPageSP } from '../components/sp/pages/test-page/test-page.sp';
import { Master } from '../components/pc/pages/master/master';
import { UserAgent } from '../utilities/user-agent';
import { CustomerDetailPC } from '../components/pc/pages/customer-detail/customer-detail.pc';
import { CustomerPC } from '../components/pc/pages/customer/customer.pc';
import { EstimatePC } from '../components/pc/pages/estimate/estimate.pc';
import { LoginPC } from '../components/pc/pages/login/login.pc';
import { OrderPC } from '../components/pc/pages/order/order.pc';
import { SupportHistoryPC } from '../components/pc/pages/support-history/support-history.pc';
import { TestPagePC } from '../components/pc/pages/test-page/test-page.pc';
import { TestDetailPC } from '../components/pc/pages/test-detail/test-detail.pc';
import { EstimateDetailPC } from '../components/pc/pages/maintenance-detail/estimate-detail/estimate-detail.pc';
import { SendPasswordPC } from '../components/pc/pages/password/send-password/send-password.pc';
import { SendPasswordCompletePC } from '../components/pc/pages/password/send-password-complete/send-password-complete';
import { ChangePasswordPC } from '../components/pc/pages/password/change-password/change-password.pc';
import { ChangePasswordErrorPC } from '../components/pc/pages/password/change-password-error/change-password-error.pc';
import { ChangePasswordCompletePC } from '../components/pc/pages/password/change-password-complete/change-password-complete.pc';
import { SendPasswordCompleteSP } from '../components/sp/pages/password/send-password-complete/send-password-complete.sp';
import { ChangePasswordSP } from '../components/sp/pages/password/change-password/change-password.sp';
import { ChangePasswordErrorSP } from '../components/sp/pages/password/change-password-error/change-password-error.sp';
import { ChangePasswordCompleteSP } from '../components/sp/pages/password/change-password-complete/change-password-complete.sp';
import { SendPasswordSP } from '../components/sp/pages/password/send-password/send-password.sp';
import { ProjectDetailSP } from '../components/sp/pages/project-detail/project-detail.sp';
import { ProjectDetailPC } from '../components/pc/pages/project-detail/project-detail.pc';
import { ProjectPC } from '../components/pc/pages/project/project.pc';
import { ProjectSP } from '../components/sp/pages/project/project.sp';
import { SupportHistoryDetailSP } from '../components/sp/pages/support-history-detail/support-history-detail.sp';
import { MaintenancePC } from '../components/pc/pages/maintenance/maintenance.pc';
import { FilePC } from '../components/pc/pages/file/file.pc';
import { FileDetailSP } from '../components/sp/pages/file-detail/file-detail.sp';
import { ExportCsv } from '../components/pc/pages/export-csv/export-csv';

export const Routes = () => (
  UserAgent === 'pc'
    ? (
      <Switch>
        <Route exact path={RoutingPath.testPage} component={TestPagePC} />
        <Route exact path={`${RoutingPath.testDetail}/:id`} component={TestDetailPC} />
        <Route exact path={RoutingPath.login} component={LoginPC} />
        <Route exact path={RoutingPath.sendPassword} component={SendPasswordPC} />
        <Route exact path={RoutingPath.sendPasswordComplete} component={SendPasswordCompletePC} />
        <Route exact path={RoutingPath.changePassword} component={ChangePasswordPC} />
        <Route exact path={RoutingPath.changePasswordError} component={ChangePasswordErrorPC} />
        <Route
          exact
          path={RoutingPath.changePasswordComplete}
          component={ChangePasswordCompletePC}
        />
        <Route path={`${RoutingPath.customerDetail}/:customerID`} component={CustomerDetailPC} />
        <Route exact path={RoutingPath.customer} component={CustomerPC} />
        <Route path={`${RoutingPath.projectDetail}/:projectID`} component={ProjectDetailPC} />
        <Route path={RoutingPath.project} component={ProjectPC} />
        <Route exact path={RoutingPath.estimate} component={EstimatePC} />
        <Route path={`${RoutingPath.estimateDetail}/:id`} component={EstimateDetailPC} />
        <Route path={`${RoutingPath.estimateDetail}`} component={EstimateDetailPC} />
        <Route exact path={RoutingPath.order} component={OrderPC} />
        <Route exact path={`${RoutingPath.maintenanceDetail}/:id`} component={MaintenancePC} />
        <Route exact path={RoutingPath.maintenance} component={MaintenancePC} />
        <Route exact path={RoutingPath.file} component={FilePC} />
        <Route exact path={`${RoutingPath.supportHistoryDetail}/:id`} component={SupportHistoryPC} />
        <Route exact path={RoutingPath.supportHistory} component={SupportHistoryPC} />
        <Route exact path={RoutingPath.exportCsv} component={ExportCsv} />
        <Route exact path={RoutingPath.master} component={Master} />
        <Redirect path="/" to={RoutingPath.customer} />
      </Switch>
    )
    : (
      <Switch>
        <Route exact path={RoutingPath.testPage} component={TestPageSP} />
        <Route exact path={`${RoutingPath.testDetail}/:id`} component={TestDetailSP} />
        <Route exact path={RoutingPath.login} component={LoginSP} />
        <Route exact path={RoutingPath.sendPassword} component={SendPasswordSP} />
        <Route exact path={RoutingPath.sendPasswordComplete} component={SendPasswordCompleteSP} />
        <Route exact path={RoutingPath.changePassword} component={ChangePasswordSP} />
        <Route exact path={RoutingPath.changePasswordError} component={ChangePasswordErrorSP} />
        <Route
          exact
          path={RoutingPath.changePasswordComplete}
          component={ChangePasswordCompleteSP}
        />
        <Route path={`${RoutingPath.customerDetail}/:customerID`} component={CustomerDetailSP} />
        <Route exact path={RoutingPath.customer} component={CustomerSP} />
        <Route path={`${RoutingPath.projectDetail}/:projectID`} component={ProjectDetailSP} />
        <Route exact path={RoutingPath.project} component={ProjectSP} />
        <Route exact path={RoutingPath.estimate} component={EstimateSP} />
        <Route exact path={`${RoutingPath.estimateDetail}/:id`} component={EstimateDetailSP} />
        <Route exact path={RoutingPath.order} component={OrderSP} />
        <Route exact path={RoutingPath.maintenance} component={MaintenanceSP} />
        <Route exact path={`${RoutingPath.maintenanceDetail}/:id`} component={MaintenanceDetailSP} />
        <Route exact path={RoutingPath.file} component={FileSP} />
        <Route exact path={`${RoutingPath.fileDetail}/:id/:file`} component={FileDetailSP} />
        <Route exact path={RoutingPath.supportHistory} component={SupportHistorySP} />
        <Route exact path={`${RoutingPath.supportHistoryDetail}/:id`} component={SupportHistoryDetailSP} />
        <Redirect path="/" to={RoutingPath.customer} />
      </Switch>
    )
);
