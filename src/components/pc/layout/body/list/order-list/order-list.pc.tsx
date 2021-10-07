import {
  useCallback, useState,
} from 'react';
import { cloneDeep } from 'lodash';
import { Table } from '../../../../../ui/table/table';
import './order-list.pc.scss';
import { EstimateListType } from '../../../../../../type/estimate/estimate.type';
import { OrderCollection } from '../../../../../../collection/order/order.collection';
import { DateFormatter } from '../../../../../../utilities/date-formatter';
import Ordered from '../../../../../../asset/images/icon/ordered.svg';

type Props = {
  list: EstimateListType[];
  selectEstimate: EstimateListType | null;
  callback: (estimate: EstimateListType | null) => void;
  callbackSort: (estimate: { sort_by: number, highlow: number }) => void;
}

export const OrderListPC = (props: Props) => {
  const {
    list, callback, callbackSort, selectEstimate,
  } = props;

  /* State */
  const [selected, setSelected] = useState<number[]>([]);

  /* Callback */
  const handleClickRow = useCallback((v: EstimateListType) => {
    if (!v.id) {
      setSelected([]);
      callback(null);
      return;
    }
    callback(cloneDeep(v));
    const findIndex = list.findIndex((v2) => v2.id === v.id);
    if (findIndex !== -1) {
      setSelected([findIndex]);
    }
  },
  [callback, list]);

  return (
    <section className="list_area">
      <div className="inner">
        <div className="table_responsive">
          <Table
            className="table_selectable table_sortable table_sticky"
            header={OrderCollection.orderHeader}
            onClickRow={handleClickRow}
            sort={{ onClick: (highlow, sort_by) => callbackSort({ sort_by, highlow }) }}
            selectedTr={selected}
            rowDataList={list}
            lists={list.map((v) => (
              [
                selectEstimate?.id === v.id
                  ? <img src={Ordered} alt="見積選択" title="見積選択" className="icon" />
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
            ))}
            option={{
              stringWidth: [
                // { index: 0, width: 100 }, // 見積選択
                // { index: 1, width: 100 }, // 見積番号
                // { index: 2, width: 50 }, // 作成日
                // { index: 3, width: 50 }, //  見積作成者
                { index: 4, width: 150 }, // 見積金額
                { index: 5, width: 150 }, // 消費税額
                { index: 6, width: 150 }, // 税込合計見積
                { index: 7, width: 150 }, // 原価合計
                { index: 8, width: 150 }, // 消費税額
                { index: 9, width: 150 }, // 税込合計原価
                { index: 10, width: 150 }, // 調整額
                { index: 11, width: 150 }, // 見積工期_開始
                { index: 12, width: 150 }, // 見積工期_終了
              ],
              tdAlign: [
                { index: 0, align: 'center' },
                { index: 1, align: 'left' },
                { index: 2, align: 'left' },
                { index: 3, align: 'left' },
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
    </section>
  );
};
