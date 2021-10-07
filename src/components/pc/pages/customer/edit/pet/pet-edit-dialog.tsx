import React, { useCallback, useState } from 'react';
import { CustomerCollection } from '../../../../../../collection/customer/customer.collection';
import { Select } from '../../../../../ui/select/select';
import { useDidMount } from '../../../../../../hooks/life-cycle';
import { EditPC } from '../../../../../dialogs/edit/edit.pc';
import { Required } from '../../../../../ui/required/required';
import { ValidationLengthUnder10, ValidationLengthUnder60 } from '../../../../../../model/validation/validation-length-under';
import { ValidationNumberLengthUnder3 } from '../../../../../../model/validation/validation-number-length-under';
import { Input } from '../../../../../ui/input/input';
import { ListPet } from '../../../../../../model/customer/pet-list.model';

type Props = {
  data?: any;
  isEdit?: boolean;
  id: number;
  callbackPost: (v:ListPet) => void;
}

export const PetEditDialog = (props: Props) => {
  const {
    data,
    isEdit,
    id,
    callbackPost,
  } = props;

  /* State */
  const [touch] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [sex, setSex] = useState(1);
  const [age, setAge] = useState(NaN);
  const [pet_id, setPet_id] = useState(NaN);

  /* Callback */
  const handleClickPost = useCallback(
    () => {
      // setTouch(true);
      callbackPost({
        id,
        pet_id,
        name,
        type,
        sex,
        age,
        index: isEdit ? data.index : undefined,
      });
      // dispatch(CustomerActions.api.pet.post({
      //   param: {
      //     data: {
      //       name,
      //       type,
      //       sex,
      //       age,
      //     },
      //     base: {
      //       id: Number(id),
      //       pet_id: petId,
      //     },
      //   },
      //   onError: () => {
      //     setTouch(true);
      //   },
      // }));
    },
    [name, type, sex, age, id, pet_id, data],
  );

  useDidMount(() => {
    if (isEdit && data) {
      setName(data.name);
      setType(data.type);
      setSex(data.sex);
      setAge(data.age);
      setPet_id(data.pet_id ?? NaN);
    }
  });

  return (
    <EditPC mode="dialog" callback={handleClickPost}>
      <div className="editPC_body_inner PetEditDialog">

        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">名前<Required /></div>
            <Input
              className=""
              value={name}
              onChange={(e) => setName(e.target.value)}
              validationList={ValidationLengthUnder60}
              require
              touch={touch}
            />
          </div>
        </div>

        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">種別</div>
            <Input
              className=""
              value={type}
              onChange={(e) => setType(e.target.value)}
              validationList={ValidationLengthUnder10}
            />
          </div>
        </div>

        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">性別</div>

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
          <div className="item_box">
            <div className="item_head">才</div>
            <Input
              className=""
              type="number"
              label="才"
              value={age}
              onChange={(e) => {
                setAge(Number(e.target.value));
              }}
              validationList={ValidationNumberLengthUnder3}
            />
          </div>
        </div>
      </div>
    </EditPC>
  );
};
