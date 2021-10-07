import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { Table } from '../../../../ui/table/table';
import { MaintenanceList, MaintenanceSortState } from '../../../../../type/maintenance/maintenance.type';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { ProjectCollection } from '../../../../../collection/project/project.collection';
import { State } from '../../../../../redux/root.reducer';
import { MaintenanceEditPC } from '../../maintenance/edit/maintenance-edit.pc';
import { LeftIconButton } from '../../../../ui/button/left-icon-button/left-icon-button';
import Alert from '../../../../../asset/images/icon/alert.svg';
import Deposite from '../../../../../asset/images/icon/deposite.svg';
import { MaintenanceActions } from '../../../../../redux/maintenance/maintenance.action';
import { RefindMaintenanceTable } from './refind-maintenance-table/refind-maintenance-table';
import { DateFormatter } from '../../../../../utilities/date-formatter';
import { ProjectDetailActions } from '../../../../../redux/project-detail/project-detail.action';

export const MaintenanceTable = () => {
  /* Hook */
  const dispatch = useDispatch();
  const sort = useSelector((state: State) => state.projectDetail.maintenanceSort, isEqual);
  const list = useSelector((state: State) => state.projectDetail.maintenanceList, isEqual);
  const project = useSelector((state: State) => state.project.project, isEqual);

  /* State */
  const [selected, setSelected] = useState<number[]>([]);

  /* Callback */
  const getList = useCallback((data?:MaintenanceSortState) => {
    const sortData = data || sort;
    if (project?.id) {
      dispatch(MaintenanceActions.api.maintenance.getList({
        noLoad: true,
        param: {
          project_id: project.id,
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
    }
  }, [project?.id, sort]);

  const handleClickEdit = useCallback((v?:MaintenanceList) => {
    if (!project) return;
    dispatch(DialogActions.push({
      title: 'メンテナンス情報入力',
      className: 'maintenance',
      element: <MaintenanceEditPC
        callbackGetList={getList}
        mode={v ? 'update' : 'add'}
        projectData={v ? undefined : project}
        id={v?.id}
      />,
    }));
  }, [project]);

  const handleClickRow = useCallback((v:MaintenanceList) => {
    const findIndex = list.findIndex((v2) => v2.id === v.id);
    if (findIndex !== -1) {
      setSelected([findIndex]);
    }
  }, [list]);

  const handleDbClickRow = useCallback((v:MaintenanceList) => {
    const findIndex = list.findIndex((v2) => v2.id === v.id);
    if (findIndex !== -1) {
      setSelected([findIndex]);
    }
    handleClickEdit(v);
  }, [list, handleClickEdit]);

  useEffect(() => {
    getList();
  }, [project?.id, sort.highlow, sort.filter_by]);

  const handleClickHeader = useCallback((highlow:0|1, filter_by:number) => {
    dispatch(ProjectDetailActions.setFileSort({
      highlow, filter_by,
    }));
  }, []);

  const handleClickSortDialog = useCallback(() => {
    dispatch(DialogActions.push({
      title: '絞込み',
      element: <RefindMaintenanceTable
        callback={(sortStates) => {
          getList(sortStates);
        }}
      />,
    }));
  }, [getList, sort]);

  return (
    <div className="detail_table_area">
      <div className="btn_box">
        <LeftIconButton
          label="新規メンテナンス登録"
          fontAwesomeClass="fas fa-edit"
          className="btn_search for_detail"
          size="sm"
          color="primary"
          onClick={() => handleClickEdit()}
        />
        <LeftIconButton
          label="絞込み"
          fontAwesomeClass="fas fa-filter"
          className="btn_search for_detail"
          size="sm"
          color="secondary"
          onClick={handleClickSortDialog}
        />
      </div>
      <div className="table_responsive">
        <Table
          className="table_selectable table_sortable table_sticky"
          header={ProjectCollection.maintenance}
          onClickRow={handleClickRow}
          onDbClick={handleDbClickRow}
          sort={{
            index: [0, 1, 2, 3, 4, 5, 6, 7],
            onClick: handleClickHeader,
          }}
          selectedTr={selected}
          rowDataList={list}
          lists={list.map((v) => (
            [
              v.maintenance_past_flag
                ? <img src={Alert} alt="メンテナンス日を過ぎています" title="メンテナンス日を過ぎています" className="icon" />
                : '',
              v.fixed_flag
                ? <img src={Deposite} alt="対応済" title="対応済" className="icon" />
                : '',
              DateFormatter.date2str(v.maintenance_date),
              v.title,
              DateFormatter.date2str(v.supported_date),
              '',
            ]
          ))}
          option={{
            stringWidth: [
              { index: 0, width: 50 }, // メンテナンス日を過ぎています
              { index: 1, width: 70 }, // 対応済
              // { index: 2, width: 50 }, // メンテナンス日
              // { index: 3, width: 50 }, // タイトル
              // { index: 4, width: 50 }, //  対応日
            ],
            tdAlign: [
              { index: 0, align: 'center' },
              { index: 1, align: 'center' },
              { index: 2, align: 'center' },
              { index: 3, align: 'left' },
              { index: 4, align: 'center' },
            ],
          }}
        />
      </div>
    </div>
  );
};
