import lodash from 'lodash';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { FileActions } from '../../../../../redux/file/file.action';
import { State } from '../../../../../redux/root.reducer';
import { Store } from '../../../../../redux/store';
import { FileListType, FileSortState } from '../../../../../type/file/file.type';
import { DateFormatter } from '../../../../../utilities/date-formatter';
import { DatePicker } from '../../../../ui/date-picker/date-picker';
import { Input } from '../../../../ui/input/input';
import { SearchBox } from '../../../layout/search-box/search-box.sp';

type Props = {
  callback?:(data:FileListType)=>void
}

export const FileSearchBoxSP = (props?:Props) => {
  /* Hooks */
  const { sortState } = useSelector((state: State) => ({
    sortState: state.file.sort,
  }));
  const dispatch = useDispatch();

  /* State */
  const [sort, setSort] = useState(cloneDeep(sortState));

  /* Callback */
  const setState = useCallback(
    (v: FileSortState) => {
      setSort(v);
      if (props?.callback) return;
      dispatch(FileActions.setSort(lodash.cloneDeep(v)));
    }, [sort, props],
  );

  const handleClickSearch = useCallback(() => {
    dispatch(FileActions.api.file.getList({
      param: {
        ...sort,
        upload_date_start: DateFormatter.date2str(sortState.upload_date_start),
        upload_date_end: DateFormatter.date2str(sortState.upload_date_end),
        upload_date: DateFormatter.date2str(sortState.upload_date),
      },
    }));
    Store.dispatch(DialogActions.pop());
  }, [sort, props]);

  return (
    <SearchBox callback={handleClickSearch}>
      <div className="search_box_sp_body_inner">
        <div className="category_wrap">

          <div className="item_wrap">
            <div className="item_label">顧客名</div>
            <div className="item_body">
              <Input
                value={sort?.customer_name}
                onChange={(e) => setState({ ...sort, customer_name: e.target.value })}
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">案件名</div>
            <div className="item_body">
              <Input
                value={sort?.project_name}
                onChange={(e) => setState({ ...sort, project_name: e.target.value })}
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">ファイル名</div>
            <div className="item_body">
              <Input
                value={sort?.file_name}
                onChange={(e) => setState({ ...sort, file_name: e.target.value })}
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">アップロード日</div>
            <div className="item_body item_schedule wrap">
              <div className="item_schedule__form">
                <DatePicker
                  date={sort?.upload_date_start || null}
                  onChange={(v) => setState(
                    { ...sort, upload_date_start: v },
                  )}
                />
              </div>
              <div className="item_schedule__tilde">〜</div>
              <div className="item_schedule__form">
                <DatePicker
                  date={sort?.upload_date_end || null}
                  onChange={(v) => setState(
                    { ...sort, upload_date_end: v },
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SearchBox>
  );
};
