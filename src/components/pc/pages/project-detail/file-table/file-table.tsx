import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { FileListType, FileSortState } from '../../../../../type/file/file.type';
// import { Button } from '../../../../ui/button/button';
import { Table } from '../../../../ui/table/table';
import { ProjectCollection } from '../../../../../collection/project/project.collection';
import { State } from '../../../../../redux/root.reducer';
import { FileEditPC } from '../../file/edit/file-edit.pc';
import { LeftIconButton } from '../../../../ui/button/left-icon-button/left-icon-button';
import { FileActions } from '../../../../../redux/file/file.action';
import { RefindFileTable } from './refind-file-table/refind-file-table';
import { DateFormatter } from '../../../../../utilities/date-formatter';
import { ProjectDetailActions } from '../../../../../redux/project-detail/project-detail.action';

export const FileTable = () => {
  /* Hook */
  const dispatch = useDispatch();
  const sort = useSelector((state: State) => state.projectDetail.fileSort, isEqual);
  const list = useSelector((state: State) => state.projectDetail.fileList, isEqual);
  const project = useSelector((state: State) => state.project.project);

  /* State */
  const [selected, setSelected] = useState<number[]>([]);

  /* Callback */
  const getList = useCallback((data?:FileSortState) => {
    const sortData = data || sort;
    if (project?.id) {
      dispatch(FileActions.api.file.getList({
        noLoad: true,
        param: {
          project_id: project.id,
          no: sortData.no,
          file_name: sortData.file_name,
          format: sortData.format,
          size: sortData.size,
          upload_date: DateFormatter.date2str(sortData.upload_date),
          updater: sortData.updater,
          comment: sortData.comment,
          filter_by: sortData.filter_by,
          limit: 9999,
          highlow: sortData.highlow,
        },
        onSuccess: (v) => {
          dispatch(ProjectDetailActions.setFileList(v));
        },
      }));
    }
  }, [project?.id, sort]);

  const handleClickDelete = useCallback((v:FileListType) => {
    dispatch(DialogActions.pushMessage({
      title: 'ファイル削除',
      message: ['削除しますか'],
      isCancel: true,
      callback: () => {
        dispatch(FileActions.api.file.delete({
          param: { id: v.id },
          callback: getList,
        }));
      },
    }));
  }, [getList]);

  const handleClickEdit = useCallback((v?:FileListType) => {
    if (!project) return;
    dispatch(DialogActions.push({
      title: 'ファイルアップロード',
      element: <FileEditPC
        callbackGetList={getList}
        mode="update"
        id={v?.id}
        projectData={v ? undefined : project}
      />,
    }));
  },
  [project, getList]);

  const handleClickRow = useCallback((v:FileListType) => {
    const findIndex = list.findIndex((v2) => v2.id === v.id);
    if (findIndex !== -1) {
      setSelected([findIndex]);
    }
  }, [list]);

  const handleDbClickRow = useCallback((v:FileListType) => {
    const findIndex = list.findIndex((v2) => v2.id === v.id);
    if (findIndex !== -1) {
      setSelected([findIndex]);
    }
    handleClickEdit(v);
    // dispatch(push(`${RoutingPath.projectDetail}/${v.id}`));
  }, [list, handleClickEdit]);

  useEffect(() => {
    getList();
  }, [project?.id, sort.highlow, sort.filter_by]);

  const handleClickHeader = useCallback((highlow:0|1, filter_by:number) => {
    dispatch(ProjectDetailActions.setFileSort({
      highlow, filter_by,
    }));
  }, []);

  const handleClickSortDialog = useCallback(() => {
    dispatch(DialogActions.push({
      title: '絞込み',
      element: <RefindFileTable
        callback={(sortStates) => {
          getList(sortStates);
        }}
      />,
    }));
  }, [getList, sort]);

  const handleClickDownload = useCallback((v:FileListType) => {
    dispatch(FileActions.api.file.download({ file_id: v.id }));
  }, []);

  return (
    <div className="detail_table_area">
      <div className="btn_box">
        <LeftIconButton
          label="新規ファイル登録"
          fontAwesomeClass="fas fa-edit"
          className="btn_search for_detail"
          size="sm"
          color="primary"
          onClick={() => handleClickEdit()}
        />
        <LeftIconButton
          label="絞込み"
          fontAwesomeClass="fas fa-filter"
          className="btn_search for_detail"
          size="sm"
          color="secondary"
          onClick={handleClickSortDialog}

        />
      </div>
      <div className="table_responsive">
        <Table
          className="table_selectable table_sortable table_sticky"
          header={ProjectCollection.file}
          onClickRow={handleClickRow}
          onDbClick={handleDbClickRow}
          sort={{
            index: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            onClick: handleClickHeader,
          }}
          selectedTr={selected}
          rowDataList={list}
          lists={list.map((v) => (
            [
              v.no,
              v.file_name,
              // <FileName id={1} name="原価管理表" img="xls" />,
              v.format,
              v.size,
              DateFormatter.date2str(v.upload_date),
              v.updater,
              v.comment,
              <LeftIconButton
                label="ダウンロード"
                fontAwesomeClass="fas fa-file-download"
                className="btn_search for_detail"
                size="sm"
                color="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickDownload(v);
                }}
              />,
              <LeftIconButton
                label="削除"
                fontAwesomeClass="fas fa-trash-alt"
                className="btn_search for_detail"
                size="sm"
                color="dark"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickDelete(v);
                }}
              />,
              '',
            ]
          ))}
          option={{
            stringWidth: [
              { index: 0, width: 50 }, // No.
              // { index: 1, width: 100 }, // ファイル名
              // { index: 2, width: 50 }, // 形式
              // { index: 3, width: 50 }, //  サイズ
              { index: 4, width: 150 }, // アップロード日時
              { index: 5, width: 150 }, // 更新者
              // { index: 6, width: 50 }, // コメント
              { index: 7, width: 50 }, // ダウンロード
              { index: 8, width: 100 }, // 削除
            ],
            tdAlign: [
              { index: 0, align: 'center' },
              { index: 1, align: 'left' },
              { index: 2, align: 'center' },
              { index: 3, align: 'right' },
              { index: 4, align: 'center' },
              { index: 5, align: 'left' },
              { index: 6, align: 'left' },
              { index: 7, align: 'center' },
              { index: 8, align: 'center' },
            ],
          }}
        />
      </div>
    </div>
  );
};
