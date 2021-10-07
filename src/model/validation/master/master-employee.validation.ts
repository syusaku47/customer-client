import {
  ValidationLengthUnder255,
  ValidationLengthUnder8,
} from '..';
import { ValidationEisuzi } from '../validation-eisuzi';
import { ValidationMailAddress } from '../validation-mail-address';
import { ValidationNumberLengthUnder14 } from '../validation-number-length-under';
import { ValidationPassword } from '../validation-password';

export const MasterEmployeeValidation = (
  employeeCode: string,
  newPassword: string,
  passwordCheck: string,
  store: number,
  name: string,
  shortName: string,
  furigana: string,
  jobTitle: string,
  mailAddress: string,
  salesTarget: string,
) => {
  window.console.log();
  return (
  // 必須
    !employeeCode
    || !store
    || !name
    || !mailAddress

  // バリデーション
  || ValidationLengthUnder8.filter((v) => !v.run(String(employeeCode || ''))).length
  || ValidationEisuzi.filter((v) => !v.run(String(employeeCode || ''))).length
  || ValidationPassword.filter((v) => !v.run(String(newPassword || ''))).length
  || ValidationPassword.filter((v) => !v.run(String(passwordCheck || ''))).length
  || ValidationLengthUnder255.filter((v) => !v.run(String(name || ''))).length
  || ValidationLengthUnder255.filter((v) => !v.run(String(shortName || ''))).length
  || ValidationLengthUnder255.filter((v) => !v.run(String(furigana || ''))).length
  || ValidationLengthUnder255.filter((v) => !v.run(String(jobTitle || ''))).length
  || ValidationMailAddress.filter((v) => !v.run(String(mailAddress || ''))).length
  || ValidationNumberLengthUnder14.filter((v) => !v.run(String(salesTarget || ''))).length
  );
};
