import {
  useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from '../../../../../ui/table/table';
import './csv-list-birthday.scss';
import { State } from '../../../../../../redux/root.reducer';
import { CsvBirthdayListType } from '../../../../../../type/csv/csv.type';
import { CsvActions } from '../../../../../../redux/csv/csv.action';
import { ExportCsvCollection } from '../../../../../../collection/export-csv/export-csv.collection';

type Props = {
  callbackSelected: (selected: number[]) => void;
}

export const CsvListBirthday = (props: Props) => {
  const { callbackSelected } = props;

  /* Hooks */
  const list = useSelector((state: State) => state.csv.birthdayList);
  const dispatch = useDispatch();

  /* State */
  const [selected, setSelected] = useState<number[]>([]);

  /* Callback */
  const handleClick = useCallback((row: CsvBirthdayListType) => {
    setSelected([list.findIndex((v) => v.customer_id === row.customer_id)]);
  }, [list]);

  const handleClickHeader = useCallback(
    (highlow:0 | 1, sort_by: number) => {
      dispatch(CsvActions.setBirthdaySort({ highlow, sort_by }));
    }, [],
  );

  const handleDbClick = useCallback((row:CsvBirthdayListType) => {
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
            header={ExportCsvCollection.birthdayHeader}
            onClickRow={handleClick}
            onDbClick={handleDbClick}
            sort={{ onClick: handleClickHeader }}
            onClickMulti={(v: CsvBirthdayListType[]) => {
              setSelected(v.map((v2) => list.findIndex((v3) => v3.customer_id === v2.customer_id)));
            }}
            rowDataList={list}
            selectedTr={selected}
            lists={list.map((v) => (
              [
                v.customer_id,
                v.customer_name,
                v.family_name,
                v.birth_date,
                v.relationship,
                v.mobile_phone,
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
