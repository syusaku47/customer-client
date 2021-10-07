import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { DialogActions } from '../../../../../../../redux/dialog/dialog.action';
import { MasterActions } from '../../../../../../../redux/master/master.action';
import { EditPC } from '../../../../../../dialogs/edit/edit.pc';
import { RightLabelCheckbox } from '../../../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { Input } from '../../../../../../ui/input/input';
import { MasterEditDialogProps } from '../../../master.type';
import { Required } from '../../../../../../ui/required/required';
import { Select } from '../../../../../../ui/select/select';
import './middle-category-master-edit-dialog.scss';
import { useDidMount } from '../../../../../../../hooks/life-cycle';
import { ValidationLengthUnder255Byte } from '../../../../../../../model/validation/validation-length-under-255-byte';
import { MasterMiddleCategoryValidation } from '../../../../../../../model/validation/master/master-middle-category.validation';
import { State } from '../../../../../../../redux/root.reducer';

export const MiddleCategoryMasterEditDialog = (props: MasterEditDialogProps) => {
  const { id, callback } = props;

  const dispatch = useDispatch();
  const largeCategoryList = useSelector((state:State) => state.master.largeCategoryList, isEqual);

  const [largeCategoryId, setLargeCategoryId] = useState(NaN);
  const [name, setName] = useState('');
  const [validFlag, setValidFlag] = useState(!id);

  const [touch, setTouch] = useState(false);

  const handleClickPost = useCallback(() => {
    if (MasterMiddleCategoryValidation(
      largeCategoryId,
      name,
    )) {
      dispatch(DialogActions.pushMessage({
        title: '中分類 編集／追加',
        message: ['未入力／入力不備項目があります'],
        callback: () => setTouch(true),
      }));
      return;
    }

    dispatch(MasterActions.api.middleCategory.post({
      param: {
        data: {
          category_id: largeCategoryId,
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
    largeCategoryId,
    name,
    validFlag,
    callback,
  ]);

  useDidMount(() => {
    if (id) {
      dispatch(MasterActions.api.middleCategory.get({
        param: { id },
        onSuccess: (data) => {
          if (!data) return;
          setLargeCategoryId(data.category_id);
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
              <Select
                className=""
                value={largeCategoryId}
                onChange={(v) => setLargeCategoryId(Number(v))}
                defaultLabel="指定無し"
                options={largeCategoryList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
                require
                touch={touch}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">中分類名称<Required /></div>
              <Input
                className="medium"
                label=""
                value={name}
                onChange={(e) => setName(e.target.value)}
                validationList={ValidationLengthUnder255Byte}
                touch={touch}
                require
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
