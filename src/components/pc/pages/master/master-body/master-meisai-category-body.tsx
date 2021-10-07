import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { MasterActions } from '../../../../../redux/master/master.action';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { State } from '../../../../../redux/root.reducer';
import { MasterCollection } from '../master.collection';
import { MeisaiMasterEditDialog } from '../edit-dialogs/material/meisai-master-edit-dialog/meisai-master-edit-dialog';
import { MasterBodyForMeisai } from './body/master-body-for-meisai';

export const MasterMeisaiBody = () => {
  /* Hook */
  const list = useSelector((state:State) => state.master.meisaiList);
  const dispatch = useDispatch();

  /* Callback */
  const getList = useCallback(() => {
    dispatch(MasterActions.api.meisai.getList({}));
  }, []);

  // eslint-disable-next-line
  const openEditDialog = useCallback((id?: number) => {
    dispatch(DialogActions.push({
      title: '明細 編集／追加',
      element: <MeisaiMasterEditDialog id={id} callback={getList} />,
    }));
  }, [getList]);

  const tableList = useMemo(() => list.map((v) => ([
    v.id,
    v.product_kubun,
    v.category_id,
    v.subcategory_id,
    v.name,
    v.standard,
    v.quantity,
    v.credit_id,
    v.quote_unit_price,
    v.prime_cost,
    v.valid_flag ? '○' : '✗',
  ])), [list]);

  return (
    <MasterBodyForMeisai
      header={MasterCollection.meisaiMasterHeader}
      rowDataList={list}
      list={tableList}
      callbackEdit={openEditDialog}
      callbackGetList={getList}
      defaultOrder={14}
      tableOption={{
        stringWidth: [
          { index: 0, width: 50 }, // 編集
          { index: 1, width: 50 }, // ID
          // { index: 2, width: 50 }, // 商品区分
          // { index: 3, width: 50 }, // 大分類区分
          // { index: 4, width: 50 }, // 中分類区分
          // { index: 5, width: 50 }, // 名称
          // { index: 6, width: 50 }, // 規格
          // { index: 7, width: 50 }, // 数量
          { index: 8, width: 100 }, // 単位名称
          { index: 9, width: 50 }, // 見積単価
          { index: 10, width: 50 }, // 原価
          { index: 11, width: 100 }, // 有効フラグ
        ],
        tdAlign: [
          { index: 0, align: 'center' },
          { index: 1, align: 'center' },
          { index: 2, align: 'left' },
          { index: 3, align: 'left' },
          { index: 4, align: 'left' },
          { index: 5, align: 'left' },
          { index: 6, align: 'left' },
          { index: 7, align: 'center' },
          { index: 8, align: 'center' },
          { index: 9, align: 'right' },
          { index: 10, align: 'right' },
          { index: 11, align: 'center' },
        ],
      }}
    />
  );
};
