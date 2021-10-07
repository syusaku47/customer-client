import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { MasterBody } from './body/master-body';
import { MasterActions } from '../../../../../redux/master/master.action';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { State } from '../../../../../redux/root.reducer';
import { MasterCollection } from '../master.collection';
import { ContractedCompanyMasterEditDialog } from '../edit-dialogs/contracted-company/contracted-company-master-edit-dialog';

export const MasterContractedCompanyBody = () => {
  /* Hook */
  const list = useSelector((state:State) => state.master.contractedCompanyList);
  const dispatch = useDispatch();

  /* Callback */
  const getList = useCallback(() => {
    dispatch(MasterActions.api.contractedCompany.getList({}));
  }, []);

  // eslint-disable-next-line
  const openEditDialog = useCallback((id?: number) => {
    dispatch(DialogActions.push({
      title: '契約会社 編集／追加',
      element: <ContractedCompanyMasterEditDialog id={id} callback={getList} />,
    }));
  }, [getList]);

  const tableList = useMemo(() => list.map((v) => ([
    v.name,
    v.mail_address,
    v.password,
    v.tel_no,
    v.post_no,
    v.prefecture,
    v.city,
    v.address,
    v.building_name,
    v.status,
    v.accounts,
    v.valid_flag ? '○' : '✗',
  ])), [list]);

  return (
    <MasterBody
      header={MasterCollection.contractedCompanyMasterHeader}
      rowDataList={list}
      list={tableList}
      callbackEdit={openEditDialog}
      callbackGetList={getList}
      defaultOrder={14}
      tableOption={{
        stringWidth: [
          // { index: 0, width: 50 }, // 編集
          // { index: 1, width: 100 }, // 会社_名称
          // { index: 2, width: 50 }, // 会社_メールアドレス（アドミン用）
          // { index: 3, width: 50 }, // 会社_パスワード（アドミン用）
          // { index: 4, width: 50 }, // 電話番号
          // { index: 5, width: 100 }, // 住所_郵便番号
          // { index: 6, width: 50 }, // 住所_都道府県
          // { index: 7, width: 50 }, // 住所_市区町村
          // { index: 8, width: 50 }, // 住所_地名・番地
          // { index: 9, width: 50 }, // 住所_建築名等
          // { index: 10, width: 50 }, // ステータス（有償・無償）
          // { index: 11, width: 50 }, // アカウント数
          // { index: 12, width: 50 }, // 有効フラグ
        ],
        tdAlign: [
          { index: 0, align: 'center' },
          { index: 1, align: 'left' },
          { index: 2, align: 'left' },
          { index: 3, align: 'left' },
          { index: 4, align: 'left' },
          { index: 5, align: 'left' },
          { index: 6, align: 'left' },
          { index: 7, align: 'left' },
          { index: 8, align: 'left' },
          { index: 9, align: 'left' },
          { index: 10, align: 'left' },
          { index: 11, align: 'center' },
          { index: 12, align: 'center' },
        ],
      }}
    />
  );
};
