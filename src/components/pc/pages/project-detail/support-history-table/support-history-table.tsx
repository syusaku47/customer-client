import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { isEqual } from 'lodash';
import { Table } from '../../../../ui/table/table';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { ProjectCollection } from '../../../../../collection/project/project.collection';
import { State } from '../../../../../redux/root.reducer';
import { SupportHistoryEditPC } from '../../support-history/edit/support-history-edit.pc';
import { LeftIconButton } from '../../../../ui/button/left-icon-button/left-icon-button';
import Deposite from '../../../../../asset/images/icon/deposite.svg';
import { SupportHistoryActions } from '../../../../../redux/support-history/support-history.action';
import { SupportHistorySortState, SupportHistoryListType } from '../../../../../type/support-history/support-history.type';
import { RefindSupportHistoryTable } from './refind-support-history-table/refind-support-history-table';
import { DateFormatter } from '../../../../../utilities/date-formatter';
import { ProjectDetailActions } from '../../../../../redux/project-detail/project-detail.action';

export const SupportHistoryTable = () => {
  const dispatch = useDispatch();

  /* Hooks */
  const sort = useSelector((state: State) => state.projectDetail.supportSort, isEqual);
  const list = useSelector((state: State) => state.projectDetail.supportList, isEqual);
  const project = useSelector((state: State) => state.project.project);

  /* Callback */
  const [selected, setSelected] = useState<number[]>([]);

  const getList = useCallback((data?:SupportHistorySortState) => {
    const sortData = data || sort;
    if (project?.id) {
      dispatch(SupportHistoryActions.api.supportHistory.getList({
        noLoad: true,
        param: {
          project_id: project.id,
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
    }
  }, [project?.id, sort]);

  const handleClickEdit = useCallback((v?:SupportHistoryListType) => {
    if (!project) return;
    dispatch(DialogActions.push({
      title: '対応履歴新規登録',
      className: 'support_history',
      element: <SupportHistoryEditPC
        id={v?.id}
        mode={v ? 'update' : 'add'}
        projectData={v ? undefined : project}
        callback={getList}
      />,
    }));
  },
  [project, getList]);

  const handleClickRow = useCallback((v:SupportHistoryListType) => {
    const findIndex = list.findIndex((v2) => v2.id === v.id);
    if (findIndex !== -1) {
      setSelected([findIndex]);
    }
  }, [list]);

  const handleDbClickRow = useCallback((v:SupportHistoryListType) => {
    const findIndex = list.findIndex((v2) => v2.id === v.id);
    if (findIndex !== -1) {
      setSelected([findIndex]);
    }
    handleClickEdit(v);
    // dispatch(push(`${RoutingPath.projectDetail}/${v.id}`));
  }, [list, handleClickEdit]);

  const handleClickHeader = useCallback((highlow:0|1, filter_by:number) => {
    dispatch(ProjectDetailActions.setSupportSort({
      highlow, filter_by,
    }));
  }, []);

  useEffect(() => {
    getList();
  }, [project?.id, sort.highlow, sort.filter_by]);

  const handleClickSortDialog = useCallback(() => {
    dispatch(DialogActions.push({
      title: '絞込み',
      element: <RefindSupportHistoryTable
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
          label="新規対応履歴登録"
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
          header={ProjectCollection.supportHistory}
          selectedTr={selected}
          sort={{
            index: [0, 1, 2, 3, 4, 5],
            onClick: handleClickHeader,
          }}
          rowDataList={list}
          onClickRow={handleClickRow}
          onDbClick={handleDbClickRow}
          lists={list.map((v) => (
            [
              v.fixed_flag ? <img src={Deposite} alt="対応済" title="対応済" className="icon" /> : '',
              DateFormatter.date2str(v.reception_time),
              v.category,
              v.supported_history_name,
              v.supported_person,
              DateFormatter.date2str(v.supported_complete_date),
              '',
            ]
          ))}
          option={{
            stringWidth: [
              { index: 0, width: 80 }, // 対応済
              { index: 1, width: 100 }, // 日付日時
              // { index: 2, width: 100 }, // カテゴリ
              // { index: 3, width: 50 }, //  件名
              // { index: 4, width: 50 }, // 対応者
              { index: 5, width: 100 }, // 対応日
            ],
            tdAlign: [
              { index: 0, align: 'center' },
              { index: 1, align: 'center' },
              { index: 2, align: 'left' },
              { index: 3, align: 'left' },
              { index: 4, align: 'left' },
              { index: 5, align: 'center' },
            ],
          }}
        />
      </div>
    </div>

  );
};
