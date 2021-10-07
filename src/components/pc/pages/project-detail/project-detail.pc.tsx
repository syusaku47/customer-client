import { goBack, replace } from 'connected-react-router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Tab } from 'semantic-ui-react';
import { useWillUnMount } from '../../../../hooks/life-cycle';
import { ProjectActions } from '../../../../redux/project/project.action';
import { RoutingPath } from '../../../../routes/routing-pass';
import { BasePagePC } from '../base.page.pc';
import './project-detail.pc.scss';
import { EstimateTable } from './estimate-table/estimate-table';
import { SupportHistoryTable } from './support-history-table/support-history-table';
import { FileTable } from './file-table/file-table';
import { MaintenanceTable } from './maintenance-table/maintenance-table';
import { ProjectEdit } from '../project/edit/project-edit';
import { useQuery } from '../../../../hooks/use-query';
import { LeftIconButton } from '../../../ui/button/left-icon-button/left-icon-button';
import { ProjectDetailActions } from '../../../../redux/project-detail/project-detail.action';
import { BillTable } from './bill-table/bill-table';
import { Resize } from '../../../ui/resize/resize';

const getActiveIndex = (path: string) => {
  switch (path) {
    case 'estimate':
      return 0;
    case 'bill':
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

export const ProjectDetailPC = () => {
  const panes = [
    { menuItem: '見積情報', render: () => <Tab.Pane><EstimateTable /></Tab.Pane> },
    { menuItem: '請求書', render: () => <Tab.Pane><BillTable /></Tab.Pane> },
    { menuItem: '対応履歴', render: () => <Tab.Pane><SupportHistoryTable /></Tab.Pane> },
    { menuItem: 'ファイル', render: () => <Tab.Pane><FileTable /></Tab.Pane> },
    { menuItem: 'メンテナンス', render: () => <Tab.Pane><MaintenanceTable /></Tab.Pane> },
  ];

  const dispatch = useDispatch();
  const listQuery = useQuery('p');

  const { projectID } = useParams<{ projectID: string; }>();

  /* State */
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabChange = useCallback(
    (index: number) => {
      const path = `${RoutingPath.projectDetail}/${projectID}?p=`;
      let id = '';
      switch (index) {
        case 0:
          id = 'estimate';
          break;
        case 1:
          id = 'bill';
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
    const index = getActiveIndex(listQuery || 'estimate');
    handleTabChange(index);
  }, [projectID, listQuery]);

  useWillUnMount(() => {
    dispatch(ProjectActions.setProject(null));
    dispatch(ProjectDetailActions.setEstimateList([]));
    dispatch(ProjectDetailActions.setEstimateSort(null));
    dispatch(ProjectDetailActions.setSupportList([]));
    dispatch(ProjectDetailActions.setSupportSort(null));
    dispatch(ProjectDetailActions.setFileList([]));
    dispatch(ProjectDetailActions.setFileSort(null));
    dispatch(ProjectDetailActions.setMaintenanceList([]));
    dispatch(ProjectDetailActions.setMaintenanceSort(null));
  });

  return (
    <BasePagePC>
      <div id="project" className="cnt_area detail">
        <div className="inner">
          <Resize enabled={{ bottom: true }}>
            <ProjectEdit
              mode="update"
              projectID={Number(projectID)}
            />
          </Resize>
          <div className="tab_area">
            <Tab
              onTabChange={(_, data) => handleTabChange(Number(data.activeIndex))}
              panes={panes}
              activeIndex={activeIndex}
            />
          </div>
        </div>
      </div>
      <footer className="btn_area">
        <div className="left_box" />
        <div className="right_box">
          <LeftIconButton
            label="戻る"
            fontAwesomeClass="fas fa-arrow-left"
            size="md"
            color="dark"
            onClick={() => dispatch(goBack())}
          />
        </div>
      </footer>
    </BasePagePC>
  );
};
