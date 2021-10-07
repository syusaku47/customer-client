import { isEqual } from 'lodash';
import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWillUnMount } from '../../../../../../hooks/life-cycle';
import { CsvActions } from '../../../../../../redux/csv/csv.action';
import { State } from '../../../../../../redux/root.reducer';
import { Limit, TableSort } from '../../../../../ui/table/table-sort/table-sort';
import { CsvListSupportHistory } from '../../list/support-history/csv-list-support-history';
import { CsvSearchBoxSupportHistory } from '../../search-box/support-history/csv-search-box-support-history';
import { CsvSupportHistorySort } from '../../../../../../type/csv/csv-sort.type';
import { DateFormatter } from '../../../../../../utilities/date-formatter';

type Props = {
  callback: (v: () => void) => void;
}

export const CsvSupportHistory = (props:Props) => {
  const { callback } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => (state.csv.supportHistorySort), isEqual);
  const list = useSelector((state: State) => (state.csv.supportHistoryList), isEqual);

  /* State */
  // eslint-disable-next-line
  const [selected, setSelected] = useState<number[]>([]);

  /* Callback */
  const getList = useCallback((v?: CsvSupportHistorySort) => {
    const sortData = v || sortState;
    dispatch(CsvActions.api.supportHistory.getList({
      ...sortData,
      supported_date_start: DateFormatter.date2str(sortData.supported_date_start),
      supported_date_end: DateFormatter.date2str(sortData.supported_date_end),

      offset: sortData.offset,
      sort_by: sortData.sort_by,
      limit: sortData.limit,
      highlow: sortData.highlow,
    }));
    setSelected([]);
  },
  [sortState]);

  const exportCsv = useCallback(() => {
    dispatch(CsvActions.api.supportHistory.download({ ...selected }));
  }, [selected]);

  const changePagination = useCallback((offset:number, limit:Limit) => {
    dispatch(CsvActions.setSupportHistorySort({ offset, limit }));
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
    dispatch(CsvActions.setSupportHistorySort(null));
  });

  return (
    <>
      <CsvSearchBoxSupportHistory
        callback={getList}
      />
      <TableSort
        page={sortState.offset ?? 0}
        limit={sortState.limit as Limit}
        hitCount={list.length}
        callback={changePagination}
      />
      <CsvListSupportHistory
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
