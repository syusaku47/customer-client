import { isEqual } from 'lodash';
import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWillUnMount } from '../../../../../../hooks/life-cycle';
import { CsvActions } from '../../../../../../redux/csv/csv.action';
import { State } from '../../../../../../redux/root.reducer';
import { Limit, TableSort } from '../../../../../ui/table/table-sort/table-sort';
import { CsvListMaintenance } from '../../list/maintenance/csv-list-maintenance';
import { CsvSearchBoxMaintenance } from '../../search-box/maintenance/csv-search-box-maintenance';
import { CsvMaintenanceSort } from '../../../../../../type/csv/csv-sort.type';
import { DateFormatter } from '../../../../../../utilities/date-formatter';

type Props = {
  callback: (v: () => void) => void;
}

export const CsvMaintenance = (props:Props) => {
  const { callback } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => (state.csv.maintenanceSort), isEqual);
  const list = useSelector((state: State) => (state.csv.maintenanceList), isEqual);

  /* State */
  const [selected, setSelected] = useState<number[]>([]);

  /* Callback */
  const getList = useCallback((v?: CsvMaintenanceSort) => {
    const sortData = v || sortState;
    dispatch(CsvActions.api.maintenance.getList({
      ...sortData,
      maintenance_date_start: DateFormatter.date2str(sortData.maintenance_date_start),
      maintenance_date_end: DateFormatter.date2str(sortData.maintenance_date_end),
      completion_start_date: DateFormatter.date2str(sortData.completion_start_date),
      completion_end_date: DateFormatter.date2str(sortData.completion_end_date),

      offset: sortData.offset,
      sort_by: sortData.sort_by,
      limit: sortData.limit,
      highlow: sortData.highlow,

    }));
    setSelected([]);
  },
  [sortState]);

  const exportCsv = useCallback(() => {
    dispatch(CsvActions.api.maintenance.download({ ...selected }));
  }, [selected]);

  const changePagination = useCallback((offset:number, limit:Limit) => {
    dispatch(CsvActions.setMaintenanceSort({ offset, limit }));
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
    dispatch(CsvActions.setMaintenanceSort(null));
  });

  return (
    <>
      <CsvSearchBoxMaintenance
        callback={getList}
      />
      <TableSort
        page={sortState.offset ?? 0}
        limit={sortState.limit as Limit}
        hitCount={list.length}
        callback={changePagination}
      />
      <CsvListMaintenance
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
