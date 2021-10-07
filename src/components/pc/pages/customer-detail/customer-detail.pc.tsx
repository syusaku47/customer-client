import { replace, goBack } from 'connected-react-router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Tab } from 'semantic-ui-react';
import { useWillUnMount } from '../../../../hooks/life-cycle';
import { CustomerActions } from '../../../../redux/customer/customer.action';
import { RoutingPath } from '../../../../routes/routing-pass';
import { BasePagePC } from '../base.page.pc';
import { CustomerEdit } from '../customer/edit/customer-edit';
import './customer-detail.pc.scss';
import { FileTable } from './tables/file-table/file-table';
import { MaintenanceTable } from './tables/maintenance-table/maintenance-table';
import { ProjectInformationTable } from './tables/project-information-table/project-information-table';
import { SupportHistoryTable } from './tables/support-history-table/support-history-table';
import { useQuery } from '../../../../hooks/use-query';
import { LeftIconButton } from '../../../ui/button/left-icon-button/left-icon-button';
import { ProjectActions } from '../../../../redux/project/project.action';
import { CustomerDetailActions } from '../../../../redux/customer-detail/customer-detail.action';
import { Resize } from '../../../ui/resize/resize';

const getActiveIndex = (path: string) => {
  switch (path) {
    case 'project':
      return 0;
    case 'support-history':
      return 1;
    case 'file':
      return 2;
    case 'maintenance':
      return 3;
    default:
      return 0;
  }
};

export const CustomerDetailPC = () => {
  const panes = [
    { menuItem: '案件情報', render: () => <Tab.Pane><ProjectInformationTable /></Tab.Pane> },
    { menuItem: '対応履歴', render: () => <Tab.Pane><SupportHistoryTable /></Tab.Pane> },
    { menuItem: 'ファイル', render: () => <Tab.Pane><FileTable /></Tab.Pane> },
    { menuItem: 'メンテナンス', render: () => <Tab.Pane><MaintenanceTable /></Tab.Pane> },
  ];

  const dispatch = useDispatch();
  const listQuery = useQuery('p');

  const { customerID } = useParams<{ customerID: string;}>();

  /* State */
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabChange = useCallback(
    (index: number) => {
      const path = `${RoutingPath.customerDetail}/${customerID}?p=`;
      let id = '';
      switch (index) {
        case 0:
          id = 'project';
          break;
        case 1:
          id = 'support-history';
          break;
        case 2:
          id = 'file';
          break;
        case 3:
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
    const index = getActiveIndex(listQuery || 'project');
    handleTabChange(index);
  }, [customerID, listQuery]);

  useWillUnMount(() => {
    dispatch(CustomerActions.setCustomer(null));
    dispatch(ProjectActions.setDetailSort(null));
    dispatch(ProjectActions.setList([]));
    dispatch(CustomerDetailActions.setProjectList([]));
    dispatch(CustomerDetailActions.setProjectSort(null));
    dispatch(CustomerDetailActions.setSupportList([]));
    dispatch(CustomerDetailActions.setSupportSort(null));
    dispatch(CustomerDetailActions.setFileList([]));
    dispatch(CustomerDetailActions.setFileSort(null));
    dispatch(CustomerDetailActions.setMaintenanceList([]));
    dispatch(CustomerDetailActions.setMaintenanceSort(null));
  });

  return (
    <BasePagePC>
      <div id="customer" className="cnt_area detail">
        <div className="inner">
          <Resize enabled={{ bottom: true }}>
            <CustomerEdit
              mode="update"
              customerID={Number(customerID)}
              callback={() => {}}
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
