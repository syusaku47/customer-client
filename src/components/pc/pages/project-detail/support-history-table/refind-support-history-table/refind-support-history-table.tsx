import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep, isEqual } from 'lodash';
import { useState, useCallback } from 'react';
import { Button } from '../../../../../ui/button/button';
import { DialogActions } from '../../../../../../redux/dialog/dialog.action';
import { Input } from '../../../../../ui/input/input';
import { SupportHistorySortState } from '../../../../../../type/support-history/support-history.type';
import { State } from '../../../../../../redux/root.reducer';
import { ProjectDetailActions } from '../../../../../../redux/project-detail/project-detail.action';
import { Select } from '../../../../../ui/select/select';
import { DatePicker } from '../../../../../ui/date-picker/date-picker';

type Props = {
  callback: (sort:SupportHistorySortState) => void;
}

export const RefindSupportHistoryTable = (props: Props) => {
  const { callback } = props;
  /* Hook */
  const dispatch = useDispatch();
  const sort = useSelector((state: State) => state.projectDetail.supportSort, isEqual);
  const supportHistoryList = useSelector((state:State) => state.master.supportHistoryList, isEqual);
  const employeeList = useSelector((state:State) => state.master.employeeList, isEqual);

  /* State */
  const [sortState, setSortState] = useState(cloneDeep(sort));

  /* Callback */
  const handleClickSearch = useCallback(() => {
    dispatch(DialogActions.pop());
    callback(sortState);
  }, [callback, sortState]);

  const setState = useCallback((v: SupportHistorySortState) => {
    setSortState(cloneDeep(v));
    dispatch(ProjectDetailActions.setSupportSort(v));
  }, [dispatch]);

  return (
    <div className="refind_wrap">
      <div className="refind_body">
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">対応済</div>
            <Select
              className=""
              value={sortState.is_fixed}
              defaultLabel="指定なし"
              onChange={(v) => setState({ ...sortState, is_fixed: Number(v) })}
              options={[
                { text: '未対応', value: 0 },
                { text: '対応済み', value: 1 },
              ]}
            />
          </div>
          <div className="item_box">
            <div className="item_head">受付日時</div>
            <DatePicker
              date={sort.reception_time || null}
              onChange={(v) => setState(
                { ...sortState, reception_time: v },
              )}
            />
          </div>
          <div className="item_box">
            <div className="item_head">カテゴリ</div>
            <Select
              className=""
              value={sortState.category}
              defaultLabel="指定なし"
              onChange={(v) => setState({ ...sortState, category: Number(v) })}
              options={supportHistoryList.map((v) => ({
                text: v.supported, value: v.id,
              }))}
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">件名</div>
            <Input
              value={sort.subject}
              onChange={(e) => setState({ ...sortState, subject: e.target.value })}
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">対応者</div>
            <Select
              className=""
              value={sortState.supported_person}
              defaultLabel="指定なし"
              onChange={(v) => setState({ ...sortState, supported_person: Number(v) })}
              options={employeeList.map((v) => ({
                text: v.name, value: v.id,
              }))}
            />
          </div>
          <div className="item_box">
            <div className="item_head">対応日</div>
            <DatePicker
              date={sort?.supported_complete_date || null}
              onChange={(v) => setState(
                { ...sortState, supported_complete_date: v },
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
