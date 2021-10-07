import React, { useCallback, useEffect } from 'react';
import './file-detail.sp.scss';
import { useDispatch, useSelector } from 'react-redux';
import { push, goBack } from 'connected-react-router';
import { useParams } from 'react-router-dom';
import { BasePageSP } from '../base.page.sp';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { Button } from '../../../ui/button/button';
import { RoutingPath } from '../../../../routes/routing-pass';
import { State } from '../../../../redux/root.reducer';
import { FileActions } from '../../../../redux/file/file.action';
import { FileEditDialogTitle } from '../file/edit/file-edit.type';
import { FileEditSP } from '../file/edit/file-edit.sp';
import { LeftIconButton } from '../../../ui/button/left-icon-button/left-icon-button';
import { FileDeleteDialog } from './delete-dialog/file-delete-dialog';
import { DateFormatter } from '../../../../utilities/date-formatter';
import { FileSearchBoxSP } from '../file/search-box/file-search-box.sp';
import { StreetViewImg } from '../../../ui/street-view-img/street-view-img';
// import { FileType } from '../../../../type/file/file.type';

/* TODO Stateの値が表示されない */
export const FileDetailSP = () => {
  /* Hooks */
  const { id } = useParams<{ id: string; }>();
  const fileInfo = useSelector((state: State) => state.file.file);
  const dispatch = useDispatch();

  // console.log('fileID', fileID);
  // console.log('fileInfo', fileInfo);

  /* Callback */
  const handleClickEdit = useCallback(
    () => {
      dispatch(DialogActions.push({
        title: FileEditDialogTitle.update,
        element: <FileEditSP
          mode="update"
          id={Number(id)}
          callback={() => {
            dispatch(FileActions.api.file.get({
              param: { id: Number(id) },
            }));
          }}
        />,
      }));
    }, [id],
  );

  const handleClickDelete = useCallback(() => {
    if (!fileInfo) return;
    dispatch(FileActions.api.file.delete({
      param: { id: fileInfo.id },
      callback: () => {
        dispatch(push(RoutingPath.file));
      },
    }));
    // dispatch(DialogActions.pushMessage({
    //   title: 'ファイル削除',
    //   message: ['削除しますか'],
    //   isCancel: true,
    //   callback: () => {
    //   },
    // }));
  }, [fileInfo]);

  /* Effect */
  useEffect(() => {
    dispatch(FileActions.api.file.get({
      param: { id: Number(id) },
    }));
  }, [id]);

  /* TODO Style */
  return (
    <BasePageSP
      className="file_detail_sp"
      searchBoxDialog={{
        title: '詳細検索',
        element: <FileSearchBoxSP />,
      }}
    >
      <div className="detail_wrap">
        <div className="detail_header">
          <div
            className="detail_header_inner"
            onClick={() => { dispatch(goBack()); }}
          >
            <div
              className="detail_header_inner__back_btn"
            >
              <i className="fas fa-chevron-circle-left" />
            </div>
            ファイル詳細
          </div>
          <div className="detail_header_buttons">
            <LeftIconButton
              color="secondary"
              size="sm"
              onClick={handleClickEdit}
              fontAwesomeClass="fa fa-edit"
              label="ファイルアップロード"
            />
          </div>
        </div>

        <div className="detail_body file_detail_sp__body">
          <div className="row_table_style file_detail_sp__body__table">
            <div className="col_2">
              <div>
                <div className="t_row">
                  <div className="t_header">ファイルID</div>
                  <div className="t_body">{fileInfo?.id}</div>
                </div>
                <div className="t_row">
                  <div className="t_header">ファイル名</div>
                  <div className="t_body">{fileInfo?.file_name}</div>
                </div>
              </div>
              <div className="thumb google ml_5">
                {/* TODO front StreetViewImg のprops調整 */}
                <StreetViewImg isShow lat={0} lng={0} />
              </div>
            </div>
            <div className="t_row">
              <div className="t_header">顧客名</div>
              <div className="t_body">{fileInfo?.customer_name || '---'}様</div>
            </div>
            <div className="t_row">
              <div className="t_header">案件名</div>
              <div className="t_body">{fileInfo?.project_name || '---'}</div>
            </div>
            <div className="t_row">
              <div className="t_header">アップロード日時</div>
              <div className="t_body">{DateFormatter.date2str(fileInfo?.upload_date, 'YYYYMMDD_HHmmSS') || '---'}</div>
            </div>
            <div className="t_row">
              <div className="t_header">更新者</div>
              <div className="t_body">{fileInfo?.updater || '---'}</div>
            </div>
            <div className="t_row">
              <div className="t_header">コメント</div>
              <div className="t_body">{fileInfo?.comment || '---'}</div>
            </div>
          </div>
        </div>

        <div className="page_body_footer file_detail_sp__footer">
          <LeftIconButton fontAwesomeClass="fas fa-file-download" label="ダウンロード" color="primary" size="md" onClick={() => { dispatch(DialogActions.pushReady()); }} />
          <Button
            color="dark"
            size="md"
            onClick={() => {
              dispatch(DialogActions.push({
                title: 'ファイル削除',
                element: <FileDeleteDialog fileName={fileInfo?.file_name || '---'} callbackOK={handleClickDelete} />,
              }));
            }}
          >削除
          </Button>
        </div>
      </div>
    </BasePageSP>
  );
};
