import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DialogActions } from '../../../../../../../redux/dialog/dialog.action';
import { MasterEditDialogProps } from '../../../master.type';
import { Input } from '../../../../../../ui/input/input';
import { Required } from '../../../../../../ui/required/required';
import { Checkbox } from '../../../../../../ui/checkbox/checkbox';
import './after-maintenance-master-edit-dialog.scss';
import { useDidMount } from '../../../../../../../hooks/life-cycle';
import { MasterActions } from '../../../../../../../redux/master/master.action';
import { MasterAfterMaintenanceValidation } from '../../../../../../../model/validation/master/master-after-maintenance.validation';
import { EditPC } from '../../../../../../dialogs/edit/edit.pc';
import { ValidationLengthUnder255Byte } from '../../../../../../../model/validation/validation-length-under-255-byte';

export const AfterMaintenanceMasterEditDialog = (props: MasterEditDialogProps) => {
  const { id, callback } = props;

  const dispatch = useDispatch();

  const [registrationScheduledDate, setRegistrationScheduledDate] = useState('');
  const [validFlag, setValidFlag] = useState(true);

  const [touch, setTouch] = useState(false);

  const handleClickPost = useCallback(() => {
    if (MasterAfterMaintenanceValidation(
      registrationScheduledDate,
    )) {
      dispatch(DialogActions.pushMessage({
        title: 'アフターメンテナンス 編集／追加',
        message: ['未入力／入力不備項目があります'],
        callback: () => setTouch(true),
      }));
      return;
    }

    dispatch(MasterActions.api.afterMaintenance.post({
      param: {
        data: {
          ins_expected_date: registrationScheduledDate,
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
    registrationScheduledDate,
    validFlag,
    callback,
  ]);

  useDidMount(() => {
    if (id) {
      dispatch(MasterActions.api.afterMaintenance.get({
        param: { id },
        onSuccess: (data) => {
          if (!data) return;
          setRegistrationScheduledDate(data.ins_expected_date);
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
              <div className="item_head">登録予定日<Required /></div>
              <Input
                className=""
                type="number"
                maxLength={4}
                require
                value={registrationScheduledDate}
                onChange={(e) => setRegistrationScheduledDate(e.target.value)}
                validationList={ValidationLengthUnder255Byte}
                touch={touch}
              />
              ヵ月後
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
