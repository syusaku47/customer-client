import {
  useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from '../../../../../ui/table/table';
import './csv-list-support-history.scss';
import { State } from '../../../../../../redux/root.reducer';
import { ExportCsvCollection } from '../../../../../../collection/export-csv/export-csv.collection';
import { CsvActions } from '../../../../../../redux/csv/csv.action';
import { CsvSupportHistoryType } from '../../../../../../type/csv/csv.type';

type Props = {
  callbackSelected: (selected: number[]) => void;
}

export const CsvListSupportHistory = (props: Props) => {
  const { callbackSelected } = props;

  /* Hooks */
  const list = useSelector((state: State) => state.csv.supportHistoryList);
  const dispatch = useDispatch();

  /* State */
  const [selected, setSelected] = useState<number[]>([]);

  /* Callback */
  const handleClick = useCallback((row: CsvSupportHistoryType) => {
    setSelected([list.findIndex((v) => v.supported_id === row.supported_id)]);
  }, [list]);

  const handleClickHeader = useCallback(
    (highlow:0 | 1, sort_by: number) => {
      dispatch(CsvActions.setSupportHistorySort({ highlow, sort_by }));
    }, [],
  );

  const handleDbClick = useCallback((row:CsvSupportHistoryType) => {
    // dispatch(push(`${RoutingPath.customerDetail}/${row.  supported_id}`));
    setSelected([list.findIndex((v) => v.supported_id === row.supported_id)]);
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
            header={ExportCsvCollection.supportHistoryHeader}
            onClickRow={handleClick}
            onDbClick={handleDbClick}
            sort={{ onClick: handleClickHeader }}
            onClickMulti={(v: CsvSupportHistoryType[]) => {
              setSelected(
                v.map((v2) => list.findIndex((v3) => v3.supported_id === v2.supported_id)),
              );
            }}
            rowDataList={list}
            selectedTr={selected}
            lists={list.map((v) => (
              [
                v.supported_id,
                v.supported_date,
                v.customer_name,
                v.category,
                v.supported_history_name,
                v.supported_content,
                v.project_name,
                v.result,
                v.supported_detail,
              ]
            ))}
          />
        </div>
      </div>
    </section>
  );
};
