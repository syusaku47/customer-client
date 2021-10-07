import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { MasterBody } from './body/master-body';
import { MasterActions } from '../../../../../redux/master/master.action';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { State } from '../../../../../redux/root.reducer';
import { MasterCollection } from '../master.collection';
import { CustomerRankUpdateMasterEditDialog } from '../edit-dialogs/rank/customer-rank-update-master-edit-dialog/customer-rank-update-master-edit-dialog';

export const MasterCustomerRankUpdateBody = () => {
  /* Hook */
  const list = useSelector((state:State) => state.master.customerRankUpdateList);
  const dispatch = useDispatch();

  /* Callback */
  const getList = useCallback(() => {
    dispatch(MasterActions.api.customerRankUpdate.getList({}));
  }, []);

  const openEditDialog = useCallback(() => {
    dispatch(DialogActions.push({
      title: '顧客ランク更新 編集／追加',
      element: <CustomerRankUpdateMasterEditDialog />,
    }));
  }, [getList]);

  const tableList = useMemo(() => list.map(() => ([
    '',
  ])), [list]);

  return (
    <MasterBody
      header={MasterCollection.customerRankUpdateMasterHeader}
      rowDataList={list}
      list={tableList}
      callbackEdit={openEditDialog}
      callbackGetList={getList}
      defaultOrder={14}
    />
  );
};
