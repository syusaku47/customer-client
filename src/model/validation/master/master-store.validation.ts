import {
  ValidationLengthUnder255,
  ValidationPostNum1,
  ValidationPostNum2,
  ValidationTel,
} from '..';

export const MasterStoreValidation = (
  name: string,
  furigana: string,
  shortName: string,
  phoneNum: string,
  faxNum: string,
  freeDial: string,
  postalCode1: string,
  postalCode2: string,
  city: string,
  address: string,
  buildingName: string,
) => (
  // 必須
  !name

  // バリデーション
  || ValidationLengthUnder255.filter((v) => !v.run(String(name || ''))).length
  || ValidationLengthUnder255.filter((v) => !v.run(String(furigana || ''))).length
  || ValidationLengthUnder255.filter((v) => !v.run(String(shortName || ''))).length
  || ValidationTel.filter((v) => !v.run(String(phoneNum || ''))).length
  || ValidationTel.filter((v) => !v.run(String(faxNum || ''))).length
  || ValidationTel.filter((v) => !v.run(String(freeDial || ''))).length
  || ValidationPostNum1.filter((v) => !v.run(String(postalCode1 || ''))).length
  || ValidationPostNum2.filter((v) => !v.run(String(postalCode2 || ''))).length
  || ValidationLengthUnder255.filter((v) => !v.run(String(city || ''))).length
  || ValidationLengthUnder255.filter((v) => !v.run(String(address || ''))).length
  || ValidationLengthUnder255.filter((v) => !v.run(String(buildingName || ''))).length
);
