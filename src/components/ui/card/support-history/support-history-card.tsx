import React, { useCallback } from 'react';
import { SupportHistoryListType } from '../../../../type/support-history/support-history.type';
import { RectLabel } from '../../label/rect-label/rect-label';
import './support-history-card.scss';
import { UserAgent } from '../../../../utilities/user-agent';
import { changeString } from '../../../../utilities/change-string';
import { StreetViewImg } from '../../street-view-img/street-view-img';

type Props = {
  onClick: (id:number) => void,
  supportHistoryData: SupportHistoryListType,
  className?: string,
  isInCustomerDetail?: boolean;
}

export const SupportHistoryCard = (props: Props) => {
  const {
    supportHistoryData, className, onClick, isInCustomerDetail,
  } = props;

  /* callback */
  const handleClickSupportHistoryDetail = useCallback(
    () => {
      if (onClick) {
        onClick(supportHistoryData?.id);
      }
    }, [onClick],
  );

  return (
    <div
      className={`support_history_card ${UserAgent} card_base ${className || ''}`}
      onClick={handleClickSupportHistoryDetail}
    >
      <div className="card_base_row">
        <div className="card_base_row__col_left">
          <div className="card_info_item">
            <div className="card_info_item__head">
              案件名
            </div>
            <div className="card_info_item__text important">
              {`${supportHistoryData.project_name || '---'}`}
            </div>
          </div>

          <div className="card_info_item">
            <div className="card_info_item__head">
              対応名
            </div>
            <div className="card_info_item__text">
              {`${supportHistoryData.supported_history_name || '---'}`}
            </div>
          </div>

          {!isInCustomerDetail && (
          <div className="card_info_item">
            <div className="card_info_item__head">
              顧客名
            </div>
            <div className="card_info_item__text">
              {`${supportHistoryData.customer_name}`}
            </div>
          </div>
          )}

          <div className="card_info_item">
            <div className="card_info_item__head">
              担当者
            </div>
            <div className="card_info_item__text">
              {`${supportHistoryData.supported_person || '---'}`}
            </div>
          </div>

        </div>
        <div className="card_base_row__col_right">
          <div className="date">{supportHistoryData.reception_time ? changeString(supportHistoryData.reception_time, '/') : '---'}</div>
          <div className="thumb google">
            {/* TODO front StreetViewImg のprops調整 */}
            <StreetViewImg isShow lat={0} lng={0} />
          </div>
          <div className={`${!supportHistoryData.fixed_flag ? 'invisible' : ''}`}>
            <RectLabel label="対応済" />
          </div>
        </div>
      </div>
    </div>
  );
};
