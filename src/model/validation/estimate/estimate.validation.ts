import { EstimateEditState } from '../../../type/estimate/estimate.type';
import {
  ValidationLengthUnder500,
} from '..';
import { ValidationNumberLengthUnder20, ValidationNumberLengthUnder5 } from '../validation-number-length-under';
import { ValidationDatePicker } from '../validation-date-picker';

export const EstimateValidation = (data: EstimateEditState) => {
  window.console.log();
  return (
  // 必須
    !data.project_id
    || !data.quote_date
    || !data.order_construction_start
    || !data.order_construction_end
    || !data.quote_expiration_date
    || !data.order_expected_date

    // バリデーション
    || ValidationLengthUnder500.filter((v) => !v.run(String(data.remarks || ''))).length
    || ValidationDatePicker.filter((v) => !v.run(String(data.quote_date || ''))).length
    || ValidationDatePicker.filter((v) => !v.run(String(data.order_construction_start || ''))).length
    || ValidationDatePicker.filter((v) => !v.run(String(data.order_construction_end || ''))).length
    || ValidationDatePicker.filter((v) => !v.run(String(data.quote_expiration_date || ''))).length
    || ValidationDatePicker.filter((v) => !v.run(String(data.order_expected_date || ''))).length
    || ValidationNumberLengthUnder20.filter((v) => !v.run(String(data.adjustment_amount || ''))).length
    || ValidationNumberLengthUnder5.filter((v) => !v.run(String(data.field_cost_quote || ''))).length
    || ValidationNumberLengthUnder5.filter((v) => !v.run(String(data.field_cost || ''))).length
    || ValidationNumberLengthUnder5.filter((v) => !v.run(String(data.call_cost_quote || ''))).length
    || ValidationNumberLengthUnder5.filter((v) => !v.run(String(data.call_cost || ''))).length
  );
};
