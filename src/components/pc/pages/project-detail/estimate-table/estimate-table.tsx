import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { isEqual } from 'lodash';
import { Table } from '../../../../ui/table/table';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { ProjectCollection } from '../../../../../collection/project/project.collection';
import './estimate-table.scss';
import { State } from '../../../../../redux/root.reducer';
import { EstimateEditPC } from '../../estimate/edit/estimate-edit.pc';
import { RoutingPath } from '../../../../../routes/routing-pass';
import { LeftIconButton } from '../../../../ui/button/left-icon-button/left-icon-button';
import Ordered from '../../../../../asset/images/icon/ordered.svg';
import { EstimateActions } from '../../../../../redux/estimate/estimate.action';
import { ProjectDetailActions } from '../../../../../redux/project-detail/project-detail.action';
import { EstimateSortState, EstimateListType } from '../../../../../type/estimate/estimate.type';
import { RefindEstimateTable } from './refind-estimate-table/refind-estimate-table';
import { DateFormatter } from '../../../../../utilities/date-formatter';

export const EstimateTable = () => {
  /* Hooks */
  const dispatch = useDispatch();
  const sort = useSelector((state: State) => state.projectDetail.estimateSort, isEqual);
  const list = useSelector((state: State) => state.projectDetail.estimateList, isEqual);
  const project = useSelector((state: State) => state.project.project, isEqual);

  /* State */
  const [selected, setSelected] = useState<number[]>([]);

  /* Callback */

  const getList = useCallback((data?:EstimateSortState) => {
    const sortData = data || sort;
    if (project?.id) {
      dispatch(EstimateActions.api.estimate.getList({
        noLoad: true,
        param: {
          project_id: project.id,
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
    }
  }, [project?.id, sort]);

  const handleClickNew = useCallback(() => {
    let editId = NaN;
    if (!project) return;
    dispatch(DialogActions.push({
      title: '見積新規登録',
      className: 'estimate max_height_dialog max_width_dialog',
      onCloseClick: () => {
        if (editId) {
          dispatch(EstimateActions.api.id.delete({ project_id: editId }));
        }
      },
      element: <EstimateEditPC
        callback={() => getList()}
        projectData={project}
        closeCallback={(v) => { editId = v; }}
      />,
    }));
  }, [dispatch, getList, project]);

  const handleClickRow = useCallback((v:EstimateListType) => {
    const findIndex = list.findIndex((v2) => v2.id === v.id);
    if (findIndex !== -1) {
      setSelected([findIndex]);
    }
  }, [list]);

  const handleDbClickRow = useCallback((v:EstimateListType) => {
    const findIndex = list.findIndex((v2) => v2.id === v.id);
    if (findIndex !== -1) {
      setSelected([findIndex]);
    }
    dispatch(push(`${RoutingPath.estimateDetail}/${v.id}`));
  }, [list]);

  const handleClickSortDialog = useCallback(() => {
    dispatch(DialogActions.push({
      title: '絞込み',
      element: <RefindEstimateTable
        callback={(sortStates) => {
          getList(sortStates);
        }}
      />,
    }));
  }, [getList, sort]);

  const handleClickHeader = useCallback((highlow:0|1, filter_by:number) => {
    dispatch(ProjectDetailActions.setEstimateSort({
      highlow, filter_by,
    }));
  }, []);

  useEffect(() => {
    getList();
  }, [project?.id, sort.highlow, sort.filter_by]);

  return (
    <div className="detail_table_area">
      <div className="btn_box">
        <LeftIconButton
          label="新規見積作成"
          fontAwesomeClass="fas fa-edit"
          className="btn_search for_detail"
          size="sm"
          color="primary"
          onClick={handleClickNew}
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
          header={ProjectCollection.estimateListHeader}
          onClickRow={handleClickRow}
          onDbClick={handleDbClickRow}
          selectedTr={selected}
          sort={{
            // index: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
            onClick: handleClickHeader,
          }}
          rowDataList={list}
          lists={
            list.map((v) => (
              [
                v.order_flag
                  ? <img src={Ordered} alt="受注" title="受注" className="icon" />
                  : '',
                v.quote_no,
                DateFormatter.date2str(v.quote_date),
                v.quote_creator,
                v.quote_price.toLocaleString(),
                v.tax_amount_quote.toLocaleString(),
                v.including_tax_total_quote.toLocaleString(),
                v.cost_sum.toLocaleString(),
                v.tax_amount_cost.toLocaleString(),
                v.including_tax_total_cost.toLocaleString(),
                v.adjustment_amount.toLocaleString(),
                DateFormatter.date2str(v.order_construction_start),
                DateFormatter.date2str(v.order_construction_end),
              ]
            ))
        }
          option={{
            stringWidth: [
              { index: 0, width: 50 }, // 受注
              { index: 1, width: 100 }, // 見積番号
              { index: 2, width: 80 }, // 作成日
              // { index: 3, width: 50 }, // 見積作成者
              { index: 4, width: 150 }, // 見積金額
              { index: 5, width: 100 }, // 消費税額
              { index: 6, width: 150 }, // 税込合計見積
              { index: 7, width: 100 }, // 原価合計
              { index: 8, width: 100 }, // 消費税額
              { index: 9, width: 150 }, // 税税込合計原価
              { index: 10, width: 100 }, // 調整額
              { index: 11, width: 150 }, // 見積工期_開始
              { index: 12, width: 150 }, // 見積工期_終了
            ],
            tdAlign: [
              { index: 0, align: 'center' },
              { index: 1, align: 'center' },
              { index: 2, align: 'center' },
              { index: 3, align: 'center' },
              { index: 4, align: 'right' },
              { index: 5, align: 'right' },
              { index: 6, align: 'right' },
              { index: 7, align: 'right' },
              { index: 8, align: 'right' },
              { index: 9, align: 'right' },
              { index: 10, align: 'right' },
              { index: 11, align: 'center' },
              { index: 12, align: 'center' },
            ],
          }}
        />
      </div>
    </div>
  );
};
