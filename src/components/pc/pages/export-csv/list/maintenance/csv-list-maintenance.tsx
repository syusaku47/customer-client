import {
  useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from '../../../../../ui/table/table';
import './csv-list-maintenance.scss';
import { State } from '../../../../../../redux/root.reducer';
import { ExportCsvCollection } from '../../../../../../collection/export-csv/export-csv.collection';
import { CsvActions } from '../../../../../../redux/csv/csv.action';
import { CsvMaintenanceType } from '../../../../../../type/csv/csv.type';

type Props = {
  callbackSelected: (selected: number[]) => void;
}

export const CsvListMaintenance = (props: Props) => {
  const { callbackSelected } = props;

  /* Hooks */
  const list = useSelector((state: State) => state.csv.maintenanceList);
  const dispatch = useDispatch();

  /* State */
  const [selected, setSelected] = useState<number[]>([]);

  /* Callback */
  const handleClick = useCallback((row: CsvMaintenanceType) => {
    setSelected([list.findIndex((v) => v.maintenance_id === row.maintenance_id)]);
  }, [list]);

  const handleClickHeader = useCallback(
    (highlow:0 | 1, sort_by: number) => {
      dispatch(CsvActions.setMaintenanceSort({ highlow, sort_by }));
    }, [],
  );

  const handleDbClick = useCallback((row:CsvMaintenanceType) => {
    // dispatch(push(`${RoutingPath.customerDetail}/${row.maintenance_id}`));
    setSelected([list.findIndex((v) => v.maintenance_id === row.maintenance_id)]);
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
            header={ExportCsvCollection.maintenanceHeader}
            onClickRow={handleClick}
            onDbClick={handleDbClick}
            sort={{ onClick: handleClickHeader }}
            onClickMulti={(v: CsvMaintenanceType[]) => {
              setSelected(
                v.map((v2) => list.findIndex((v3) => v3.maintenance_id === v2.maintenance_id)),
              );
            }}
            rowDataList={list}
            selectedTr={selected}
            lists={list.map((v) => (
              [
                v.maintenance_id,
                v.maintenance_past_flag ? '○' : '',
                v.fixed_flag ? '○' : '',
                v.maintenance_date,
                v.title,
                v.supported_date,
                v.completion_date,
                v.customer_name,
                v.project_name,
                v.project_representative,
              ]
            ))}
          />
        </div>
      </div>
    </section>
  );
};
