import { isEqual } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWillUnMount } from '../../../../../../hooks/life-cycle';
import { CsvActions } from '../../../../../../redux/csv/csv.action';
import { State } from '../../../../../../redux/root.reducer';
import { Limit, TableSort } from '../../../../../ui/table/table-sort/table-sort';
import { CsvListNonOrder } from '../../list/non-order/csv-list-non-order';
import { CsvSearchBoxNonOrder } from '../../search-box/non-order/csv-search-box-non-order';
import { CsvNonOrderSort } from '../../../../../../type/csv/csv-sort.type';
import { DateFormatter } from '../../../../../../utilities/date-formatter';

type Props = {
  callback: (v: () => void) => void;
}

export const CsvNonOrder = (props:Props) => {
  const { callback } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => (state.csv.nonOrderSort), isEqual);
  const list = useSelector((state: State) => (state.csv.nonOrderList), isEqual);

  /* State */
  const [selected, setSelected] = useState<number[]>([]);
  // eslint-disable-next-line
  const [searchIsOpen, setSearchIsOpen] = useState<boolean>(false);

  /* Callback */
  const getList = useCallback((v?: CsvNonOrderSort) => {
    const sortData = v || sortState;
    dispatch(CsvActions.api.nonOrder.getList({
      ...sortData,
      last_quote_start_date: DateFormatter.date2str(sortData.last_quote_start_date),
      last_quote_end_date: DateFormatter.date2str(sortData.last_quote_end_date),
      parts: sortData?.parts?.getSendData(),

      offset: sortData.offset,
      sort_by: sortData.sort_by,
      limit: sortData.limit,
      highlow: sortData.highlow,
    }));
    setSelected([]);
  },
  [sortState]);

  const exportCsv = useCallback(() => {
    dispatch(CsvActions.api.nonOrder.download({ ...selected }));
  }, [selected]);

  const changePagination = useCallback((offset:number, limit:Limit) => {
    dispatch(CsvActions.setNonOrderSort({ offset, limit }));
  }, []);

  /* Effect */
  useEffect(() => {
    getList();
  }, [
    sortState.offset,
    sortState.highlow,
    sortState.limit,
    sortState.sort_by,
  ]);

  useEffect(() => {
    callback(exportCsv);
  }, [selected, exportCsv]);

  useWillUnMount(() => {
    dispatch(CsvActions.setNonOrderSort(null));
  });

  return (
    <>
      <CsvSearchBoxNonOrder
        openCallback={setSearchIsOpen}
        callback={getList}
      />
      <TableSort
        page={sortState.offset ?? 0}
        limit={sortState.limit as Limit}
        hitCount={list.length}
        callback={changePagination}
      />
      <CsvListNonOrder
        callbackSelected={setSelected}
      />
      <TableSort
        className="bottom"
        page={sortState.offset ?? 0}
        limit={sortState.limit as Limit}
        hitCount={list.length}
        callback={changePagination}
      />
    </>
  );
};
