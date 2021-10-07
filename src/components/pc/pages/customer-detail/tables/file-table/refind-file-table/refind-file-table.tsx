import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep, isEqual } from 'lodash';
import { useCallback, useState } from 'react';
import { Button } from '../../../../../../ui/button/button';
import { DialogActions } from '../../../../../../../redux/dialog/dialog.action';
import { DatePicker } from '../../../../../../ui/date-picker/date-picker';
import { FileSortState } from '../../../../../../../type/file/file.type';
import { State } from '../../../../../../../redux/root.reducer';
import { Input } from '../../../../../../ui/input/input';
import { CustomerDetailActions } from '../../../../../../../redux/customer-detail/customer-detail.action';

type Props = {
  callback: (sort:FileSortState) => void;
}

export const RefindFileTable = (props:Props) => {
  const { callback } = props;

  /* Hook */
  const dispatch = useDispatch();
  const sort = useSelector((state: State) => state.customerDetail.fileSort, isEqual);

  const [sortState, setSortState] = useState(cloneDeep(sort));

  /* Callback */
  const handleClickSearch = useCallback(() => {
    dispatch(DialogActions.pop());
    callback(sortState);
  }, [callback, sortState]);

  const setState = useCallback((v: FileSortState) => {
    setSortState(cloneDeep(v));
    dispatch(CustomerDetailActions.setFileSort(v));
  }, [dispatch]);

  return (
    <div className="refind_wrap">
      <div className="refind_body">
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">No</div>
            <Input
              className=""
              value={sortState.no}
              onChange={(e) => setState({
                ...sortState, no: e.target.value,
              })}
              inputMode="numeric"
            />
          </div>
          <div className="item_box">
            <div className="item_head">アップロード日時</div>
            <DatePicker
              date={sortState.upload_date || null}
              onChange={(v) => setState(
                { ...sortState, upload_date: v },
              )}
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">ファイル名</div>
            <Input
              className=""
              value={sortState.file_name || null}
              onChange={(e) => setState(
                { ...sortState, file_name: e.target.value },
              )}
            />
          </div>
          <div className="item_box">
            <div className="item_head">形式</div>
            <Input
              className=""
              value={sortState.format || null}
              onChange={(e) => setState(
                { ...sortState, format: e.target.value },
              )}
            />
          </div>
          <div className="item_box">
            <div className="item_head">サイズ</div>
            <Input
              className=""
              value={sortState.size || null}
              onChange={(e) => setState(
                { ...sortState, size: e.target.value },
              )}
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">更新者</div>
            <Input
              className=""
              value={sortState.updater}
              onChange={(e) => setState({
                ...sortState, updater: e.target.value,
              })}
            />
          </div>
          <div className="item_box">
            <div className="item_head">コメント</div>
            <Input
              className=""
              value={sortState.comment}
              onChange={(e) => setState({
                ...sortState, comment: e.target.value,
              })}
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
