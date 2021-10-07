import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DialogActions } from '../../../../../../../redux/dialog/dialog.action';
import { MasterActions } from '../../../../../../../redux/master/master.action';
import { EditPC } from '../../../../../../dialogs/edit/edit.pc';
import { RightLabelCheckbox } from '../../../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { Input } from '../../../../../../ui/input/input';
import { MasterEditDialogProps } from '../../../master.type';
import { Required } from '../../../../../../ui/required/required';
import './large-category-master-edit-dialog.scss';
import { useDidMount } from '../../../../../../../hooks/life-cycle';
import { ValidationLengthUnder255Byte } from '../../../../../../../model/validation/validation-length-under-255-byte';
import { MasterLargeCategoryValidation } from '../../../../../../../model/validation/master/master-large-category.validation';

export const LargeCategoryMasterEditDialog = (props: MasterEditDialogProps) => {
  const { id, callback } = props;
  window.console.log(id, callback);

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [validFlag, setValidFlag] = useState(!id);

  const [touch, setTouch] = useState(false);

  const handleClickPost = useCallback(() => {
    if (MasterLargeCategoryValidation(
      name,
    )) {
      dispatch(DialogActions.pushMessage({
        title: '大分類 編集／追加',
        message: ['未入力／入力不備項目があります'],
        callback: () => setTouch(true),
      }));
      return;
    }

    dispatch(MasterActions.api.largeCategory.post({
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
    validFlag,
    name,
    callback,
  ]);

  useDidMount(() => {
    if (id) {
      dispatch(MasterActions.api.largeCategory.get({
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
              <div className="item_head">大分類名称<Required /></div>
              <Input
                className="medium"
                require
                label=""
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
              <RightLabelCheckbox
                label=""
                className="is_valid"
                checked={validFlag}
                onChange={() => setValidFlag(!validFlag)}
              />
            </div>
          </div>
        </div>
      </div>
    </EditPC>
  );
};
