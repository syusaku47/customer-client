import { MaintenanceEditState } from '../../../type/maintenance/maintenance.type';
import {
  ValidationLengthUnder255, ValidationLengthUnder500,
} from '..';
import { ValidationDatePicker } from '../validation-date-picker';

export const MaintenanceValidation = (data: MaintenanceEditState) => {
  window.console.log(data);
  return (
  // 必須
    !data.customer_id
  || !data.project_id
  || !data.maintenance_date
  || !data.title

  // バリデーション
  || ValidationDatePicker.filter((v) => !v.run(String(data.maintenance_date || ''))).length
  || ValidationLengthUnder255.filter((v) => !v.run(String(data.title || ''))).length
  || ValidationLengthUnder500.filter((v) => !v.run(String(data.detail || ''))).length
  || ValidationDatePicker.filter((v) => !v.run(String(data.supported_date || ''))).length
  || ValidationLengthUnder500.filter((v) => !v.run(String(data.supported_content || ''))).length
  );
};
