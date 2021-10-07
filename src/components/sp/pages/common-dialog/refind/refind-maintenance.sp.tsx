import { cloneDeep, isEqual } from 'lodash';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDidMount } from '../../../../../hooks/life-cycle';
import { CustomerDetailActions } from '../../../../../redux/customer-detail/customer-detail.action';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { State } from '../../../../../redux/root.reducer';
import { MaintenanceSortState } from '../../../../../type/maintenance/maintenance.type';
import { DatePicker } from '../../../../ui/date-picker/date-picker';
import { Input } from '../../../../ui/input/input';
import { Select } from '../../../../ui/select/select';
import { RefindSP } from './refind.sp';

type Props = {
  callback: (sort:MaintenanceSortState) => void;
}

export const RefindMaintenanceSP = (props:Props) => {
  const { callback } = props;

  /* Hook */
  const dispatch = useDispatch();
  const sort = useSelector((state: State) => state.customerDetail.maintenanceSort, isEqual);

  const [sortState, setSortState] = useState(cloneDeep(sort));

  /* Callback */
  const handleClickSearch = useCallback(() => {
    dispatch(DialogActions.pop());
    callback(sortState);
  }, [callback, sort]);

  const setState = useCallback((v: MaintenanceSortState) => {
    setSortState(cloneDeep(v));
    dispatch(CustomerDetailActions.setMaintenanceSort(v));
  }, [dispatch]);

  useDidMount(() => {

  });

  return (
    <RefindSP callback={handleClickSearch}>
      <>
        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">対応区分</div>
            <Select
              className=""
              value={sortState.supported_kubun}
              defaultLabel="指定なし"
              onChange={(v) => setState({ ...sortState, supported_kubun: Number(v) })}
              options={[
                { text: '未対応', value: 1 },
                { text: '対応済み', value: 2 },
              ]}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">メンテナンス日</div>
            <DatePicker
              date={sortState.maintenance_date || null}
              onChange={(v) => setState(
                { ...sortState, maintenance_date: v },
              )}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">タイトル</div>
            <Input
              className=""
              value={sort.title}
              onChange={(e) => setState({ ...sortState, title: e.target.value })}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">対応日</div>
            <DatePicker
              date={sortState.supported_date || null}
              onChange={(v) => setState(
                { ...sortState, supported_date: v },
              )}
            />
          </div>
        </div>
      </>
    </RefindSP>
  );
};
