import './file.pc.scss';
import { useDispatch, useSelector } from 'react-redux';
import { goBack, replace } from 'connected-react-router';
import { useCallback, useEffect, useState } from 'react';
import { isEqual } from 'lodash';
import { useParams } from 'react-router-dom';
import { BasePagePC } from '../base.page.pc';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { LeftIconButton } from '../../../ui/button/left-icon-button/left-icon-button';
import { RoutingPath } from '../../../../routes/routing-pass';
import { FileEditPC } from './edit/file-edit.pc';
import { FileSearchBoxPC } from '../../layout/search-box/file/file-search-box.pc';
import { FileListPC } from '../../layout/body/list/file-list/file-list.pc';
import { State } from '../../../../redux/root.reducer';
import { FileActions } from '../../../../redux/file/file.action';
import { DateFormatter } from '../../../../utilities/date-formatter';
import { useWillUnMount } from '../../../../hooks/life-cycle';

export const FilePC = () => {
  /* Hooks */
  const { id } = useParams<{id:string}>();
  const sortState = useSelector((state: State) => (state.file.sort), isEqual);
  const dispatch = useDispatch();

  /* State */
  const [selectId, setSelectId] = useState<number | undefined>(undefined);

  /* Callback */
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

  const openEditDialog = useCallback(
    (mode:'add' | 'update') => {
      dispatch(DialogActions.push({
        title: 'ファイル情報入力',
        className: 'file auto_height_dialog',
        element: <FileEditPC
          mode={mode}
          id={selectId ? Number(selectId) : undefined}
          callbackGetList={getList}
        />,
        onCloseClick: () => {
          if (selectId) { dispatch(replace(RoutingPath.fileDetail)); }
        },
      }));
    },
    [selectId],
  );

  /* Effect */
  useEffect(() => {
    if (!selectId) return;
    openEditDialog('update');
  }, [selectId]);

  useEffect(() => {
    getList();
  }, [sortState.highlow, sortState.sort_by]);

  useWillUnMount(() => {
    dispatch(FileActions.setSort(null));
  });

  useEffect(() => {
    setSelectId(id ? Number(id) : undefined);
  }, [id]);

  return (
    <BasePagePC className="FilePC">
      <div id="file" className="cnt_area">
        <div className="inner">
          <FileSearchBoxPC callback={getList} />
          <FileListPC
            callbackGetList={getList}
            selectId={selectId}
          />
        </div>
      </div>
      <footer className="btn_area">
        <div className="left_box">
          <LeftIconButton
            label="新規登録"
            size="md"
            fontAwesomeClass="fas fa-edit"
            className="btn_search for_detail"
            color="primary"
            onClick={() => openEditDialog('add')}
          />
        </div>
        <div className="right_box">
          <LeftIconButton
            label="戻る"
            fontAwesomeClass="fas fa-arrow-left"
            size="md"
            color="dark"
            onClick={() => dispatch(goBack())}
          />
        </div>
      </footer>
    </BasePagePC>
  );
};
