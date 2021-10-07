import { ProjectEditState } from '../../../type/project/project.type';
import {
  ValidationLengthUnder100,
  ValidationLengthUnder255,
  ValidationLengthUnder40,
  ValidationLengthUnder50,
  ValidationLengthUnder60,
  ValidationPostNum1,
  ValidationPostNum2,
  ValidationTel,
} from '..';
import { ValidationDatePicker } from '../validation-date-picker';

export const ProjectValidation = (data: ProjectEditState) => (
  // 必須
  !data.customer_id
  || !data.name
  || !data.sales_contact
  || !data.field_name
  || !data.post_no1
  || !data.post_no2
  || !data.field_prefecture
  || !data.field_city
  || !data.field_address

  // バリデーション
  || ValidationLengthUnder40.filter((v) => !v.run(String(data.name || ''))).length
  || ValidationLengthUnder60.filter((v) => !v.run(String(data.field_name || ''))).length
  || ValidationPostNum1.filter((v) => !v.run(String(data.post_no1 || ''))).length
  || ValidationPostNum2.filter((v) => !v.run(String(data.post_no2 || ''))).length
  || ValidationLengthUnder50.filter((v) => !v.run(String(data.field_city || ''))).length
  || ValidationLengthUnder50.filter((v) => !v.run(String(data.field_address || ''))).length
  || ValidationLengthUnder100.filter((v) => !v.run(String(data.field_building_name || ''))).length
  || ValidationTel.filter((v) => !v.run(String(data.field_tel_no || ''))).length
  || ValidationTel.filter((v) => !v.run(String(data.field_fax_no || ''))).length
  || ValidationLengthUnder255.filter((v) => !v.run(String(data.cancel_reason || ''))).length
  || ValidationDatePicker.filter((v) => !v.run(String(data.construction_date || ''))).length
  || ValidationDatePicker.filter((v) => !v.run(String(data.completion_date || ''))).length
  || ValidationDatePicker.filter((v) => !v.run(String(data.complete_date || ''))).length
  || ValidationDatePicker.filter((v) => !v.run(String(data.failure_date || ''))).length
  || ValidationDatePicker.filter((v) => !v.run(String(data.cancel_date || ''))).length
);
