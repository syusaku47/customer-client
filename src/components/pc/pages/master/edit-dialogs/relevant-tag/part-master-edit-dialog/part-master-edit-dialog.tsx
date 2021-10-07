import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DialogActions } from '../../../../../../../redux/dialog/dialog.action';
import { MasterEditDialogProps } from '../../../master.type';
import { Input } from '../../../../../../ui/input/input';
import { Required } from '../../../../../../ui/required/required';
import { Checkbox } from '../../../../../../ui/checkbox/checkbox';
import './part-master-edit-dialog.scss';
import { MasterPartValidation } from '../../../../../../../model/validation/master/master-part.validation';
import { MasterActions } from '../../../../../../../redux/master/master.action';
import { EditPC } from '../../../../../../dialogs/edit/edit.pc';
import { ValidationLengthUnder255Byte } from '../../../../../../../model/validation/validation-length-under-255-byte';
import { useDidMount } from '../../../../../../../hooks/life-cycle';

export const PartMasterEditDialog = (props: MasterEditDialogProps) => {
  const { id, callback } = props;

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [textInputFlag, setTextInputFlag] = useState(false);
  const [validFlag, setValidFlag] = useState(true);

  const [touch, setTouch] = useState(false);

  const handleClickPost = useCallback(() => {
    if (MasterPartValidation(
      name,
    )) {
      dispatch(DialogActions.pushMessage({
        title: '部位 編集／追加',
        message: ['未入力／入力不備項目があります'],
        callback: () => setTouch(true),
      }));
      return;
    }

    dispatch(MasterActions.api.part.post({
      param: {
        data: {
          name,
          is_input: textInputFlag ? 1 : 0,
          is_valid: validFlag ? 1 : 0,
        },
        id,
      },
      onSuccess: () => {
        callback();
      },
      onError: () => {
        setTouch(true);
      },
    }));
    dispatch(DialogActions.pop());
  }, [
    name,
    textInputFlag,
    validFlag,
    callback,
  ]);

  useDidMount(() => {
    if (id) {
      dispatch(MasterActions.api.part.get({
        param: { id },
        onSuccess: (data) => {
          if (!data) return;
          setName(data.name);
          setTextInputFlag(data.input_flag);
          setValidFlag(data.valid_flag);
        },
      }));
    }
  });

  return (
    <EditPC mode="dialog" callback={handleClickPost}>
      <div className="edit_pc_body_inner edit_master">
        <div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">部位名称<Required /></div>
              <Input
                className=""
                require
                value={name}
                onChange={(e) => setName(e.target.value)}
                validationList={ValidationLengthUnder255Byte}
                touch={touch}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">テキスト入力有無</div>
              <Checkbox
                label=""
                className="is_input"
                checked={!!textInputFlag}
                onChange={() => setTextInputFlag(!textInputFlag)}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">有効フラグ</div>
              <Checkbox
                label=""
                className="is_valid"
                checked={!!validFlag}
                onChange={() => setValidFlag(!validFlag)}
              />
            </div>
          </div>
        </div>
      </div>
    </EditPC>
  );
};
