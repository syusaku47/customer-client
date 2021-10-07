import { ValidationLengthUnder255Byte } from '../validation-length-under-255-byte';

export const MasterAreaValidation = (storeId: number, name: string) => {
  window.console.log();
  return (
  // 必須
    !storeId
   || !name

  // バリデーション
  || ValidationLengthUnder255Byte.filter((v) => !v.run(String(name || ''))).length
  );
};
