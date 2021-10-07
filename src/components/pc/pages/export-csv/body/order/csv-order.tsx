import { isEqual } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWillUnMount } from '../../../../../../hooks/life-cycle';
import { CsvActions } from '../../../../../../redux/csv/csv.action';
import { State } from '../../../../../../redux/root.reducer';
import { Limit, TableSort } from '../../../../../ui/table/table-sort/table-sort';
import { CsvListOrder } from '../../list/order/csv-list-order';
import { CsvSearchBoxOrder } from '../../search-box/order/csv-search-box-order';
import { CsvOrderSort } from '../../../../../../type/csv/csv-sort.type';

type Props = {
  callback: (v: () => void) => void;
}

export const CsvOrder = (props:Props) => {
  const { callback } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => (state.csv.orderSort), isEqual);
  const list = useSelector((state: State) => (state.csv.orderList), isEqual);

  /* State */
  const [selected, setSelected] = useState<number[]>([]);
  // eslint-disable-next-line
  const [searchIsOpen, setSearchIsOpen] = useState<boolean>(false);

  /* Callback */
  const getList = useCallback((v?: CsvOrderSort) => {
    const sortData = v || sortState;
    dispatch(CsvActions.api.order.getList({
      ...sortData,
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
    dispatch(CsvActions.api.order.download({ ...selected }));
  }, [selected]);

  const changePagination = useCallback((offset:number, limit:Limit) => {
    dispatch(CsvActions.setBirthdaySort({ offset, limit }));
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
    dispatch(CsvActions.setBirthdaySort(null));
  });

  return (
    <>
      <CsvSearchBoxOrder
        openCallback={setSearchIsOpen}
        callback={getList}
      />
      <TableSort
        page={sortState.offset ?? 0}
        limit={sortState.limit as Limit}
        hitCount={list.length}
        callback={changePagination}
      />
      <CsvListOrder
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
