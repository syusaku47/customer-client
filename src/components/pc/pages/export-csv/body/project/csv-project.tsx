import { isEqual } from 'lodash';
import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWillUnMount } from '../../../../../../hooks/life-cycle';
import { CsvActions } from '../../../../../../redux/csv/csv.action';
import { State } from '../../../../../../redux/root.reducer';
import { Limit, TableSort } from '../../../../../ui/table/table-sort/table-sort';
import { CsvListProject } from '../../list/project/csv-list-project';
import { CsvSearchBoxProject } from '../../search-box/project/csv-search-box-project';
import { CsvProjectSort } from '../../../../../../type/csv/csv-sort.type';
import { DateFormatter } from '../../../../../../utilities/date-formatter';

type Props = {
  callback: (v: () => void) => void;
}

export const CsvProject = (props:Props) => {
  const { callback } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => (state.csv.projectSort), isEqual);
  const list = useSelector((state: State) => (state.csv.projectList), isEqual);

  /* State */
  const [selected, setSelected] = useState<number[]>([]);

  /* Callback */
  const getList = useCallback((v?: CsvProjectSort) => {
    const sortData = v || sortState;
    dispatch(CsvActions.api.project.getList({
      ...sortData,
      contract_start_date: DateFormatter.date2str(sortData.contract_start_date),
      contract_end_date: DateFormatter.date2str(sortData.contract_end_date),
      completion_start_date: DateFormatter.date2str(sortData.completion_start_date),
      completion_end_date: DateFormatter.date2str(sortData.completion_end_date),
      construction_status: sortData?.construction_status?.getSendData(),

      offset: sortData.offset,
      sort_by: sortData.sort_by,
      limit: sortData.limit,
      highlow: sortData.highlow,

    }));
    setSelected([]);
  },
  [sortState]);

  const exportCsv = useCallback(() => {
    dispatch(CsvActions.api.project.download({ ...selected }));
  }, [selected]);

  const changePagination = useCallback((offset:number, limit:Limit) => {
    dispatch(CsvActions.setProjectSort({ offset, limit }));
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
    dispatch(CsvActions.setProjectSort(null));
  });

  return (
    <>
      <CsvSearchBoxProject
        callback={getList}
      />
      <TableSort
        page={sortState.offset ?? 0}
        limit={sortState.limit as Limit}
        hitCount={list.length}
        callback={changePagination}
      />
      <CsvListProject
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
