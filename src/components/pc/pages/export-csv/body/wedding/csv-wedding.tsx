import { isEqual } from 'lodash';
import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWillUnMount } from '../../../../../../hooks/life-cycle';
import { CsvActions } from '../../../../../../redux/csv/csv.action';
import { State } from '../../../../../../redux/root.reducer';
import { CsvWeddingSort } from '../../../../../../type/csv/csv-sort.type';
import { Limit, TableSort } from '../../../../../ui/table/table-sort/table-sort';
import { CsvListWedding } from '../../list/wedding/csv-list-wedding';
import { CsvSearchBoxWedding } from '../../search-box/wedding/csv-search-box-wedding';

type Props = {
  callback: (v: () => void) => void;
}

export const CsvWedding = (props:Props) => {
  const { callback } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => (state.csv.weddingSort), isEqual);
  const list = useSelector((state: State) => (state.csv.weddingList), isEqual);

  /* State */
  const [selected, setSelected] = useState<number[]>([]);

  /* Callback */
  const getList = useCallback((v?: CsvWeddingSort) => {
    const sortData = v || sortState;
    dispatch(CsvActions.api.wedding.getList({
      ...sortData,
    }));
    setSelected([]);
  },
  [sortState]);

  const exportCsv = useCallback(() => {
    dispatch(CsvActions.api.wedding.download({ ...selected }));
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
      <CsvSearchBoxWedding
        callback={getList}
      />
      <TableSort
        page={sortState.offset ?? 0}
        limit={sortState.limit as Limit}
        hitCount={list.length}
        callback={changePagination}
      />
      <CsvListWedding
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
