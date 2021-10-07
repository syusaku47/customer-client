import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { MasterBody } from './body/master-body';
import { MasterActions } from '../../../../../redux/master/master.action';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { State } from '../../../../../redux/root.reducer';
import { MasterCollection } from '../master.collection';
import { CustomerRankFinalCompleteDateMasterEditDialog } from '../edit-dialogs/rank/customer-rank-final-complete-date-master-edit-dialog copy/customer-rank-final-complete-date-master-edit-dialog';

export const MasterCustomerRankFinalCompleteDateBody = () => {
  /* Hook */
  const list = useSelector((state:State) => state.master.customerRankList);
  const dispatch = useDispatch();

  /* Callback */
  const getList = useCallback(() => {
    dispatch(MasterActions.api.customerRank.getList({}));
  }, []);

  const openEditDialog = useCallback(() => {
    dispatch(DialogActions.push({
      title: '顧客ランク（最終完工日） 編集／追加',
      element: <CustomerRankFinalCompleteDateMasterEditDialog />,
    }));
  }, [getList]);

  const tableList = useMemo(() => list.map(() => ([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ])), [list]);

  return (
    <MasterBody
      header={MasterCollection.customerRankFinalCompleteDateHeader}
      rowDataList={list}
      list={tableList}
      callbackEdit={openEditDialog}
      callbackGetList={getList}
      defaultOrder={14}
      tableOption={{
        stringWidth: [
          { index: 0, width: 50 }, // 編集
          { index: 1, width: 50 }, // 操作
          { index: 2, width: 50 }, // 順位
          // { index: 3, width: 50 }, // ID
          // { index: 4, width: 50 }, // 顧客ランク（工事金額）名
          { index: 5, width: 100 }, // 略称表示
          { index: 6, width: 100 }, // 最終完工日数
          { index: 7, width: 100 }, // 有効フラグ
        ],
        tdAlign: [
          { index: 0, align: 'center' },
          { index: 1, align: 'center' },
          { index: 2, align: 'center' },
          { index: 3, align: 'center' },
          { index: 4, align: 'left' },
          { index: 5, align: 'left' },
          { index: 6, align: 'left' },
          { index: 7, align: 'center' },
        ],
      }}
    />
  );
};
