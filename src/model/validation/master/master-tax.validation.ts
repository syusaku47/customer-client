import { ValidationDatePicker } from '../validation-date-picker';
import { ValidationNumberLengthUnder13 } from '../validation-number-length-under';

export const MasterTaxValidation = (startDay: Date | null, taxRate: string) => {
  window.console.log();
  return (
  // 必須
    !startDay
  || !taxRate

  // バリデーション
  || ValidationDatePicker.filter((v) => !v.run(String(startDay || ''))).length
  || ValidationNumberLengthUnder13.filter((v) => !v.run(String(taxRate || ''))).length
  );
};
