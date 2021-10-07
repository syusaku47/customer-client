import { cloneDeep, isEqual } from 'lodash';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomerDetailActions } from '../../../../../redux/customer-detail/customer-detail.action';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { State } from '../../../../../redux/root.reducer';
import { FileSortState } from '../../../../../type/file/file.type';
import { DatePicker } from '../../../../ui/date-picker/date-picker';
import { Input } from '../../../../ui/input/input';
import { RefindSP } from './refind.sp';

type Props = {
  callback: (sort:FileSortState) => void;
}

export const RefindFileSP = (props:Props) => {
  const { callback } = props;

  /* Hook */
  const dispatch = useDispatch();
  const sort = useSelector((state: State) => state.customerDetail.fileSort, isEqual);

  const [sortState, setSortState] = useState(cloneDeep(sort));

  /* Callback */
  const handleClickSearch = useCallback(() => {
    dispatch(DialogActions.pop());
    callback(sortState);
  }, [callback, sort]);

  const setState = useCallback((v: FileSortState) => {
    setSortState(cloneDeep(v));
    dispatch(CustomerDetailActions.setFileSort(v));
  }, [dispatch]);

  return (
    <RefindSP callback={handleClickSearch}>
      <>
        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">No</div>
            <Input
              className=""
              type="number"
              value={sortState.no}
              onChange={(e) => setState({
                ...sortState, no: e.target.value,
              })}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">アップロード日時</div>
            <DatePicker
              date={sortState.upload_date || null}
              onChange={(v) => setState(
                { ...sortState, upload_date: v },
              )}
            />
          </div>
        </div>
        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">ファイル名</div>
            <Input
              className=""
              value={sortState.file_name || null}
              onChange={(e) => setState(
                { ...sortState, file_name: e.target.value },
              )}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">形式</div>
            <Input
              className=""
              value={sortState.format || null}
              onChange={(e) => setState(
                { ...sortState, format: e.target.value },
              )}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">サイズ</div>
            <Input
              className=""
              value={sortState.size || null}
              onChange={(e) => setState(
                { ...sortState, size: e.target.value },
              )}
            />
          </div>
        </div>
        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">更新者</div>
            <Input
              className=""
              value={sortState.updater}
              onChange={(e) => setState({
                ...sortState, updater: e.target.value,
              })}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">コメント</div>
            <Input
              className=""
              value={sortState.comment}
              onChange={(e) => setState({
                ...sortState, comment: e.target.value,
              })}
            />
          </div>
        </div>
      </>
    </RefindSP>
  );
};
