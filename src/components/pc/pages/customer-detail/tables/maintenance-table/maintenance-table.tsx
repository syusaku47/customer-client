import { useDispatch, useSelector } from 'react-redux';
// import { Button } from '../../../../../ui/button/button';
import { useCallback, useEffect, useState } from 'react';
import { isEqual } from 'lodash';
import { Table } from '../../../../../ui/table/table';
import { CustomerCollection } from '../../../../../../collection/customer/customer.collection';
import { DialogActions } from '../../../../../../redux/dialog/dialog.action';
import { LeftIconButton } from '../../../../../ui/button/left-icon-button/left-icon-button';
import { State } from '../../../../../../redux/root.reducer';
import { MaintenanceEditPC } from '../../../maintenance/edit/maintenance-edit.pc';
import Alert from '../../../../../../asset/images/icon/alert.svg';
import Deposite from '../../../../../../asset/images/icon/deposite.svg';
import { MaintenanceSortState, MaintenanceList } from '../../../../../../type/maintenance/maintenance.type';
import { MaintenanceActions } from '../../../../../../redux/maintenance/maintenance.action';
import { CustomerDetailActions } from '../../../../../../redux/customer-detail/customer-detail.action';
import { RefindMaintenanceTable } from './refind-maintenance-table/refind-maintenance-table';
import { DateFormatter } from '../../../../../../utilities/date-formatter';

export const MaintenanceTable = () => {
  /* Hook */
  const dispatch = useDispatch();
  const sort = useSelector((state: State) => state.customerDetail.maintenanceSort, isEqual);
  const list = useSelector((state: State) => state.customerDetail.maintenanceList, isEqual);
  const customer = useSelector((state: State) => state.customer.customer, isEqual);

  /* State */
  const [selected, setSelected] = useState<number[]>([]);

  /* Callback */
  const getList = useCallback((data?:MaintenanceSortState) => {
    const sortData = data || sort;
    if (customer?.id) {
      dispatch(MaintenanceActions.api.maintenance.getList({
        noLoad: true,
        param: {
          customer_id: customer.id,
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
    }
  }, [customer?.id, sort]);

  const handleClickEdit = useCallback((v?:MaintenanceList) => {
    if (!customer) return;
    dispatch(DialogActions.push({
      title: 'メンテナンス情報入力',
      className: 'maintenance',
      element: <MaintenanceEditPC
        callbackGetList={getList}
        mode={v ? 'update' : 'add'}
        id={v?.id}
        customerData={customer}
      />,
    }));
  }, [customer]);

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
    // dispatch(push(`${RoutingPath.projectDetail}/${v.id}`));
  }, [list, handleClickEdit]);

  useEffect(() => {
    getList();
  }, [customer?.id, sort.highlow, sort.filter_by]);

  const handleClickHeader = useCallback((highlow:0|1, filter_by:number) => {
    dispatch(CustomerDetailActions.setFileSort({
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
          header={CustomerCollection.maintenanceHeader}
          onClickRow={handleClickRow}
          onDbClick={handleDbClickRow}
          sort={{
            index: [0, 1, 2, 3, 4, 5, 6, 7, 8],
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
              v.project_name,
              DateFormatter.date2str(v.construction_date),
              DateFormatter.date2str(v.completion_date),
              v.quote_creator,
              DateFormatter.date2str(v.maintenance_date),
              v.title,
              DateFormatter.date2str(v.supported_date),
            ]
          ))}
          option={{
            stringWidth: [
              { index: 0, width: 50 }, // アラート
              { index: 1, width: 70 }, // 対応済
              // { index: 2, width: 70 }, // 案件名
              { index: 3, width: 100 }, // 着工日
              { index: 4, width: 100 }, // 完工日
              // { index: 5, width: 50 }, //  見積作成者
              { index: 6, width: 100 }, // メンテナンス日
              // { index: 7, width: 50 }, // タイトル
              { index: 8, width: 100 }, // 対応日
            ],
            tdAlign: [
              { index: 0, align: 'center' },
              { index: 1, align: 'center' },
              { index: 2, align: 'left' },
              { index: 3, align: 'center' },
              { index: 4, align: 'center' },
              { index: 5, align: 'left' },
              { index: 6, align: 'center' },
              { index: 7, align: 'left' },
              { index: 8, align: 'center' },
            ],
          }}
        />
      </div>
    </div>
  );
};
