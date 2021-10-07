import { SupportHistoryEditState } from '../../../type/support-history/support-history.type';
import {
  ValidationLengthUnder40,
  ValidationLengthUnder500,
  ValidationLengthUnder60,
} from '..';
import { ValidationDatePicker } from '../validation-date-picker';

export const SupportHistoryValidation = (data: SupportHistoryEditState) => {
  window.console.log();
  return (
    // 必須
    !data.customer_id
      || !data.reception_time
      || !data.customer_name

      // バリデーション
      || ValidationDatePicker.filter((v) => !v.run(String(data.reception_time || ''))).length
      || ValidationLengthUnder60.filter((v) => !v.run(String(data.media || ''))).length
      || ValidationLengthUnder40.filter((v) => !v.run(String(data.project_name || ''))).length
      || ValidationLengthUnder500.filter((v) => !v.run(String(data.supported_content || ''))).length
      || ValidationDatePicker.filter((v) => !v.run(String(data.supported_complete_date || ''))).length
  );
};
