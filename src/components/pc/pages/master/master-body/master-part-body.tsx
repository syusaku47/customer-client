import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { MasterBody } from './body/master-body';
import { MasterActions } from '../../../../../redux/master/master.action';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { State } from '../../../../../redux/root.reducer';
import { MasterCollection } from '../master.collection';
import { PartMasterEditDialog } from '../edit-dialogs/relevant-tag/part-master-edit-dialog/part-master-edit-dialog';

export const MasterPartBody = () => {
  /* Hook */
  const list = useSelector((state:State) => state.master.partList);
  const dispatch = useDispatch();

  /* Callback */
  const getList = useCallback(() => {
    dispatch(MasterActions.api.part.getList({}));
  }, []);

  // eslint-disable-next-line
  const openEditDialog = useCallback((id?: number) => {
    dispatch(DialogActions.push({
      title: '部位 編集／追加',
      element: <PartMasterEditDialog id={id} callback={getList} />,
    }));
  }, [getList]);

  const tableList = useMemo(() => list.map((v) => ([
    '',
    v.id,
    v.name,
    v.input_flag ? '○' : '✗',
    v.valid_flag ? '○' : '✗',
  ])), [list]);

  return (
    <MasterBody
      header={MasterCollection.partMasterHeader}
      rowDataList={list}
      list={tableList}
      callbackEdit={openEditDialog}
      callbackGetList={getList}
      defaultOrder={14}
      tableOption={{
        stringWidth: [
          { index: 0, width: 50 }, // 編集
          { index: 1, width: 50 }, // 操作
          { index: 2, width: 50 }, // ID
          // { index: 3, width: 50 }, // 部位名称
          { index: 4, width: 120 }, // テキスト入力有無
          { index: 5, width: 100 }, // 有効フラグ
        ],
        tdAlign: [
          { index: 0, align: 'center' },
          { index: 1, align: 'center' },
          { index: 2, align: 'center' },
          { index: 3, align: 'left' },
          { index: 4, align: 'center' },
          { index: 5, align: 'center' },
        ],
      }}
    />
  );
};
