import { cloneDeep } from 'lodash';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { EstimateActions } from '../../../../../redux/estimate/estimate.action';
import { EstimateListType } from '../../../../../type/estimate/estimate.type';
import { DateFormatter } from '../../../../../utilities/date-formatter';
import { MathHelper } from '../../../../../utilities/math-helper';
import { Table } from '../../../../ui/table/table';

const header = [
  '見積番号',
  '作成日',
  '見積作成者',
  '見積金額',
  '消費税額',
  '税込合計見積',
  '原価合計',
  '消費税額',
  '税込合計原価',
  '調整額',
  '見積工期_開始',
  '見積工期_終了',
];

type Props = {
  list: EstimateListType[];
  callback: (v: EstimateListType) => void;
}

export const EstimateListInSearch = (props:Props) => {
  const { list, callback } = props;

  /* Hooks */
  const dispatch = useDispatch();

  /* State */
  const [selected, setSelected] = useState<number[]>([]);

  /* Callback */
  const handleClick = useCallback((row: EstimateListType) => {
    setSelected([list.findIndex((v) => v.id === row.id)]);
    callback(cloneDeep(row));
  }, [list]);

  /* ヘッダーソーロ */
  const handleClickHeader = useCallback((highlow: 0 | 1, sort_by: number) => {
    const sortBy = sort_by + 1;
    dispatch(EstimateActions.setEstimateSearchSort({ highlow, filter_by: sortBy }));
  }, []);

  return (
    <div className="result_area">
      <div className="inner">
        <div className="table_responsive">
          <Table
            className="table_selectable table_sortable table_sticky"
            header={header}
            selectedTr={selected}
            rowDataList={list}
            onClickRow={handleClick}
            sort={{ onClick: handleClickHeader }}
            lists={list.map((v) => ([
              v.quote_no,
              DateFormatter.date2str(v.quote_date),
              v.quote_creator,
              v.quote_price ? `¥${MathHelper.rounding(v.quote_price, 0).toLocaleString()}` : '',
              v.tax_amount_quote ? `¥${MathHelper.rounding(v.tax_amount_quote, 0).toLocaleString()}` : '',
              v.including_tax_total_quote ? `¥${MathHelper.rounding(v.including_tax_total_quote, 0).toLocaleString()}` : '',
              v.cost_sum ? `¥${MathHelper.rounding(v.cost_sum, 0).toLocaleString()}` : '',
              v.tax_amount_cost ? `¥${MathHelper.rounding(v.tax_amount_cost, 0).toLocaleString()}` : '',
              v.including_tax_total_cost ? `¥${MathHelper.rounding(v.including_tax_total_cost, 0).toLocaleString()}` : '',
              v.adjustment_amount ? `¥${MathHelper.rounding(v.adjustment_amount, 0).toLocaleString()}` : '',
              DateFormatter.date2str(v.order_construction_start),
              DateFormatter.date2str(v.order_construction_end),
            ]))}
          />
        </div>
      </div>
    </div>
  );
};
