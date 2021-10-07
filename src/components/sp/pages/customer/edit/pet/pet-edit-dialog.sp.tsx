import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CustomerCollection } from '../../../../../../collection/customer/customer.collection';
import { useDidMount } from '../../../../../../hooks/life-cycle';
import { ValidationLengthUnder10, ValidationLengthUnder60 } from '../../../../../../model/validation/validation-length-under';
import { ValidationNumberLengthUnder3 } from '../../../../../../model/validation/validation-number-length-under';
import { CustomerActions } from '../../../../../../redux/customer/customer.action';
import { EditSP } from '../../../../../dialogs/edit/edit.sp';
import { Input } from '../../../../../ui/input/input';
import { Required } from '../../../../../ui/required/required';
import { Select } from '../../../../../ui/select/select';

type Props = {
  isEdit?: boolean;
  petId?: number;
  id: number;
}

export const PetEditDialog = (props: Props) => {
  const { isEdit, petId, id } = props;

  /* Hooks */
  const dispatch = useDispatch();

  /* State */
  const [touch, setTouch] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [sex, setSex] = useState(1);
  const [age, setAge] = useState(NaN);

  /* Callback */
  const handleClickPost = useCallback(
    () => {
      setTouch(true);
      dispatch(CustomerActions.api.pet.post({
        param: {
          data: {
            name,
            type,
            sex,
            age,
          },
          base: {
            id: Number(id),
            pet_id: petId,
          },
        },
        onError: () => {
          setTouch(true);
        },
      }));
    },
    [name, type, sex, age, id, petId],
  );

  useDidMount(() => {
    if (isEdit && petId) {
      dispatch(CustomerActions.api.pet.get({
        param: { id, pet_id: petId },
        callback: (data) => {
          setName(data.name);
          setType(data.type);
          setSex(data.sex);
          setAge(data.age);
        },
      }));
    }
  });

  return (
    <EditSP mode="add" callback={handleClickPost}>
      <div className="edit_sp_body_inner pet_edit_dialog_sp">
        <div className="category_wrap">

          <div className="item_wrap">
            <div className="item_label">
              名前<Required />
            </div>
            <div className="item_body">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                validationList={ValidationLengthUnder60}
                touch={touch}
                require
                errorPosBottom
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">
              種別
            </div>
            <div className="item_body">
              <Input
                value={type}
                onChange={(e) => setType(e.target.value)}
                validationList={ValidationLengthUnder10}
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">
              性別
            </div>
            <div className="item_body item_gender">
              <Select
                value={sex}
                className="full_width"
                options={
                  CustomerCollection.petSexualOption.map((v) => (
                    { text: v.text, value: v.value }
                  ))
                }
                onChange={(v) => setSex(Number(v))}
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">
              年齢
            </div>
            <div className="item_body item_age">
              <Input
                type="number"
                value={age}
                onChange={(e) => {
                  setAge(Number(e.target.value));
                }}
                validationList={ValidationNumberLengthUnder3}
              />才
            </div>
          </div>
        </div>
      </div>
    </EditSP>
  );
};
