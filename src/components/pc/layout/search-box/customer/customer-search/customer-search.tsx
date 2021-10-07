import {
  useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import { isEqual } from 'lodash';
import { CustomerSearchBox } from '../customer-search-box';
import { CustomerListType } from '../../../../../../type/customer/customer.type';
import { Button } from '../../../../../ui/button/button';
import { DialogActions } from '../../../../../../redux/dialog/dialog.action';
import { Limit, TableSort } from '../../../../../ui/table/table-sort/table-sort';
import { State } from '../../../../../../redux/root.reducer';
import { useWillUnMount } from '../../../../../../hooks/life-cycle';
import { CustomerActions } from '../../../../../../redux/customer/customer.action';
import { joinStr } from '../../../../../../utilities/join-str';
import { Checkbox } from '../../../../../ui/checkbox/checkbox';
import { Table } from '../../../../../ui/table/table';
import { CustomerCollection } from '../../../../../../collection/customer/customer.collection';

type Props = {
  callback: (v:CustomerListType) => void;
}

export const CustomerSearch = (props: Props) => {
  const { callback } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const customerList = useSelector((state: State) => (state.customer.list), isEqual);
  const listHitCount = useSelector((state: State) => (state.customer.listHitCount), isEqual);
  const sortState = useSelector((state: State) => (state.customer.sort), isEqual);

  /* State */
  const [customer, setCustomer] = useState<CustomerListType | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [searchIsOpen, setSearchIsOpen] = useState<boolean>(false);

  /* Callback */
  const handleClickRow = useCallback((v:CustomerListType) => {
    setCustomer(cloneDeep(v));
    setSelected([customerList.findIndex((v2) => v2.id === v.id)]);
  }, [customerList]);

  const handleDbClickRow = useCallback((v: CustomerListType) => {
    dispatch(DialogActions.pop());
    callback(cloneDeep(v));
    setCustomer(cloneDeep(v));
    setSelected([customerList.findIndex((v2) => v2.id === v.id)]);
  }, [callback, customerList]);

  const handleClickSelect = useCallback(() => {
    dispatch(DialogActions.pop());

    if (customer) {
      callback(cloneDeep(
        customer,
      ));
    }
  },
  [customer, callback]);

  const getList = useCallback(() => {
    dispatch(CustomerActions.api.customer.getList({
      ...cloneDeep(sortState),
      tags: sortState?.tags?.getSendData(),
      parts: sortState?.parts?.getSendData(),
      is_deficiency: sortState?.is_deficiency ? 1 : 0,
    }));
  },
  [sortState]);

  const handleClickHeader = useCallback((highlow, sort_by) => {
    dispatch(CustomerActions.setSort({
      ...sortState,
      highlow,
      sort_by,
    }));
  }, [sortState]);

  useEffect(() => {
    getList();
  }, [sortState.highlow, sortState.sort_by, sortState.offset, sortState.limit]);

  useWillUnMount(() => {
    dispatch(CustomerActions.setSort(null));
  });

  return (
    <div className={`editPc_wrap ${searchIsOpen ? 'detail_on' : ''}`}>
      <div className="editPc_body show_all">
        <CustomerSearchBox
          openCallback={setSearchIsOpen}
          callbackGetList={getList}
        />
        <TableSort
          page={sortState.offset as number}
          limit={sortState.limit as Limit}
          hitCount={listHitCount}
          callback={(offset, limit) => {
            dispatch(CustomerActions.setSort({
              ...sortState,
              offset,
              limit,
            }));
          }}
        />
        <section className="result_area list_area">
          <div className="inner">
            <div className="table_responsive">
              <Table
                className="table_selectable table_sortable table_sticky"
                header={CustomerCollection.customerHeader}
                onDbClick={handleDbClickRow}
                selectedTr={selected}
                rowDataList={customerList}
                onClickRow={handleClickRow}
                sort={{ onClick: handleClickHeader }}
                lists={customerList.map((v) => (
                  [
                    v.deficiency_flag ? <Checkbox checked disabled /> : '',
                    v.ob_flag === 1 ? 'OB' : '見込',
                    v.sales_contact_name,
                    v.id,
                    v.name,
                    v.furigana,
                    joinStr(v.post_no, 3, '-'),
                    v.prefecture_name,
                    v.city + v.address,
                    v.tel_no,
                    <div className="rank_label" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>{v.estimated_rank_name}</div>,
                    <div className="rank_label" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>{v.rank_name}</div>,
                    v.area_name,
                    v.building_category_name,
                    v.madori_name,
                    v.building_age,
                    v.remarks,
                  ]
                ))}
              />
            </div>
          </div>
        </section>
        <TableSort
          className="bottom"
          page={sortState.offset as number}
          limit={sortState.limit as Limit}
          hitCount={listHitCount}
          callback={(offset, limit) => {
            dispatch(CustomerActions.setSort({
              ...sortState,
              offset,
              limit,
            }));
          }}
        />
      </div>
      <div className="editPc_footer base_footer">
        <Button size="md" color="primary" disabled={!customer} onClick={handleClickSelect}>
          選択
        </Button>
        <Button size="md" color="dark" onClick={() => dispatch(DialogActions.clear())}>
          閉じる
        </Button>
      </div>
    </div>
  );
};
