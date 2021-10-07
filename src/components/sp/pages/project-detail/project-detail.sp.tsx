import { goBack, replace } from 'connected-react-router';
import { isEqual } from 'lodash';
import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  SemanticShorthandItem, Tab, TabPaneProps,
} from 'semantic-ui-react';
import { useWillUnMount } from '../../../../hooks/life-cycle';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { FileActions } from '../../../../redux/file/file.action';
import { MaintenanceActions } from '../../../../redux/maintenance/maintenance.action';
import { ProjectActions } from '../../../../redux/project/project.action';
import { State } from '../../../../redux/root.reducer';
import { SupportHistoryActions } from '../../../../redux/support-history/support-history.action';
import { RoutingPath } from '../../../../routes/routing-pass';
import { Button } from '../../../ui/button/button';
import { LeftIconButton } from '../../../ui/button/left-icon-button/left-icon-button';
import { ProjectInfoTabContentsSP } from '../../../ui/tab-contents/project/info/project-info-tab-contents.sp';
import '../../../ui/tab/tab.scss';
import { EstimateListSP } from '../../layout/body/list/estimate/estimate-list';
import { FileListSP } from '../../layout/body/list/file/file-list';
import { MaintenanceListSP } from '../../layout/body/list/maintenance/maintenance-list';
import { SupportHistoryListSP } from '../../layout/body/list/support-history/support-history-list';
import { DetailPageFooterSP } from '../../layout/detail-page-footer/detail-page-footer.sp';
import { SearchBoxDialogTitle } from '../../layout/search-box/search-box.type.sp';
import { BasePageSP } from '../base.page.sp';
import { RefindEstimateSP } from '../common-dialog/refind/refind-estimate.sp';
import { RefindFileSP } from '../common-dialog/refind/refind-file.sp';
import { RefindMaintenanceSP } from '../common-dialog/refind/refind-maintenance.sp';
import { RefindSupportHistorySP } from '../common-dialog/refind/refind-support-history.sp';
import { reFindDialogTitle } from '../common-dialog/refind/refind.sp';
import { EstimateEditSP } from '../estimate/edit/estimate-edit.sp';
import { MaintenanceEditSP } from '../maintenance/edit/maintenance-edit.sp';
import { MaintenanceEditDialogTitle } from '../maintenance/edit/maintenance-edit.type';
import { ProjectEditSP } from '../project/edit/project-edit.sp';
import { ProjectEditDialogTitle } from '../project/edit/project-edit.type.sp';
import { ProjectSearchBoxSP } from '../project/search-box/project-search-box.sp';
import './project-detail.sp.scss';
import { ProjectDetailActions } from '../../../../redux/project-detail/project-detail.action';
import { EstimateActions } from '../../../../redux/estimate/estimate.action';
import { EstimateSortState } from '../../../../type/estimate/estimate.type';
import { DateFormatter } from '../../../../utilities/date-formatter';
import { SupportHistorySortState } from '../../../../type/support-history/support-history.type';
import { FileSortState } from '../../../../type/file/file.type';
import { MaintenanceSortState } from '../../../../type/maintenance/maintenance.type';
import { useQuery } from '../../../../hooks/use-query';

