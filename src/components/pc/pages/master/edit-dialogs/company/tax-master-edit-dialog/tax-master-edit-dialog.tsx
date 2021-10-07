import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DialogActions } from '../../../../../../../redux/dialog/dialog.action';
import { MasterActions } from '../../../../../../../redux/master/master.action';
import { EditPC } from '../../../../../../dialogs/edit/edit.pc';
import { RightLabelCheckbox } from '../../../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { DatePicker } from '../../../../../../ui/date-picker/date-picker';
import { Input } from '../../../../../../ui/input/input';
import { MasterEditDialogProps } from '../../../master.type';
import { Required } from '../../../../../../ui/required/required';
import './tax-master-edit-dialog.scss';
import { useDidMount } from '../../../../../../../hooks/life-cycle';
import { ValidationNumberLengthUnder13 } from '../../../../../../../model/validation/validation-number-length-under';
import { MasterTaxValidation } from '../../../../../../../model/validation/master/master-tax.validation';
import { ValidationDatePicker } from '../../../../../../../model/validation/validation-date-picker';

export const TaxMasterEditDialog = (props: MasterEditDialogProps) => {
  const { id, callback } = props;

  const dispatch = useDispatch();

  const [startDay, setStartDay] = useState<Date | null>(null);
  const [taxRate, setTaxRate] = useState('');
  const [validFlag, setValidFlag] = useState(false);

  const [touch, setTouch] = useState(false);

  const handleClickPost = useCallback(() => {
    if (MasterTaxValidation(
      startDay,
      taxRate,
    )) {
      dispatch(DialogActions.pushMessage({
        title: '消費税 編集／追加',
        message: ['未入力／入力不備項目があります'],
        callback: () => setTouch(true),
      }));
      return;
    }

    dispatch(MasterActions.api.tax.post({
      param: {
        data: {
          start_date: String(startDay),
          tax_rate: taxRate,
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
    startDay,
    taxRate,
    validFlag,
    callback,
  ]);

  useDidMount(() => {
    if (id) {
      dispatch(MasterActions.api.tax.get({
        param: { id },
        onSuccess: (data) => {
          if (!data) return;
          setStartDay(data.start_date ? new Date(data.start_date) : null);
          setTaxRate(String(data.tax_rate));
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
              <div className="item_head">適用開始日<Required /></div>
              <DatePicker
                date={startDay || null}
                require
                errorPosBottom
                onChange={(v) => setStartDay(v)}
                validationList={ValidationDatePicker}
                touch={touch}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">消費税率<Required /></div>
              <div>
                <Input
                  type="number"
                  className="small tax_rate"
                  require
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  validationList={ValidationNumberLengthUnder13}
                  touch={touch}
                />
                <div className="comment">
                  例）10％の場合は&nbsp;0.1&nbsp;と設定してください。
                </div>
              </div>
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
