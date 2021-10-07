import './support-history.pc.scss';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { goBack } from 'connected-react-router';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BasePagePC } from '../base.page.pc';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { SupportHistoryListPC } from '../../layout/body/list/support-history-list/support-history-list.pc';
import { SupportHistorySearchBox } from '../../layout/search-box/support-history/support-history-search-box';
import { SupportHistoryEditPC } from './edit/support-history-edit.pc';
import { LeftIconButton } from '../../../ui/button/left-icon-button/left-icon-button';
import { SupportHistoryActions } from '../../../../redux/support-history/support-history.action';
import { State } from '../../../../redux/root.reducer';
import { useWillUnMount } from '../../../../hooks/life-cycle';
import { DateFormatter } from '../../../../utilities/date-formatter';

export const SupportHistoryPC = () => {
  /* Hooks */
  const { id } = useParams<{id:string}>();
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => (state.supportHistory.sort), isEqual);

  /* State */
  // eslint-disable-next-line
  const [selected, setSelected] = useState<number[]>([]);
  const [selectId, setSelectId] = useState<number | undefined>(undefined);
  const [searchIsOpen, setSearchIsOpen] = useState<boolean>(false);

  /* Callback */
  const getList = useCallback(() => {
    dispatch(SupportHistoryActions.api.supportHistory.getList({
      param: {
        ...sortState,
        is_fixed: undefined,
        offset: undefined,
        reception_date: DateFormatter.date2str(sortState.reception_date),
        supported_complete_date: DateFormatter.date2str(sortState.supported_complete_date),
      },
    }));
    setSelected([]);
  },
  [sortState]);

  const handleClickNew = useCallback(
    () => {
      dispatch(DialogActions.push({
        title: '対応履歴新規登録',
        className: 'support_history',
        element: <SupportHistoryEditPC mode="add" />,
      }));
    }, [],
  );

  useEffect(() => {
    getList();
  }, [sortState.highlow, sortState.sort_by]);

  useWillUnMount(() => {
    dispatch(SupportHistoryActions.setSort(null));
  });

  useEffect(() => {
    setSelectId(id ? Number(id) : undefined);
  }, [id]);

  return (
    <BasePagePC className="SupportHistoryPC">
      <div id="support-history" className={`cnt_area ${searchIsOpen ? 'detail_on' : ''}`}>
        <div className="inner">
          <SupportHistorySearchBox
            openCallback={setSearchIsOpen}
            callback={getList}
          />
          <SupportHistoryListPC
            callbackSelected={setSelected}
            selectId={selectId}
          />
        </div>
      </div>
      <footer className="btn_area">
        <div className="left_box">
          <LeftIconButton
            label="対応履歴新規登録"
            size="md"
            fontAwesomeClass="fas fa-edit"
            className="btn_search for_detail"
            color="primary"
            onClick={handleClickNew}
          />
          <LeftIconButton
            label="CSV出力"
            size="md"
            fontAwesomeClass="fas fa-file-csv"
            className="btn_search for_detail"
            color="primary"
            onClick={() => dispatch(DialogActions.pushReady())}
          />
        </div>
        <div className="right_box">
          <LeftIconButton
            label="戻る"
            fontAwesomeClass="fas fa-arrow-left"
            size="md"
            color="dark"
            onClick={() => dispatch(goBack())}
          />
        </div>
      </footer>
    </BasePagePC>
  );
};
