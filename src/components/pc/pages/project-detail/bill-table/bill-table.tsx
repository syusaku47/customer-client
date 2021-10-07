import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { BillListType, BillSortState } from '../../../../../type/bill/bill.type';
import { Table } from '../../../../ui/table/table';
import { State } from '../../../../../redux/root.reducer';
import { LeftIconButton } from '../../../../ui/button/left-icon-button/left-icon-button';
import { BillActions } from '../../../../../redux/bill/bill.action';
/* import { RefindBillTable } from './refind-bill-table/refind-bill-table';*/
import { ProjectDetailActions } from '../../../../../redux/project-detail/project-detail.action';
import { BillEdit } from '../../../../dialogs/bill-edit/bill-edit';
import { BillCollection } from '../../../../../collection/bill/bill.collection';
import Printer from '../../../../../asset/images/icon/printer.svg';

export const BillTable = () => {
  /* Hook */
  const dispatch = useDispatch();
  const sort = useSelector((state: State) => state.projectDetail.billSort, isEqual);
  const list = useSelector((state: State) => state.projectDetail.billList, isEqual);
  const project = useSelector((state: State) => state.project.project);

  /* State */
  const [selected, setSelected] = useState<number[]>([]);

  /* Callback */
  const getList = useCallback((data?: BillSortState) => {
    // eslint-disable-next-line
    const sortData = data || sort;
    if (project?.id) {
      dispatch(BillActions.api.bill.getList({
        noLoad: true,
        param: {},
        onSuccess: (v) => {
          dispatch(ProjectDetailActions.setBillList(v || []));
        },
      }));
    }
  }, [project?.id, sort]);

  const handleClickEdit = useCallback((v?: BillListType) => {
    if (!project) return;
    dispatch(DialogActions.push({
      title: '請求書編集',
      element: <BillEdit
        data={v}
        callback={() => { }}
      />,
    }));
  },
  [project, getList]);

  const handleClickRow = useCallback((v: BillListType) => {
    const findIndex = list.findIndex((v2) => v2.id === v.id);
    if (findIndex !== -1) {
      setSelected([findIndex]);
    }
  }, [list]);

  const handleDbClickRow = useCallback((v: BillListType) => {
    const findIndex = list.findIndex((v2) => v2.id === v.id);
    if (findIndex !== -1) {
      setSelected([findIndex]);
    }
    handleClickEdit(v);
    // dispatch(push(`${RoutingPath.projectDetail}/${v.id}`));
  }, [list, handleClickEdit]);

  useEffect(() => {
    getList();
  }, [project?.id, sort.highlow, sort.filter_by]);

  const handleClickHeader = useCallback((highlow: 0 | 1, filter_by: number) => {
    dispatch(ProjectDetailActions.setBillSort({
      highlow, filter_by,
    }));
  }, []);
  /*
  const handleClickSortDialog = useCallback(() => {
    dispatch(DialogActions.push({
      title: '絞込み',
      element: <RefindBillTable
        callback={(sortStates) => {
          getList(sortStates);
        }}
      />,
    }));
  }, [getList, sort]);
  */

  return (
    <div className="detail_table_area">
      <div className="btn_box right">
        <LeftIconButton
          label="新規請求登録"
          fontAwesomeClass="fas fa-edit"
          className="btn_search for_detail"
          size="sm"
          color="primary"
          disabled
          onClick={() => handleClickEdit()}
        />
        <LeftIconButton
          label="請求書印刷（簡易版）"
          fontAwesomeClass="fas fa-file-invoice"
          size="md"
          color="secondary"
          /* disabled= {!estimate} */
          /* onClick={() => handleClickPrint('claim')}*/
          disabled
          onClick={() => {}}
        />
        <LeftIconButton
          label="請求書印刷（明細付）"
          fontAwesomeClass="fas fa-file-invoice"
          size="md"
          color="secondary"
          /* disabled={!estimate}*/
          /* onClick={() => handleClickPrint('claimIn')}*/
          disabled
          onClick={() => {}}
        />
      </div>
      <div className="table_responsive">
        <Table
          className="table_selectable table_sortable table_sticky"
          header={BillCollection.header}
          onClickRow={handleClickRow}
          onDbClick={handleDbClickRow}
          sort={{ onClick: handleClickHeader }}
          selectedTr={selected}
          rowDataList={list}
          lists={[
            [
              <img src={Printer} alt="印刷済み" title="印刷済み" className="icon" />,
              '契約金',
              '2021/9/03',
              '2021/10/03',
              '324,000',
              '入金方法が入る',
              '',
            ],
          ]}
          option={{
            stringWidth: [
              { index: 0, width: 50 }, // 請求書印刷有無
              { index: 1, width: 150 }, // 請求項目
              { index: 2, width: 150 }, // 請求日
              { index: 3, width: 150 }, // 入金予定日
              { index: 4, width: 150 }, // 請求金額
              { index: 5, width: 300 }, // 入金方法
              // { index: 6, width: 200 }, // （備考 or 余白）
            ],
            tdAlign: [
              { index: 0, align: 'center' },
              { index: 1, align: 'center' },
              { index: 2, align: 'center' },
              { index: 3, align: 'center' },
              { index: 4, align: 'right' },
              { index: 5, align: 'left' },
              // { index: 6, align: 'left' },
            ],
          }}
        />
      </div>
    </div>
  );
};
