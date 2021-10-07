import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep, isEqual } from 'lodash';
import { useState, useCallback } from 'react';
import { Button } from '../../../../../../ui/button/button';
import { DialogActions } from '../../../../../../../redux/dialog/dialog.action';
import { DatePicker } from '../../../../../../ui/date-picker/date-picker';
import { Select } from '../../../../../../ui/select/select';
import { MaintenanceSortState } from '../../../../../../../type/maintenance/maintenance.type';
import { CustomerDetailActions } from '../../../../../../../redux/customer-detail/customer-detail.action';
import { State } from '../../../../../../../redux/root.reducer';
import { useDidMount } from '../../../../../../../hooks/life-cycle';
import { Input } from '../../../../../../ui/input/input';

type Props = {
  callback: (sort:MaintenanceSortState) => void;
}

export const RefindMaintenanceTable = (props:Props) => {
  const { callback } = props;

  /* Hook */
  const dispatch = useDispatch();
  const sort = useSelector((state: State) => state.customerDetail.maintenanceSort, isEqual);

  const [sortState, setSortState] = useState(cloneDeep(sort));
  const quoteCreatorList = useSelector((state: State) => state.master.employeeList, isEqual);

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
    <div className="refind_wrap">
      <div className="refind_body">
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">対応</div>
            <Select
              className=""
              value={sortState.is_fixed ? 1 : 0}
              defaultLabel="指定なし"
              onChange={(v) => setState({ ...sortState, is_fixed: Boolean(v) })}
              options={[
                { text: '未対応', value: 0 },
                { text: '対応済み', value: 1 },
              ]}
            />
          </div>
          <div className="item_box">
            <div className="item_head">案件名</div>
            <Input
              className=""
              value={sort.project_name}
              onChange={(e) => setState({ ...sortState, project_name: e.target.value })}
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">着工日</div>
            <DatePicker
              date={sortState.construction_date || null}
              onChange={(v) => setState(
                { ...sortState, construction_date: v },
              )}
            />
          </div>
          <div className="item_box">
            <div className="item_head">完工日</div>
            <DatePicker
              date={sortState.completion_date || null}
              onChange={(v) => setState(
                { ...sortState, completion_date: v },
              )}
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">見積作成者</div>
            <Select
              value={sortState.quote_creator}
              defaultLabel="指定無し"
              options={quoteCreatorList.map((v) => ({
                text: v.name, value: v.id,
              }))}
              onChange={(v) => setState({ ...sortState, quote_creator: Number(v) })}
            />
          </div>
          <div className="item_box">
            <div className="item_head">メンテナンス日</div>
            <DatePicker
              date={sortState.maintenance_date || null}
              onChange={(v) => setState(
                { ...sortState, maintenance_date: v },
              )}
            />
          </div>
        </div>

        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">タイトル</div>
            <Input
              className=""
              value={sort.title}
              onChange={(e) => setState({ ...sortState, title: e.target.value })}
            />
          </div>
          <div className="item_box">
            <div className="item_head">対応日</div>
            <DatePicker
              date={sortState.supported_date || null}
              onChange={(v) => setState(
                { ...sortState, supported_date: v },
              )}
            />
          </div>
        </div>
      </div>
      <footer className="base_footer refind_footer">
        <Button
          size="md"
          color="primary"
          onClick={handleClickSearch}
        >絞込み
        </Button>
        <Button
          size="md"
          color="dark"
          onClick={() => dispatch(DialogActions.pop())}
        >キャンセル
        </Button>
      </footer>
    </div>
  );
};
