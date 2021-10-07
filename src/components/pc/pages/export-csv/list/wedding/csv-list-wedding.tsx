import {
  useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from '../../../../../ui/table/table';
import './csv-list-wedding.scss';
import { State } from '../../../../../../redux/root.reducer';
import { CsvActions } from '../../../../../../redux/csv/csv.action';
import { CsvWeddingAnniversaryListType } from '../../../../../../type/csv/csv.type';
import { ExportCsvCollection } from '../../../../../../collection/export-csv/export-csv.collection';

type Props = {
  callbackSelected: (selected: number[]) => void;
}
export const CsvListWedding = (props: Props) => {
  const { callbackSelected } = props;

  /* Hooks */
  const list = useSelector((state: State) => state.csv.weddingList);
  const dispatch = useDispatch();

  /* State */
  const [selected, setSelected] = useState<number[]>([]);

  /* Callback */
  const handleClick = useCallback((row: CsvWeddingAnniversaryListType) => {
    setSelected([list.findIndex((v) => v.customer_id === row.customer_id)]);
  }, [list]);

  const handleClickHeader = useCallback(
    (highlow:0 | 1, sort_by: number) => {
      dispatch(CsvActions.setWeddingSort({ highlow, sort_by }));
    }, [],
  );

  const handleDbClick = useCallback((row:CsvWeddingAnniversaryListType) => {
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
            header={ExportCsvCollection.weddingHeader}
            onClickRow={handleClick}
            onDbClick={handleDbClick}
            sort={{ onClick: handleClickHeader }}
            onClickMulti={(v: CsvWeddingAnniversaryListType[]) => {
              setSelected(v.map((v2) => list.findIndex((v3) => v3.customer_id === v2.customer_id)));
            }}
            rowDataList={list}
            selectedTr={selected}
            lists={list.map((v) => (
              [
                v.customer_id,
                v.customer_name,
                v.wedding_anniversary,
                v.post_no,
                v.prefecture,
                v.address,
                v.tel_no,
                v.sales_contact,
              ]
            ))}
          />
        </div>
      </div>
    </section>
  );
};
