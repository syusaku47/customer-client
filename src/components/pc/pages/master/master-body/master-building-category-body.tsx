import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { MasterBody } from './body/master-body';
import { MasterActions } from '../../../../../redux/master/master.action';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { State } from '../../../../../redux/root.reducer';
import { MasterCollection } from '../master.collection';
import { BuildingCategoryMasterEditDialog } from '../edit-dialogs/category/building-category-master-edit-dialog/building-category-master-edit-dialog';

export const MasterBuildingCategoryBody = () => {
  /* Hook */
  const list = useSelector((state:State) => state.master.buildingCategoryList);
  const dispatch = useDispatch();

  /* Callback */
  const getList = useCallback(() => {
    dispatch(MasterActions.api.buildingCategory.getList({}));
  }, []);

  // eslint-disable-next-line
  const openEditDialog = useCallback((id?: number) => {
    /* ↓こうしてほしい */
    dispatch(DialogActions.push({
      title: '建物分類 編集／追加',
      element: <BuildingCategoryMasterEditDialog id={id} callback={getList} />,
    }));
  }, [getList]);

  const tableList = useMemo(() => list.map((v) => ([
    v.id,
    v.name,
    v.valid_flag ? '○' : '✗',
  ])), [list]);

  return (
    <MasterBody
      header={MasterCollection.buildingCategoryMasterHeader}
      rowDataList={list}
      list={tableList}
      callbackEdit={openEditDialog}
      callbackGetList={getList}
      defaultOrder={14}
      tableOption={{
        stringWidth: [
          { index: 0, width: 50 }, // 編集
          { index: 1, width: 50 }, // ID
          // { index: 2, width: 50 }, // 建物分類名称
          // { index: 3, width: 50 }, // 有効フラグ
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
