import {
  useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { Table } from '../../../../../ui/table/table';
import './csv-list-customer.scss';
import { State } from '../../../../../../redux/root.reducer';
import { RoutingPath } from '../../../../../../routes/routing-pass';
import { ExportCsvCollection } from '../../../../../../collection/export-csv/export-csv.collection';
import { CsvCustomerListType } from '../../../../../../type/csv/csv.type';
import { CsvActions } from '../../../../../../redux/csv/csv.action';

type Props = {
  callbackSelected: (selected: number[]) => void;
}

export const CsvListCustomer = (props: Props) => {
  const { callbackSelected } = props;

  /* Hooks */
  const list = useSelector((state: State) => state.csv.customerList);
  const dispatch = useDispatch();

  /* State */
  const [selected, setSelected] = useState<number[]>([]);

  /* Callback */
  const handleClick = useCallback((row: CsvCustomerListType) => {
    setSelected([list.findIndex((v) => v.customer_id === row.customer_id)]);
  }, [list]);

  const handleClickHeader = useCallback(
    (highlow:0 | 1, sort_by: number) => {
      dispatch(CsvActions.setCustomerSort({ highlow, sort_by }));
    }, [],
  );

  const handleDbClick = useCallback((row:CsvCustomerListType) => {
    dispatch(push(`${RoutingPath.customerDetail}/${row.customer_id}`));
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
            header={ExportCsvCollection.customerInformationHeader}
            onClickRow={handleClick}
            onDbClick={handleDbClick}
            sort={{ onClick: handleClickHeader }}
            onClickMulti={(v: CsvCustomerListType[]) => {
              setSelected(v.map((v2) => list.findIndex((v3) => v3.customer_id === v2.customer_id)));
            }}
            rowDataList={list}
            selectedTr={selected}
            lists={list.map((v) => (
              [
                v.customer_id,
                v.customer_name,
                v.tel_no,
                v.prefecture,
                v.address,
                v.ob,
                v.rank,
                v.last_completion_date,
                v.total_work_price,
                v.work_times,
                v.construction_status,
                v.sales_contact,
              ]
            ))}
          />
        </div>
      </div>
    </section>
  );
};
