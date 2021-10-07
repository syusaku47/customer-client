import { cloneDeep, isEqual } from 'lodash';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomerDetailActions } from '../../../../../redux/customer-detail/customer-detail.action';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { State } from '../../../../../redux/root.reducer';
import { SupportHistorySortState } from '../../../../../type/support-history/support-history.type';
import { DatePicker } from '../../../../ui/date-picker/date-picker';
import { Input } from '../../../../ui/input/input';
import { Select } from '../../../../ui/select/select';
import { RefindSP } from './refind.sp';

type Props = {
  callback: (sort: SupportHistorySortState) => void;
}

export const RefindSupportHistorySP = (props: Props) => {
  const { callback } = props;

  /* Hook */
  const dispatch = useDispatch();
  const sort = useSelector((state: State) => state.customerDetail.supportSort, isEqual);
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
    dispatch(CustomerDetailActions.setSupportSort(v));
  }, [dispatch]);

  return (
    <RefindSP callback={handleClickSearch}>
      <>
        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">対応済</div>
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
          <div className="item_wrap">
            <div className="item_label">受付日</div>
            <DatePicker
              date={sort.reception_time || null}
              onChange={(v) => setState(
                { ...sortState, reception_time: v },
              )}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">カテゴリ</div>
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
          <div className="item_wrap">
            <div className="item_label">件名</div>
            <Input
              value={sort.subject}
              onChange={(e) => setState({ ...sortState, subject: e.target.value })}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">対応者</div>
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
          <div className="item_wrap">
            <div className="item_label">対応日</div>
            <DatePicker
              date={sort?.supported_complete_date || null}
              onChange={(v) => setState(
                { ...sortState, supported_complete_date: v },
              )}
            />
          </div>
        </div>
      </>
    </RefindSP>
  );
};
