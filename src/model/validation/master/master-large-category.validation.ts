import { ValidationLengthUnder255Byte } from '../validation-length-under-255-byte';

export const MasterLargeCategoryValidation = (name: string) => (
  // 必須
  !name

  // バリデーション
  || ValidationLengthUnder255Byte.filter((v) => !v.run(String(name || ''))).length
);
