import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep, isEqual } from 'lodash';
import { useCallback, useState } from 'react';
import { Button } from '../../../../../ui/button/button';
import { DialogActions } from '../../../../../../redux/dialog/dialog.action';
import { State } from '../../../../../../redux/root.reducer';
import { MaintenanceSortState } from '../../../../../../type/maintenance/maintenance.type';
import { ProjectDetailActions } from '../../../../../../redux/project-detail/project-detail.action';
import { Input } from '../../../../../ui/input/input';
import { Select } from '../../../../../ui/select/select';
import { DatePicker } from '../../../../../ui/date-picker/date-picker';

type Props = {
  callback: (sort:MaintenanceSortState) => void;
}

export const RefindMaintenanceTable = (props:Props) => {
  const { callback } = props;

  const dispatch = useDispatch();
  const sort = useSelector((state: State) => state.projectDetail.maintenanceSort, isEqual);

  const [sortState, setSortState] = useState(cloneDeep(sort));

  /* Callback */
  const handleClickSearch = useCallback(() => {
    dispatch(DialogActions.pop());
    callback(sortState);
  }, [callback, sortState]);

  const setState = useCallback((v: MaintenanceSortState) => {
    setSortState(cloneDeep(v));
    dispatch(ProjectDetailActions.setMaintenanceSort(v));
  }, [dispatch]);

  return (
    <div className="refind_wrap">
      <div className="refind_body">
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">対応区分</div>
            <Select
              className=""
              value={sortState.supported_kubun}
              defaultLabel="指定なし"
              onChange={(v) => setState({
                ...sortState, supported_kubun: Number(v),
              })}
              options={[
                { text: '未対応', value: 1 },
                { text: '対応済み', value: 2 },
              ]}
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
              value={sortState.title}
              onChange={(e) => setState({
                ...sortState, title: e.target.value,
              })}
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
