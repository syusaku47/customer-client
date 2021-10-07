import {
  useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { isEqual } from 'lodash';
import { Table } from '../../../../../ui/table/table';
import { CustomerCollection } from '../../../../../../collection/customer/customer.collection';
import { ProjectActions } from '../../../../../../redux/project/project.action';
import { State } from '../../../../../../redux/root.reducer';
import { ProjectListType, ProjectSortState } from '../../../../../../type/project/project.type';
import { DialogActions } from '../../../../../../redux/dialog/dialog.action';
import { LeftIconButton } from '../../../../../ui/button/left-icon-button/left-icon-button';
import { RoutingPath } from '../../../../../../routes/routing-pass';
import { ProjectAdd } from '../../../project/add/project-add';
import { DateFormatter } from '../../../../../../utilities/date-formatter';
import { MathHelper } from '../../../../../../utilities/math-helper';
import { RefindProjectInformationTable } from './refind-project-information-table/refind-project-information-table';
import { CustomerDetailActions } from '../../../../../../redux/customer-detail/customer-detail.action';

export const initialState = () => ({
  name: '',
  order_price: NaN,
  project_representative_name: '',
  ins_date: (null as Date | null),
  construction_date: (null as Date | null),
  completion_date: (null as Date | null),
  complete_date: (null as Date | null),
  source: NaN,
  contract_date: (null as Date | null),
  failure_date: (null as Date | null),
  cancel_date: (null as Date | null),
  remarks: '',
  field_post_no: '',
  filter_by: NaN,
});

export type InitialState = ReturnType<typeof initialState>

export const ProjectInformationTable = () => {
  /* Hooks */
  const dispatch = useDispatch();
  const sort = useSelector((state: State) => state.customerDetail.projectSort, isEqual);
  const list = useSelector((state: State) => state.customerDetail.projectList, isEqual);
  const customer = useSelector((state: State) => state.customer.customer, isEqual);

  /* State */
  const [selected, setSelected] = useState<number[]>([]);

  /* Callback */
  const getList = useCallback((data?:ProjectSortState) => {
    const sortData = data || sort;
    if (customer?.id) {
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
          filter_by: sortData.filter_by,
          customer_id: customer.id,
          limit: 9999,
          highlow: sortData.highlow,
        },
        onSuccess: (v) => {
          dispatch(CustomerDetailActions.setProjectList(v));
        },
      }));
    }
  }, [customer?.id, sort]);

  const handleClickRow = useCallback((v:ProjectListType) => {
    const findIndex = list.findIndex((v2) => v2.id === v.id);
    if (findIndex !== -1) {
      setSelected([findIndex]);
    }
  }, [list]);

  const handleDbClickRow = useCallback((v:ProjectListType) => {
    const findIndex = list.findIndex((v2) => v2.id === v.id);
    if (findIndex !== -1) {
      setSelected([findIndex]);
    }
    dispatch(push(`${RoutingPath.projectDetail}/${v.id}`));
  }, [list]);

  const handleClickHeader = useCallback((highlow:0|1, filter_by:number) => {
    dispatch(CustomerDetailActions.setProjectSort({
      highlow, filter_by,
    }));
  }, []);

  const handleClickRegistration = useCallback(() => {
    if (!customer) return;
    dispatch(DialogActions.push({
      title: '案件登録',
      className: 'max_height_dialog',
      onCloseClick: () => {
        dispatch(DialogActions.clear());
      },
      element: <ProjectAdd
        customerData={customer}
        callback={getList}
      />,
    }));
  }, [customer, getList]);

  const handleClickSortDialog = useCallback(() => {
    dispatch(DialogActions.push({
      title: '絞込み',
      element: <RefindProjectInformationTable
        callback={(sortStates) => {
          getList(sortStates);
        }}
      />,
    }));
  }, [getList, sort]);

  /* 一覧取得 */
  useEffect(() => {
    getList();
  }, [customer?.id, sort.highlow, sort.filter_by]);

  return (
    <div className="detail_table_area">
      <div className="btn_box">
        <LeftIconButton
          label="新規案件作成"
          fontAwesomeClass="fas fa-edit"
          className="btn_search for_detail"
          size="sm"
          color="primary"
          onClick={handleClickRegistration}
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
          header={CustomerCollection.projectInfoHeader}
          selectedTr={selected}
          sort={{ onClick: handleClickHeader }}
          rowDataList={list}
          onClickRow={handleClickRow}
          onDbClick={handleDbClickRow}
          lists={
            list.map((v) => (
              [
                v.name,
                v.order_price ? `￥${MathHelper.rounding(v.order_price, 0).toLocaleString()}` : '',
                v.project_representative_name,
                DateFormatter.date2str(v.ins_date),
                DateFormatter.date2str(v.construction_date),
                DateFormatter.date2str(v.completion_date),
                DateFormatter.date2str(v.complete_date),
                v.source_name,
                DateFormatter.date2str(v.contract_date),
                DateFormatter.date2str(v.failure_date),
                DateFormatter.date2str(v.cancel_date),
                v.remarks,
              ]
            ))
          }
          option={{
            stringWidth: [
              { index: 0, width: 300 }, // 案件名
              // { index: 1, width: 100 }, // 受注金額（契約金額）
              // { index: 2, width: 50 }, // 案件担当者
              // { index: 3, width: 50 }, // 登録日
              // { index: 4, width: 50 }, // 着工日
              // { index: 5, width: 50 }, // 完工日
              // { index: 6, width: 50 }, // 完了日
              // { index: 7, width: 50 }, // 発生源
              // { index: 8, width: 50 }, // 契約日
              // { index: 9, width: 50 }, // 失注日
              // { index: 10, width: 50 }, // キャンセル日
              // { index: 11, width: 50 }, // 備考
            ],
            tdAlign: [
              { index: 0, align: 'left' },
              { index: 1, align: 'right' },
              { index: 2, align: 'left' },
              { index: 3, align: 'center' },
              { index: 4, align: 'center' },
              { index: 5, align: 'center' },
              { index: 6, align: 'center' },
              { index: 7, align: 'left' },
              { index: 8, align: 'center' },
              { index: 9, align: 'center' },
              { index: 10, align: 'center' },
              { index: 11, align: 'left' },
            ],
          }}
        />
      </div>
    </div>
  );
};
