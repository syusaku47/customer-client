import {
  useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from '../../../../../ui/table/table';
import './csv-list-non-order.scss';
import { State } from '../../../../../../redux/root.reducer';
import { ExportCsvCollection } from '../../../../../../collection/export-csv/export-csv.collection';
import { CsvActions } from '../../../../../../redux/csv/csv.action';
import { CsvNotOrderType } from '../../../../../../type/csv/csv.type';

type Props = {
  callbackSelected: (selected: number[]) => void;
}
export const CsvListNonOrder = (props: Props) => {
  const { callbackSelected } = props;

  /* Hooks */
  const list = useSelector((state: State) => state.csv.nonOrderList);
  const dispatch = useDispatch();

  /* State */
  const [selected, setSelected] = useState<number[]>([]);

  /* Callback */
  const handleClick = useCallback((row: CsvNotOrderType) => {
    setSelected([list.findIndex((v) => v.project_id === row.project_id)]);
  }, [list]);

  const handleClickHeader = useCallback(
    (highlow:0 | 1, sort_by: number) => {
      dispatch(CsvActions.setNonOrderSort({ highlow, sort_by }));
    }, [],
  );

  const handleDbClick = useCallback((row:CsvNotOrderType) => {
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
            header={ExportCsvCollection.nonOrderHeader}
            onClickRow={handleClick}
            onDbClick={handleDbClick}
            sort={{ onClick: handleClickHeader }}
            onClickMulti={(v: CsvNotOrderType[]) => {
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
                v.construction_start_date,
                v.completion_end_date,
                v.completion_date,
                v.quote_price,
              ]
            ))}
          />
        </div>
      </div>
    </section>
  );
};
