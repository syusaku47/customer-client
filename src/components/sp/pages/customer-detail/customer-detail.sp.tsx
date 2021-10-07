import { goBack, replace } from 'connected-react-router';
import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { isEqual } from 'lodash';
import {
  SemanticShorthandItem, Tab, TabPaneProps,
} from 'semantic-ui-react';
import { useWillUnMount } from '../../../../hooks/life-cycle';
import { CustomerActions } from '../../../../redux/customer/customer.action';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { State } from '../../../../redux/root.reducer';
import { RoutingPath } from '../../../../routes/routing-pass';
import { Button } from '../../../ui/button/button';
import { CustomerInfoTabContents } from '../../../ui/tab-contents/customer-info/customer-info-tab-contents';
import { FileListSP } from '../../layout/body/list/file/file-list';
import { MaintenanceListSP } from '../../layout/body/list/maintenance/maintenance-list';
import { ProjectListSP } from '../../layout/body/list/project-list/project-list';
import { SupportHistoryListSP } from '../../layout/body/list/support-history/support-history-list';
import { DetailPageFooterSP } from '../../layout/detail-page-footer/detail-page-footer.sp';
import { SearchBoxDialogTitle } from '../../layout/search-box/search-box.type.sp';
import { BasePageSP } from '../base.page.sp';
import { SearchBoxCustomerSP } from '../customer/serch-box/customer-search-box.sp';
import { useQuery } from '../../../../hooks/use-query';
import { LeftIconButton } from '../../../ui/button/left-icon-button/left-icon-button';
import { CustomerEditDialogTitle } from '../customer/edit/customer-edit.type';
import { CustomerEditSP } from '../customer/edit/customer-edit.sp';
import { MaintenanceEditDialogTitle } from '../maintenance/edit/maintenance-edit.type';
import { MaintenanceEditSP } from '../maintenance/edit/maintenance-edit.sp';
import { ProjectActions } from '../../../../redux/project/project.action';
import { ProjectEditDialogTitle } from '../project/edit/project-edit.type.sp';
import { ProjectEditSP } from '../project/edit/project-edit.sp';
import { CustomerDetailActions } from '../../../../redux/customer-detail/customer-detail.action';
import { SupportHistoryActions } from '../../../../redux/support-history/support-history.action';
import { FileActions } from '../../../../redux/file/file.action';
import { MaintenanceActions } from '../../../../redux/maintenance/maintenance.action';
import { reFindDialogTitle } from '../common-dialog/refind/refind.sp';
import { RefindProjectSP } from '../common-dialog/refind/refind-project.sp';
import { RefindSupportHistorySP } from '../common-dialog/refind/refind-support-history.sp';
import { RefindFileSP } from '../common-dialog/refind/refind-file.sp';
import { RefindMaintenanceSP } from '../common-dialog/refind/refind-maintenance.sp';
import { ProjectSortState } from '../../../../type/project/project.type';
import { DateFormatter } from '../../../../utilities/date-formatter';
import { SupportHistorySortState } from '../../../../type/support-history/support-history.type';
import { FileSortState } from '../../../../type/file/file.type';
import { MaintenanceSortState } from '../../../../type/maintenance/maintenance.type';

const getActiveIndex = (path: string) => {
  switch (path) {
    case 'customer':
      return 0;
    case 'project':
      return 1;
    case 'support-history':
      return 2;
    case 'file':
      return 3;
    case 'maintenance':
      return 4;
    default:
      return 0;
  }
};

