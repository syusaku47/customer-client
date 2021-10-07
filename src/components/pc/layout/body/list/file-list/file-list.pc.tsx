import {
  useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './file-list.pc.scss';
import { isEqual } from 'lodash';
import { State } from '../../../../../../redux/root.reducer';
import { DialogActions } from '../../../../../../redux/dialog/dialog.action';
import { Table } from '../../../../../ui/table/table';
import { FileEditPC } from '../../../../pages/file/edit/file-edit.pc';
import { FileActions } from '../../../../../../redux/file/file.action';
import { FileListType } from '../../../../../../type/file/file.type';
import { FileCollection } from '../../../../../../collection/file/file.collection';
import { DateFormatter } from '../../../../../../utilities/date-formatter';
import { LeftIconButton } from '../../../../../ui/button/left-icon-button/left-icon-button';

type Props = {
  selectId?: number;
  callbackGetList: () => void;
}

export const FileListPC = (props: Props) => {
  const { selectId, callbackGetList } = props;

  /* Hooks */
  const fileList = useSelector((state: State) => state.file.list, isEqual);
  const dispatch = useDispatch();

  /* State */
  const [selected, setSelected] = useState<number[]>([]);

  /* Callback */
  const handleClickRow = useCallback((v: FileListType) => {
    setSelected([fileList.findIndex((v2) => v.id === v2.id)]);
  }, [fileList]);

  const handleClickHeader = useCallback((highlow:0 | 1, sort_by: number) => {
    dispatch(FileActions.setSort({ highlow, sort_by }));
  }, []);

  const handleClickDownload = useCallback((v:FileListType) => {
    dispatch(FileActions.api.file.download({ file_id: v.id }));
  }, []);

  const handleClickDelete = useCallback((v:FileListType) => {
    dispatch(DialogActions.pushMessage({
      title: 'ファイル削除',
      message: ['削除しますか'],
      isCancel: true,
      callback: () => {
        dispatch(FileActions.api.file.delete({
          param: { id: v.id },
          callback: callbackGetList,
        }));
      },
    }));
  }, [callbackGetList]);

  const handleDbClick = useCallback(
    (v:FileListType) => {
      setSelected([fileList.findIndex((v2) => v2.id === v.id)]);
      dispatch(DialogActions.push({
        title: 'ファイル情報入力',
        element: <FileEditPC
          mode="update"
          id={v.id}
          callbackGetList={callbackGetList}
        />,
      }));
    },
    [callbackGetList, fileList],
  );

  /* Effect */
  useEffect(() => {
    if (!selectId) {
      setSelected([]);
      return;
    }
    setSelected([fileList.findIndex((v) => v.id === selectId)]);
  }, [selectId, fileList]);

  return (
    <section className="result_area list_area">
      <div className="inner">
        <div className="table_responsive">
          <Table
            className="table_selectable table_sortable table_sticky"
            header={FileCollection.header}
            onClickRow={handleClickRow}
            sort={{
              index: [0, 1, 2, 3, 4, 5, 6, 7],
              onClick: handleClickHeader,
            }}
            selectedTr={selected}
            rowDataList={fileList}
            onDbClick={handleDbClick}
            lists={fileList.map((v) => (
              [
                v.no,
                v.file_name,
                v.format,
                `${v.size} KB`,
                DateFormatter.date2str(v.upload_date),
                v.updater,
                v.customer_name,
                v.project_name,
                <LeftIconButton
                  label="ダウンロード"
                  fontAwesomeClass="fas fa-file-download"
                  className="btn_search for_detail"
                  size="sm"
                  color="secondary"
                  onClick={() => handleClickDownload(v)}
                />,
                <LeftIconButton
                  label="削除"
                  fontAwesomeClass="fas fa-trash-alt"
                  className="btn_search for_detail"
                  size="sm"
                  color="dark"
                  onClick={() => handleClickDelete(v)}
                />,
                v.comment,
              ]
            ))}
            option={{
              stringWidth: [
                // { index: 0, width: 50 }, // No.
                { index: 1, width: 100 }, // ファイル名
                { index: 2, width: 50 }, // 形式
                { index: 3, width: 50 }, //  サイズ
                { index: 4, width: 120 }, // アップロード日時
                // { index: 5, width: 50 }, // 更新者
                // { index: 6, width: 50 }, // 顧客名
                // { index: 7, width: 50 }, // 案件名
                { index: 8, width: 100 }, // ダウンロード
                { index: 9, width: 100 }, // 削除
                // { index: 10, width: 100 }, // 備考
              ],
              tdAlign: [
                { index: 0, align: 'center' },
                { index: 1, align: 'center' },
                { index: 2, align: 'center' },
                { index: 3, align: 'center' },
                { index: 4, align: 'center' },
                { index: 5, align: 'center' },
                { index: 6, align: 'center' },
                { index: 7, align: 'center' },
                { index: 8, align: 'center' },
                { index: 9, align: 'center' },
                { index: 10, align: 'left' },
              ],
            }}
          />
        </div>
      </div>
    </section>
  );
};
