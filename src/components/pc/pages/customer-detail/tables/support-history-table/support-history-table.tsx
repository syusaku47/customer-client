import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { Table } from '../../../../../ui/table/table';
import { CustomerCollection } from '../../../../../../collection/customer/customer.collection';
import { DialogActions } from '../../../../../../redux/dialog/dialog.action';
import { LeftIconButton } from '../../../../../ui/button/left-icon-button/left-icon-button';
import { SupportHistoryEditPC } from '../../../support-history/edit/support-history-edit.pc';
import { State } from '../../../../../../redux/root.reducer';
import Deposite from '../../../../../../asset/images/icon/deposite.svg';
import { CustomerDetailActions } from '../../../../../../redux/customer-detail/customer-detail.action';
import { SupportHistorySortState, SupportHistoryListType } from '../../../../../../type/support-history/support-history.type';
import { SupportHistoryActions } from '../../../../../../redux/support-history/support-history.action';
import { DateFormatter } from '../../../../../../utilities/date-formatter';
import { RefindSupportHistoryTable } from './refind-support-history-table/refind-support-history-table';

export const SupportHistoryTable = () => {
  const dispatch = useDispatch();

  /* Hooks */
  const sort = useSelector((state: State) => state.customerDetail.supportSort, isEqual);
  const list = useSelector((state: State) => state.customerDetail.supportList, isEqual);
  const customer = useSelector((state: State) => state.customer.customer);

  /* Callback */
  const [selected, setSelected] = useState<number[]>([]);

  const getList = useCallback((data?:SupportHistorySortState) => {
    const sortData = data || sort;
    if (customer?.id) {
      dispatch(SupportHistoryActions.api.supportHistory.getList({
        noLoad: true,
        param: {
          customer_id: customer.id,
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
    }
  }, [customer?.id, sort]);

  const handleClickEdit = useCallback((v?:SupportHistoryListType) => {
    if (!customer) return;
    dispatch(DialogActions.push({
      title: '対応履歴新規登録',
      className: 'support_history',
      element: <SupportHistoryEditPC
        id={v?.id}
        mode={v ? 'update' : 'add'}
        customerData={v ? undefined : customer}
        callback={getList}
      />,
    }));
  },
  [customer, getList]);

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
    dispatch(CustomerDetailActions.setSupportSort({
      highlow, filter_by,
    }));
  }, []);

  useEffect(() => {
    getList();
  }, [customer?.id, sort.highlow, sort.filter_by]);

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
          header={CustomerCollection.supportHistoryHeader}
          selectedTr={selected}
          sort={{ onClick: handleClickHeader }}
          rowDataList={list}
          onClickRow={handleClickRow}
          onDbClick={handleDbClickRow}
          lists={list.map((v) => (
            [
              v.fixed_flag ? <img src={Deposite} alt="対応済" title="対応済" className="icon" /> : '',
              v.project_name,
              DateFormatter.date2str(v.reception_time),
              v.category,
              v.supported_history_name,
              v.supported_person,
              DateFormatter.date2str(v.supported_complete_date),
            ]
          ))}
          option={{
            stringWidth: [
              { index: 0, width: 80 }, // 対応済
              // { index: 1, width: 100 }, // 案件名
              { index: 2, width: 100 }, // 日付日時
              // { index: 3, width: 50 }, //  カテゴリ
              // { index: 4, width: 50 }, // 件名
              { index: 5, width: 150 }, // 対応者
              { index: 6, width: 100 }, // 対応日
            ],
            tdAlign: [
              { index: 0, align: 'center' },
              { index: 1, align: 'left' },
              { index: 2, align: 'center' },
              { index: 3, align: 'left' },
              { index: 4, align: 'left' },
              { index: 5, align: 'left' },
              { index: 6, align: 'center' },
            ],
          }}
        />
      </div>
    </div>

  );
};
