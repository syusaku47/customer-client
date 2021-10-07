import { useCallback, useEffect, useState } from 'react';
import { isEqual } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../../../../redux/root.reducer';
import { CsvListCustomer } from '../../list/customer/csv-list-customer';
import { CsvSearchBoxCustomer } from '../../search-box/customer/csv-search-box-customer';
import { TableSort, Limit } from '../../../../../ui/table/table-sort/table-sort';
import { CsvActions } from '../../../../../../redux/csv/csv.action';
import { useWillUnMount } from '../../../../../../hooks/life-cycle';
import { CsvCustomerSort } from '../../../../../../type/csv/csv-sort.type';

export type Props = {
  callback: (v: () => void) => void;
}

export const CsvCustomer = (props:Props) => {
  const { callback } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => (state.csv.customerSort), isEqual);
  const list = useSelector((state: State) => (state.csv.customerList), isEqual);

  /* State */
  const [selected, setSelected] = useState<number[]>([]);
  // eslint-disable-next-line
  const [searchIsOpen, setSearchIsOpen] = useState<boolean>(false);

  /* Callback */
  const getList = useCallback((v?: CsvCustomerSort) => {
    const sortData = v || sortState;
    dispatch(CsvActions.api.customer.getList({
      ...sortData,
      tags: sortData?.tags?.getSendData(),
      parts: sortData?.parts?.getSendData(),
      construction_status: sortData?.construction_status?.getSendData(),
      post_no: sortData.post_no1 && sortData.post_no2 ? `${sortData.post_no1}${sortData.post_no2}` : '',

      offset: sortData.offset,
      sort_by: sortData.sort_by,
      limit: sortData.limit,
      highlow: sortData.highlow,
    }));
    setSelected([]);
  },
  [sortState]);

  const exportCsv = useCallback(() => {
    dispatch(CsvActions.api.customer.download({ ...selected }));
  }, [selected]);

  const changePagination = useCallback((offset:number, limit:Limit) => {
    dispatch(CsvActions.setCustomerSort({ offset, limit }));
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
    dispatch(CsvActions.setCustomerSort(null));
  });

  return (
    <>
      <CsvSearchBoxCustomer
        openCallback={setSearchIsOpen}
        callback={getList}
      />
      <TableSort
        page={sortState.offset ?? 0}
        limit={sortState.limit as Limit}
        hitCount={list.length}
        callback={changePagination}
      />
      <CsvListCustomer
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
