import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { MasterBody } from './body/master-body';
import { MasterActions } from '../../../../../redux/master/master.action';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { State } from '../../../../../redux/root.reducer';
import { MasterCollection } from '../master.collection';
import { StoreMasterEditDialog } from '../edit-dialogs/company/store-master-edit-dialog/store-master-edit-dialog';
import { Checkbox } from '../../../../ui/checkbox/checkbox';
import { joinStr } from '../../../../../utilities/join-str';

export const MasterStoreBody = () => {
  /* Hook */
  const list = useSelector((state:State) => state.master.storeList);
  const dispatch = useDispatch();

  /* Callback */
  const getList = useCallback(() => {
    dispatch(MasterActions.api.store.getList({}));
  }, []);

  const openEditDialog = useCallback((id?: number) => {
    dispatch(DialogActions.push({
      title: '店舗 編集／追加',
      element: <StoreMasterEditDialog id={id} callback={getList} />,
    }));
  }, [getList]);

  const tableList = useMemo(() => list.map((v) => ([
    v.name,
    v.short_name,
    v.furigana,
    v.tel_no,
    v.fax_no,
    joinStr(v.post_no, 3, '-'),
    v.prefecture,
    v.city,
    v.address,
    v.building_name,
    v.valid_flag ? <Checkbox checked /> : '',
    v.free_dial,
    '',
    // '',
    // '',
    // '',
  ])), [list]);

  return (
    <MasterBody
      header={MasterCollection.storeMasterHeader}
      rowDataList={list}
      list={tableList}
      callbackEdit={openEditDialog}
      callbackGetList={getList}
      defaultOrder={14}
      tableOption={{
        stringWidth: [
          // { index: 0, width: 50 }, // 編集
          // { index: 1, width: 100 }, // 店舗_名称
          // { index: 2, width: 50 }, // 店舗_略称
          // { index: 3, width: 50 }, // 店舗_フリガナ
          // { index: 4, width: 50 }, // 電話番号
          // { index: 5, width: 100 }, // FAX番号
          // { index: 6, width: 50 }, // 郵便番号
          // { index: 7, width: 50 }, // 住所_都道府県
          // { index: 8, width: 50 }, // 住所_市町村
          // { index: 9, width: 50 }, // 住所_地名・番地
          // { index: 10, width: 50 }, // 住所_建物名等
          // { index: 11, width: 50 }, // 有効フラグ
          // { index: 12, width: 50 }, // フリーダイヤル
          // { index: 16, width: 50 }, // 口座名義
          // { index: 13, width: 50 }, // 銀行名
          // { index: 14, width: 50 }, // 口座番号
          // { index: 15, width: 50 }, // 名義
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
          { index: 12, align: 'left' },
          { index: 13, align: 'left' },
          { index: 14, align: 'left' },
          { index: 15, align: 'left' },
          { index: 16, align: 'left' },
        ],
      }}
    />
  );
};