export const CustomerDetailSP = () => {
  /* Hooks */
  const dispatch = useDispatch();
  const query = useQuery('p');

  const { customerID } = useParams<{ customerID: string; }>();
  const customerInfo = useSelector((state: State) => state.customer.customer);

  const {
    projectList, projectSort,
    supportSort, supportList,
    fileSort, fileList,
    maintenanceSort, maintenanceList,
  } = useSelector((state: State) => state.customerDetail, isEqual);

  /* State */
  const [activeIndex, setActiveIndex] = useState(0);
  const listEle = useRef<HTMLDivElement>(null);

  const panes:{
    pane?: SemanticShorthandItem<TabPaneProps>
    menuItem?: any
    render?: () => React.ReactNode
  }[] = useMemo(() => [
    { menuItem: '顧客情報', render: () => <Tab.Pane><CustomerInfoTabContents /></Tab.Pane> },
    { menuItem: '案件情報', render: () => <Tab.Pane><ProjectListSP data={projectList} /* handleCardClick={(v) => { dispatch(`${RoutingPath.projectDetail}/${v.id}`); }} */ /></Tab.Pane> },
    { menuItem: '対応履歴', render: () => <Tab.Pane><SupportHistoryListSP data={supportList} /></Tab.Pane> },
    { menuItem: 'ファイル', render: () => <Tab.Pane><FileListSP data={fileList} /></Tab.Pane> },
    { menuItem: 'メンテナンス', render: () => <Tab.Pane><MaintenanceListSP data={maintenanceList} /></Tab.Pane> },
  ], [projectList, supportList, fileList, maintenanceList]);

  /* Callback */
  const getProjectList = useCallback((data?:ProjectSortState) => {
    const sortData = data || projectSort;
    dispatch(ProjectActions.api.project.getCallbackList({
      noLoad: true,
      param: {
        name: sortData.name,
        project_representative_name: sortData.project_representative_name,
        ins_date: DateFormatter.date2str(sortData.ins_date),
        order_price: sortData.order_price,
        construction_date: DateFormatter.date2str(sortData.construction_date),
        completion_date: DateFormatter.date2str(sortData.completion_date),
        complete_date: DateFormatter.date2str(sortData.complete_date),
        contract_date: DateFormatter.date2str(sortData.contract_date),
        failure_date: DateFormatter.date2str(sortData.failure_date),
        cancel_date: DateFormatter.date2str(sortData.cancel_date),
        source: sortData.source,
        remarks: sortData.remarks,
        filter_by: 3,
        customer_id: Number(customerID),
        limit: 9999,
        highlow: sortData.highlow,
      },
      onSuccess: (v) => {
        dispatch(CustomerDetailActions.setProjectList(v));
      },
    }));
  }, [projectSort, customerID]);

  const getSupportHisyoryList = useCallback((data?:SupportHistorySortState) => {
    const sortData = data || supportSort;
    dispatch(SupportHistoryActions.api.supportHistory.getList({
      noLoad: true,
      param: {
        customer_id: Number(customerID),
        is_fixed: sortData.is_fixed,
        project_name: sortData.project_name,
        reception_date: DateFormatter.date2str(sortData.reception_date),
        category: sortData.category,
        subject: sortData.subject,
        supported_person: sortData.supported_person,
        supported_complete_date: DateFormatter.date2str(sortData.supported_complete_date),
        filter_by: sortData.filter_by,
        limit: 9999,
        highlow: sortData.highlow,
      },
      onSuccess: (v) => {
        dispatch(CustomerDetailActions.setSupportList(v));
      },
    }));
  }, [customerID, supportSort]);

  const getFileList = useCallback((data?:FileSortState) => {
    const sortData = data || fileSort;
    dispatch(FileActions.api.file.getList({
      noLoad: true,
      param: {
        customer_id: Number(customerID),
        no: sortData.no,
        file_name: sortData.file_name,
        format: sortData.format,
        size: sortData.size,
        upload_date: DateFormatter.date2str(sortData.upload_date),
        updater: sortData.updater,
        comment: sortData.comment,
        filter_by: sortData.filter_by,
        limit: 9999,
        highlow: sortData.highlow,
      },
      onSuccess: (v) => {
        dispatch(CustomerDetailActions.setFileList(v));
      },
    }));
  }, [customerID, fileSort]);

  const getMaintenanceList = useCallback((data?:MaintenanceSortState) => {
    const sortData = data || maintenanceSort;
    dispatch(MaintenanceActions.api.maintenance.getList({
      noLoad: true,
      param: {
        customer_id: Number(customerID),
        is_fixed: sortData.is_fixed,
        project_name: sortData.project_name,
        construction_date: DateFormatter.date2str(sortData.construction_date),
        completion_date: DateFormatter.date2str(sortData.completion_date),
        quote_creator: sortData.quote_creator,
        maintenance_date: DateFormatter.date2str(sortData.maintenance_date),
        title: sortData.title,
        supported_date: DateFormatter.date2str(sortData.supported_date),
        filter_by: sortData.filter_by,
        limit: 9999,
        highlow: sortData.highlow,
      },
      callback: (v) => {
        dispatch(CustomerDetailActions.setMaintenanceList(v));
      },
    }));
  }, [customerID, maintenanceSort]);

  const handleClickEdit = useCallback(() => {
    dispatch(DialogActions.push({
      title: CustomerEditDialogTitle.update,
      element: <CustomerEditSP
        mode="update"
        customerID={customerInfo?.id}
        idDetail
      />,
    }));
  }, [customerInfo]);

  const handleClickProjectEdit = useCallback(() => {
    dispatch(DialogActions.push({
      title: ProjectEditDialogTitle.add,
      element: <ProjectEditSP
        mode="add"
        customerData={customerInfo || undefined}
        callback={getProjectList}
      />,
    }));
  }, [customerInfo, getProjectList]);

  const handleClickMaintenanceEdit = useCallback(() => {
    if (!customerInfo) return;
    dispatch(DialogActions.push({
      title: MaintenanceEditDialogTitle.add,
      element: <MaintenanceEditSP
        mode="add"
        customerData={customerInfo}
      />,
    }));
  }, [customerInfo]);

  const handleClickSort = useCallback((index: number) => {
    switch (index) {
      case 1:
        dispatch(DialogActions.push({
          title: reFindDialogTitle,
          element: <RefindProjectSP callback={getProjectList} />,
        }));
        break;

      case 2:
        dispatch(DialogActions.push({
          title: reFindDialogTitle,
          element: <RefindSupportHistorySP callback={getSupportHisyoryList} />,
        }));
        break;

      case 3:
        dispatch(DialogActions.push({
          title: reFindDialogTitle,
          element: <RefindFileSP callback={getFileList} />,
        }));
        break;

      case 4:
        dispatch(DialogActions.push({
          title: reFindDialogTitle,
          element: <RefindMaintenanceSP callback={getMaintenanceList} />,
        }));
        break;

      default:
        break;
    }
  }, []);

  const handleTabChange = useCallback(
    (index: number) => {
      const path = `${RoutingPath.customerDetail}/${customerID}?p=`;
      let id = '';
      switch (index) {
        case 0:
          id = 'customer';
          break;
        case 1:
          id = 'project';
          break;
        case 2:
          id = 'support-history';
          break;
        case 3:
          id = 'file';
          break;
        case 4:
          id = 'maintenance';
          break;
        default:
          break;
      }
      dispatch(replace(path + id));
      setActiveIndex(index);
    },
    [customerID],
  );

  /* Effect */
  useEffect(() => {
    const index = getActiveIndex(query || 'customer');
    handleTabChange(index);
  }, [customerID, query]);

  useEffect(() => {
    const id = Number(customerID);
    if (activeIndex === 0) {
      dispatch(CustomerActions.api.family.getList({ id }));
      dispatch(CustomerActions.api.pet.getList({ id }));
      dispatch(CustomerActions.api.customer.get({
        noLoad: !!customerInfo,
        param: {
          id: Number(customerID),
        },
      }));
    }
    if (activeIndex === 1) {
      getProjectList();
    }
    if (activeIndex === 2) {
      getSupportHisyoryList();
    }
    if (activeIndex === 3) {
      getFileList();
    }
    if (activeIndex === 4) {
      getMaintenanceList();
    }
  }, [customerID, activeIndex]);

  useWillUnMount(() => {
    dispatch(CustomerActions.setCustomer(null));
    dispatch(CustomerDetailActions.setProjectList([]));
    dispatch(CustomerDetailActions.setProjectSort(null));
    dispatch(CustomerDetailActions.setSupportList([]));
    dispatch(CustomerDetailActions.setSupportSort(null));
    dispatch(CustomerDetailActions.setFileList([]));
    dispatch(CustomerDetailActions.setFileSort(null));
    dispatch(CustomerDetailActions.setMaintenanceList([]));
    dispatch(CustomerDetailActions.setMaintenanceSort(null));
  });

  useEffect(() => {
    listEle.current?.scrollTo(0, -10000);
  }, [activeIndex]);

  return (
    <BasePageSP searchBoxDialog={{ title: SearchBoxDialogTitle, element: <SearchBoxCustomerSP /> }}>
      <div className="detail_wrap">

        <div className="detail_header">
          <div
            className="detail_header_inner"
            onClick={() => dispatch(goBack())}
          >
            <div
              className="detail_header_inner__back_btn"
            >
              <i className="fas fa-chevron-circle-left" />
            </div>

            <span>
              {/* 顧客詳細 */}
              {customerInfo?.name || '---'}&nbsp;様
            </span>
          </div>

          <div className="detail_header_buttons">

            {activeIndex === 1 && (
            <LeftIconButton
              onClick={handleClickProjectEdit}
              size="md"
              color="secondary"
              fontAwesomeClass="fa fa-edit"
              label="案件登録"
            />
            )}
            {activeIndex === 4 && (
            <LeftIconButton
              onClick={handleClickMaintenanceEdit}
              size="sm"
              color="secondary"
              fontAwesomeClass="fa fa-edit"
              label="メンテ登録"
            />
            )}

            {activeIndex !== 0
             && <Button size="sm" color="secondary" onClick={() => handleClickSort(activeIndex)}>絞込み</Button>}

            <LeftIconButton
              onClick={handleClickEdit}
              size="sm"
              color="secondary"
              fontAwesomeClass="fa fa-edit"
              label="顧客編集"
            />
          </div>
        </div>

        <div className="detail_body" ref={listEle}>
          <Tab
            onTabChange={(_, data) => handleTabChange(Number(data.activeIndex))}
            panes={panes}
            activeIndex={activeIndex}
          />
        </div>

        <DetailPageFooterSP
          tel={customerInfo?.tel_no}
          url={`/#${RoutingPath.customerDetail}/${customerID}`}
          type="customer"
        />
      </div>
    </BasePageSP>
  );
};
