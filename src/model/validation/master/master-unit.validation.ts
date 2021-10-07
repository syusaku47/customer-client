import { ValidationLengthUnder255Byte } from '../validation-length-under-255-byte';

export const MasterUnitValidation = (name: string) => {
  window.console.log();
  return (
  // 必須
    !name

  // バリデーション
  || ValidationLengthUnder255Byte.filter((v) => !v.run(String(name || ''))).length
  );
};
