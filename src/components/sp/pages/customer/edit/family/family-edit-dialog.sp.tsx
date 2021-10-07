import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDidMount } from '../../../../../../hooks/life-cycle';
import { FamilyValidation } from '../../../../../../model/validation/customer/family.validation';
import { ValidationDatePicker } from '../../../../../../model/validation/validation-date-picker';
import { ValidationLengthUnder50, ValidationLengthUnder60 } from '../../../../../../model/validation/validation-length-under';
import { ValidationTel } from '../../../../../../model/validation/validation-tel';
import { CustomerActions } from '../../../../../../redux/customer/customer.action';
import { DialogActions } from '../../../../../../redux/dialog/dialog.action';
import { DateFormatter } from '../../../../../../utilities/date-formatter';
import { EditSP } from '../../../../../dialogs/edit/edit.sp';
import { DatePicker } from '../../../../../ui/date-picker/date-picker';
import { Input } from '../../../../../ui/input/input';
import { Required } from '../../../../../ui/required/required';

type Props = {
  isEdit?: boolean;
  familyId?: number;
  id: number;
}

export const FamilyEditDialog = (props: Props) => {
  const { isEdit, familyId, id } = props;

  /* Hooks */
  const dispatch = useDispatch();

  /* State */
  const [touch, setTouch] = useState(false);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  /* Callback */
  const handleClickPost = useCallback(
    () => {
      if (FamilyValidation(
        name,
        relationship,
        mobilePhone,
        birthDate,
      )) {
        dispatch(DialogActions.pushMessage({
          title: 'ご家族情報登録',
          message: ['未入力／入力不備項目があります'],
          callback: () => setTouch(true),
        }));
        return;
      }

      setTouch(true);
      dispatch(CustomerActions.api.family.post({
        param: {
          data: {
            name,
            relationship,
            mobile_phone: mobilePhone || undefined,
            birth_date: birthDate ? DateFormatter.date2str(birthDate) : undefined,
          },
          base: {
            id: Number(id),
            family_id: familyId,
          },
        },
        onError: () => {
          setTouch(true);
        },
      }));
    },
    [name, relationship, mobilePhone, birthDate, id, familyId],
  );

  useDidMount(() => {
    if (isEdit && familyId) {
      dispatch(CustomerActions.api.family.get({
        param: { id, family_id: familyId },
        callback: (data) => {
          setName(data.name);
          setRelationship(data.relationship);
          setMobilePhone(data.mobile_phone);
          if (data.birth_date) { setBirthDate(new Date(data.birth_date)); }
        },
      }));
    }
  });

  return (
    <EditSP mode="add" callback={handleClickPost}>
      <div className="edit_sp_body_inner family_edit_dialog_sp">
        <div className="category_wrap">

          <div className="item_wrap">
            <div className="item_label">
              氏名<Required />
            </div>
            <div className="item_body">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                validationList={ValidationLengthUnder50}
                touch={touch}
                require
                errorPosBottom
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">
              続柄<Required />
            </div>
            <div className="item_body item_family_relation">
              <Input
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                validationList={ValidationLengthUnder60}
                touch={touch}
                require
              />
            </div>

          </div>

          <div className="item_wrap">
            <div className="item_label">
              携帯電話
            </div>
            <div className="item_body item_tel_no">
              <Input
                type="tel"
                value={mobilePhone}
                onChange={(e) => setMobilePhone(e.target.value)}
                validationList={ValidationTel}
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">生年月日</div>
            <DatePicker
              date={birthDate}
              onChange={(v) => setBirthDate(v)}
              validationList={ValidationDatePicker}
            />
          </div>
        </div>
      </div>
    </EditSP>

  );
};
