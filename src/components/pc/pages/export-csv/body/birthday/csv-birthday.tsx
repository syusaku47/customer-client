import { isEqual } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWillUnMount } from '../../../../../../hooks/life-cycle';
import { CsvActions } from '../../../../../../redux/csv/csv.action';
import { State } from '../../../../../../redux/root.reducer';
import { Limit, TableSort } from '../../../../../ui/table/table-sort/table-sort';
import { CsvListBirthday } from '../../list/birthday/csv-list-birthday';
import { CsvSearchBoxBirthday } from '../../search-box/birthday/csv-search-box-birthday';
import { CsvBirthdaySort } from '../../../../../../type/csv/csv-sort.type';

type Props = {
  callback: (v: () => void) => void;
}

export const CsvBirthday = (props:Props) => {
  const { callback } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => (state.csv.birthdaySort), isEqual);
  const list = useSelector((state: State) => (state.csv.birthdayList), isEqual);

  /* State */
  const [selected, setSelected] = useState<number[]>([]);

  /* Callback */
  const getList = useCallback((v?: CsvBirthdaySort) => {
    const sortData = v || sortState;
    dispatch(CsvActions.api.birthday.getList({
      ...sortData,
    }));
    setSelected([]);
  },
  [sortState]);

  const exportCsv = useCallback(() => {
    dispatch(CsvActions.api.birthday.download({ ...selected }));
  }, [selected]);

  const changePagination = useCallback((offset:number, limit:Limit) => {
    dispatch(CsvActions.setBirthdaySort({ offset, limit }));
  }, []);

  /* Effect */
  useEffect(() => {
    getList();
  }, [
    sortState.offset,
    sortState.sort_by,
    sortState.limit,
    sortState.highlow,
  ]);

  useEffect(() => {
    callback(exportCsv);
  }, [selected, exportCsv]);

  /* Master */
  useWillUnMount(() => {
    dispatch(CsvActions.setBirthdaySort(null));
  });

  return (
    <>
      <CsvSearchBoxBirthday
        callback={getList}
      />
      <TableSort
        page={sortState.offset ?? 0}
        limit={sortState.limit as Limit}
        hitCount={list.length}
        callback={changePagination}
      />
      <CsvListBirthday
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
