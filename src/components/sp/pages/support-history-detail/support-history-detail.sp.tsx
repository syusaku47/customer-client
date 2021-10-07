import { goBack } from 'connected-react-router';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { State } from '../../../../redux/root.reducer';
import { SupportHistoryActions } from '../../../../redux/support-history/support-history.action';
import { LeftIconButton } from '../../../ui/button/left-icon-button/left-icon-button';
import { RectLabel } from '../../../ui/label/rect-label/rect-label';
import { BasePageSP } from '../base.page.sp';
import { SupportHistoryEditSP } from '../support-history/edit/support-history-edit.sp';
import './support-history-detail.sp.scss';
import { DateFormatter } from '../../../../utilities/date-formatter';
import { useWillUnMount } from '../../../../hooks/life-cycle';
import { SearchBoxDialogTitle } from '../../layout/search-box/search-box.type.sp';
import { SearchBoxSupportHistorySP } from '../support-history/serch-box/support-history-search-box.sp';
import { changeString } from '../../../../utilities/change-string';
import { StreetViewImg } from '../../../ui/street-view-img/street-view-img';

export const SupportHistoryDetailSP = () => {
  /* Hooks */
  const { id } = useParams<{ id: string; }>();
  const supportHistoryInfo = useSelector((state: State) => state.supportHistory.supportHistory);
  const dispatch = useDispatch();

  /* Callback */
  const handleClickEdit = useCallback(() => {
    dispatch(DialogActions.push({
      title: '対応履歴編集',
      element: <SupportHistoryEditSP
        mode="update"
        id={Number(id)}
        callback={() => {
          dispatch(SupportHistoryActions.api.supportHistory.get({
            param: {
              id: Number(id),
            },
          }));
        }}
      />,
    }));
  }, [id]);

  /* Effect */
  useEffect(() => {
    dispatch(SupportHistoryActions.api.supportHistory.get({
      param: {
        id: Number(id),
      },
    }));
  }, [id]);

  useWillUnMount(() => {
    dispatch(SupportHistoryActions.setSupportHistory(null));
  });

  return (
    <BasePageSP
      className="support_history_detail_sp"
      searchBoxDialog={{
        title: SearchBoxDialogTitle,
        element: <SearchBoxSupportHistorySP />,
      }}
    >
      <div className="detail_wrap">

        <div className="detail_header">
          <div
            className="detail_header_inner"
            onClick={() => { dispatch(goBack()); }}
          >
            <div
              className="detail_header_inner__back_btn"
            >
              <i className="fas fa-chevron-circle-left" />
            </div>
            対応履歴詳細
          </div>

          <div className="detail_header_buttons">
            <LeftIconButton
              color="secondary"
              size="md"
              onClick={handleClickEdit}
              fontAwesomeClass="fa fa-edit"
              label="対応履歴編集"
            />
          </div>
        </div>

        <div className="detail_body support_history_detail_sp__body">
          <div className="row_table_style support_history_detail_sp__body__table">
            <div className="col_2">
              <div>
                <div className="t_row">
                  <div className="t_header">顧客名</div>
                  <div className="t_body">{supportHistoryInfo?.customer_name}</div>
                </div>
                <div className="t_row">
                  <div className="t_header">案件名</div>
                  <div className="t_body">{supportHistoryInfo?.project_name || '---'}</div>
                </div>
              </div>
              <div className="thumb google ml_5">
                {/* TODO front StreetViewImg のprops調整 */}
                <StreetViewImg isShow lat={0} lng={0} />
              </div>
            </div>

            <div className="col_2">
              <div className="t_row">
                <div className="t_header">受付日</div>
                <div className="t_body">{
                  supportHistoryInfo
                    ? changeString(supportHistoryInfo?.reception_time, '/')
                    : '---'
                }
                </div>
              </div>
              {supportHistoryInfo?.fixed_flag
                ? (
                  <div>
                    <RectLabel label={`${'対応済'}`} />
                  </div>
                ) : <></>}
            </div>

            <div className="t_row">
              <div className="t_header">カテゴリ</div>
              <div className="t_body">{supportHistoryInfo?.category_name || '---'}</div>
            </div>
            <div className="t_row">
              <div className="t_header">媒体</div>
              <div className="t_body">{supportHistoryInfo?.media_name || '---'}</div>
            </div>
            <div className="t_row">
              <div className="t_header">件名</div>
              <div className="t_body">{supportHistoryInfo?.supported_history_name || '---'}</div>
            </div>
            <div className="t_row">
              <div className="t_header">対応内容</div>
              <div className="t_body">{supportHistoryInfo?.supported_content || '---'}</div>
            </div>
            <div className="t_row">
              <div className="t_header">対応者</div>
              <div className="t_body">{supportHistoryInfo?.supported_person_name || '---'}</div>
            </div>
            <div className="t_row">
              <div className="t_header">対応日</div>
              <div className="t_body">{
              DateFormatter.date2str(supportHistoryInfo?.supported_complete_date) || '---'
              }
              </div>
            </div>
            <div className="t_row">
              <div className="t_header">対応詳細</div>
              <div className="t_body">{
              supportHistoryInfo?.supported_detail
              }
              </div>
            </div>
            <div className="info_wrap_bottom" />
          </div>
        </div>

      </div>
    </BasePageSP>
  );
};
