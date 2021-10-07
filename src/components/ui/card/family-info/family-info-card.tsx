import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { State } from '../../../../redux/root.reducer';
import { card } from '../../../../selector/card/card-selectors';
import { Family } from '../../../../type/customer/family.type';
import { openTel } from '../../../../utilities/open-tel';
import { SupportHistoryEditSP } from '../../../sp/pages/support-history/edit/support-history-edit.sp';
import { SupportHistoryEditDialogTitle } from '../../../sp/pages/support-history/edit/support-history-edit.type';
import { IconButton } from '../../button/icon-button/icon-button';
import './family-info-card.scss';

type Props = {
  familyInfo: Family,
  isActive: boolean,
  isInDialog?: boolean
}

export const FamilyInfoCard = (props: Props) => {
  /* TODO hori isInDialog 電話アイコンの表示非表示管理が必要なければ削除 */
  /* eslint-disable-next-line */
  const { familyInfo, isActive, isInDialog } = props;
  const [telStr, setTelStr] = useState(familyInfo.birth_date);
  const customerInfo = useSelector((state: State) => state.customer.customer);
  const dispatch = useDispatch();

  const handleClickPhone = useCallback(() => {
    dispatch(DialogActions.pushMessage({
      title: '',
      message: [`${familyInfo.name}宛に電話をかけます`],
      label: 'はい',
      isCancel: true,
      cancelLabel: 'いいえ',
      callback: () => {
        dispatch(DialogActions.push({
          title: SupportHistoryEditDialogTitle.add,
          element: <SupportHistoryEditSP
            mode="add"
            customerData={customerInfo || undefined}
          />,
        }));
        openTel({ tel: familyInfo.mobile_phone });
      },
    }));
  }, []);

  useMemo(() => {
    if (telStr) {
      setTelStr(telStr.replace(/-/g, '/'));
    }
  }, [familyInfo.birth_date]);

  return (
    <div
      className={`family_info_card ${isActive ? 'active' : ''} ${card}`}
      onClick={() => {}}
    >
      <div className="family_info_card__row row1">
        <div className="row1__col1 card_info_item">
          <div className="card_info_item__head">氏名</div>
          <div className="card_info_item__text">{familyInfo.name}</div>
        </div>
        <div className="row1__col2 card_info_item">
          <div className="card_info_item__head">続柄</div>
          <div className="card_info_item__text">{familyInfo.relationship}</div>
        </div>
      </div>
      <div className="family_info_card__row row2">
        <div className="card_info_item item_tel">
          <div className="card_info_item__head">TEL</div>
          <div className="card_info_item__text">{familyInfo.mobile_phone}</div>
          <IconButton
            fontAwesomeClass="fas fa-phone"
            onClick={handleClickPhone}
            size="md"
            color="secondary"
            disabled={!familyInfo.mobile_phone}
          />
        </div>
      </div>
      <div className="family_info_card__row row_birth">
        <div className="row_birth__col1"><i className="fas fa-birthday-cake" /></div>
        <div className="row_birth__col2">{telStr}</div>
      </div>
    </div>
  );
};

// FamilyInfoCard.defaultProps = { isInDialog: false };
