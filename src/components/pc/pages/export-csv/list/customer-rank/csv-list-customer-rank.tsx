import {
  useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from '../../../../../ui/table/table';
import './csv-list-customer-rank.scss';
import { State } from '../../../../../../redux/root.reducer';
import { ExportCsvCollection } from '../../../../../../collection/export-csv/export-csv.collection';
import { CsvActions } from '../../../../../../redux/csv/csv.action';
import { CsvCustomerRankType } from '../../../../../../type/csv/csv.type';

type Props = {
  callbackSelected: (selected: number[]) => void;
}

export const CsvListCustomerRank = (props: Props) => {
  const { callbackSelected } = props;

  /* Hooks */
  const list = useSelector((state: State) => state.csv.customerRankList);
  const dispatch = useDispatch();

  /* State */
  const [selected, setSelected] = useState<number[]>([]);

  /* Callback */
  const handleClick = useCallback((row: CsvCustomerRankType) => {
    setSelected([list.findIndex((v) => v.customer_id === row.customer_id)]);
  }, [list]);

  const handleClickHeader = useCallback(
    (highlow:0 | 1, sort_by: number) => {
      dispatch(CsvActions.setCustomerRankSort({ highlow, sort_by }));
    }, [],
  );

  const handleDbClick = useCallback((row:CsvCustomerRankType) => {
    // dispatch(push(`${RoutingPath.customerDetail}/${row.customer_id}`));
    setSelected([list.findIndex((v) => v.customer_id === row.customer_id)]);
  },
  [list]);

  useEffect(() => {
    callbackSelected(selected);
  }, [selected]);

  return (
    <section className="result_area list_area">
      <div className="inner">
        <div className="table_responsive">
          <Table
            className="table_selectable table_sortable table_sticky"
            header={ExportCsvCollection.customerRankHeader}
            onClickRow={handleClick}
            onDbClick={handleDbClick}
            sort={{ onClick: handleClickHeader }}
            onClickMulti={(v: CsvCustomerRankType[]) => {
              setSelected(v.map((v2) => list.findIndex((v3) => v3.customer_id === v2.customer_id)));
            }}
            rowDataList={list}
            selectedTr={selected}
            lists={list.map((v) => (
              [
                v.no,
                v.customer_id,
                v.customer_name,
                v.sales_contact,
                v.customer_rank_before_change,
                v.customer_rank_after_change,
                v.work_price,
                v.work_times,
                v.last_completion_date,
                v.updated_date,
              ]
            ))}
          />
        </div>
      </div>
    </section>
  );
};
