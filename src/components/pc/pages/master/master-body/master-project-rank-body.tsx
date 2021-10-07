import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { MasterBody } from './body/master-body';
import { MasterActions } from '../../../../../redux/master/master.action';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { State } from '../../../../../redux/root.reducer';
import { MasterCollection } from '../master.collection';
import { ProjectRankMasterEditDialog } from '../edit-dialogs/rank/project-rank-master-edit-dialog/project-rank-master-edit-dialog';

export const MasterProjectRankBody = () => {
  /* Hook */
  const list = useSelector((state:State) => state.master.projectRankList);
  const dispatch = useDispatch();

  /* Callback */
  const getList = useCallback(() => {
    dispatch(MasterActions.api.projectRank.getList({}));
  }, []);

  const openEditDialog = useCallback(() => {
    dispatch(DialogActions.push({
      title: '案件見込みランク 編集／追加',
      element: <ProjectRankMasterEditDialog />,
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
    '',
  ])), [list]);

  return (
    <MasterBody
      header={MasterCollection.projectRankMasterHeader}
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
          // { index: 4, width: 50 }, // 案件見込みランク名
          { index: 5, width: 100 }, // 略称表示
          { index: 6, width: 100 }, // 工事金額
          { index: 7, width: 100 }, // 背景色'
          { index: 8, width: 100 }, // 文字色
          { index: 9, width: 100 }, // 有効フラグ
        ],
        tdAlign: [
          { index: 0, align: 'center' },
          { index: 1, align: 'center' },
          { index: 2, align: 'center' },
          { index: 3, align: 'center' },
          { index: 4, align: 'left' },
          { index: 5, align: 'left' },
          { index: 6, align: 'left' },
          { index: 7, align: 'left' },
          { index: 8, align: 'left' },
          { index: 9, align: 'center' },
        ],
      }}
    />
  );
};
