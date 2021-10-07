import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './support-history-list.pc.scss';
import { cloneDeep, isEqual } from 'lodash';
import { State } from '../../../../../../redux/root.reducer';
import { DialogActions } from '../../../../../../redux/dialog/dialog.action';
import { SupportHistoryListType } from '../../../../../../type/support-history/support-history.type';
import { SupportHistoryActions } from '../../../../../../redux/support-history/support-history.action';
import { Table } from '../../../../../ui/table/table';
import { SupportHistoryCollection } from '../../../../../../collection/support-history/support-history.collection';
import { SupportHistoryEditPC } from '../../../../pages/support-history/edit/support-history-edit.pc';
import { DateFormatter } from '../../../../../../utilities/date-formatter';
import Deposite from '../../../../../../asset/images/icon/deposite.svg';

type Props = {
  data?: SupportHistoryListType[];
  handleCardClick?: (supportHistory: SupportHistoryListType) => void;
  callbackSelected?: (selected: number[]) => void;
  selectId?: number;
}

export const SupportHistoryListPC = (props: Props) => {
  const {
    data, handleCardClick, callbackSelected, selectId,
  } = props;

  /* Hooks */
  const supportHistoryList = useSelector(
    (state: State) => state.supportHistory.list, isEqual,
  );
  const dispatch = useDispatch();

  /* State */
  const [selected, setSelected] = useState<number[]>(cloneDeep([]));

  /* List */
  const dataList = useMemo(() => data || supportHistoryList, [supportHistoryList, data]);

  const handleClickCard = useCallback((id: number) => {
    if (handleCardClick) {
      const findData = data?.find((v) => v.id === id);
      if (findData) {
        handleCardClick(findData);
      }
    }
    setSelected([dataList.findIndex((v) => v.id === id)]);
  }, [data, handleCardClick, dataList]);

  const handleClickHeader = useCallback(
    (highlow:0 | 1, sort_by: number) => {
      dispatch(SupportHistoryActions.setSort({ highlow, sort_by }));
    }, [],
  );

  const handleDbClick = useCallback(
    (v:SupportHistoryListType) => {
      if (handleCardClick) return;
      setSelected([dataList.findIndex((v2) => v2.id === v.id)]);
      dispatch(DialogActions.push({
        title: '対応履歴編集',
        className: 'support_history',
        element: <SupportHistoryEditPC
          mode="update"
          id={v.id}
        />,
      }));
    },
    [handleCardClick, dataList],
  );

  /* Effect */

  useEffect(() => {
    if (callbackSelected) { callbackSelected(selected); }
  }, [selected]);

  useEffect(() => {
    if (!selectId) {
      setSelected([]);
      return;
    }
    setSelected([dataList.findIndex((v) => v.id === selectId)]);
  }, [selectId, dataList]);

  return (
    <section className="result_area list_area">
      <div className="inner">
        <div className="table_responsive">
          <Table
            className="table_selectable table_sortable table_sticky"
            header={SupportHistoryCollection.header}
            onClickRow={(v) => { handleClickCard(Number(v.id)); }}
            sort={{ onClick: handleClickHeader }}
            onClickMulti={(v: SupportHistoryListType[]) => {
              setSelected(v.map((v2) => dataList.findIndex((v3) => v3.id === v2.id)));
            }}
            selectedTr={selected}
            onDbClick={handleDbClick}
            rowDataList={dataList}
            lists={dataList.map((v) => (
              [
                v.fixed_flag
                  ? (
                    <img src={Deposite} alt="対応済" title="対応済" className="icon" />
                  )
                  : '',
                DateFormatter.date2str(v.reception_time),
                v.category,
                v.customer_name,
                v.project_representative,
                v.supported_person,
                DateFormatter.date2str(v.supported_complete_date),
              ]
            ))}
            option={{
              stringWidth: [
                { index: 0, width: 80 }, // 対応済
                // { index: 1, width: 100 }, // 受付日時
                // { index: 2, width: 50 }, // カテゴリ
                // { index: 3, width: 50 }, //  顧客名
                // { index: 4, width: 50 }, // 案件担当者
                // { index: 5, width: 50 }, // 対応者
                // { index: 6, width: 50 }, // 対応日
              ],
              tdAlign: [
                { index: 0, align: 'center' },
                { index: 1, align: 'center' },
                { index: 2, align: 'center' },
                { index: 3, align: 'center' },
                { index: 4, align: 'center' },
                { index: 5, align: 'center' },
                { index: 6, align: 'center' },
              ],
            }}
          />
        </div>
      </div>
    </section>
  );
};
