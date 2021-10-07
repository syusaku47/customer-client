import { ValidationLengthUnder50, ValidationLengthUnder60, ValidationTel } from '..';
import { ValidationDatePicker } from '../validation-date-picker';

export const FamilyValidation = (
  name: string,
  relationship: string,
  mobilePhone: string,
  birthDate: Date | null,
) => {
  window.console.log();
  return (
  // 必須
    !name
  || !relationship

  // バリデーション
  || ValidationLengthUnder50.filter((v) => !v.run(String(name || ''))).length
  || ValidationLengthUnder60.filter((v) => !v.run(String(relationship || ''))).length
  || ValidationTel.filter((v) => !v.run(String(mobilePhone || ''))).length
  || ValidationDatePicker.filter((v) => !v.run(String(birthDate || ''))).length
  );
};
