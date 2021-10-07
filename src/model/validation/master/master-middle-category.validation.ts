import { ValidationLengthUnder255Byte } from '../validation-length-under-255-byte';

export const MasterMiddleCategoryValidation = (largeCategoryName: number, name: string) => (
  // 必須
  !largeCategoryName
  || !name

  // バリデーション
  || ValidationLengthUnder255Byte.filter((v) => !v.run(String(name || ''))).length
);
