import {
  ValidationLengthUnder255, ValidationPostNum1, ValidationPostNum2, ValidationTel,
} from '..';
import { ValidationMailAddress } from '../validation-mail-address';
import { ValidationPassword } from '../validation-password';

export const MasterContractedCompanyValidation = (
  name: string,
  mailAddress: string,
  password: string,
  telNo: string,
  postalCode1: string,
  postalCode2: string,
  city: string,
  address: string,
  buildingName: string,
  // eslint-disable-next-line
  accounts: number,
) => {
  window.console.log();
  return (
  // 必須
    !name
  || !mailAddress
  || !password

  // バリデーション
  || ValidationLengthUnder255.filter((v) => !v.run(String(name || ''))).length
  || ValidationMailAddress.filter((v) => !v.run(String(mailAddress || ''))).length
  || ValidationPassword.filter((v) => !v.run(String(password || ''))).length
  || ValidationTel.filter((v) => !v.run(String(telNo || ''))).length
  || ValidationPostNum1.filter((v) => !v.run(String(postalCode1 || ''))).length
  || ValidationPostNum2.filter((v) => !v.run(String(postalCode2 || ''))).length
  || ValidationLengthUnder255.filter((v) => !v.run(String(city || ''))).length
  || ValidationLengthUnder255.filter((v) => !v.run(String(address || ''))).length
  || ValidationLengthUnder255.filter((v) => !v.run(String(buildingName || ''))).length
  );
};
