import {
  useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from '../../../../../ui/table/table';
import './csv-list-lost-order.scss';
import { State } from '../../../../../../redux/root.reducer';
import { ExportCsvCollection } from '../../../../../../collection/export-csv/export-csv.collection';
import { CsvLostOrderType } from '../../../../../../type/csv/csv.type';
import { CsvActions } from '../../../../../../redux/csv/csv.action';

type Props = {
  callbackSelected: (selected: number[]) => void;
}
export const CsvListLostOrder = (props: Props) => {
  const { callbackSelected } = props;

  /* Hooks */
  const list = useSelector((state: State) => state.csv.lostOrderList);
  const dispatch = useDispatch();

  /* State */
  const [selected, setSelected] = useState<number[]>([]);

  /* Callback */
  const handleClick = useCallback((row: CsvLostOrderType) => {
    setSelected([list.findIndex((v) => v.project_id === row.project_id)]);
  }, [list]);

  const handleClickHeader = useCallback(
    (highlow:0 | 1, sort_by: number) => {
      dispatch(CsvActions.setLostOrderSort({ highlow, sort_by }));
    }, [],
  );

  const handleDbClick = useCallback((row:CsvLostOrderType) => {
    // dispatch(push(`${RoutingPath.customerDetail}/${row.project_id}`));
    setSelected([list.findIndex((v) => v.project_id === row.project_id)]);
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
            header={ExportCsvCollection.lostOrderHeader}
            onClickRow={handleClick}
            onDbClick={handleDbClick}
            sort={{ onClick: handleClickHeader }}
            onClickMulti={(v: CsvLostOrderType[]) => {
              setSelected(v.map((v2) => list.findIndex((v3) => v3.project_id === v2.project_id)));
            }}
            rowDataList={list}
            selectedTr={selected}
            lists={list.map((v) => (
              [
                v.project_id,
                v.project_name,
                v.customer_name,
                v.field_place,
                v.field_tel_no,
                v.customer_rank,
                v.project_representative,
                v.failure_id,
                v.failure_cause,
                v.quote_price]
            ))}
          />
        </div>
      </div>
    </section>
  );
};
