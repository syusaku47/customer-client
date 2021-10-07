import {
  useCallback, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as lodash from 'lodash';
import { push } from 'connected-react-router';
import { Table } from '../../../../../ui/table/table';
import './estimate-list.pc.scss';
import { State } from '../../../../../../redux/root.reducer';
import { EstimateListType } from '../../../../../../type/estimate/estimate.type';
import { EstimateCollection } from '../../../../../../collection/estimate/estimatecollection';
import { EstimateActions } from '../../../../../../redux/estimate/estimate.action';
import { RoutingPath } from '../../../../../../routes/routing-pass';
import { DateFormatter } from '../../../../../../utilities/date-formatter';
import { MathHelper } from '../../../../../../utilities/math-helper';
import Ordered from '../../../../../../asset/images/icon/ordered.svg';

type Props = {
  selectedTr?: number[];
  data?: EstimateListType[];
  handleCardClick?: (estimate: EstimateListType) => void;
}

export const EstimateListPC = (props: Props) => {
  const {
    data, handleCardClick, selectedTr,
  } = props;

  /* Hooks */
  const estimateList = useSelector((state: State) => state.estimate.list, lodash.isEqual);
  const dispatch = useDispatch();

  /* State */
  const [selected, setSelected] = useState<number[]>([]);

  /* List */
  const dataList = useMemo(() => data || estimateList, [estimateList, data]);

  /* Callback */
  const handleDbClick = useCallback(
    (v: EstimateListType) => {
      // if (handleCardClick) return;
      setSelected([dataList.findIndex((v2) => v2.id === v.id)]);
      dispatch(push(`${RoutingPath.estimateDetail}/${v.id}`));
    },
    [handleCardClick, dataList],
  );

  const handleClick = useCallback((row: EstimateListType) => {
    if (handleCardClick) {
      const findData = dataList?.find((v) => v.id === row.id);
      if (findData) handleCardClick(findData);
    }
    setSelected([dataList.findIndex((v) => v.id === row.id)]);
  }, [dataList, handleCardClick, dataList]);

  const handleClickHeader = useCallback(
    (highlow: 0 | 1, sort_by: number) => {
      dispatch(EstimateActions.setSort({ highlow, sort_by }));
    }, [],
  );

  return (
    <section className="result_area list_area">
      <div className="inner">
        <div className="table_responsive">
          <Table
            className="table_selectable table_sortable table_sticky"
            header={EstimateCollection.estimateHeader}
            onClickRow={handleClick}
            onDbClick={handleDbClick}
            sort={{ onClick: handleClickHeader }}
            selectedTr={selectedTr ?? selected}
            rowDataList={dataList}
            onClickMulti={(v: EstimateListType[]) => {
              setSelected(v.map((v2) => dataList.findIndex((v3) => v3.id === v2.id)));
            }}
            lists={dataList.map((v) => (
              [
                v.order_flag ? <img src={Ordered} alt="受注見積" title="受注見積" className="icon" /> : '',
                v.quote_no,
                DateFormatter.date2str(v.quote_date),
                v.field_name,
                v.project_name,
                v.project_representative_name,
                v.quote_creator,
                v.quote_price ? `${MathHelper.rounding(v.quote_price, 0).toLocaleString()}` : '',
                v.tax_amount_quote ? `${MathHelper.rounding(v.tax_amount_quote, 0).toLocaleString()}` : '',
                v.including_tax_total_quote ? `${MathHelper.rounding(v.including_tax_total_quote, 0).toLocaleString()}` : '',
                v.cost_sum ? `${MathHelper.rounding(v.cost_sum, 0).toLocaleString()}` : '',
                v.tax_amount_cost ? `${MathHelper.rounding(v.tax_amount_cost, 0).toLocaleString()}` : '',
                v.including_tax_total_cost ? `${MathHelper.rounding(v.including_tax_total_cost, 0).toLocaleString()}` : '',
                v.adjustment_amount ? `${MathHelper.rounding(v.adjustment_amount, 0).toLocaleString()}` : '',
                DateFormatter.date2str(v.order_construction_start),
                DateFormatter.date2str(v.order_construction_end),
              ]
            ))}
            option={{
              stringWidth: [
                { index: 0, width: 50 }, // 受注見積
                // { index: 1, width: 100 }, // 見積番号
                // { index: 2, width: 50 }, // 見積日
                // { index: 3, width: 50 }, //  現場名称
                // { index: 4, width: 50 }, // 案件名
                // { index: 5, width: 50 }, // 案件担当者
                // { index: 6, width: 50 }, // 見積作成者
                // { index: 7, width: 50 }, // 見積金額
                // { index: 8, width: 50 }, // 消費税額
                // { index: 9, width: 50 }, // 税込合計見積
                // { index: 10, width: 50 }, // 原価合計
                // { index: 11, width: 50 }, // 消費税額
                // { index: 12, width: 50 }, // 税込合計原価
                // { index: 13, width: 50 }, // 調整額
                // { index: 14, width: 50 }, // 受注工期_開始
                // { index: 15, width: 50 }, // 受注工期_終了
              ],
              tdAlign: [
                { index: 0, align: 'center' },
                { index: 1, align: 'center' },
                { index: 2, align: 'center' },
                { index: 3, align: 'left' },
                { index: 4, align: 'left' },
                { index: 5, align: 'left' },
                { index: 6, align: 'left' },
                { index: 7, align: 'right' },
                { index: 8, align: 'right' },
                { index: 9, align: 'right' },
                { index: 10, align: 'right' },
                { index: 11, align: 'right' },
                { index: 12, align: 'right' },
                { index: 13, align: 'right' },
                { index: 14, align: 'center' },
                { index: 15, align: 'center' },
              ],
            }}
          />
        </div>
      </div>
    </section>
  );
};
