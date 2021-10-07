import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { DialogActions } from '../../../../../../../redux/dialog/dialog.action';
import { MasterEditDialogProps } from '../../../master.type';
import { Select } from '../../../../../../ui/select/select';
import { Input } from '../../../../../../ui/input/input';
import { Required } from '../../../../../../ui/required/required';
import { Checkbox } from '../../../../../../ui/checkbox/checkbox';
import './area-master-edit-dialog.scss';
import { useDidMount } from '../../../../../../../hooks/life-cycle';
import { MasterActions } from '../../../../../../../redux/master/master.action';
import { MasterAreaValidation } from '../../../../../../../model/validation/master/master-area.validation';
import { EditPC } from '../../../../../../dialogs/edit/edit.pc';
import { ValidationLengthUnder255Byte } from '../../../../../../../model/validation/validation-length-under-255-byte';
import { State } from '../../../../../../../redux/root.reducer';

export const AreaMasterEditDialog = (props: MasterEditDialogProps) => {
  const { id, callback } = props;

  const dispatch = useDispatch();
  const storeList = useSelector((state:State) => state.master.storeList, isEqual);

  const [storeId, setStoreId] = useState(NaN);
  const [name, setName] = useState('');
  const [validFlag, setValidFlag] = useState(true);

  const [touch, setTouch] = useState(false);

  const handleClickPost = useCallback(() => {
    if (MasterAreaValidation(
      storeId,
      name,
    )) {
      dispatch(DialogActions.pushMessage({
        title: 'エリア 編集／追加',
        message: ['未入力／入力不備項目があります'],
        callback: () => setTouch(true),
      }));
      return;
    }

    dispatch(MasterActions.api.area.post({
      param: {
        data: {
          store_id: storeId,
          area_name: name,
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
      dispatch(MasterActions.api.area.get({
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
              <div className="item_head">店舗<Required /></div>
              <Select
                className=""
                value={storeId}
                onChange={(v) => setStoreId(Number(v))}
                defaultLabel="指定無し"
                options={storeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
                require
                touch={touch}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">エリア名称<Required /></div>
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
