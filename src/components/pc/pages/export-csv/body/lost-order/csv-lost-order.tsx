import { isEqual } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWillUnMount } from '../../../../../../hooks/life-cycle';
import { CsvActions } from '../../../../../../redux/csv/csv.action';
import { State } from '../../../../../../redux/root.reducer';
import { DateFormatter } from '../../../../../../utilities/date-formatter';
import { Limit, TableSort } from '../../../../../ui/table/table-sort/table-sort';
import { CsvListLostOrder } from '../../list/lost-order/csv-list-lost-order';
import { CsvSearchBoxLostOrder } from '../../search-box/lost-order/csv-search-box-lost-order';
import { CsvLostOrderSort } from '../../../../../../type/csv/csv-sort.type';

type Props = {
  callback: (v: () => void) => void;
}

export const CsvLostOrder = (props:Props) => {
  const { callback } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => (state.csv.lostOrderSort), isEqual);
  const list = useSelector((state: State) => (state.csv.lostOrderList), isEqual);

  /* State */
  const [selected, setSelected] = useState<number[]>([]);
  // eslint-disable-next-line
  const [searchIsOpen, setSearchIsOpen] = useState<boolean>(false);

  /* Callback */
  const getList = useCallback((v?: CsvLostOrderSort) => {
    const sortData = v || sortState;
    dispatch(CsvActions.api.lostOrder.getList({
      ...sortData,
      parts: sortData?.parts?.getSendData(),
      failure_start_date: DateFormatter.date2str(sortData.failure_start_date),
      failure_end_date: DateFormatter.date2str(sortData.failure_end_date),

      offset: sortData.offset,
      sort_by: sortData.sort_by,
      limit: sortData.limit,
      highlow: sortData.highlow,
    }));
    setSelected([]);
  },
  [sortState]);

  const exportCsv = useCallback(() => {
    dispatch(CsvActions.api.lostOrder.download({ ...selected }));
  }, [selected]);

  const changePagination = useCallback((offset:number, limit:Limit) => {
    dispatch(CsvActions.setLostOrderSort({ offset, limit }));
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
    dispatch(CsvActions.setLostOrderSort(null));
  });

  return (
    <>
      <CsvSearchBoxLostOrder
        openCallback={setSearchIsOpen}
        callback={getList}
      />
      <TableSort
        page={sortState.offset ?? 0}
        limit={sortState.limit as Limit}
        hitCount={list.length}
        callback={changePagination}
      />
      <CsvListLostOrder
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
