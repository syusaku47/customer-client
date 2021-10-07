import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DialogActions } from '../../../../../../../redux/dialog/dialog.action';
import { MasterEditDialogProps } from '../../../master.type';
import { Input } from '../../../../../../ui/input/input';
import { Required } from '../../../../../../ui/required/required';
import { Checkbox } from '../../../../../../ui/checkbox/checkbox';
import './madori-master-edit-dialog.scss';
import { useDidMount } from '../../../../../../../hooks/life-cycle';
import { MasterActions } from '../../../../../../../redux/master/master.action';
import { MasterMadoriValidation } from '../../../../../../../model/validation/master/master-madori.validation';
import { EditPC } from '../../../../../../dialogs/edit/edit.pc';
import { ValidationLengthUnder255Byte } from '../../../../../../../model/validation/validation-length-under-255-byte';

export const MadoriMasterEditDialog = (props: MasterEditDialogProps) => {
  const { id, callback } = props;

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [validFlag, setValidFlag] = useState(true);

  const [touch, setTouch] = useState(false);

  const handleClickPost = useCallback(() => {
    if (MasterMadoriValidation(
      name,
    )) {
      dispatch(DialogActions.pushMessage({
        title: '間取り 編集／追加',
        message: ['未入力／入力不備項目があります'],
        callback: () => setTouch(true),
      }));
      return;
    }

    dispatch(MasterActions.api.madori.post({
      param: {
        data: {
          name,
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
    validFlag,
    callback,
  ]);

  useDidMount(() => {
    if (id) {
      dispatch(MasterActions.api.madori.get({
        param: { id },
        onSuccess: (data) => {
          if (!data) return;
          setName(data.name);
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
              <div className="item_head">間取り名称<Required /></div>
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
