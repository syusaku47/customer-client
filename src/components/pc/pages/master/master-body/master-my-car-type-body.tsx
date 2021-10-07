import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { MasterBody } from './body/master-body';
import { MasterActions } from '../../../../../redux/master/master.action';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { State } from '../../../../../redux/root.reducer';
import { MasterCollection } from '../master.collection';
import { MyCarTypeMasterEditDialog } from '../edit-dialogs/relevant-tag/my-car-type-master-edit-dialog/my-car-type-master-edit-dialog';

export const MasterMyCarTypeBody = () => {
  /* Hook */
  const list = useSelector((state:State) => state.master.myCarTypeList);
  const dispatch = useDispatch();

  /* Callback */
  const getList = useCallback(() => {
    dispatch(MasterActions.api.myCarType.getList({}));
  }, []);

  // eslint-disable-next-line
  const openEditDialog = useCallback((id?: number) => {
    dispatch(DialogActions.push({
      title: 'マイカー種別 編集／追加',
      element: <MyCarTypeMasterEditDialog id={id} callback={getList} />,
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
      header={MasterCollection.myCarTypeMasterHeader}
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
          // { index: 3, width: 50 }, // マイカー種別
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
