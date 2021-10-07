import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DatePicker } from '../../../../../ui/date-picker/date-picker';
import { useDidMount } from '../../../../../../hooks/life-cycle';
import { EditPC } from '../../../../../dialogs/edit/edit.pc';
import { Required } from '../../../../../ui/required/required';
import { ValidationLengthUnder50, ValidationLengthUnder60 } from '../../../../../../model/validation/validation-length-under';
import { ValidationTel } from '../../../../../../model/validation/validation-tel';
import { Input } from '../../../../../ui/input/input';
import { ValidationDatePicker } from '../../../../../../model/validation/validation-date-picker';
import { DialogActions } from '../../../../../../redux/dialog/dialog.action';
import { FamilyValidation } from '../../../../../../model/validation/customer/family.validation';
import { ListFamily } from '../../../../../../model/customer/family-list.model';
import { DateFormatter } from '../../../../../../utilities/date-formatter';

type Props = {
  data?: any;
  isEdit?: boolean;
  id: number;
  callbackPost: (v:ListFamily) => void;
}

export const FamilyEditDialog = (props: Props) => {
  const {
    data,
    isEdit,
    id,
    callbackPost,
  } = props;

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

      callbackPost({
        id,
        name,
        relationship,
        mobile_phone: mobilePhone,
        birth_date: DateFormatter.date2str(birthDate),
        index: isEdit ? data.index : undefined,
      });
      // dispatch(CustomerActions.api.family.post({
      //   param: {
      //     data: {
      //       name,
      //       relationship,
      //       mobile_phone: mobilePhone || undefined,
      //       birth_date: birthDate ? DateFormatter.date2str(birthDate) : undefined,
      //     },
      //     base: {
      //       id: Number(id),
      //       family_id: familyId,
      //     },
      //   },
      //   onError: () => {
      //     setTouch(true);
      //   },
      // }));
    },
    [name, relationship, mobilePhone, birthDate, id, data],
  );

  useDidMount(() => {
    if (isEdit && data) {
      // dispatch(CustomerActions.api.family.get({
      //   param: { id, family_id: familyId },
      //   callback: (data) => {
      setName(data.name);
      setRelationship(data.relationship);
      setMobilePhone(data.mobile_phone);
      if (data.birth_date) { setBirthDate(new Date(data.birth_date)); }
      //   },
      // }));
    }
  });

  return (
    <EditPC mode="dialog" callback={handleClickPost}>
      <div className="editPC_body_inner FamilyEditDialog">

        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">氏名<Required /></div>
            <Input
              className=""
              value={name}
              onChange={(e) => setName(e.target.value)}
              validationList={ValidationLengthUnder50}
              require
              errorPosBottom
              touch={touch}
            />
          </div>
        </div>

        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">続柄<Required /></div>
            <Input
              className=""
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              validationList={ValidationLengthUnder60}
              require
              touch={touch}
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">携帯電話</div>
            <Input
              className=""
              type="tel"
              value={mobilePhone}
              onChange={(e) => setMobilePhone(e.target.value)}
              validationList={ValidationTel}
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">生年月日</div>
            <div className="birth_date">
              <DatePicker
                date={birthDate}
                onChange={(v) => setBirthDate(v)}
                validationList={ValidationDatePicker}
              />
            </div>
          </div>
        </div>
      </div>
    </EditPC>

  );
};
