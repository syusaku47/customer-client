import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep, isEqual } from 'lodash';
import { useCallback, useState } from 'react';
import { Button } from '../../../../../ui/button/button';
import { DialogActions } from '../../../../../../redux/dialog/dialog.action';
import { State } from '../../../../../../redux/root.reducer';
import { BillSortState } from '../../../../../../type/bill/bill.type';
import { ProjectDetailActions } from '../../../../../../redux/project-detail/project-detail.action';
import { Input } from '../../../../../ui/input/input';
import { DatePicker } from '../../../../../ui/date-picker/date-picker';

type Props = {
  callback: (sort:BillSortState) => void;
}

export const RefindBillTable = (props:Props) => {
  const { callback } = props;

  const dispatch = useDispatch();
  const sort = useSelector((state: State) => state.projectDetail.billSort, isEqual);

  const [sortState, setSortState] = useState(cloneDeep(sort));

  /* Callback */
  const handleClickSearch = useCallback(() => {
    dispatch(DialogActions.pop());
    callback(sortState);
  }, [callback, sortState]);

  const setState = useCallback((v: BillSortState) => {
    setSortState(cloneDeep(v));
    dispatch(ProjectDetailActions.setBillSort(v));
  }, [dispatch]);

  return (
    <div className="refind_wrap">
      <div className="refind_body">
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">No.</div>
            <Input
              className=""
              type="number"
              value={sortState.no}
              onChange={(e) => setState({ ...sortState, no: Number(e.target.value) })}
            />
          </div>
          <div className="item_box">
            <div className="item_head">ファイル名</div>
            <Input
              className=""
              value={sortState.bill_name}
              onChange={(e) => setState({ ...sortState, bill_name: e.target.value })}
            />
          </div>
          <div className="item_box">
            <div className="item_head">形式</div>
            <Input
              className=""
              value={sortState.format}
              onChange={(e) => setState({ ...sortState, format: e.target.value })}
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">サイズ</div>
            <Input
              className=""
              value={sortState.size}
              onChange={(e) => setState({ ...sortState, size: e.target.value })}
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">アップロード日時</div>
            <DatePicker
              date={sortState.upload_date || null}
              onChange={(v) => setState(
                { ...sortState, upload_date: v },
              )}
            />
          </div>
          <div className="item_box">
            <div className="item_head">更新者</div>
            <Input
              className=""
              value={sortState.updater}
              onChange={(e) => setState({ ...sortState, updater: e.target.value })}
            />
          </div>
          <div className="item_box">
            <div className="item_head">コメント</div>
            <Input
              className=""
              value={sortState.comment}
              onChange={(e) => setState({ ...sortState, comment: e.target.value })}
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
