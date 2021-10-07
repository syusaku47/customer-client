import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { FileActions } from '../../../../redux/file/file.action';
import { DateFormatter } from '../../../../utilities/date-formatter';
import { LeftIconButton } from '../../../ui/button/left-icon-button/left-icon-button';
import { FileListSP } from '../../layout/body/list/file/file-list';
import { BasePageSP } from '../base.page.sp';
import { FileEditSP } from './edit/file-edit.sp';
import { FileEditDialogTitle } from './edit/file-edit.type';
import './file.sp.scss';
import { FileSearchBoxSP } from './search-box/file-search-box.sp';
import { useDidMount } from '../../../../hooks/life-cycle';
import { State } from '../../../../redux/root.reducer';

export const FileSP = () => {
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => (state.file.sort), isEqual);
  const getList = useCallback(() => {
    dispatch(FileActions.api.file.getList({
      param: {
        ...sortState,
        upload_date_start: DateFormatter.date2str(sortState.upload_date_start),
        upload_date_end: DateFormatter.date2str(sortState.upload_date_end),
        upload_date: DateFormatter.date2str(sortState.upload_date),
      },
    }));
  },
  [sortState]);

  useDidMount(() => {
    getList();
  });

  return (
    <BasePageSP
      className="file_sp"
      searchBoxDialog={{
        title: '詳細検索',
        element: <FileSearchBoxSP />,
      }}
    >
      <div className="map_list_header file_sp__header">
        <span>ファイル一覧</span>
      </div>
      <div className="map_list_body">
        <FileListSP />
      </div>
      <div className="page_body_footer file_sp__footer">
        <LeftIconButton
          fontAwesomeClass="fas fa-edit"
          label="ファイル新規登録"
          onClick={() => {
            dispatch(DialogActions.push({
              title: FileEditDialogTitle.add,
              element: <FileEditSP mode="add" />,
            }));
          }}
          size="md"
          color="primary"
        />
      </div>
    </BasePageSP>
  );
};
