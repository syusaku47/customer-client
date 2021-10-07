import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { MasterActions } from '../../../../../redux/master/master.action';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { State } from '../../../../../redux/root.reducer';
import { MasterCollection } from '../master.collection';
import { EmployeeMasterEditDialog } from '../edit-dialogs/company/emplyee-master-edit-dialog/emplyee-master-edit-dialog';
import { MasterBodyForEmployee } from './body/master-body-for-employee';

export const MasterEmployeeBody = () => {
  /* Hook */
  const list = useSelector((state:State) => state.master.employeeList);
  const dispatch = useDispatch();

  /* Callback */
  const getList = useCallback(() => {
    dispatch(MasterActions.api.employee.getList({}));
  }, []);

  // eslint-disable-next-line
  const openEditDialog = useCallback((id?: number) => {
    dispatch(DialogActions.push({
      title: '社員 編集／追加',
      element: <EmployeeMasterEditDialog id={id} callback={getList} />,
    }));
  }, [getList]);

  const tableList = useMemo(() => list.map((v) => ([
    v.employee_cd,
    v.store_id,
    v.name,
    v.short_name,
    v.furigana,
    v.job_title,
    v.sales_target,
    v.is_delete ? '○' : '',
    v.authority1 ? '○' : '',
    v.authority4 ? '○' : '',
  ])), [list]);

  return (
    <MasterBodyForEmployee
      header={MasterCollection.employeeMasterHeader}
      rowDataList={list}
      list={tableList}
      callbackEdit={openEditDialog}
      callbackGetList={getList}
      defaultOrder={14}
      tableOption={{
        stringWidth: [
          { index: 0, width: 50 }, // 編集
          { index: 1, width: 50 }, // 社員CD
          // { index: 2, width: 50 }, // 店舗名
          // { index: 3, width: 50 }, // 社員_名称
          // { index: 4, width: 50 }, // 社員_略称
          // { index: 5, width: 50 }, // 社員_フリガナ
          // { index: 6, width: 50 }, // 役職名
          // { index: 7, width: 50 }, // 売上目標
          { index: 8, width: 100 }, // 有効フラグ
          { index: 9, width: 50 }, // 権限1
          { index: 10, width: 50 }, // 権限2
        ],
        tdAlign: [
          { index: 0, align: 'center' },
          { index: 1, align: 'center' },
          { index: 2, align: 'left' },
          { index: 3, align: 'left' },
          { index: 4, align: 'left' },
          { index: 5, align: 'left' },
          { index: 6, align: 'center' },
          { index: 7, align: 'center' },
          { index: 8, align: 'center' },
          { index: 9, align: 'center' },
          { index: 10, align: 'center' },
        ],
      }}
    />
  );
};
