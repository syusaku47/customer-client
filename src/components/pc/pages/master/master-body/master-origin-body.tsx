import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { MasterBody } from './body/master-body';
import { MasterActions } from '../../../../../redux/master/master.action';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { State } from '../../../../../redux/root.reducer';
import { MasterCollection } from '../master.collection';
import { OriginMasterEditDialog } from '../edit-dialogs/category/origin-master-edit-dialog/origin-master-edit-dialog';

export const MasterOriginBody = () => {
  /* Hook */
  const list = useSelector((state:State) => state.master.originList);
  const dispatch = useDispatch();

  /* Callback */
  const getList = useCallback(() => {
    dispatch(MasterActions.api.origin.getList({}));
  }, []);

  // eslint-disable-next-line
  const openEditDialog = useCallback((id?: number) => {
    dispatch(DialogActions.push({
      title: '対応履歴 媒体 編集／追加',
      element: <OriginMasterEditDialog id={id} callback={getList} />,
    }));
  }, [getList]);

  const tableList = useMemo(() => list.map((v) => ([
    v.id,
    v.name,
    v.valid_flag ? '○' : '✗',

  ])), [list]);

  return (
    <MasterBody
      header={MasterCollection.originMasterHeader}
      rowDataList={list}
      list={tableList}
      callbackEdit={openEditDialog}
      callbackGetList={getList}
      defaultOrder={14}
      tableOption={{
        stringWidth: [
          { index: 0, width: 50 }, // 編集
          { index: 1, width: 50 }, // ID
          // { index: 2, width: 50 }, // 発生源名称
          { index: 3, width: 100 }, // 有効フラグ
        ],
        tdAlign: [
          { index: 0, align: 'center' },
          { index: 1, align: 'center' },
          { index: 2, align: 'left' },
          { index: 3, align: 'center' },
        ],
      }}
    />
  );
};
