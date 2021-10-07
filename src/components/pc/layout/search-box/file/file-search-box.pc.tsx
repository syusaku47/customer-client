import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './file-search-box.pc.scss';
import { cloneDeep } from 'lodash';
import { State } from '../../../../../redux/root.reducer';
import { DatePicker } from '../../../../ui/date-picker/date-picker';
import { LeftIconButton } from '../../../../ui/button/left-icon-button/left-icon-button';
import { SearchBoxPC } from '../search-box.pc';
import { FileSortState } from '../../../../../type/file/file.type';
import { FileActions } from '../../../../../redux/file/file.action';
import { Input } from '../../../../ui/input/input';

type Props = {
  callback: () => void
}

export const FileSearchBoxPC = (props: Props) => {
  const { callback } = props;

  /* Hooks */
  const sortState = useSelector((state: State) => (state.file.sort));
  const dispatch = useDispatch();

  /* State */
  const [sort, setSort] = useState(cloneDeep(sortState));

  /* Callback */
  const setState = useCallback(
    (v: FileSortState) => {
      setSort(v);
      dispatch(FileActions.setSort(cloneDeep(v)));
    }, [sort],
  );

  const handleClickSearch = useCallback(
    () => {
      callback();
    }, [callback],
  );

  return (
    <SearchBoxPC
      openCallback={() => { }}
    >
      <div onKeyPress={(e) => { if (e.key === 'Enter')callback(); }}>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">顧客名</div>
            <Input
              value={sort.customer_name}
              onChange={(e) => setState({ ...sort, customer_name: e.target.value })}
            />
          </div>
          <div className="item_box">
            <div className="item_head">案件名</div>
            <Input
              value={sort.project_name}
              onChange={(e) => setState({ ...sort, project_name: e.target.value })}
            />
          </div>
          <div className="item_box">
            <div className="item_head">ファイル名</div>
            <Input
              value={sort.file_name}
              onChange={(e) => setState({ ...sort, file_name: e.target.value })}
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">アップロード日</div>
            <DatePicker
              date={sort.upload_date_start || null}
              onChange={(v) => setState(
                { ...sort, upload_date_start: v },
              )}
            />
            <label className="ml_10">〜</label>
            <DatePicker
              date={sort.upload_date_end || null}
              onChange={(v) => setState(
                { ...sort, upload_date_end: v },
              )}
            />
          </div>
          <LeftIconButton
            label="検索"
            fontAwesomeClass="fas fa-search"
            className="btn_search for_detail"
            size="sm"
            color="secondary"
            onClick={handleClickSearch}
          />
        </div>
      </div>
    </SearchBoxPC>
  );
};
