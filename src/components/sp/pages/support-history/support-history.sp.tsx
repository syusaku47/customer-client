/* TODO imageフォルダにsupportHistory用のファイルを追加する。現在はcustomerで代用 */
import { isEqual } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { State } from '../../../../redux/root.reducer';
import { SupportHistoryActions } from '../../../../redux/support-history/support-history.action';
import { DateFormatter } from '../../../../utilities/date-formatter';
import { noPinch } from '../../../../utilities/no-pinch';
import { SetSelectedClass } from '../../../../utilities/set-selected-class';
import { BottomBorderButton } from '../../../ui/button/bottom-border/bottom-border-button';
import { LeftIconButton } from '../../../ui/button/left-icon-button/left-icon-button';
import { SupportHistoryListSP } from '../../layout/body/list/support-history/support-history-list';
import { SearchBoxDialogTitle } from '../../layout/search-box/search-box.type.sp';
import { BasePageSP } from '../base.page.sp';
import { SupportHistoryEditSP } from './edit/support-history-edit.sp';
import { SupportHistoryEditDialogTitle } from './edit/support-history-edit.type';
import { SearchBoxSupportHistorySP } from './serch-box/support-history-search-box.sp';
import './support-history.sp.scss';

export const SupportHistorySP = () => {
  const dispatch = useDispatch();
  // const locationState = Boolean(useLocation().state);

  const [supportHistoryShowType, setSupportHistoryShowType] = useState<0 | 1 | 2>(0);
  const sortState = useSelector((state: State) => (state.supportHistory.sort), isEqual);

  const buttonsParentEle = useRef<HTMLDivElement>(null);
  const footerEle = useRef<HTMLElement>(null);

  /* effect */
  useEffect(() => {
    const pinchCallback = noPinch(footerEle.current);
    return pinchCallback;
  }, [footerEle]);

  useEffect(() => {
    dispatch(SupportHistoryActions.api.supportHistory.getList({
      param: {
        ...sortState,
        is_fixed: undefined,
        offset: undefined,
        reception_date: DateFormatter.date2str(sortState.reception_date),
        supported_complete_date: DateFormatter.date2str(sortState.supported_complete_date),
        limit: 99999,
      },
    }));
  }, []);

  return (
    <BasePageSP
      className="support_history_sp"
      searchBoxDialog={{ title: SearchBoxDialogTitle, element: <SearchBoxSupportHistorySP /> }}
      // menuOpen={locationState}
    >
      <div className="map_list_header support_history_sp__header">
        <span>対応履歴一覧</span>
        <div className="support_history_sp__header__buttons" ref={buttonsParentEle}>
          <BottomBorderButton
            label="すべて"
            onClick={(e) => {
              setSupportHistoryShowType(0);
              SetSelectedClass(e.currentTarget, buttonsParentEle.current);
            }}
            selected
          />
          <BottomBorderButton
            label="未対応"
            onClick={(e) => {
              setSupportHistoryShowType(1);
              SetSelectedClass(e.currentTarget, buttonsParentEle.current);
            }}
          />
          <BottomBorderButton
            label="対応済"
            onClick={(e) => {
              setSupportHistoryShowType(2);
              SetSelectedClass(e.currentTarget, buttonsParentEle.current);
            }}
          />
        </div>
      </div>

      {/* <SupportHistoryListSP type={supportHistoryShowType} /> */}
      <div className="map_list_body">
        <SupportHistoryListSP type={supportHistoryShowType} />
      </div>

      <footer
        className="page_body_footer support_history_sp__footer"
        ref={footerEle}
      >
        <LeftIconButton
          label="対応履歴新規登録"
          fontAwesomeClass="far fa-edit"
          onClick={() => dispatch(DialogActions.push({
            title: SupportHistoryEditDialogTitle.add,
            element: <SupportHistoryEditSP mode="add" />,
          }))}
          size="md"
          color="primary"
        />
      </footer>
    </BasePageSP>
  );
};