const getActiveIndex = (path: string) => {
  switch (path) {
    case 'project':
      return 0;
    case 'estimate':
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

export const ProjectDetailSP = () => {
  /* Hooks */
  const dispatch = useDispatch();
  const query = useQuery('p');
  const { projectID } = useParams<{ projectID: string; }>();
  const projectInfo = useSelector((state: State) => state.project.project);

  const {
    estimateList, estimateSort,
    supportSort, supportList,
    fileSort, fileList,
    maintenanceSort, maintenanceList,
  } = useSelector((state: State) => state.projectDetail, isEqual);

  /* State */
  const [activeIndex, setActiveIndex] = useState(0);
  const listEle = useRef<HTMLDivElement>(null);

  const panes:{
    pane?: SemanticShorthandItem<TabPaneProps>
    menuItem?: any
    render?: () => React.ReactNode
  }[] = useMemo(() => [
    { menuItem: '案件情報', render: () => <Tab.Pane><ProjectInfoTabContentsSP /></Tab.Pane> },
    { menuItem: '見積', render: () => <Tab.Pane><EstimateListSP data={estimateList} /></Tab.Pane> },
    { menuItem: '対応履歴', render: () => <Tab.Pane><SupportHistoryListSP data={supportList} /></Tab.Pane> },
    { menuItem: 'ファイル', render: () => <Tab.Pane><FileListSP data={fileList} /></Tab.Pane> },
    { menuItem: 'メンテナンス', render: () => <Tab.Pane><MaintenanceListSP data={maintenanceList} /></Tab.Pane> },
  ], [estimateList, supportList, fileList, maintenanceList]);

  /* Callback */
  const getEstimateList = useCallback((data?:EstimateSortState) => {
    const sortData = data || estimateSort;
    dispatch(EstimateActions.api.estimate.getList({
      noLoad: true,
      param: {
        project_id: Number(projectID),
        quote_no: sortData.quote_no,
        quote_date: DateFormatter.date2str(sortData.quote_date),
        quote_creator: sortData.quote_creator,
        quote_price: sortData.quote_price,
        tax_amount_quote: sortData.tax_amount_quote,
        including_tax_total_quote: sortData.including_tax_total_quote,
        cost_sum: sortData.cost_sum,
        tax_amount_cost: sortData.tax_amount_cost,
        including_tax_total_cost: sortData.including_tax_total_cost,
        adjustment_amount: sortData.adjustment_amount,
        order_construction_start: DateFormatter.date2str(sortData.order_construction_start),
        order_construction_end: DateFormatter.date2str(sortData.order_construction_end),
        filter_by: sortData.filter_by,
        limit: 9999,
        highlow: sortData.highlow,
      },
      callback: (v) => {
        dispatch(ProjectDetailActions.setEstimateList(v));
      },
    }));
  }, [projectID, estimateSort]);

  const getSupportHistoryList = useCallback((data?:SupportHistorySortState) => {
    const sortData = data || supportSort;
    dispatch(SupportHistoryActions.api.supportHistory.getList({
      noLoad: true,
      param: {
        project_id: Number(projectID),
        is_fixed: sortData.is_fixed,
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
        dispatch(ProjectDetailActions.setSupportList(v));
      },
    }));
  }, [projectID, supportSort]);

  const getFileList = useCallback((data?:FileSortState) => {
    const sortData = data || fileSort;
    dispatch(FileActions.api.file.getList({
      noLoad: true,
      param: {
        project_id: Number(projectID),
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
        dispatch(ProjectDetailActions.setFileList(v));
      },
    }));
  }, [projectID, fileSort]);

  const getMaintenanceList = useCallback((data?:MaintenanceSortState) => {
    const sortData = data || maintenanceSort;
    dispatch(MaintenanceActions.api.maintenance.getList({
      noLoad: true,
      param: {
        project_id: Number(projectID),
        supported_kubun: sortData.supported_kubun === 1
          ? sortData.supported_kubun - 1
          : sortData.supported_kubun,
        maintenance_date: DateFormatter.date2str(sortData.maintenance_date),
        title: sortData.title,
        supported_date: DateFormatter.date2str(sortData.supported_date),
        filter_by: sortData.filter_by,
        limit: 9999,
        highlow: sortData.highlow,
      },
      callback: (v) => {
        dispatch(ProjectDetailActions.setMaintenanceList(v));
      },
    }));
  }, [projectID, maintenanceSort]);

  const handleClickEdit = useCallback(() => {
    dispatch(DialogActions.push({
      title: ProjectEditDialogTitle.update,
      element: <ProjectEditSP
        mode="update"
        projectID={projectInfo?.id}
      />,
    }));
  }, [projectInfo]);

  const handleClickEstimateEdit = useCallback(() => {
  //  dispatch(DialogActions.push({
  //     title: EstimateEditDialogTitle.add,
  //     element: <EstimateEditSP
  //       mode="add"
  //       projectData={projectInfo}
  //     />,
  //   }));  if (!projectInfo) return;

    let editId = NaN;
    if (!projectInfo) return;
    dispatch(DialogActions.push({
      title: '見積新規登録',
      className: 'estimate max_height_dialog max_width_dialog',
      onCloseClick: () => {
        if (editId) {
          dispatch(EstimateActions.api.id.delete({ project_id: editId }));
        }
      },
      element: <EstimateEditSP
        mode="add"
        callback={() => getEstimateList()}
        projectData={projectInfo}
        closeCallback={(v) => { editId = v; }}
      />,
    }));
  }, [projectInfo, getEstimateList]);

  const handleClickMaintenanceEdit = useCallback(() => {
    if (!projectInfo) return;
    dispatch(DialogActions.push({
      title: MaintenanceEditDialogTitle.add,
      element: <MaintenanceEditSP
        mode="add"
        projectData={projectInfo}
      />,
    }));
  }, [projectInfo]);

  const handleClickSort = useCallback((index: number) => {
    switch (index) {
      case 1:
        dispatch(DialogActions.push({
          title: reFindDialogTitle,
          element: <RefindEstimateSP callback={getEstimateList} />,
        }));
        break;

      case 2:
        dispatch(DialogActions.push({
          title: reFindDialogTitle,
          element: <RefindSupportHistorySP callback={getSupportHistoryList} />,
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
      const path = `${RoutingPath.projectDetail}/${projectID}?p=`;
      let id = '';
      switch (index) {
        case 0:
          id = 'project';
          break;
        case 1:
          id = 'estimate';
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
    [projectID],
  );

  /* Effect */
  useEffect(() => {
    const index = getActiveIndex(query || 'project');
    handleTabChange(index);
  }, [projectID, query]);

  useEffect(() => {
    const id = Number(projectID);

    if (activeIndex === 0) {
      dispatch(ProjectActions.api.project.get({
        noLoad: !!projectInfo,
        param: { id },
      }));
    }
    if (activeIndex === 1) {
      getEstimateList();
    }
    if (activeIndex === 2) {
      getSupportHistoryList();
    }
    if (activeIndex === 3) {
      getFileList();
    }
    if (activeIndex === 4) {
      getMaintenanceList();
    }
  }, [projectID, activeIndex]);

  useWillUnMount(() => {
    dispatch(ProjectActions.setProject(null));
  });

  useEffect(() => {
    listEle.current?.scrollTo(0, -10000);
  }, [activeIndex]);

  return (
    <BasePageSP searchBoxDialog={{ title: SearchBoxDialogTitle, element: <ProjectSearchBoxSP /> }}>
      <div className="detail_wrap">

        <div className="detail_header">
          {/* body header */}
          <div
            className="detail_header_inner"
            onClick={() => dispatch(goBack())}
          >
            <div
              className="detail_header_inner__back_btn"
            >
              <i className="fas fa-chevron-circle-left" />
            </div>
            <span className="detail_header_inner__label">
              {/* 案件詳細 */}
              {projectInfo?.name || '---'}
            </span>

          </div>

          <div className="detail_header_buttons">
            {activeIndex === 1 && (
              <LeftIconButton
                onClick={handleClickEstimateEdit}
                size="sm"
                color="secondary"
                fontAwesomeClass="fa fa-edit"
                label="見積登録"
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
              label="案件編集"
            />
          </div>
        </div>

        {/* body contents */}
        <div className="detail_body" ref={listEle}>
          <Tab
            onTabChange={(_, data) => handleTabChange(Number(data.activeIndex))}
            panes={panes}
            activeIndex={activeIndex}
          />
        </div>

        <DetailPageFooterSP
          url={`/#${RoutingPath.projectDetail}/${projectID}`}
          tel={projectInfo?.field_tel_no}
          type="project"
        />
      </div>
    </BasePageSP>
  );
};
