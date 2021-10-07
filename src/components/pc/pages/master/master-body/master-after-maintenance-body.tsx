import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { MasterBody } from './body/master-body';
import { MasterActions } from '../../../../../redux/master/master.action';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { State } from '../../../../../redux/root.reducer';
import { MasterCollection } from '../master.collection';
import { AfterMaintenanceMasterEditDialog } from '../edit-dialogs/maintenance/after-maintenance-master-edit-dialog/after-maintenance-master-edit-dialog';

export const MasterAfterMaintenanceBody = () => {
  /* Hook */
  const list = useSelector((state:State) => state.master.afterMaintenanceList);
  const dispatch = useDispatch();

  /* Callback */
  const getList = useCallback(() => {
    dispatch(MasterActions.api.afterMaintenance.getList({}));
  }, []);

  // eslint-disable-next-line
  const openEditDialog = useCallback((id?: number) => {
    dispatch(DialogActions.push({
      title: 'アフターメンテナンス 編集／追加',
      element: <AfterMaintenanceMasterEditDialog id={id} callback={getList} />,
    }));
  }, [getList]);

  const tableList = useMemo(() => list.map((v) => ([
    v.maintenance_id,
    v.ins_expected_date,
    v.valid_flag ? '○' : '✗',
  ])), [list]);

  return (
    <MasterBody
      header={MasterCollection.afterMaintenanceMasterHeader}
      rowDataList={list}
      list={tableList}
      callbackEdit={openEditDialog}
      callbackGetList={getList}
      defaultOrder={14}
      tableOption={{
        stringWidth: [
          { index: 0, width: 50 }, // 編集
          { index: 1, width: 50 }, // ID
          // { index: 2, width: 50 }, // 登録予定日
          { index: 3, width: 100 }, // 有効フラグ
        ],
        tdAlign: [
          { index: 0, align: 'center' },
          { index: 1, align: 'center' },
          { index: 2, align: 'center' },
          { index: 3, align: 'center' },
        ],
      }}
    />
  );
};
