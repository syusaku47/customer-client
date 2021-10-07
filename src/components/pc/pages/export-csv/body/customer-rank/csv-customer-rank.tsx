import { isEqual } from 'lodash';
import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWillUnMount } from '../../../../../../hooks/life-cycle';
import { CsvActions } from '../../../../../../redux/csv/csv.action';
import { State } from '../../../../../../redux/root.reducer';
import { DateFormatter } from '../../../../../../utilities/date-formatter';
import { Limit, TableSort } from '../../../../../ui/table/table-sort/table-sort';
import { CsvListCustomerRank } from '../../list/customer-rank/csv-list-customer-rank';
import { CsvSearchBoxCustomerRank } from '../../search-box/customer-rank/csv-search-box-customer-rank';
import { CsvCustomerRankSort } from '../../../../../../type/csv/csv-sort.type';

type Props = {
  callback: (v: () => void) => void;
}

export const CsvCustomerRank = (props:Props) => {
  const { callback } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => (state.csv.customerRankSort), isEqual);
  const list = useSelector((state: State) => (state.csv.customerRankList), isEqual);

  /* State */
  // eslint-disable-next-line
  const [selected, setSelected] = useState<number[]>([]);

  /* Callback */
  const getList = useCallback((v?: CsvCustomerRankSort) => {
    const sortData = v || sortState;
    dispatch(CsvActions.api.customerRank.getList({
      ...sortData,
      updated_start_date: DateFormatter.date2str(sortData.updated_start_date),
      updated_end_date: DateFormatter.date2str(sortData.updated_end_date),

      offset: sortData.offset,
      sort_by: sortData.sort_by,
      limit: sortData.limit,
      highlow: sortData.highlow,
    }));
    setSelected([]);
  },
  [sortState]);

  const exportCsv = useCallback(() => {
    dispatch(CsvActions.api.customerRank.download({ ...selected }));
  }, [selected]);

  const changePagination = useCallback((offset:number, limit:Limit) => {
    dispatch(CsvActions.setCustomerRankSort({ offset, limit }));
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
    dispatch(CsvActions.setCustomerRankSort(null));
  });

  return (
    <>
      <CsvSearchBoxCustomerRank
        callback={getList}
      />
      <TableSort
        page={sortState.offset ?? 0}
        limit={sortState.limit as Limit}
        hitCount={list.length}
        callback={changePagination}
      />
      <CsvListCustomerRank
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
